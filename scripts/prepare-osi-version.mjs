// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

/* eslint-disable no-restricted-syntax */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

function parseVersion(versionText) {
  const major = versionText.match(/VERSION_MAJOR\s*=\s*(\d+)/)?.[1];
  const minor = versionText.match(/VERSION_MINOR\s*=\s*(\d+)/)?.[1];
  const patch = versionText.match(/VERSION_PATCH\s*=\s*(\d+)/)?.[1];

  if (!major || !minor || !patch) {
    throw new Error(
      "Failed to parse VERSION_MAJOR/MINOR/PATCH from open-simulation-interface/VERSION.",
    );
  }
  return { major, minor, patch };
}

const root = resolve(process.cwd());
const osiDir = resolve(root, "open-simulation-interface");
const versionPath = resolve(osiDir, "VERSION");
const templatePath = resolve(osiDir, "osi_version.proto.in");
const outputPath = resolve(osiDir, "osi_version.proto");

const versionText = readFileSync(versionPath, "utf8");
const templateText = readFileSync(templatePath, "utf8");
const { major, minor, patch } = parseVersion(versionText);

const rendered = templateText
  .replace(/@VERSION_MAJOR@/g, major)
  .replace(/@VERSION_MINOR@/g, minor)
  .replace(/@VERSION_PATCH@/g, patch);

writeFileSync(outputPath, rendered, "utf8");
console.log(`Generated ${outputPath} with version ${major}.${minor}.${patch}`);
