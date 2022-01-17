import type { CatObject } from "./types";

async function fetchCats() {
  try {
    const headers = { "x-api-key": "723b860c-b1f4-4922-b9af-bdae9e3d8fde" };
    const result = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers,
      method: "GET",
    });

    return result.json() as Promise<CatObject[]>;
  } catch (error) {
    console.log(error);
  }
}

export { fetchCats };
