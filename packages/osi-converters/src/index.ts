// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { ExtensionContext } from "@lichtblick/suite";

import { createGroundTruthContractConverters } from "./groundTruthConverters";
import type { AdapterExtensionContext } from "../../lichtblick-suite-placeholder/src";

export { createGroundTruthContractConverters } from "./groundTruthConverters";
export {
  convertGroundTruthToFrameTransforms,
  convertGroundTruthToSceneUpdate,
} from "./groundTruth";
export { convertSensorViewToFrameTransforms, convertSensorViewToSceneUpdate } from "./sensorView";

const groundTruthConverters = createGroundTruthContractConverters();

export function activate(extensionContext: ExtensionContext): void {
  // Message contract converter API is not yet implemented in Lichtblick API.
  // This uses AdapterExtensionContext for demonstration of the target shape.
  const ctx = extensionContext as AdapterExtensionContext;
  for (const converter of groundTruthConverters) {
    ctx.registerMessageContractConverter(converter);
  }
}

export default { activate };
