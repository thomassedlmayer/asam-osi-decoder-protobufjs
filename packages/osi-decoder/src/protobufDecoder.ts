// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

/* eslint-disable no-restricted-syntax */

import { osi3 } from "../../osi-contract/src";
import {
  OSI_GROUND_TRUTH_SCHEMA_NAME,
  OSI_SENSOR_DATA_SCHEMA_NAME,
  OSI_SENSOR_VIEW_SCHEMA_NAME,
} from "../../osi-contract/src";

type DecodeMeta = {
  schemaName?: string;
  schemaData?: Uint8Array;
};

type ProtobufConversionOptions = {
  defaults?: boolean;
};

type ProtobufToObjectFn = (message: unknown, options?: ProtobufConversionOptions) => unknown;

function hasProtobufToObject(message: unknown): message is {
  constructor: { toObject: ProtobufToObjectFn };
} {
  if (typeof message !== "object" || message == undefined) {
    return false;
  }
  const maybeConstructor = (message as { constructor?: { toObject?: unknown } }).constructor;
  return typeof maybeConstructor?.toObject === "function";
}

function toView(data: ArrayBufferView): Uint8Array {
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}

type DecodeStats = {
  count: number;
  totalMs: number;
  maxMs: number;
};

const LOG_EVERY_N_MESSAGES = 500;

function nowMs(): number {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return globalThis.performance.now() ?? Date.now();
}

export class ProtobufRuntimeDecoder {
  #statsBySchema: Record<string, DecodeStats> = {};
  #jsonProjectionCountBySchema: Record<string, number> = {};

  #recordTiming(schemaName: string, durationMs: number): void {
    const stats = (this.#statsBySchema[schemaName] ??= {
      count: 0,
      totalMs: 0,
      maxMs: 0,
    });
    stats.count += 1;
    stats.totalMs += durationMs;
    stats.maxMs = Math.max(stats.maxMs, durationMs);

    if (stats.count % LOG_EVERY_N_MESSAGES === 0) {
      const avgMs = stats.totalMs / stats.count;
      console.info(
        `[asam-osi-decoder-protobufjs][decode] schema=${schemaName} count=${stats.count} avgMs=${avgMs.toFixed(
          3,
        )} maxMs=${stats.maxMs.toFixed(3)}`,
      );
    }
  }

  #decodeWithProtobufjs<T>(
    bytes: ArrayBufferView,
    schemaName: string,
    decoder: {
      decode: (reader: Uint8Array) => T;
    },
  ): T {
    try {
      return decoder.decode(toView(bytes));
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to decode '${schemaName}' with generated protobufjs runtime: ${reason}`,
      );
    }
  }

  public decodeGroundTruth(bytes: ArrayBufferView, meta: DecodeMeta): osi3.GroundTruth {
    if (meta.schemaName !== OSI_GROUND_TRUTH_SCHEMA_NAME) {
      throw new Error(
        `GroundTruth decoder received unsupported schema '${meta.schemaName ?? "<unknown>"}'.`,
      );
    }
    const start = nowMs();
    const decoded = this.#decodeWithProtobufjs<osi3.GroundTruth>(
      bytes,
      OSI_GROUND_TRUTH_SCHEMA_NAME,
      osi3.GroundTruth,
    );
    this.#recordTiming(OSI_GROUND_TRUTH_SCHEMA_NAME, nowMs() - start);
    return decoded;
  }

  public decodeSensorView(bytes: ArrayBufferView, meta: DecodeMeta): osi3.SensorView {
    if (meta.schemaName !== OSI_SENSOR_VIEW_SCHEMA_NAME) {
      throw new Error(
        `SensorView decoder received unsupported schema '${meta.schemaName ?? "<unknown>"}'.`,
      );
    }
    const start = nowMs();
    const decoded = this.#decodeWithProtobufjs<osi3.SensorView>(
      bytes,
      OSI_SENSOR_VIEW_SCHEMA_NAME,
      osi3.SensorView,
    );
    this.#recordTiming(OSI_SENSOR_VIEW_SCHEMA_NAME, nowMs() - start);
    return decoded;
  }

  public decodeSensorData(bytes: ArrayBufferView, meta: DecodeMeta): osi3.SensorData {
    if (meta.schemaName !== OSI_SENSOR_DATA_SCHEMA_NAME) {
      throw new Error(
        `SensorData decoder received unsupported schema '${meta.schemaName ?? "<unknown>"}'.`,
      );
    }
    const start = nowMs();
    const decoded = this.#decodeWithProtobufjs<osi3.SensorData>(
      bytes,
      OSI_SENSOR_DATA_SCHEMA_NAME,
      osi3.SensorData,
    );
    this.#recordTiming(OSI_SENSOR_DATA_SCHEMA_NAME, nowMs() - start);
    return decoded;
  }

  public decode<T = unknown>(bytes: ArrayBufferView, meta: DecodeMeta): T {
    if (meta.schemaName === OSI_GROUND_TRUTH_SCHEMA_NAME) {
      return this.decodeGroundTruth(bytes, meta) as T;
    }
    if (meta.schemaName === OSI_SENSOR_VIEW_SCHEMA_NAME) {
      return this.decodeSensorView(bytes, meta) as T;
    }
    if (meta.schemaName === OSI_SENSOR_DATA_SCHEMA_NAME) {
      return this.decodeSensorData(bytes, meta) as T;
    }
    throw new Error(
      `No protobufjs decoder registered for schema '${meta.schemaName ?? "<unknown>"}'.`,
    );
  }

  public toJson(message: unknown, _meta: DecodeMeta): unknown {
    if (hasProtobufToObject(message)) {
      return message.constructor.toObject(message, { defaults: true });
    }
    return message;
  }
}
