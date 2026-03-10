// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const protobufjs = require("protobufjs");

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

function symbolName(fullName) {
  return fullName.replace(/^\./, "").replace(/\./g, "_");
}

function variantTypeName(fullName, variant) {
  return `${symbolName(fullName)}_${variant === "raw" ? "Raw" : "Normalized"}`;
}

function isInt64Type(type) {
  return (
    type === "int64" ||
    type === "uint64" ||
    type === "sint64" ||
    type === "fixed64" ||
    type === "sfixed64"
  );
}

function scalarTypeToTs(type, variant) {
  if (isInt64Type(type)) {
    return variant === "normalized" ? "Raw.LongLike" : "LongLike";
  }
  switch (type) {
    case "double":
    case "float":
    case "int32":
    case "uint32":
    case "sint32":
    case "fixed32":
    case "sfixed32":
      return "number";
    case "bool":
      return "boolean";
    case "string":
      return "string";
    case "bytes":
      return "Uint8Array";
    default:
      return "unknown";
  }
}

function fieldTypeToTs(field, variant) {
  if (field.resolvedType instanceof protobufjs.Type) {
    return variantTypeName(field.resolvedType.fullName, variant);
  }
  if (field.resolvedType instanceof protobufjs.Enum) {
    const enumName = symbolName(field.resolvedType.fullName);
    return variant === "normalized" ? `Raw.${enumName}` : enumName;
  }
  return scalarTypeToTs(field.type, variant);
}

const repoRoot = resolve(process.cwd());
const osiProtoRoot = resolve(repoRoot, "open-simulation-interface");
const outDir = resolve(repoRoot, "packages/osi-contract/src/gen-protobufjs");
const outRawFile = resolve(outDir, "types.raw.ts");
const outNormalizedFile = resolve(outDir, "types.normalized.ts");
const outIndexFile = resolve(outDir, "types.ts");

const protoFiles = collectProtoFiles(osiProtoRoot);
if (protoFiles.length === 0) {
  throw new Error(`No .proto files found under ${osiProtoRoot}`);
}

mkdirSync(outDir, { recursive: true });

const root = new protobufjs.Root();
root.resolvePath = (origin, target) => {
  if (isAbsolute(target)) {
    return target;
  }
  if (target.startsWith("google/protobuf/")) {
    return resolve(repoRoot, "node_modules/protobufjs", target);
  }
  if (!origin || origin === "") {
    return resolve(osiProtoRoot, target);
  }
  return resolve(dirname(origin), target);
};
root.loadSync(protoFiles, { keepCase: true });
root.resolveAll();

const targetTypeNames = ["osi3.GroundTruth", "osi3.SensorView", "osi3.SensorData"];
const collectedTypes = new Map();
const collectedEnums = new Map();
const queue = targetTypeNames.map((name) => root.lookupType(name));

while (queue.length > 0) {
  const type = queue.pop();
  if (!(type instanceof protobufjs.Type)) {
    continue;
  }
  const fullName = type.fullName;
  if (collectedTypes.has(fullName)) {
    continue;
  }
  collectedTypes.set(fullName, type);
  for (const field of type.fieldsArray) {
    if (field.resolvedType instanceof protobufjs.Type) {
      queue.push(field.resolvedType);
    } else if (field.resolvedType instanceof protobufjs.Enum) {
      collectedEnums.set(field.resolvedType.fullName, field.resolvedType);
    }
  }
}

const rawLines = [];
rawLines.push(
  `// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>`,
);
rawLines.push(`// SPDX-License-Identifier: MPL-2.0`);
rawLines.push("");
rawLines.push(`export type LongLike = number | bigint | { toNumber(): number; toString(): string };`);
rawLines.push("");

for (const enumType of collectedEnums.values()) {
  rawLines.push(`export enum ${symbolName(enumType.fullName)} {`);
  for (const [name, value] of Object.entries(enumType.values)) {
    rawLines.push(`  ${name} = ${value},`);
  }
  rawLines.push("}");
  rawLines.push("");
}

for (const type of collectedTypes.values()) {
  rawLines.push(`export interface ${variantTypeName(type.fullName, "raw")} {`);
  for (const field of type.fieldsArray) {
    let tsType = fieldTypeToTs(field, "raw");
    if (field.map) {
      const keyType = scalarTypeToTs(field.keyType ?? "string", "raw");
      const mapKeyType = keyType === "number" ? "number" : "string";
      tsType = `Record<${mapKeyType}, ${tsType}>`;
    } else if (field.repeated) {
      tsType = `${tsType}[]`;
    }
    rawLines.push(`  ${field.name}?: ${tsType};`);
  }
  rawLines.push("}");
  rawLines.push("");
}

for (const type of collectedTypes.values()) {
  rawLines.push(`export type ${symbolName(type.fullName)} = ${variantTypeName(type.fullName, "raw")};`);
}
rawLines.push("");
rawLines.push(`export type GroundTruthRaw = ${variantTypeName(".osi3.GroundTruth", "raw")};`);
rawLines.push(`export type SensorViewRaw = ${variantTypeName(".osi3.SensorView", "raw")};`);
rawLines.push(`export type SensorDataRaw = ${variantTypeName(".osi3.SensorData", "raw")};`);
rawLines.push("");
rawLines.push(`export type GroundTruth = GroundTruthRaw;`);
rawLines.push(`export type SensorView = SensorViewRaw;`);
rawLines.push(`export type SensorData = SensorDataRaw;`);
rawLines.push("");

const normalizedLines = [];
normalizedLines.push(
  `// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>`,
);
normalizedLines.push(`// SPDX-License-Identifier: MPL-2.0`);
normalizedLines.push("");
normalizedLines.push(`import type * as Raw from "./types.raw";`);
normalizedLines.push("");

for (const type of collectedTypes.values()) {
  normalizedLines.push(`export interface ${variantTypeName(type.fullName, "normalized")} {`);
  for (const field of type.fieldsArray) {
    let tsType = fieldTypeToTs(field, "normalized");
    if (field.map) {
      const keyType = scalarTypeToTs(field.keyType ?? "string", "normalized");
      const mapKeyType = keyType === "number" ? "number" : "string";
      tsType = `Record<${mapKeyType}, ${tsType}>`;
    } else if (field.repeated) {
      tsType = `${tsType}[]`;
    }

    const isMessageField = field.resolvedType instanceof protobufjs.Type;
    const optional = !field.map && !field.repeated && isMessageField;
    normalizedLines.push(`  ${field.name}${optional ? "?" : ""}: ${tsType};`);
  }
  normalizedLines.push("}");
  normalizedLines.push("");
}

normalizedLines.push(
  `export type GroundTruthNormalized = ${variantTypeName(".osi3.GroundTruth", "normalized")};`,
);
normalizedLines.push(
  `export type SensorViewNormalized = ${variantTypeName(".osi3.SensorView", "normalized")};`,
);
normalizedLines.push(
  `export type SensorDataNormalized = ${variantTypeName(".osi3.SensorData", "normalized")};`,
);
normalizedLines.push("");

const indexLines = [];
indexLines.push(
  `// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>`,
);
indexLines.push(`// SPDX-License-Identifier: MPL-2.0`);
indexLines.push("");
indexLines.push(`export * from "./types.raw";`);
indexLines.push(`export * from "./types.normalized";`);
indexLines.push("");

writeFileSync(outRawFile, rawLines.join("\n"), "utf8");
writeFileSync(outNormalizedFile, normalizedLines.join("\n"), "utf8");
writeFileSync(outIndexFile, indexLines.join("\n"), "utf8");

const summary = `// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

// Generated by scripts/generate-osi-types-protobufjs.mjs
// Source: open-simulation-interface/*.proto
`;
console.log(summary);
console.log(`Generated protobufjs TS raw types: ${outRawFile}`);
console.log(`Generated protobufjs TS normalized types: ${outNormalizedFile}`);
console.log(`Generated protobufjs TS index: ${outIndexFile}`);
