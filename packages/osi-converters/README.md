# ASAM OSI Converters Extension

Lichtblick extension package that registers contract-based ASAM OSI converters.

These converters target payloads produced by `packages/osi-decoder` contract decoders.

Current scope:
- GroundTruth -> `foxglove.SceneUpdate`
- GroundTruth -> `foxglove.FrameTransforms`
- SensorView -> `foxglove.SceneUpdate`
- SensorView -> `foxglove.FrameTransforms`
