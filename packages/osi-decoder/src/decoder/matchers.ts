// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import type { ChannelMeta } from "../../../lichtblick-suite-placeholder/src";
import {
  OSI_DEFAULT_CONTRACT_VERSION,
  OSI_CHANNEL_VERSION_METADATA_KEY,
  OSI_GROUND_TRUTH_SCHEMA_NAME,
  OSI_SENSOR_DATA_SCHEMA_NAME,
  OSI_SENSOR_VIEW_SCHEMA_NAME,
  OSI_PROTOBUF_ENCODING,
} from "../../../osi-contract/src";

function majorVersion(version: string): number | undefined {
  const majorPart = version.trim().split(".", 1)[0];
  if (!majorPart) {
    return undefined;
  }
  const major = Number(majorPart);
  return Number.isInteger(major) && major >= 0 ? major : undefined;
}

const COMPATIBLE_OSI_MAJOR_VERSION = majorVersion(OSI_DEFAULT_CONTRACT_VERSION);

export function isCompatibleOsiVersion(version: string | undefined): boolean {
  if (!version) {
    return true;
  }
  const sourceMajor = majorVersion(version);
  if (sourceMajor == undefined || COMPATIBLE_OSI_MAJOR_VERSION == undefined) {
    return false;
  }
  return sourceMajor === COMPATIBLE_OSI_MAJOR_VERSION;
}

export function matchesGroundTruthChannel(meta: Readonly<ChannelMeta>): boolean {
  return matchesOsiSchema(meta, OSI_GROUND_TRUTH_SCHEMA_NAME);
}

export function matchesSensorViewChannel(meta: Readonly<ChannelMeta>): boolean {
  return matchesOsiSchema(meta, OSI_SENSOR_VIEW_SCHEMA_NAME);
}

export function matchesSensorDataChannel(meta: Readonly<ChannelMeta>): boolean {
  return matchesOsiSchema(meta, OSI_SENSOR_DATA_SCHEMA_NAME);
}

function matchesOsiSchema(meta: Readonly<ChannelMeta>, schemaName: string): boolean {
  if (meta.schemaName !== schemaName) {
    return false;
  }
  if (meta.messageEncoding !== OSI_PROTOBUF_ENCODING) {
    return false;
  }

  // Prefer channel-level OSI metadata from the ASAM OSI MCAP conventions.
  const channelOsiVersion = meta.channelMetadata?.[OSI_CHANNEL_VERSION_METADATA_KEY];
  if (!isCompatibleOsiVersion(channelOsiVersion)) {
    return false;
  }

  // Optional fallback for environments that only expose a generic schemaVersion.
  if (!isCompatibleOsiVersion(meta.schemaVersion)) {
    return false;
  }
  return true;
}
