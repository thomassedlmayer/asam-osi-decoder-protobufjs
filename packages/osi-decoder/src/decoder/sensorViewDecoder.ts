// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { createOsiDecoder } from "./createOsiDecoder";
import { matchesSensorViewChannel } from "./matchers";
import type {
  ChannelMeta,
  RegisterMessageContractDecoderArgs,
} from "../../../lichtblick-suite-placeholder/src";
import {
  OSI_SENSOR_VIEW_PROVIDED_MESSAGE_CONTRACT,
  OSI_SENSOR_VIEW_SCHEMA_NAME,
  type osi3,
} from "../../../osi-contract/src";
import { ProtobufRuntimeDecoder } from "../protobufDecoder";

function decodeSensorView(
  bytes: ArrayBufferView,
  meta: Readonly<ChannelMeta>,
  decoder: ProtobufRuntimeDecoder,
): osi3.SensorView {
  return decoder.decode<osi3.SensorView>(bytes, {
    schemaName: meta.schemaName,
    schemaData: meta.schemaData,
  });
}

export function createSensorViewDecoder(
  decoder: ProtobufRuntimeDecoder,
): RegisterMessageContractDecoderArgs<osi3.SensorView> {
  return createOsiDecoder<osi3.SensorView>({
    id: "lichtblick.asam-osi.sensorview-decoder",
    providedContract: OSI_SENSOR_VIEW_PROVIDED_MESSAGE_CONTRACT,
    sourceSchemaName: OSI_SENSOR_VIEW_SCHEMA_NAME,
    match: matchesSensorViewChannel,
    deserialize(bytes, meta) {
      return decodeSensorView(bytes, meta, decoder);
    },
    toJson(msg, meta) {
      return decoder.toJson(msg, { schemaName: meta.schemaName });
    },
    validateInput(msg): msg is osi3.SensorView {
      return typeof msg === "object" && msg != undefined;
    },
  });
}
