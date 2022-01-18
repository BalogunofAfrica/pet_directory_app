// @ts-expect-error
import { API_KEY, API_URL } from "react-native-dotenv";

import type { CatObject } from "./types";

async function fetchCats() {
  try {
    const headers = { "x-api-key": API_KEY };
    const result = await fetch(`${API_URL}/breeds`, {
      headers,
      method: "GET",
    });

    return result.json() as Promise<CatObject[]>;
  } catch (e) {
    throw e;
  }
}

export { fetchCats };
