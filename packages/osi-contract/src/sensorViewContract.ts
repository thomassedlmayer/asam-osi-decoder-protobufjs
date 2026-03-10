// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { createOsiMessageContract } from "./contractFactory";

const sensorViewContract = createOsiMessageContract({
  contractId: "asam.osi.sensorview",
  schemaName: "osi3.SensorView",
});

export const OSI_SENSOR_VIEW_CONTRACT_ID = sensorViewContract.contractId;
export const OSI_SENSOR_VIEW_CONTRACT_VERSION = sensorViewContract.contractVersion;
export const OSI_SENSOR_VIEW_SCHEMA_NAME = sensorViewContract.schemaName;

export const OSI_SENSOR_VIEW_PROVIDED_MESSAGE_CONTRACT =
  sensorViewContract.providedMessageContract;
export const OSI_SENSOR_VIEW_REQUIRED_MESSAGE_CONTRACT =
  sensorViewContract.requiredMessageContract;
