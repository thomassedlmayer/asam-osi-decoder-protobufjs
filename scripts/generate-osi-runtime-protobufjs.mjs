// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function collectProtoFiles(dir) {
  const result = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      result.push(...collectProtoFiles(fullPath));
    } else if (entry.endsWith(".proto")) {
      result.push(fullPath);
    }
  }
  return result;
}

const repoRoot = resolve(process.cwd());
const osiProtoRoot = resolve(repoRoot, "open-simulation-interface");
const outDir = resolve(repoRoot, "packages/osi-contract/src/gen-protobufjs");
const jsOutFile = resolve(outDir, "osi.js");
const dtsOutFile = resolve(outDir, "osi.d.ts");
const pbjsBin = resolve(repoRoot, "node_modules/protobufjs-cli/bin/pbjs");
const pbtsBin = resolve(repoRoot, "node_modules/protobufjs-cli/bin/pbts");
const tscBin = resolve(repoRoot, "node_modules/typescript/bin/tsc");

const protoFiles = collectProtoFiles(osiProtoRoot);
if (protoFiles.length === 0) {
  throw new Error(`No .proto files found under ${osiProtoRoot}`);
}

mkdirSync(outDir, { recursive: true });

const pbjsArgs = [
  pbjsBin,
  "-t",
  "static-module",
  "-w",
  "es6",
  "--keep-case",
  "-p",
  osiProtoRoot,
  "-p",
  resolve(repoRoot, "node_modules/protobufjs"),
  "-o",
  jsOutFile,
  ...protoFiles,
];

const pbjsResult = spawnSync(process.execPath, pbjsArgs, {
  cwd: repoRoot,
  stdio: "inherit",
});
if (pbjsResult.status !== 0) {
  throw new Error(`pbjs failed with exit code ${pbjsResult.status}`);
}

// Fix strict ESM import resolution for bundlers.
const jsContents = readFileSync(jsOutFile, "utf8").replace(
  '"protobufjs/minimal"',
  '"protobufjs/minimal.js"',
);
writeFileSync(jsOutFile, jsContents, "utf8");

const pbtsArgs = [pbtsBin, "-o", dtsOutFile, jsOutFile];
const pbtsResult = spawnSync(process.execPath, pbtsArgs, {
  cwd: repoRoot,
  stdio: "inherit",
});

if (pbtsResult.status !== 0) {
  console.warn(`pbts failed (exit code ${pbtsResult.status}); falling back to tsc declaration emit.`);
  const tscArgs = [
    tscBin,
    "--allowJs",
    "--declaration",
    "--emitDeclarationOnly",
    "--skipLibCheck",
    "--target",
    "ES2020",
    "--module",
    "ES2020",
    "--moduleResolution",
    "node",
    "--outDir",
    outDir,
    jsOutFile,
  ];
  const tscResult = spawnSync(process.execPath, tscArgs, {
    cwd: repoRoot,
    stdio: "inherit",
  });
  if (tscResult.status !== 0) {
    throw new Error(`Failed to generate runtime typings (pbts and fallback tsc failed).`);
  }
}

console.log(`Generated protobufjs runtime: ${jsOutFile}`);
console.log(`Generated protobufjs runtime typings: ${dtsOutFile}`);
