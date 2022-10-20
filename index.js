require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./CUSTOM_README.md"))
    ).toString("utf-8");

    const office_quote = await (
        await fetch("https://officeapi.dev/api/quotes/random").catch((err) =>
            console.error(`Error : ${err.message}`)
        )
    ).json();

    console.log(office_quote);

    if (office_quote) {
        const currentDate = new Date().toLocaleString();
        const { data } = office_quote;
        const readme = readmeTemplate
            .replace("{office_quote}", data.content)
            .replace(
                "{office_character}",
                `- ${data.character.firstname} ${data.character.lastname}`
            )
            .replace("{currentDate}", currentDate);
        // console.log(readme);

        await fs.writeFile("README.md", readme);
    }
}

main();