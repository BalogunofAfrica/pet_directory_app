import { pick } from "../util";

describe("pick function", () => {
  it("selects returns a new object with the properties passed", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ["a", "b"]);

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
