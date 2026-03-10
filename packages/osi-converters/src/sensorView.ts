// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

/* eslint-disable no-restricted-syntax */

import type {
  FrameTransform,
  FrameTransforms,
  SceneEntity,
  SceneUpdate,
  Time,
} from "@foxglove/schemas";
import type Long from "long";

import type { osi3 } from "../../osi-contract/src";

const DEFAULT_GLOBAL_FRAME = "osi_global";
const DEFAULT_SENSOR_FRAME = "osi_sensorview_mounting_position";

function toNumber(value: number | Long | null | undefined): number {
  if (typeof value === "number") {
    return value;
  }
  if (value != undefined && typeof value === "object" && "toNumber" in value) {
    return value.toNumber();
  }
  return 0;
}

function toFoxgloveTime(timestamp: osi3.ITimestamp | null | undefined): Time {
  return {
    sec: toNumber(timestamp?.seconds),
    nsec: timestamp?.nanos ?? 0,
  };
}

function yawPitchRollToQuaternion(
  yaw: number,
  pitch: number,
  roll: number,
): {
  x: number;
  y: number;
  z: number;
  w: number;
} {
  const cy = Math.cos(yaw * 0.5);
  const sy = Math.sin(yaw * 0.5);
  const cp = Math.cos(pitch * 0.5);
  const sp = Math.sin(pitch * 0.5);
  const cr = Math.cos(roll * 0.5);
  const sr = Math.sin(roll * 0.5);

  return {
    w: cr * cp * cy + sr * sp * sy,
    x: sr * cp * cy - cr * sp * sy,
    y: cr * sp * cy + sr * cp * sy,
    z: cr * cp * sy - sr * sp * cy,
  };
}

function idToString(value: number | Long | null | undefined): string | undefined {
  if (value == undefined) {
    return undefined;
  }
  if (typeof value === "object") {
    return value.toString();
  }
  return value.toString();
}

function resolveSensorMountingPose(msg: osi3.SensorView): {
  position?: NonNullable<osi3.SensorView["mounting_position"]>["position"];
  orientation?: NonNullable<osi3.SensorView["mounting_position"]>["orientation"];
} {
  if (msg.mounting_position) {
    return {
      position: msg.mounting_position.position,
      orientation: msg.mounting_position.orientation,
    };
  }

  const hostVehicleId =
    idToString(msg.host_vehicle_id?.value) ??
    idToString(msg.global_ground_truth?.host_vehicle_id?.value);
  if (!hostVehicleId) {
    return {};
  }

  const hostVehicle = msg.global_ground_truth?.moving_object?.find(
    (movingObject) => idToString(movingObject.id?.value) === hostVehicleId,
  );
  const base = hostVehicle?.base;
  return {
    position: base?.position,
    orientation: base?.orientation,
  };
}

export function convertSensorViewToFrameTransforms(msg: osi3.SensorView): FrameTransforms {
  const timestamp = toFoxgloveTime(msg.timestamp);
  const mountingPose = resolveSensorMountingPose(msg);

  const transform: FrameTransform = {
    timestamp,
    parent_frame_id: DEFAULT_GLOBAL_FRAME,
    child_frame_id: DEFAULT_SENSOR_FRAME,
    translation: {
      x: mountingPose.position?.x ?? 0,
      y: mountingPose.position?.y ?? 0,
      z: mountingPose.position?.z ?? 0,
    },
    rotation: yawPitchRollToQuaternion(
      mountingPose.orientation?.yaw ?? 0,
      mountingPose.orientation?.pitch ?? 0,
      mountingPose.orientation?.roll ?? 0,
    ),
  };

  return {
    transforms: [transform],
  };
}

export function convertSensorViewToSceneUpdate(msg: osi3.SensorView): SceneUpdate {
  try {
    const groundTruth = msg.global_ground_truth;
    const timestamp = toFoxgloveTime(groundTruth?.timestamp ?? msg.timestamp);
    const movingObjects = groundTruth?.moving_object ?? [];

    if (
      msg.global_ground_truth?.moving_object?.length != undefined &&
      msg.global_ground_truth.moving_object.length > 0
    ) {
      const hasTailLight = Object.prototype.hasOwnProperty.call(
        msg.global_ground_truth.moving_object[0]?.vehicle_classification?.light_state ?? {},
        "tail_light",
      );

      console.info(
        `tail light value: "${typeof msg.global_ground_truth.moving_object[0]?.vehicle_classification?.light_state?.tail_light}" "${msg.global_ground_truth.moving_object[0]?.vehicle_classification?.light_state?.tail_light}" - hasTailLight: ${hasTailLight}`,
      );
    }

    const entities: SceneEntity[] = movingObjects.map((movingObject, index) => {
      const idValue =
        movingObject.id?.value != undefined ? movingObject.id.value.toString() : String(index);
      const base = movingObject.base;
      const orientation = base?.orientation;

      return {
        timestamp,
        frame_id: DEFAULT_GLOBAL_FRAME,
        id: `osi_sensorview/moving_object/${idValue}`,
        lifetime: { sec: 0, nsec: 0 },
        frame_locked: true,
        metadata: [],
        arrows: [],
        cubes: [
          {
            pose: {
              position: {
                x: base?.position?.x ?? 0,
                y: base?.position?.y ?? 0,
                z: base?.position?.z ?? 0,
              },
              orientation: yawPitchRollToQuaternion(
                orientation?.yaw ?? 0,
                orientation?.pitch ?? 0,
                orientation?.roll ?? 0,
              ),
            },
            size: {
              x: base?.dimension?.length ?? 1,
              y: base?.dimension?.width ?? 1,
              z: base?.dimension?.height ?? 1,
            },
            color: {
              r: 0.1,
              g: 0.7,
              b: 0.95,
              a: 0.8,
            },
          },
        ],
        spheres: [],
        cylinders: [],
        lines: [],
        triangles: [],
        texts: [],
        models: [],
      };
    });

    return {
      deletions: [],
      entities,
    };
  } catch (error) {
    console.error(
      "[asam-osi-converters][sensorView] convertSensorViewToSceneUpdate failed",
      error,
      {
        hasGlobalGroundTruth: msg.global_ground_truth != undefined,
        movingObjectIsArray: Array.isArray(msg.global_ground_truth?.moving_object),
        modelReference: msg.global_ground_truth?.model_reference,
      },
    );
    throw error;
  }
}
