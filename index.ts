import express, { Request, Response, Application } from "express";
import cheerio from "cheerio";
import fs from "fs";
import {
  createChart,
  fetchUrl,
  getNumericColumnFromTables,
  validateUrl,
} from "./helper";

export const app: Application = express();
const port = 8000;
export const demoUrl =
  "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression";

app.use(express.json());

// route to create a chart
app.get("/chart", async (req: Request, res: Response) => {
  try {
    const { url } = req.query;

    // Validate the URL
    const isValidUrl = validateUrl(url as string);
    if (!isValidUrl) {
      return res.status(400).send("Invalid URL");
    }

    // Fetch the Wikipedia page
    const htmlSourceCode = await fetchUrl(url as string);

    // Parse the HTML using Cheerio
    const tables = cheerio.load(htmlSourceCode);

    // Get the numeric column from the table
    const numericColumn = getNumericColumnFromTables(tables);
    if (!numericColumn.length) {
      return res.status(400).send("No numeric table found");
    }

    // Create the chart
    const chart = await createChart(numericColumn);
    const chartImgBuffer = Buffer.from(chart, "base64");

    // Save the chart image
    const fileName = "chart.png";
    fs.writeFile(fileName, chartImgBuffer, (err) => {
      if (err) {
        res.status(500).send("Error saving chart image");
      } else {
        console.log(`Chart image saved to ${fileName}`);
        res.set("Content-Type", "image/png");
        res.status(200).send(chartImgBuffer);
      }
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

// default route
app.get("/", (req: Request, res: Response) => {
  res.send(
    `Detector Inspector Engineering Challenge. Click here to <a href='http://localhost:${port}/chart/?url=${demoUrl}'>view demo</a>`
  );
});

// start the Express server
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is online at http://localhost:${port}`);
  });
}
