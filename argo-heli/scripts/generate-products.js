"use strict";

const fs = require("fs");
const path = require("path");

const flightsDir = path.resolve(__dirname, "../src/app/content/flights");
const outputFile = path.resolve(__dirname, "../dist/products.json");

const flightFiles = fs
  .readdirSync(flightsDir)
  .filter((f) => f.endsWith(".json"));

if (flightFiles.length === 0) {
  console.error("generate-products: No flight JSON files found in", flightsDir);
  process.exit(1);
}

const products = flightFiles.map((file) => {
  const flight = JSON.parse(
    fs.readFileSync(path.join(flightsDir, file), "utf-8"),
  );
  return {
    uiId: flight.id,
    name: `Helikopterrundflug "${flight.title}" - ${flight.duration} min, ${flight.maxPassengers} Personen`,
    default_price_data: {
      currency: "CHF",
      unit_amount: flight.totalCost,
    },
    description: flight.synopsis.de,
  };
});

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(products, null, 2), "utf-8");
console.log(
  `generate-products: wrote ${products.length} product(s) to ${outputFile}`,
);
