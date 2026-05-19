const { promises: fs } = require("fs");
const path = require("path");
const { getRandomXKCD } = require("./services");

const EXPLAIN_XKCD_URL = "https://www.explainxkcd.com/wiki/index.php/";

async function main() {
  // Timestamp to include in template
  const currentDate = new Date().toLocaleString("SG", {
    timeZone: "Asia/Singapore",
  });
  console.log("currentDate", currentDate);

  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README_TEMPLATE.md"))
  ).toString("utf-8");

  // const officeData = await getRandomOfficeQuotes();
  // console.log("officeData >> ", officeData);

  let readme = readmeTemplate.replace("{currentDate}", currentDate);

  // Get XKCD Random URL
  const { xkcdCode, xkcdImgLink } = await getRandomXKCD();
  const xkcdInfoUrl = xkcdCode ? `${EXPLAIN_XKCD_URL}${xkcdCode}` : EXPLAIN_XKCD_URL;
  console.log("XKCDUrl", xkcdImgLink);
  console.log("xkcdInfoUrl", xkcdInfoUrl);

  // if (officeData) {
  //   if (officeData) {
  //     const { quote, character } = officeData;
  //     readme = readme
  //       .replace("{office_quote}", quote)
  //       .replace("{office_character}", `- ${character}`);
  //   }
  // }

  if (xkcdImgLink) {
    readme = readme.replace("{XKCDUrl}", xkcdImgLink);
    readme = readme.replace("{xkcdInfoUrl}", xkcdInfoUrl);
  }
  console.log("readme", readme);
  await fs.writeFile("README.md", readme);
}

main();
