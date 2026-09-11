"use strict";

const fs = require("node:fs");
const path = require("node:path");

const workspaceDirectory = path.join(__dirname, "workspace");
const addonPath = path.join(workspaceDirectory, "scenario_engine.node");
const scenarioPath = path.join(workspaceDirectory, "scenario.json");

function loadAddon() {
  if (!fs.existsSync(addonPath)) {
    throw new Error(
      `Missing precompiled addon: ${path.relative(process.cwd(), addonPath)}`
    );
  }

  return require(addonPath);
}

function generateScenario() {
  const addon = loadAddon();

  const seed = Number(process.env.SEED ?? "20260908");
  const difficulty = process.env.DIFFICULTY ?? "silver";

  if (!Number.isInteger(seed)) {
    throw new TypeError("SEED must be an integer.");
  }

  // The native addon creates workspace/scenario.json and
  // workspace/generation.log itself.
  addon.generateScenario({
    seed,
    difficulty,
    donors: 30,
    recipients: 10,
    volunteers: 12
  });

  if (!fs.existsSync(scenarioPath)) {
    throw new Error(
      "The addon completed without creating workspace/scenario.json."
    );
  }
}

function testChallenge() {
  const addon = loadAddon();

  if (!fs.existsSync(scenarioPath)) {
    throw new Error(
      "No scenario found. Run `make dev` before running `make test`."
    );
  }

  const scenario = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));
  const challenge = require("./challenge.js");

  if (typeof challenge.solveScenario !== "function") {
    throw new TypeError("challenge.js must export solveScenario(scenario).");
  }

  const plan = challenge.solveScenario(scenario);

  if (!plan || typeof plan !== "object") {
    throw new TypeError("solveScenario must return a plan object.");
  }

  const result = addon.verifyAndScore(scenario, plan);

  console.log("\nChallenge result:");
  console.log(JSON.stringify(result, null, 2));

  if (!result.valid) {
    console.error("\nThe plan is invalid.");
    process.exitCode = 1;
    return;
  }

  console.log(`\nValid plan. Score: ${result.score}`);
}

if (process.argv.includes("--generate")) {
  generateScenario();
} else {
  testChallenge();
}