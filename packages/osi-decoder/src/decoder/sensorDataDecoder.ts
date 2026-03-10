// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { createOsiDecoder } from "./createOsiDecoder";
import { matchesSensorDataChannel } from "./matchers";
import type {
  ChannelMeta,
  RegisterMessageContractDecoderArgs,
} from "../../../lichtblick-suite-placeholder/src";
import {
  OSI_SENSOR_DATA_PROVIDED_MESSAGE_CONTRACT,
  OSI_SENSOR_DATA_SCHEMA_NAME,
  type osi3,
} from "../../../osi-contract/src";
import { ProtobufRuntimeDecoder } from "../protobufDecoder";

function decodeSensorData(
  bytes: ArrayBufferView,
  meta: Readonly<ChannelMeta>,
  decoder: ProtobufRuntimeDecoder,
): osi3.SensorData {
  return decoder.decode<osi3.SensorData>(bytes, {
    schemaName: meta.schemaName,
    schemaData: meta.schemaData,
  });
}

export function createSensorDataDecoder(
  decoder: ProtobufRuntimeDecoder,
): RegisterMessageContractDecoderArgs<osi3.SensorData> {
  return createOsiDecoder<osi3.SensorData>({
    id: "lichtblick.asam-osi.sensordata-decoder",
    providedContract: OSI_SENSOR_DATA_PROVIDED_MESSAGE_CONTRACT,
    sourceSchemaName: OSI_SENSOR_DATA_SCHEMA_NAME,
    match: matchesSensorDataChannel,
    deserialize(bytes, meta) {
      return decodeSensorData(bytes, meta, decoder);
    },
    toJson(msg, meta) {
      return decoder.toJson(msg, { schemaName: meta.schemaName });
    },
    validateInput(msg): msg is osi3.SensorData {
      return typeof msg === "object" && msg != undefined;
    },
  });
}
