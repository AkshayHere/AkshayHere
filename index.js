const { promises: fs } = require("fs");
const path = require("path");
const { getRandomOfficeQuotes, getRandomXKCD } = require("./services");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README_TEMPLATE.md"))
  ).toString("utf-8");
  const office_quote = await getRandomOfficeQuotes();
  console.log("office_quote >> ", office_quote);

  const currentDate = new Date().toLocaleString("SG", {
    timeZone: "Asia/Singapore",
  });

  // Get XKCD Random URL
  const XKCDUrl = await getRandomXKCD();
  console.log("XKCDUrl", XKCDUrl);

  let readme = readmeTemplate.replace("{currentDate}", currentDate);
  
  if (office_quote) {
    if (office_quote) {
      const { content, character } = office_quote.data;
      readme = readmeTemplate
        .replace("{office_quote}", content)
        .replace(
          "{office_character}",
          `- ${character.firstname} ${character.lastname}`
        );
    }
  }

  if (XKCDUrl) {
    readme = readmeTemplate.replace("{XKCDUrl}", XKCDUrl);
  }
  console.log("readme", readme);

  await fs.writeFile("README.md", readme);
}

main();
