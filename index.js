// require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");
const { getRandomOfficeQuotes } = require("./services");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./CUSTOM_README.md"))
  ).toString("utf-8");

  // const office_quote = await (
  //   await fetch("https://officeapi.dev/api/quotes/random").catch((err) =>
  //     console.error(`Error : ${err.message}`)
  //   )
  // ).json();
  // console.log(office_quote);
  const office_quote = await getRandomOfficeQuotes();

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
