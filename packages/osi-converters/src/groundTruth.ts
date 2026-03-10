// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { FrameTransforms, SceneUpdate } from "@foxglove/schemas";

import type { osi3 } from "../../osi-contract/src";

export function convertGroundTruthToSceneUpdate(_msg: osi3.GroundTruth): SceneUpdate {
  // Replace with your converter implementation.
  return { entities: [], deletions: [] };
}

export function convertGroundTruthToFrameTransforms(_msg: osi3.GroundTruth): FrameTransforms {
  // Replace with your converter implementation.
  return { transforms: [] };
}
