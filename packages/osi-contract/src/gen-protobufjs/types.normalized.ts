// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import type * as Raw from "./types.raw";

export interface osi3_SensorData_Normalized {
  version?: osi3_InterfaceVersion_Normalized;
  timestamp?: osi3_Timestamp_Normalized;
  host_vehicle_location?: osi3_BaseMoving_Normalized;
  host_vehicle_location_rmse?: osi3_BaseMoving_Normalized;
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  sensor_view: osi3_SensorView_Normalized[];
  last_measurement_time?: osi3_Timestamp_Normalized;
  stationary_object_header?: osi3_DetectedEntityHeader_Normalized;
  stationary_object: osi3_DetectedStationaryObject_Normalized[];
  moving_object_header?: osi3_DetectedEntityHeader_Normalized;
  moving_object: osi3_DetectedMovingObject_Normalized[];
  traffic_sign_header?: osi3_DetectedEntityHeader_Normalized;
  traffic_sign: osi3_DetectedTrafficSign_Normalized[];
  traffic_light_header?: osi3_DetectedEntityHeader_Normalized;
  traffic_light: osi3_DetectedTrafficLight_Normalized[];
  road_marking_header?: osi3_DetectedEntityHeader_Normalized;
  road_marking: osi3_DetectedRoadMarking_Normalized[];
  lane_boundary_header?: osi3_DetectedEntityHeader_Normalized;
  lane_boundary: osi3_DetectedLaneBoundary_Normalized[];
  lane_header?: osi3_DetectedEntityHeader_Normalized;
  lane: osi3_DetectedLane_Normalized[];
  occupant_header?: osi3_DetectedEntityHeader_Normalized;
  occupant: osi3_DetectedOccupant_Normalized[];
  feature_data?: osi3_FeatureData_Normalized;
  logical_detection_data?: osi3_LogicalDetectionData_Normalized;
  virtual_detection_area?: osi3_SensorData_VirtualDetectionArea_Normalized;
  system_time?: osi3_Timestamp_Normalized;
}

export interface osi3_Timestamp_Normalized {
  seconds: Raw.LongLike;
  nanos: number;
}

export interface osi3_SensorData_VirtualDetectionArea_Normalized {
  polygon: osi3_Polygon3d_Normalized[];
}

export interface osi3_Polygon3d_Normalized {
  vertex: osi3_Vector3d_Normalized[];
}

export interface osi3_Vector3d_Normalized {
  x: number;
  y: number;
  z: number;
}

export interface osi3_LogicalDetectionData_Normalized {
  version?: osi3_InterfaceVersion_Normalized;
  header?: osi3_LogicalDetectionDataHeader_Normalized;
  logical_detection: osi3_LogicalDetection_Normalized[];
}

export interface osi3_LogicalDetection_Normalized {
  existence_probability: number;
  object_id?: osi3_Identifier_Normalized;
  position?: osi3_Vector3d_Normalized;
  position_rmse?: osi3_Vector3d_Normalized;
  velocity?: osi3_Vector3d_Normalized;
  velocity_rmse?: osi3_Vector3d_Normalized;
  intensity: number;
  snr: number;
  point_target_probability: number;
  sensor_id: osi3_Identifier_Normalized[];
  classification: Raw.osi3_LogicalDetectionClassification;
  echo_pulse_width: number;
}

export interface osi3_Identifier_Normalized {
  value: Raw.LongLike;
}

export interface osi3_LogicalDetectionDataHeader_Normalized {
  logical_detection_time?: osi3_Timestamp_Normalized;
  data_qualifier: Raw.osi3_LogicalDetectionDataHeader_DataQualifier;
  number_of_valid_logical_detections: number;
  sensor_id: osi3_Identifier_Normalized[];
}

export interface osi3_InterfaceVersion_Normalized {
  version_major: number;
  version_minor: number;
  version_patch: number;
}

export interface osi3_FeatureData_Normalized {
  version?: osi3_InterfaceVersion_Normalized;
  radar_sensor: osi3_RadarDetectionData_Normalized[];
  lidar_sensor: osi3_LidarDetectionData_Normalized[];
  ultrasonic_sensor: osi3_UltrasonicDetectionData_Normalized[];
  camera_sensor: osi3_CameraDetectionData_Normalized[];
}

export interface osi3_CameraDetectionData_Normalized {
  header?: osi3_SensorDetectionHeader_Normalized;
  specific_header?: osi3_CameraDetectionSpecificHeader_Normalized;
  detection: osi3_CameraDetection_Normalized[];
  point: osi3_CameraPoint_Normalized[];
}

export interface osi3_CameraPoint_Normalized {
  existence_probability: number;
  point?: osi3_Spherical3d_Normalized;
  point_rmse?: osi3_Spherical3d_Normalized;
}

export interface osi3_Spherical3d_Normalized {
  distance: number;
  azimuth: number;
  elevation: number;
}

export interface osi3_CameraDetection_Normalized {
  existence_probability: number;
  object_id?: osi3_Identifier_Normalized;
  time_difference?: osi3_Timestamp_Normalized;
  image_shape_type: Raw.osi3_CameraDetection_ImageShapeType;
  shape_classification_background: boolean;
  shape_classification_foreground: boolean;
  shape_classification_flat: boolean;
  shape_classification_upright: boolean;
  shape_classification_ground: boolean;
  shape_classification_sky: boolean;
  shape_classification_vegetation: boolean;
  shape_classification_road: boolean;
  shape_classification_non_driving_lane: boolean;
  shape_classification_non_road: boolean;
  shape_classification_stationary_object: boolean;
  shape_classification_moving_object: boolean;
  shape_classification_landmark: boolean;
  shape_classification_traffic_sign: boolean;
  shape_classification_traffic_light: boolean;
  shape_classification_road_marking: boolean;
  shape_classification_vehicle: boolean;
  shape_classification_pedestrian: boolean;
  shape_classification_animal: boolean;
  shape_classification_pedestrian_front: boolean;
  shape_classification_pedestrian_side: boolean;
  shape_classification_pedestrian_rear: boolean;
  shape_classification_probability: number;
  color: Raw.osi3_CameraDetection_Color;
  color_probability: number;
  ambiguity_id?: osi3_Identifier_Normalized;
  first_point_index: number;
  number_of_points: number;
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_ColorDescription_Normalized {
  grey?: osi3_ColorGrey_Normalized;
  rgb?: osi3_ColorRGB_Normalized;
  rgbir?: osi3_ColorRGBIR_Normalized;
  hsv?: osi3_ColorHSV_Normalized;
  luv?: osi3_ColorLUV_Normalized;
  cmyk?: osi3_ColorCMYK_Normalized;
}

export interface osi3_ColorCMYK_Normalized {
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
}

export interface osi3_ColorLUV_Normalized {
  luminance: number;
  u: number;
  v: number;
}

export interface osi3_ColorHSV_Normalized {
  hue: number;
  saturation: number;
  value: number;
}

export interface osi3_ColorRGBIR_Normalized {
  red: number;
  green: number;
  blue: number;
  infrared: number;
}

export interface osi3_ColorRGB_Normalized {
  red: number;
  green: number;
  blue: number;
}

export interface osi3_ColorGrey_Normalized {
  grey: number;
}

export interface osi3_CameraDetectionSpecificHeader_Normalized {
  number_of_valid_points: number;
}

export interface osi3_SensorDetectionHeader_Normalized {
  measurement_time?: osi3_Timestamp_Normalized;
  cycle_counter: Raw.LongLike;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  data_qualifier: Raw.osi3_SensorDetectionHeader_DataQualifier;
  number_of_valid_detections: number;
  sensor_id?: osi3_Identifier_Normalized;
  extended_qualifier: Raw.osi3_SensorDetectionHeader_ExtendedQualifier;
}

export interface osi3_MountingPosition_Normalized {
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
}

export interface osi3_Orientation3d_Normalized {
  roll: number;
  pitch: number;
  yaw: number;
}

export interface osi3_UltrasonicDetectionData_Normalized {
  header?: osi3_SensorDetectionHeader_Normalized;
  specific_header?: osi3_UltrasonicDetectionSpecificHeader_Normalized;
  detection: osi3_UltrasonicDetection_Normalized[];
  indirect_detection: osi3_UltrasonicIndirectDetection_Normalized[];
}

export interface osi3_UltrasonicIndirectDetection_Normalized {
  existence_probability: number;
  object_id?: osi3_Identifier_Normalized;
  ellipsoid_radial: number;
  ellipsoid_axial: number;
  receiver_id?: osi3_Identifier_Normalized;
  receiver_origin?: osi3_Vector3d_Normalized;
}

export interface osi3_UltrasonicDetection_Normalized {
  existence_probability: number;
  object_id?: osi3_Identifier_Normalized;
  distance: number;
}

export interface osi3_UltrasonicDetectionSpecificHeader_Normalized {
  max_range: number;
  number_of_valid_indirect_detections: number;
}

export interface osi3_LidarDetectionData_Normalized {
  header?: osi3_SensorDetectionHeader_Normalized;
  detection: osi3_LidarDetection_Normalized[];
}

export interface osi3_LidarDetection_Normalized {
  existence_probability: number;
  object_id?: osi3_Identifier_Normalized;
  position?: osi3_Spherical3d_Normalized;
  position_rmse?: osi3_Spherical3d_Normalized;
  height: number;
  height_rmse: number;
  intensity: number;
  free_space_probability: number;
  classification: Raw.osi3_DetectionClassification;
  reflectivity: number;
  echo_pulse_width: number;
  radial_velocity: number;
  beam_id?: osi3_Identifier_Normalized;
}

export interface osi3_RadarDetectionData_Normalized {
  header?: osi3_SensorDetectionHeader_Normalized;
  detection: osi3_RadarDetection_Normalized[];
}

export interface osi3_RadarDetection_Normalized {
  existence_probability: number;
  object_id?: osi3_Identifier_Normalized;
  position?: osi3_Spherical3d_Normalized;
  position_rmse?: osi3_Spherical3d_Normalized;
  radial_velocity: number;
  radial_velocity_rmse: number;
  rcs: number;
  snr: number;
  point_target_probability: number;
  ambiguity_id?: osi3_Identifier_Normalized;
  classification: Raw.osi3_DetectionClassification;
}

export interface osi3_DetectedOccupant_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  candidate: osi3_DetectedOccupant_CandidateOccupant_Normalized[];
}

export interface osi3_DetectedOccupant_CandidateOccupant_Normalized {
  probability: number;
  classification?: osi3_Occupant_Classification_Normalized;
}

export interface osi3_Occupant_Classification_Normalized {
  is_driver: boolean;
  seat: Raw.osi3_Occupant_Classification_Seat;
  steering_control: Raw.osi3_Occupant_Classification_SteeringControl;
}

export interface osi3_DetectedItemHeader_Normalized {
  tracking_id?: osi3_Identifier_Normalized;
  ground_truth_id: osi3_Identifier_Normalized[];
  existence_probability: number;
  age: number;
  measurement_state: Raw.osi3_DetectedItemHeader_MeasurementState;
  sensor_id: osi3_Identifier_Normalized[];
}

export interface osi3_DetectedEntityHeader_Normalized {
  measurement_time?: osi3_Timestamp_Normalized;
  cycle_counter: Raw.LongLike;
  data_qualifier: Raw.osi3_DetectedEntityHeader_DataQualifier;
}

export interface osi3_DetectedLane_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  candidate: osi3_DetectedLane_CandidateLane_Normalized[];
}

export interface osi3_DetectedLane_CandidateLane_Normalized {
  probability: number;
  classification?: osi3_Lane_Classification_Normalized;
}

export interface osi3_Lane_Classification_Normalized {
  type: Raw.osi3_Lane_Classification_Type;
  is_host_vehicle_lane: boolean;
  centerline: osi3_Vector3d_Normalized[];
  centerline_is_driving_direction: boolean;
  left_adjacent_lane_id: osi3_Identifier_Normalized[];
  right_adjacent_lane_id: osi3_Identifier_Normalized[];
  lane_pairing: osi3_Lane_Classification_LanePairing_Normalized[];
  right_lane_boundary_id: osi3_Identifier_Normalized[];
  left_lane_boundary_id: osi3_Identifier_Normalized[];
  free_lane_boundary_id: osi3_Identifier_Normalized[];
  road_condition?: osi3_Lane_Classification_RoadCondition_Normalized;
  subtype: Raw.osi3_Lane_Classification_Subtype;
}

export interface osi3_Lane_Classification_RoadCondition_Normalized {
  surface_temperature: number;
  surface_water_film: number;
  surface_freezing_point: number;
  surface_ice: number;
  surface_roughness: number;
  surface_texture: number;
}

export interface osi3_Lane_Classification_LanePairing_Normalized {
  antecessor_lane_id?: osi3_Identifier_Normalized;
  successor_lane_id?: osi3_Identifier_Normalized;
}

export interface osi3_DetectedLaneBoundary_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  candidate: osi3_DetectedLaneBoundary_CandidateLaneBoundary_Normalized[];
  boundary_line: osi3_LaneBoundary_BoundaryPoint_Normalized[];
  boundary_line_rmse: osi3_LaneBoundary_BoundaryPoint_Normalized[];
  boundary_line_confidences: number[];
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_LaneBoundary_BoundaryPoint_Normalized {
  position?: osi3_Vector3d_Normalized;
  width: number;
  height: number;
  dash: Raw.osi3_LaneBoundary_BoundaryPoint_Dash;
}

export interface osi3_DetectedLaneBoundary_CandidateLaneBoundary_Normalized {
  probability: number;
  classification?: osi3_LaneBoundary_Classification_Normalized;
}

export interface osi3_LaneBoundary_Classification_Normalized {
  type: Raw.osi3_LaneBoundary_Classification_Type;
  color: Raw.osi3_LaneBoundary_Classification_Color;
  limiting_structure_id: osi3_Identifier_Normalized[];
}

export interface osi3_DetectedRoadMarking_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  base?: osi3_BaseStationary_Normalized;
  base_rmse?: osi3_BaseStationary_Normalized;
  candidate: osi3_DetectedRoadMarking_CandidateRoadMarking_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_DetectedRoadMarking_CandidateRoadMarking_Normalized {
  probability: number;
  classification?: osi3_RoadMarking_Classification_Normalized;
}

export interface osi3_RoadMarking_Classification_Normalized {
  type: Raw.osi3_RoadMarking_Classification_Type;
  traffic_main_sign_type: Raw.osi3_TrafficSign_MainSign_Classification_Type;
  monochrome_color: Raw.osi3_RoadMarking_Classification_Color;
  value?: osi3_TrafficSignValue_Normalized;
  value_text: string;
  assigned_lane_id: osi3_Identifier_Normalized[];
  is_out_of_service: boolean;
  country: string;
  country_revision: string;
  code: string;
  sub_code: string;
  logical_lane_assignment: osi3_LogicalLaneAssignment_Normalized[];
}

export interface osi3_LogicalLaneAssignment_Normalized {
  assigned_lane_id?: osi3_Identifier_Normalized;
  s_position: number;
  t_position: number;
  angle_to_lane: number;
}

export interface osi3_TrafficSignValue_Normalized {
  value: number;
  value_unit: Raw.osi3_TrafficSignValue_Unit;
  text: string;
}

export interface osi3_BaseStationary_Normalized {
  dimension?: osi3_Dimension3d_Normalized;
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
  base_polygon: osi3_Vector2d_Normalized[];
  bounding_box_section: osi3_BoundingBox_Normalized[];
}

export interface osi3_BoundingBox_Normalized {
  dimension?: osi3_Dimension3d_Normalized;
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
  contained_object_type: Raw.osi3_BoundingBox_Type;
  model_reference: string;
}

export interface osi3_Dimension3d_Normalized {
  length: number;
  width: number;
  height: number;
}

export interface osi3_Vector2d_Normalized {
  x: number;
  y: number;
}

export interface osi3_DetectedTrafficLight_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  base?: osi3_BaseStationary_Normalized;
  base_rmse?: osi3_BaseStationary_Normalized;
  candidate: osi3_DetectedTrafficLight_CandidateTrafficLight_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_DetectedTrafficLight_CandidateTrafficLight_Normalized {
  probability: number;
  classification?: osi3_TrafficLight_Classification_Normalized;
}

export interface osi3_TrafficLight_Classification_Normalized {
  color: Raw.osi3_TrafficLight_Classification_Color;
  icon: Raw.osi3_TrafficLight_Classification_Icon;
  mode: Raw.osi3_TrafficLight_Classification_Mode;
  counter: number;
  assigned_lane_id: osi3_Identifier_Normalized[];
  is_out_of_service: boolean;
  logical_lane_assignment: osi3_LogicalLaneAssignment_Normalized[];
}

export interface osi3_DetectedTrafficSign_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  main_sign?: osi3_DetectedTrafficSign_DetectedMainSign_Normalized;
  supplementary_sign: osi3_DetectedTrafficSign_DetectedSupplementarySign_Normalized[];
}

export interface osi3_DetectedTrafficSign_DetectedSupplementarySign_Normalized {
  candidate: osi3_DetectedTrafficSign_DetectedSupplementarySign_CandidateSupplementarySign_Normalized[];
  base?: osi3_BaseStationary_Normalized;
  base_rmse?: osi3_BaseStationary_Normalized;
}

export interface osi3_DetectedTrafficSign_DetectedSupplementarySign_CandidateSupplementarySign_Normalized {
  probability: number;
  classification?: osi3_TrafficSign_SupplementarySign_Classification_Normalized;
}

export interface osi3_TrafficSign_SupplementarySign_Classification_Normalized {
  variability: Raw.osi3_TrafficSign_Variability;
  type: Raw.osi3_TrafficSign_SupplementarySign_Classification_Type;
  value: osi3_TrafficSignValue_Normalized[];
  assigned_lane_id: osi3_Identifier_Normalized[];
  actor: Raw.osi3_TrafficSign_SupplementarySign_Classification_Actor[];
  arrow: osi3_TrafficSign_SupplementarySign_Classification_Arrow_Normalized[];
  is_out_of_service: boolean;
  country: string;
  country_revision: string;
  code: string;
  sub_code: string;
  logical_lane_assignment: osi3_LogicalLaneAssignment_Normalized[];
}

export interface osi3_TrafficSign_SupplementarySign_Classification_Arrow_Normalized {
  lane_id: osi3_Identifier_Normalized[];
  direction: Raw.osi3_TrafficSign_SupplementarySign_Classification_Arrow_Direction[];
}

export interface osi3_DetectedTrafficSign_DetectedMainSign_Normalized {
  candidate: osi3_DetectedTrafficSign_DetectedMainSign_CandidateMainSign_Normalized[];
  base?: osi3_BaseStationary_Normalized;
  base_rmse?: osi3_BaseStationary_Normalized;
  geometry: Raw.osi3_DetectedTrafficSign_DetectedMainSign_Geometry;
}

export interface osi3_DetectedTrafficSign_DetectedMainSign_CandidateMainSign_Normalized {
  probability: number;
  classification?: osi3_TrafficSign_MainSign_Classification_Normalized;
}

export interface osi3_TrafficSign_MainSign_Classification_Normalized {
  variability: Raw.osi3_TrafficSign_Variability;
  type: Raw.osi3_TrafficSign_MainSign_Classification_Type;
  value?: osi3_TrafficSignValue_Normalized;
  direction_scope: Raw.osi3_TrafficSign_MainSign_Classification_DirectionScope;
  assigned_lane_id: osi3_Identifier_Normalized[];
  vertically_mirrored: boolean;
  is_out_of_service: boolean;
  country: string;
  country_revision: string;
  code: string;
  sub_code: string;
  logical_lane_assignment: osi3_LogicalLaneAssignment_Normalized[];
}

export interface osi3_DetectedMovingObject_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  base?: osi3_BaseMoving_Normalized;
  base_rmse?: osi3_BaseMoving_Normalized;
  reference_point: Raw.osi3_DetectedMovingObject_ReferencePoint;
  movement_state: Raw.osi3_DetectedMovingObject_MovementState;
  percentage_side_lane_left: number;
  percentage_side_lane_right: number;
  candidate: osi3_DetectedMovingObject_CandidateMovingObject_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
  radar_specifics?: osi3_RadarSpecificObjectData_Normalized;
  lidar_specifics?: osi3_LidarSpecificObjectData_Normalized;
  camera_specifics?: osi3_CameraSpecificObjectData_Normalized;
  ultrasonic_specifics?: osi3_UltrasonicSpecificObjectData_Normalized;
}

export interface osi3_UltrasonicSpecificObjectData_Normalized {
  maximum_measurement_distance_sensor: number;
  probability: number;
  trilateration_status: Raw.osi3_UltrasonicSpecificObjectData_TrilaterationStatus;
  trend: Raw.osi3_UltrasonicSpecificObjectData_Trend;
  signalway: osi3_UltrasonicSpecificObjectData_Signalway_Normalized[];
}

export interface osi3_UltrasonicSpecificObjectData_Signalway_Normalized {
  sender_id?: osi3_Identifier_Normalized;
  receiver_id?: osi3_Identifier_Normalized;
}

export interface osi3_CameraSpecificObjectData_Normalized {}

export interface osi3_LidarSpecificObjectData_Normalized {}

export interface osi3_RadarSpecificObjectData_Normalized {
  rcs: number;
}

export interface osi3_DetectedMovingObject_CandidateMovingObject_Normalized {
  probability: number;
  type: Raw.osi3_MovingObject_Type;
  vehicle_classification?: osi3_MovingObject_VehicleClassification_Normalized;
  head_pose?: osi3_Orientation3d_Normalized;
  upper_body_pose?: osi3_Orientation3d_Normalized;
  moving_object_classification?: osi3_MovingObject_MovingObjectClassification_Normalized;
}

export interface osi3_MovingObject_MovingObjectClassification_Normalized {
  assigned_lane_id: osi3_Identifier_Normalized[];
  assigned_lane_percentage: number[];
  logical_lane_assignment: osi3_LogicalLaneAssignment_Normalized[];
}

export interface osi3_MovingObject_VehicleClassification_Normalized {
  type: Raw.osi3_MovingObject_VehicleClassification_Type;
  light_state?: osi3_MovingObject_VehicleClassification_LightState_Normalized;
  has_trailer: boolean;
  trailer_id?: osi3_Identifier_Normalized;
  role: Raw.osi3_MovingObject_VehicleClassification_Role;
}

export interface osi3_MovingObject_VehicleClassification_LightState_Normalized {
  indicator_state: Raw.osi3_MovingObject_VehicleClassification_LightState_IndicatorState;
  front_fog_light: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  rear_fog_light: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  head_light: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  high_beam: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  reversing_light: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  tail_light: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  brake_light_state: Raw.osi3_MovingObject_VehicleClassification_LightState_BrakeLightState;
  license_plate_illumination_rear: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  emergency_vehicle_illumination: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
  service_vehicle_illumination: Raw.osi3_MovingObject_VehicleClassification_LightState_GenericLightState;
}

export interface osi3_BaseMoving_Normalized {
  dimension?: osi3_Dimension3d_Normalized;
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
  velocity?: osi3_Vector3d_Normalized;
  acceleration?: osi3_Vector3d_Normalized;
  orientation_rate?: osi3_Orientation3d_Normalized;
  orientation_acceleration?: osi3_Orientation3d_Normalized;
  base_polygon: osi3_Vector2d_Normalized[];
  bounding_box_section: osi3_BoundingBox_Normalized[];
}

export interface osi3_DetectedStationaryObject_Normalized {
  header?: osi3_DetectedItemHeader_Normalized;
  base?: osi3_BaseStationary_Normalized;
  base_rmse?: osi3_BaseStationary_Normalized;
  candidate: osi3_DetectedStationaryObject_CandidateStationaryObject_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
  radar_specifics?: osi3_RadarSpecificObjectData_Normalized;
  lidar_specifics?: osi3_LidarSpecificObjectData_Normalized;
  camera_specifics?: osi3_CameraSpecificObjectData_Normalized;
  ultrasonic_specifics?: osi3_UltrasonicSpecificObjectData_Normalized;
}

export interface osi3_DetectedStationaryObject_CandidateStationaryObject_Normalized {
  probability: number;
  classification?: osi3_StationaryObject_Classification_Normalized;
}

export interface osi3_StationaryObject_Classification_Normalized {
  type: Raw.osi3_StationaryObject_Classification_Type;
  material: Raw.osi3_StationaryObject_Classification_Material;
  density: Raw.osi3_StationaryObject_Classification_Density;
  color: Raw.osi3_StationaryObject_Classification_Color;
  emitting_structure_attribute?: osi3_StationaryObject_Classification_EmittingStructureAttribute_Normalized;
  assigned_lane_id: osi3_Identifier_Normalized[];
  assigned_lane_percentage: number[];
  logical_lane_assignment: osi3_LogicalLaneAssignment_Normalized[];
}

export interface osi3_StationaryObject_Classification_EmittingStructureAttribute_Normalized {
  wavelength_data: osi3_WavelengthData_Normalized[];
  emitted_spatial_signal_strength: osi3_SpatialSignalStrength_Normalized[];
}

export interface osi3_SpatialSignalStrength_Normalized {
  horizontal_angle: number;
  vertical_angle: number;
  signal_strength: number;
}

export interface osi3_WavelengthData_Normalized {
  start: number;
  end: number;
  samples_number: number;
}

export interface osi3_SensorView_Normalized {
  version?: osi3_InterfaceVersion_Normalized;
  timestamp?: osi3_Timestamp_Normalized;
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  host_vehicle_data?: osi3_HostVehicleData_Normalized;
  global_ground_truth?: osi3_GroundTruth_Normalized;
  host_vehicle_id?: osi3_Identifier_Normalized;
  generic_sensor_view: osi3_GenericSensorView_Normalized[];
  radar_sensor_view: osi3_RadarSensorView_Normalized[];
  lidar_sensor_view: osi3_LidarSensorView_Normalized[];
  camera_sensor_view: osi3_CameraSensorView_Normalized[];
  ultrasonic_sensor_view: osi3_UltrasonicSensorView_Normalized[];
}

export interface osi3_UltrasonicSensorView_Normalized {
  view_configuration?: osi3_UltrasonicSensorViewConfiguration_Normalized;
}

export interface osi3_UltrasonicSensorViewConfiguration_Normalized {
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  field_of_view_horizontal: number;
  field_of_view_vertical: number;
}

export interface osi3_CameraSensorView_Normalized {
  view_configuration?: osi3_CameraSensorViewConfiguration_Normalized;
  image_data: Uint8Array;
}

export interface osi3_CameraSensorViewConfiguration_Normalized {
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  field_of_view_horizontal: number;
  field_of_view_vertical: number;
  number_of_pixels_horizontal: number;
  number_of_pixels_vertical: number;
  channel_format: Raw.osi3_CameraSensorViewConfiguration_ChannelFormat[];
  samples_per_pixel: number;
  max_number_of_interactions: number;
  wavelength_data: osi3_WavelengthData_Normalized[];
  pixel_order: Raw.osi3_CameraSensorViewConfiguration_PixelOrder;
}

export interface osi3_LidarSensorView_Normalized {
  view_configuration?: osi3_LidarSensorViewConfiguration_Normalized;
  reflection: osi3_LidarSensorView_Reflection_Normalized[];
}

export interface osi3_LidarSensorView_Reflection_Normalized {
  signal_strength: number;
  time_of_flight: number;
  doppler_shift: number;
  normal_to_surface?: osi3_Vector3d_Normalized;
  object_id?: osi3_Identifier_Normalized;
}

export interface osi3_LidarSensorViewConfiguration_Normalized {
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  field_of_view_horizontal: number;
  field_of_view_vertical: number;
  number_of_rays_horizontal: number;
  number_of_rays_vertical: number;
  max_number_of_interactions: number;
  emitter_frequency: number;
  num_of_pixels: number;
  directions: osi3_Vector3d_Normalized[];
  timings: number[];
}

export interface osi3_RadarSensorView_Normalized {
  view_configuration?: osi3_RadarSensorViewConfiguration_Normalized;
  reflection: osi3_RadarSensorView_Reflection_Normalized[];
}

export interface osi3_RadarSensorView_Reflection_Normalized {
  signal_strength: number;
  time_of_flight: number;
  doppler_shift: number;
  source_horizontal_angle: number;
  source_vertical_angle: number;
}

export interface osi3_RadarSensorViewConfiguration_Normalized {
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  field_of_view_horizontal: number;
  field_of_view_vertical: number;
  number_of_rays_horizontal: number;
  number_of_rays_vertical: number;
  max_number_of_interactions: number;
  emitter_frequency: number;
  tx_antenna_diagram: osi3_RadarSensorViewConfiguration_AntennaDiagramEntry_Normalized[];
  rx_antenna_diagram: osi3_RadarSensorViewConfiguration_AntennaDiagramEntry_Normalized[];
}

export interface osi3_RadarSensorViewConfiguration_AntennaDiagramEntry_Normalized {
  horizontal_angle: number;
  vertical_angle: number;
  response: number;
}

export interface osi3_GenericSensorView_Normalized {
  view_configuration?: osi3_GenericSensorViewConfiguration_Normalized;
}

export interface osi3_GenericSensorViewConfiguration_Normalized {
  sensor_id?: osi3_Identifier_Normalized;
  mounting_position?: osi3_MountingPosition_Normalized;
  mounting_position_rmse?: osi3_MountingPosition_Normalized;
  field_of_view_horizontal: number;
  field_of_view_vertical: number;
}

export interface osi3_GroundTruth_Normalized {
  version?: osi3_InterfaceVersion_Normalized;
  timestamp?: osi3_Timestamp_Normalized;
  host_vehicle_id?: osi3_Identifier_Normalized;
  stationary_object: osi3_StationaryObject_Normalized[];
  moving_object: osi3_MovingObject_Normalized[];
  traffic_sign: osi3_TrafficSign_Normalized[];
  traffic_light: osi3_TrafficLight_Normalized[];
  road_marking: osi3_RoadMarking_Normalized[];
  lane_boundary: osi3_LaneBoundary_Normalized[];
  lane: osi3_Lane_Normalized[];
  occupant: osi3_Occupant_Normalized[];
  environmental_conditions?: osi3_EnvironmentalConditions_Normalized;
  country_code: number;
  proj_string: string;
  map_reference: string;
  model_reference: string;
  reference_line: osi3_ReferenceLine_Normalized[];
  logical_lane_boundary: osi3_LogicalLaneBoundary_Normalized[];
  logical_lane: osi3_LogicalLane_Normalized[];
  proj_frame_offset?: osi3_GroundTruth_ProjFrameOffset_Normalized;
}

export interface osi3_GroundTruth_ProjFrameOffset_Normalized {
  position?: osi3_Vector3d_Normalized;
  yaw: number;
}

export interface osi3_LogicalLane_Normalized {
  id?: osi3_Identifier_Normalized;
  type: Raw.osi3_LogicalLane_Type;
  source_reference: osi3_ExternalReference_Normalized[];
  physical_lane_reference: osi3_LogicalLane_PhysicalLaneReference_Normalized[];
  reference_line_id?: osi3_Identifier_Normalized;
  start_s: number;
  end_s: number;
  move_direction: Raw.osi3_LogicalLane_MoveDirection;
  right_adjacent_lane: osi3_LogicalLane_LaneRelation_Normalized[];
  left_adjacent_lane: osi3_LogicalLane_LaneRelation_Normalized[];
  overlapping_lane: osi3_LogicalLane_LaneRelation_Normalized[];
  right_boundary_id: osi3_Identifier_Normalized[];
  left_boundary_id: osi3_Identifier_Normalized[];
  predecessor_lane: osi3_LogicalLane_LaneConnection_Normalized[];
  successor_lane: osi3_LogicalLane_LaneConnection_Normalized[];
  street_name: string;
  traffic_rule: osi3_LogicalLane_TrafficRule_Normalized[];
  road_type: Raw.osi3_LogicalLane_RoadType;
}

export interface osi3_LogicalLane_TrafficRule_Normalized {
  traffic_rule_type: Raw.osi3_LogicalLane_TrafficRule_TrafficRuleType;
  traffic_rule_validity?: osi3_LogicalLane_TrafficRule_TrafficRuleValidity_Normalized;
  speed_limit?: osi3_LogicalLane_TrafficRule_SpeedLimit_Normalized;
}

export interface osi3_LogicalLane_TrafficRule_SpeedLimit_Normalized {
  speed_limit_value?: osi3_TrafficSignValue_Normalized;
}

export interface osi3_LogicalLane_TrafficRule_TrafficRuleValidity_Normalized {
  start_s: number;
  end_s: number;
  valid_for_type: osi3_LogicalLane_TrafficRule_TrafficRuleValidity_TypeValidity_Normalized[];
}

export interface osi3_LogicalLane_TrafficRule_TrafficRuleValidity_TypeValidity_Normalized {
  type: Raw.osi3_MovingObject_Type;
  vehicle_type: Raw.osi3_MovingObject_VehicleClassification_Type;
  vehicle_role: Raw.osi3_MovingObject_VehicleClassification_Role;
}

export interface osi3_LogicalLane_LaneConnection_Normalized {
  other_lane_id?: osi3_Identifier_Normalized;
  at_begin_of_other_lane: boolean;
}

export interface osi3_LogicalLane_LaneRelation_Normalized {
  other_lane_id?: osi3_Identifier_Normalized;
  start_s: number;
  end_s: number;
  start_s_other: number;
  end_s_other: number;
}

export interface osi3_LogicalLane_PhysicalLaneReference_Normalized {
  physical_lane_id?: osi3_Identifier_Normalized;
  start_s: number;
  end_s: number;
}

export interface osi3_ExternalReference_Normalized {
  reference: string;
  type: string;
  identifier: string[];
}

export interface osi3_LogicalLaneBoundary_Normalized {
  id?: osi3_Identifier_Normalized;
  boundary_line: osi3_LogicalLaneBoundary_LogicalBoundaryPoint_Normalized[];
  reference_line_id?: osi3_Identifier_Normalized;
  physical_boundary_id: osi3_Identifier_Normalized[];
  passing_rule: Raw.osi3_LogicalLaneBoundary_PassingRule;
  source_reference: osi3_ExternalReference_Normalized[];
}

export interface osi3_LogicalLaneBoundary_LogicalBoundaryPoint_Normalized {
  position?: osi3_Vector3d_Normalized;
  s_position: number;
  t_position: number;
}

export interface osi3_ReferenceLine_Normalized {
  id?: osi3_Identifier_Normalized;
  type: Raw.osi3_ReferenceLine_Type;
  poly_line: osi3_ReferenceLine_ReferenceLinePoint_Normalized[];
}

export interface osi3_ReferenceLine_ReferenceLinePoint_Normalized {
  world_position?: osi3_Vector3d_Normalized;
  s_position: number;
  t_axis_yaw: number;
}

export interface osi3_EnvironmentalConditions_Normalized {
  ambient_illumination: Raw.osi3_EnvironmentalConditions_AmbientIllumination;
  time_of_day?: osi3_EnvironmentalConditions_TimeOfDay_Normalized;
  unix_timestamp: Raw.LongLike;
  atmospheric_pressure: number;
  temperature: number;
  relative_humidity: number;
  precipitation: Raw.osi3_EnvironmentalConditions_Precipitation;
  fog: Raw.osi3_EnvironmentalConditions_Fog;
  source_reference: osi3_ExternalReference_Normalized[];
  clouds?: osi3_EnvironmentalConditions_CloudLayer_Normalized;
  wind?: osi3_EnvironmentalConditions_Wind_Normalized;
  sun?: osi3_EnvironmentalConditions_Sun_Normalized;
}

export interface osi3_EnvironmentalConditions_Sun_Normalized {
  azimuth: number;
  elevation: number;
  intensity: number;
}

export interface osi3_EnvironmentalConditions_Wind_Normalized {
  origin_direction: number;
  speed: number;
}

export interface osi3_EnvironmentalConditions_CloudLayer_Normalized {
  fractional_cloud_cover: Raw.osi3_EnvironmentalConditions_CloudLayer_FractionalCloudCover;
}

export interface osi3_EnvironmentalConditions_TimeOfDay_Normalized {
  seconds_since_midnight: number;
}

export interface osi3_Occupant_Normalized {
  id?: osi3_Identifier_Normalized;
  classification?: osi3_Occupant_Classification_Normalized;
  source_reference: osi3_ExternalReference_Normalized[];
}

export interface osi3_Lane_Normalized {
  id?: osi3_Identifier_Normalized;
  classification?: osi3_Lane_Classification_Normalized;
  source_reference: osi3_ExternalReference_Normalized[];
}

export interface osi3_LaneBoundary_Normalized {
  id?: osi3_Identifier_Normalized;
  boundary_line: osi3_LaneBoundary_BoundaryPoint_Normalized[];
  classification?: osi3_LaneBoundary_Classification_Normalized;
  source_reference: osi3_ExternalReference_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_RoadMarking_Normalized {
  id?: osi3_Identifier_Normalized;
  base?: osi3_BaseStationary_Normalized;
  classification?: osi3_RoadMarking_Classification_Normalized;
  source_reference: osi3_ExternalReference_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
  model_reference: string;
}

export interface osi3_TrafficLight_Normalized {
  id?: osi3_Identifier_Normalized;
  base?: osi3_BaseStationary_Normalized;
  classification?: osi3_TrafficLight_Classification_Normalized;
  model_reference: string;
  source_reference: osi3_ExternalReference_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_TrafficSign_Normalized {
  id?: osi3_Identifier_Normalized;
  main_sign?: osi3_TrafficSign_MainSign_Normalized;
  supplementary_sign: osi3_TrafficSign_SupplementarySign_Normalized[];
  source_reference: osi3_ExternalReference_Normalized[];
}

export interface osi3_TrafficSign_SupplementarySign_Normalized {
  base?: osi3_BaseStationary_Normalized;
  classification?: osi3_TrafficSign_SupplementarySign_Classification_Normalized;
  model_reference: string;
}

export interface osi3_TrafficSign_MainSign_Normalized {
  base?: osi3_BaseStationary_Normalized;
  classification?: osi3_TrafficSign_MainSign_Classification_Normalized;
  model_reference: string;
}

export interface osi3_MovingObject_Normalized {
  id?: osi3_Identifier_Normalized;
  base?: osi3_BaseMoving_Normalized;
  type: Raw.osi3_MovingObject_Type;
  assigned_lane_id: osi3_Identifier_Normalized[];
  vehicle_attributes?: osi3_MovingObject_VehicleAttributes_Normalized;
  vehicle_classification?: osi3_MovingObject_VehicleClassification_Normalized;
  model_reference: string;
  future_trajectory: osi3_StatePoint_Normalized[];
  moving_object_classification?: osi3_MovingObject_MovingObjectClassification_Normalized;
  source_reference: osi3_ExternalReference_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
  pedestrian_attributes?: osi3_MovingObject_PedestrianAttributes_Normalized;
}

export interface osi3_MovingObject_PedestrianAttributes_Normalized {
  bbcenter_to_root?: osi3_Vector3d_Normalized;
  skeleton_bone: osi3_MovingObject_PedestrianAttributes_Bone_Normalized[];
}

export interface osi3_MovingObject_PedestrianAttributes_Bone_Normalized {
  type: Raw.osi3_MovingObject_PedestrianAttributes_Bone_Type;
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
  length: number;
  missing: boolean;
  velocity?: osi3_Vector3d_Normalized;
  orientation_rate?: osi3_Orientation3d_Normalized;
}

export interface osi3_StatePoint_Normalized {
  timestamp?: osi3_Timestamp_Normalized;
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
}

export interface osi3_MovingObject_VehicleAttributes_Normalized {
  driver_id?: osi3_Identifier_Normalized;
  radius_wheel: number;
  number_wheels: number;
  bbcenter_to_rear?: osi3_Vector3d_Normalized;
  bbcenter_to_front?: osi3_Vector3d_Normalized;
  ground_clearance: number;
  wheel_data: osi3_MovingObject_VehicleAttributes_WheelData_Normalized[];
  steering_wheel_angle: number;
}

export interface osi3_MovingObject_VehicleAttributes_WheelData_Normalized {
  axle: number;
  index: number;
  position?: osi3_Vector3d_Normalized;
  wheel_radius: number;
  rim_radius: number;
  width: number;
  orientation?: osi3_Orientation3d_Normalized;
  rotation_rate: number;
  model_reference: string;
  friction_coefficient: number;
}

export interface osi3_StationaryObject_Normalized {
  id?: osi3_Identifier_Normalized;
  base?: osi3_BaseStationary_Normalized;
  classification?: osi3_StationaryObject_Classification_Normalized;
  model_reference: string;
  source_reference: osi3_ExternalReference_Normalized[];
  color_description?: osi3_ColorDescription_Normalized;
}

export interface osi3_HostVehicleData_Normalized {
  version?: osi3_InterfaceVersion_Normalized;
  timestamp?: osi3_Timestamp_Normalized;
  host_vehicle_id?: osi3_Identifier_Normalized;
  location?: osi3_BaseMoving_Normalized;
  location_rmse?: osi3_BaseMoving_Normalized;
  vehicle_basics?: osi3_HostVehicleData_VehicleBasics_Normalized;
  vehicle_powertrain?: osi3_HostVehicleData_VehiclePowertrain_Normalized;
  vehicle_brake_system?: osi3_HostVehicleData_VehicleBrakeSystem_Normalized;
  vehicle_steering?: osi3_HostVehicleData_VehicleSteering_Normalized;
  vehicle_wheels?: osi3_HostVehicleData_VehicleWheels_Normalized;
  vehicle_localization?: osi3_HostVehicleData_VehicleLocalization_Normalized;
  vehicle_automated_driving_function: osi3_HostVehicleData_VehicleAutomatedDrivingFunction_Normalized[];
  vehicle_motion?: osi3_HostVehicleData_VehicleMotion_Normalized;
  route?: osi3_Route_Normalized;
}

export interface osi3_Route_Normalized {
  route_id?: osi3_Identifier_Normalized;
  route_segment: osi3_Route_RouteSegment_Normalized[];
}

export interface osi3_Route_RouteSegment_Normalized {
  lane_segment: osi3_Route_LogicalLaneSegment_Normalized[];
}

export interface osi3_Route_LogicalLaneSegment_Normalized {
  logical_lane_id?: osi3_Identifier_Normalized;
  start_s: number;
  end_s: number;
}

export interface osi3_HostVehicleData_VehicleMotion_Normalized {
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
  velocity?: osi3_Vector3d_Normalized;
  orientation_rate?: osi3_Orientation3d_Normalized;
  acceleration?: osi3_Vector3d_Normalized;
  current_curvature: number;
}

export interface osi3_HostVehicleData_VehicleAutomatedDrivingFunction_Normalized {
  name: Raw.osi3_HostVehicleData_VehicleAutomatedDrivingFunction_Name;
  custom_name: string;
  state: Raw.osi3_HostVehicleData_VehicleAutomatedDrivingFunction_State;
  custom_state: string;
  driver_override?: osi3_HostVehicleData_VehicleAutomatedDrivingFunction_DriverOverride_Normalized;
  custom_detail: osi3_KeyValuePair_Normalized[];
}

export interface osi3_KeyValuePair_Normalized {
  key: string;
  value: string;
}

export interface osi3_HostVehicleData_VehicleAutomatedDrivingFunction_DriverOverride_Normalized {
  active: boolean;
  override_reason: Raw.osi3_HostVehicleData_VehicleAutomatedDrivingFunction_DriverOverride_Reason[];
}

export interface osi3_HostVehicleData_VehicleLocalization_Normalized {
  position?: osi3_Vector3d_Normalized;
  orientation?: osi3_Orientation3d_Normalized;
  geodetic_position?: osi3_GeodeticPosition_Normalized;
}

export interface osi3_GeodeticPosition_Normalized {
  longitude: number;
  latitude: number;
  altitude: number;
}

export interface osi3_HostVehicleData_VehicleWheels_Normalized {
  wheel_data: osi3_HostVehicleData_VehicleWheels_WheelData_Normalized[];
}

export interface osi3_HostVehicleData_VehicleWheels_WheelData_Normalized {
  axle: number;
  index: number;
  rotation_rate: number;
  slip: number;
}

export interface osi3_HostVehicleData_VehicleSteering_Normalized {
  vehicle_steering_wheel?: osi3_VehicleSteeringWheel_Normalized;
}

export interface osi3_VehicleSteeringWheel_Normalized {
  angle: number;
  angular_speed: number;
  torque: number;
}

export interface osi3_HostVehicleData_VehicleBrakeSystem_Normalized {
  pedal_position_brake: number;
}

export interface osi3_HostVehicleData_VehiclePowertrain_Normalized {
  pedal_position_acceleration: number;
  pedal_position_clutch: number;
  gear_transmission: number;
  motor: osi3_HostVehicleData_VehiclePowertrain_Motor_Normalized[];
}

export interface osi3_HostVehicleData_VehiclePowertrain_Motor_Normalized {
  type: Raw.osi3_HostVehicleData_VehiclePowertrain_Motor_Type;
  rpm: number;
  torque: number;
}

export interface osi3_HostVehicleData_VehicleBasics_Normalized {
  curb_weight: number;
  operating_state: Raw.osi3_HostVehicleData_VehicleBasics_OperatingState;
}

export type GroundTruthNormalized = osi3_GroundTruth_Normalized;
export type SensorViewNormalized = osi3_SensorView_Normalized;
export type SensorDataNormalized = osi3_SensorData_Normalized;
