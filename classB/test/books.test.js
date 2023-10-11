const booksController = require("../src/controllers/books");
const request = require("supertest");
const express = require("express");
const axios = require("axios");
const app = express();

jest.mock("axios");
const axiosMock = require("axios");
app.use("/", booksController);

describe("Check get book URL", () => {
    test("Returns error response when GET request made to backend books endpoint throws error", async () => {
        axiosMock.get.mockRejectedValue(new Error("Some Error"));
        const response = await request(app).get("/all/IN");
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({
            error: "Internal Server Error",
            detail: "Unable to connect to the backend"
        });
    });

    test("Returns correct response on valid GET request to books endpoint", async () => {
        mockBooks = [
            {
              "Title": "Lord of the Rings",
              "Author": "J.R.R Tolkien",
              "price": 25.99,
              "ISBN": "9780261102385",
              "publisher": "HarperCollins"
            },
            {
              "Title": "The Hobbit",
              "Author": "J.R.R Tolkien",
              "price": 9.88,
              "ISBN": "0261102214",
              "publisher": "HarperCollins"
            },
            {
              "Title": "Lord of Souls",
              "Author": "Greg Keyes",
              "price": 12.98,
              "ISBN": "0345508025",
              "publisher": "Del Rey"
            }
          ];
        axios.get.mockResolvedValue({ data: mockBooks });
        const response = await request(app).get("/all/IN");
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockBooks);
    });

});

describe("Check get team URL", () => {
    test("Returns error response when GET request made to backend books endpoint throws error", async () => {
        axiosMock.get.mockRejectedValue(new Error("Mock Error"));
        const response = await request(app).get("/teams");
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({
            error: "Internal Server Error",
            detail: "Unable to connect to the backend"
        });
    });

    test("Returns correct response on valid GET request to books endpoint", async () => {
        mockTeam = {
            "team": "Disco Ninjas",
            "membersNames": ["Senthooran", "Gayatri", "Harsh", "Suman", "Kshama", "Mahima", "Sinchana", "Shevanth"]
        }
        axios.get.mockResolvedValue({ data: mockTeam });
        const response = await request(app).get("/teams");
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockTeam);
    });

});

