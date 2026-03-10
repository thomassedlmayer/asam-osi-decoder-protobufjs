// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { createOsiMessageContract } from "./contractFactory";

const groundTruthContract = createOsiMessageContract({
  contractId: "asam.osi.groundtruth",
  schemaName: "osi3.GroundTruth",
});

export const OSI_GROUND_TRUTH_CONTRACT_ID = groundTruthContract.contractId;
export const OSI_GROUND_TRUTH_CONTRACT_VERSION = groundTruthContract.contractVersion;
export const OSI_GROUND_TRUTH_SCHEMA_NAME = groundTruthContract.schemaName;

export const OSI_GROUND_TRUTH_PROVIDED_MESSAGE_CONTRACT =
  groundTruthContract.providedMessageContract;

export const OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT =
  groundTruthContract.requiredMessageContract;
