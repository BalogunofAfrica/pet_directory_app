import { fetchCats } from "../api";
const MOCK_CATS = [
  "Khao Manee",
  "Korat",
  "Kurilian Bobtail",
  "LaPerm",
  "Maine",
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_CATS),
  })
);

describe("fetchCats", () => {
  describe("succesful api call", () => {
    it("should return an array of cats", async () => {
      const cats = await fetchCats();
      expect(cats).toEqual(MOCK_CATS);
    });
  });

  describe("failed api call", () => {
    beforeEach(async () => {
      let error = new Error("Can not fetch data");
      fetch.mockRejectedValueOnce(error);
    });
    it("should throw an error", async () => {
      expect(fetchCats()).rejects.toThrow(Error);
    });
  });
});
