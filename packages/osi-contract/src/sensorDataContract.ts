// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { createOsiMessageContract } from "./contractFactory";

const sensorDataContract = createOsiMessageContract({
  contractId: "asam.osi.sensordata",
  schemaName: "osi3.SensorData",
});

export const OSI_SENSOR_DATA_CONTRACT_ID = sensorDataContract.contractId;
export const OSI_SENSOR_DATA_CONTRACT_VERSION = sensorDataContract.contractVersion;
export const OSI_SENSOR_DATA_SCHEMA_NAME = sensorDataContract.schemaName;

export const OSI_SENSOR_DATA_PROVIDED_MESSAGE_CONTRACT =
  sensorDataContract.providedMessageContract;
export const OSI_SENSOR_DATA_REQUIRED_MESSAGE_CONTRACT =
  sensorDataContract.requiredMessageContract;
