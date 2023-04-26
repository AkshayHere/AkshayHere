const { promises: fs } = require("fs");
const path = require("path");
const { getRandomOfficeQuotes } = require("./services");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README_TEMPLATE.md"))
  ).toString("utf-8");
  const office_quote = await getRandomOfficeQuotes();
   console.log('office_quote >> ', office_quote);

  if (office_quote) {
    const currentDate = new Date().toLocaleString("SG", {
      timeZone: "Asia/Singapore",
    });
    const { content, character } = office_quote.data;
    const readme = readmeTemplate
      .replace("{office_quote}", content)
      .replace(
        "{office_character}",
        `- ${character.firstname} ${character.lastname}`
      )
      .replace("{currentDate}", currentDate);
    // console.log(readme);

    await fs.writeFile("README.md", readme);
  }
}

main();
