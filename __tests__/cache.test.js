import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cache from "../cache";
import { Cachekeys } from "../constants";

describe("CRUD operations on the local storage", () => {
  describe("readData", () => {
    it("checks if Async Storage is used", async () => {
      await cache.getData(Cachekeys.likedCats);
      expect(AsyncStorage.getItem).toBeCalledWith(Cachekeys.likedCats);
    });

    describe("failedRead", () => {
      let error;
      beforeEach(async () => {
        error = new Error("Failed to read data");
        AsyncStorage.getItem.mockRejectedValueOnce(error);
      });
      it("should return an error when trying to read from Async Storage", async () => {
        const res = await cache.getData(Cachekeys.likedCats);
        expect(res).toBe(error.message);
      });
    });
  });

  describe("removeData", () => {
    it("should remove specified data from storage", async () => {
      const data = { name: "Cat1" };
      await cache.storeData(Cachekeys.likedCats, data);

      await cache.removeData(Cachekeys.likedCats, data);
      const res = await cache.getData(Cachekeys.likedCats);

      const exists = res.some((cat) => cat.name === data.name);
      expect(exists).toEqual(false);
    });

    describe("failedRemove", () => {
      let error;
      beforeEach(async () => {
        error = new Error("Failed to remove data");
        AsyncStorage.setItem.mockRejectedValueOnce(error);
      });
      it("should return an error when trying to remove from Async Storage", async () => {
        const res = await cache.removeData(Cachekeys.likedCats, {
          name: "Cat1",
        });

        expect(res).toBe(error.message);
      });
    });
  });

  describe("storeData", () => {
    beforeEach(async () => {
      await AsyncStorage.clear();
    });

    it("should write data to storage", async () => {
      const data = Math.floor(Math.random() * 1000);
      await cache.storeData(Cachekeys.likedCats, data);

      const res = await cache.getData(Cachekeys.likedCats);
      expect(res).toStrictEqual([data]);
    });

    it("should append data to existing data", async () => {
      const data1 = { name: "Cat1" };
      const data2 = { name: "Cat2" };
      await cache.storeData(Cachekeys.likedCats, data1);
      await cache.storeData(Cachekeys.likedCats, data2);

      const res = await cache.getData(Cachekeys.likedCats);
      expect(res).toEqual(expect.arrayContaining([data1, data2]));
    });

    it("shoud return proper message when storing duplicate data", async () => {
      const data = { name: "Cat1" };
      const message = "duplicate data";
      await cache.storeData(Cachekeys.likedCats, data);
      const res = await cache.storeData(Cachekeys.likedCats, data);

      expect(res).toBe(message);
    });

    describe("failedStore", () => {
      let error;
      beforeEach(async () => {
        error = new Error("Failed to store data");
        AsyncStorage.setItem.mockRejectedValueOnce(error);
      });
      it("should return an error when trying to store into Async Storage", async () => {
        const res = await cache.storeData(Cachekeys.likedCats, { a: 1 });
        expect(res).toBe(error.message);
      });
    });
  });
});
