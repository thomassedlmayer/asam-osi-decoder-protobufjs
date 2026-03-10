// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import {
  convertGroundTruthToFrameTransforms,
  convertGroundTruthToSceneUpdate,
} from "./groundTruth";
import { convertSensorViewToFrameTransforms, convertSensorViewToSceneUpdate } from "./sensorView";
import type { RegisterMessageContractConverterArgs } from "../../lichtblick-suite-placeholder/src";
import {
  OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT,
  OSI_SENSOR_VIEW_REQUIRED_MESSAGE_CONTRACT,
  type osi3,
} from "../../osi-contract/src";

export function createGroundTruthContractConverters(): readonly RegisterMessageContractConverterArgs<unknown>[] {
  return [
    {
      id: "lichtblick.asam-osi.groundtruth-to-sceneupdate",
      requiresContract: OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT,
      toSchemaName: "foxglove.SceneUpdate",
      convert: (msg) => convertGroundTruthToSceneUpdate(msg as osi3.GroundTruth),
    },
    {
      id: "lichtblick.asam-osi.groundtruth-to-frametransforms",
      requiresContract: OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT,
      toSchemaName: "foxglove.FrameTransforms",
      convert: (msg) => convertGroundTruthToFrameTransforms(msg as osi3.GroundTruth),
    },
    {
      id: "lichtblick.asam-osi.sensorview-to-sceneupdate",
      requiresContract: OSI_SENSOR_VIEW_REQUIRED_MESSAGE_CONTRACT,
      toSchemaName: "foxglove.SceneUpdate",
      convert: (msg) => convertSensorViewToSceneUpdate(msg as osi3.SensorView),
    },
    {
      id: "lichtblick.asam-osi.sensorview-to-frametransforms",
      requiresContract: OSI_SENSOR_VIEW_REQUIRED_MESSAGE_CONTRACT,
      toSchemaName: "foxglove.FrameTransforms",
      convert: (msg) => convertSensorViewToFrameTransforms(msg as osi3.SensorView),
    },
  ];
}
