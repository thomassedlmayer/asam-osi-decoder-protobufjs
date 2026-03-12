// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

/* eslint-disable no-restricted-syntax */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const repoRoot = resolve(process.cwd());
const scriptsDir = resolve(repoRoot, "scripts");

function runOrThrow(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

runOrThrow(process.execPath, [resolve(scriptsDir, "prepare-osi-version.mjs")]);
runOrThrow(process.execPath, [resolve(scriptsDir, "generate-osi-runtime-protobufjs.mjs")]);
runOrThrow("git", [
  "diff",
  "--exit-code",
  "--",
  "packages/osi-contract/src/osiVersion.ts",
  "packages/osi-contract/src/gen-protobufjs/osi.js",
  "packages/osi-contract/src/gen-protobufjs/osi.d.ts",
  "open-simulation-interface/osi_version.proto",
]);

console.log("OSI generated artifacts are up to date.");
