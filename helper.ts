import axios from "axios";
import { ChartConfiguration } from "chart.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

// Function to create a chart
export const createChart = async (columnData: number[]): Promise<string> => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 800,
    height: 500,
    backgroundColour: "white",
  });

  const configuration: ChartConfiguration = {
    type: "line",
    data: {
      labels: columnData,
      datasets: [
        {
          label: "Number",
          data: columnData,
          fill: false,
          borderColor: ["rgb(51, 204, 204)"],
          borderWidth: 1,
          xAxisID: "xAxis1",
        },
      ],
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
        },
      },
    },
  };

  const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
  return dataUrl.replace(/^data:image\/png;base64,/, "");
};

// Function to get a numeric column from tables
export const getNumericColumnFromTables = ($: cheerio.Root): number[] => {
  const columnValues: number[] = [];

  // Find all tables on the main page section
  const tables = $("table.wikitable");

  // Run through each table
  tables.each((i, table) => {
    const rows = $(table).find("tr");

    // Run through each row to find a numeric value
    rows.each((j, row) => {
      const cells = $(row).find("td");
      const firstCellText = cells.first().text().trim();

      // Use regex to match numeric values (including decimals and commas)
      const match = firstCellText.match(/(\d+([.,]\d+)?)/);

      if (match) {
        const value = parseFloat(match[1].replace(",", ""));
        if (!isNaN(value)) {
          columnValues.push(value);
        }
      }
    });

    // If we found numeric values in a column, exit the loop
    if (columnValues.length) {
      return false; // Equivalent to 'break' in a for loop
    }
  });

  console.log("numbers", columnValues);
  return columnValues;
};

// Function to validate a URL
export const validateUrl = (url: string) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
};

// Function to fetch a URL
export const fetchUrl = async (url: string): Promise<string> => {
  const { data } = await axios.get(url);
  return data;
};
