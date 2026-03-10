# ASAM OSI Decoder Extension

Lichtblick extension package that registers ASAM OSI message contract decoders.

Current scope:
- OSI GroundTruth, SensorView, and SensorData decoder registration
- Protobuf deserialization via `@bufbuild/protobuf`
- Decoder-owned JSON projection via `toJson` for raw/inspection consumers
- Contract publication for downstream contract-converters
