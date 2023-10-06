import { demoUrl } from "..";
import {
  createChart,
  fetchUrl,
  getNumericColumnFromTables,
  validateUrl,
} from "../helper";
import cheerio from "cheerio";

describe("createChart()", () => {
  test("should return a string", async () => {
    const chart = await createChart([1, 2, 3]);
    expect(typeof chart).toBe("string");
  });
});

describe("fetchUrl()", () => {
  test("should return HTML content", async () => {
    const html = await fetchUrl(demoUrl);
    expect(html).toContain("<html");
  });
});

describe("getNumericColumnFromTable()", () => {
  test("should return an array of numbers", () => {
    const table = cheerio.load(
      `<table class="wikitable">
      <tbody>
        <tr>
          <td>1.4 m</td>
          <td>20 May 1922</td>
        </tr>
        <tr>
          <td>1.3 m</td>
          <td>20 May 1930</td>
        </tr>
        <tr>
          <td>2.3 m</td>
          <td>20 Junly 1930</td>
        </tr>
      </tbody>
    </table>`
    ) as unknown as cheerio.Root;
    const column = getNumericColumnFromTables(table);
    expect(column).toEqual([1.4, 1.3, 2.3]);
  });
});

describe("validateUrl()", () => {
  test("should return true for a valid URL", () => {
    const url = "https://example.com";
    const isValid = validateUrl(url);
    expect(isValid).toBe(true);
  });

  test("should return false for an invalid URL", () => {
    const url = "https:example.com";
    const isValid = validateUrl(url);
    expect(isValid).toBe(false);
  });
});
