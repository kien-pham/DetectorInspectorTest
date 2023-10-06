import request from "supertest";
import { app, demoUrl } from "../index";
import { createChart } from "../helper";

describe(`GET /chart`, () => {
  test("should return status 200", async () => {
    const response = await request(app).get(`/chart?url=${demoUrl}`);
    expect(response.status).toBe(200);
  });

  test("should return a PNG image", async () => {
    const response = await request(app).get(`/chart?url=${demoUrl}`);
    expect(response.type).toBe("image/png");
  });

  test("should create a chart image and save it as a file", (done) => {
    const numericColumn = [1, 2, 3, 4, 5];
    createChart(numericColumn).then((chart) => {
      const chartImgBuffer = Buffer.from(chart, "base64");

      // Save the chart image
      const fileName = "chart.png";
      const fs = require("fs");

      fs.writeFile(fileName, chartImgBuffer, (err: any) => {
        if (err) {
          console.log("Error", err);
          done.fail(err);
        } else {
          console.log(`Chart image saved to ${fileName}`);
          done();
        }
      });
    });
  });
});
