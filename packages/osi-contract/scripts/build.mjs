// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

/* eslint-disable no-restricted-syntax */

import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const packageRoot = resolve(import.meta.dirname, "..");
const repoRoot = resolve(packageRoot, "..", "..");
const tscBin = resolve(repoRoot, "node_modules/typescript/bin/tsc");
const tsconfigBuild = resolve(packageRoot, "tsconfig.build.json");
const distDir = resolve(packageRoot, "dist");
const srcGenDir = resolve(packageRoot, "src/gen-protobufjs");
const distGenDir = resolve(distDir, "gen-protobufjs");

rmSync(distDir, { recursive: true, force: true });

const tscResult = spawnSync(process.execPath, [tscBin, "-p", tsconfigBuild], {
  cwd: packageRoot,
  stdio: "inherit",
});

if (tscResult.status !== 0) {
  throw new Error(`tsc build failed with exit code ${tscResult.status}`);
}

mkdirSync(distGenDir, { recursive: true });
cpSync(resolve(srcGenDir, "osi.js"), resolve(distGenDir, "osi.js"));
cpSync(resolve(srcGenDir, "osi.d.ts"), resolve(distGenDir, "osi.d.ts"));

console.log(`Built osi-contract to ${distDir}`);
