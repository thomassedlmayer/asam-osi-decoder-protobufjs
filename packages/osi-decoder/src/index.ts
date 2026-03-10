// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

/* eslint-disable no-restricted-syntax */

import { ExtensionContext } from "@lichtblick/suite";

import { createGroundTruthDecoder } from "./decoder/groundTruthDecoder";
import { createSensorDataDecoder } from "./decoder/sensorDataDecoder";
import { createSensorViewDecoder } from "./decoder/sensorViewDecoder";
import { ProtobufRuntimeDecoder } from "./protobufDecoder";
import type { AdapterExtensionContext } from "../../lichtblick-suite-placeholder/src";

const decoder = new ProtobufRuntimeDecoder();
const groundTruthDecoder = createGroundTruthDecoder(decoder);
const sensorViewDecoder = createSensorViewDecoder(decoder);
const sensorDataDecoder = createSensorDataDecoder(decoder);

export function activate(extensionContext: ExtensionContext): void {
  const ctx = extensionContext as AdapterExtensionContext;
  console.info(
    "[asam-osi-decoder-protobufjs][osi-decoder] activate(): starting decoder registration",
  );

  if (typeof ctx.registerMessageContractDecoder !== "function") {
    console.warn(
      "[asam-osi-decoder-protobufjs][osi-decoder] registerMessageContractDecoder API is not available on this host.",
    );
    return;
  }

  console.info(
    `[asam-osi-decoder-protobufjs][osi-decoder] registering decoder '${groundTruthDecoder.id}' for ${groundTruthDecoder.sourceSchemas.join(", ")}`,
  );
  ctx.registerMessageContractDecoder(groundTruthDecoder);
  console.info(
    `[asam-osi-decoder-protobufjs][osi-decoder] registering decoder '${sensorViewDecoder.id}' for ${sensorViewDecoder.sourceSchemas.join(", ")}`,
  );
  ctx.registerMessageContractDecoder(sensorViewDecoder);
  console.info(
    `[asam-osi-decoder-protobufjs][osi-decoder] registering decoder '${sensorDataDecoder.id}' for ${sensorDataDecoder.sourceSchemas.join(", ")}`,
  );
  ctx.registerMessageContractDecoder(sensorDataDecoder);
  console.info("[asam-osi-decoder-protobufjs][osi-decoder] activate(): decoder registration complete");
}

export default { activate };
