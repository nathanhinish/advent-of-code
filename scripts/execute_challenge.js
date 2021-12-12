const { program } = require("commander");
const { spawnSync } = require("child_process");
const path = require("path");

const args = Array.from(process.argv).slice(2);

program
  .option("-t, --test", "Run against the sample data")
  .argument("<challenge_file>")
  .action((challengeFile) => {
    const opts = program.opts();

    const dayDir = path.dirname(challengeFile);
    const inputFile = opts.test ? "./sample" : "./input";

    spawnSync("node", [challengeFile, path.join(dayDir, inputFile)], {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  });

program.parse(process.argv);
