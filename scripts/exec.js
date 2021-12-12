#!/usr/bin/env node

const { program } = require("commander");
const { spawnSync } = require("child_process");
const path = require("path");

const args = Array.from(process.argv).slice(2);

program
  .option("-i, --input <filename>", "File to run against", "input")
  .argument("<challenge_file>")
  .action((challengeFile) => {
    const opts = program.opts();

    const dayDir = path.dirname(challengeFile);
    const inputFile = opts.input;

    spawnSync("node", [challengeFile, path.join(dayDir, inputFile)], {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  });

program.parse(process.argv);
