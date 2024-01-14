const { promises: fs } = require("fs");
const path = require("path");
const { getRandomOfficeQuotes, getRandomXKCD } = require("./services");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README_TEMPLATE.md"))
  ).toString("utf-8");

  const officeData = await getRandomOfficeQuotes();
  console.log("officeData >> ", officeData);

  const currentDate = new Date().toLocaleString("SG", {
    timeZone: "Asia/Singapore",
  });
  console.log("currentDate", currentDate);

  // Get XKCD Random URL
  const urlXKCD = await getRandomXKCD();
  console.log("urlXKCD", urlXKCD);

  let readme = readmeTemplate.replace("{currentDate}", currentDate);

  if (officeData) {
    if (officeData) {
      const { quote, character } = officeData.data;
      readme = readme
        .replace("{office_quote}", quote)
        .replace("{office_character}", `- ${character}`);
    }
  }

  if (XKCDUrl) {
    readme = readme.replace("{XKCDUrl}", urlXKCD);
  }
  console.log("readme", readme);
  await fs.writeFile("README.md", readme);
}

main();
