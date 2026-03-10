// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { createOsiDecoder } from "./createOsiDecoder";
import { matchesGroundTruthChannel } from "./matchers";
import type {
  ChannelMeta,
  RegisterMessageContractDecoderArgs,
} from "../../../lichtblick-suite-placeholder/src";
import {
  OSI_GROUND_TRUTH_PROVIDED_MESSAGE_CONTRACT,
  OSI_GROUND_TRUTH_SCHEMA_NAME,
  type osi3,
} from "../../../osi-contract/src";
import { ProtobufRuntimeDecoder } from "../protobufDecoder";

function decodeGroundTruth(
  bytes: ArrayBufferView,
  meta: Readonly<ChannelMeta>,
  decoder: ProtobufRuntimeDecoder,
): osi3.GroundTruth {
  return decoder.decode<osi3.GroundTruth>(bytes, {
    schemaName: meta.schemaName,
    schemaData: meta.schemaData,
  });
}

export function createGroundTruthDecoder(
  decoder: ProtobufRuntimeDecoder,
): RegisterMessageContractDecoderArgs<osi3.GroundTruth> {
  return createOsiDecoder<osi3.GroundTruth>({
    id: "lichtblick.asam-osi.groundtruth-decoder",
    providedContract: OSI_GROUND_TRUTH_PROVIDED_MESSAGE_CONTRACT,
    priority: 100,
    sourceSchemaName: OSI_GROUND_TRUTH_SCHEMA_NAME,
    match: matchesGroundTruthChannel,
    deserialize(bytes, meta) {
      return decodeGroundTruth(bytes, meta, decoder);
    },
    toJson(msg, meta) {
      return decoder.toJson(msg, { schemaName: meta.schemaName });
    },
    validateInput(msg): msg is osi3.GroundTruth {
      if (typeof msg !== "object" || msg == undefined) {
        return false;
      }
      const maybe = msg as { timestamp?: { seconds?: unknown } };
      return (
        typeof maybe.timestamp?.seconds === "number" || typeof maybe.timestamp?.seconds === "object"
      );
    },
  });
}
