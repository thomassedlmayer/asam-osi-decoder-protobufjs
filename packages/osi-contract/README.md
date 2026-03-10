# @asam-osi-adapter/osi-contract

Shared contract package for the ASAM OSI decoder/converter prototype.

## Responsibility

`osi-contract` is the common boundary between:

1. Decoder functionality (`packages/osi-decoder`)
2. Contract-converter functionality (`packages/osi-converters`)

It provides one source of truth for:

- OSI-specific contract identifiers and versions
- OSI payload types exposed to converters/consumers
- Generated protobuf types/schema descriptors for OSI messages
- A helper factory to build repetitive contract metadata bundles

## Why this package exists

Without a shared contract package, decoder and converter code can drift:

- Different contract ids/version strings
- Different payload type assumptions
- Duplicated schema constants

`osi-contract` prevents this by making both sides import the same definitions.

## What belongs here

- OSI-specific contract constants (for example GroundTruth contract metadata)
- Contract requirement helpers for consumers/converters
- Payload type aliases (for example `OsiGroundTruthPayload`)
- Generated protobuf code in `src/gen`

## What does not belong here

- Runtime deserialization logic (decoder concern)
- Conversion algorithms (converter concern)
- Host API implementation logic (Lichtblick concern)

## Interaction with placeholder suite API types

Host-generic contract types (`ProvidedMessageContract`, `RequiredMessageContract`) are defined in:

- `packages/lichtblick-suite-placeholder/src/index.ts`

`osi-contract` consumes those types to define OSI-specific contracts.

## Current GroundTruth contract exports

From `src/groundTruthContract.ts`:

- `OSI_GROUND_TRUTH_CONTRACT_ID`
- `OSI_GROUND_TRUTH_CONTRACT_VERSION`
- `OSI_GROUND_TRUTH_SCHEMA_NAME`
- `OSI_GROUND_TRUTH_PROVIDED_MESSAGE_CONTRACT`
- `OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT`
- `OsiGroundTruthPayload`
- `OsiGroundTruthSchema`

Additional contract sets:

- `sensorViewContract.ts` (`osi3.SensorView`)
- `sensorDataContract.ts` (`osi3.SensorData`)

## Contract factory/helper

To avoid repeating `{ id, version, schema, providedMessageContract, requiredMessageContract }`
for every OSI type, use:

- `createOsiMessageContract(...)` from `src/contractFactory.ts`

It generates:

- normalized contract metadata
- `providedMessageContract`
- `requiredMessageContract` (with semver range based on the configured version)

## Example objects

Example `ProvidedMessageContract` (stream contract published by a decoder):

```ts
const providedMessageContract = {
  contractId: "asam.osi.groundtruth",
  contractVersion: "3.8.0",
  schemaName: "osi3.GroundTruth",
  messageEncoding: "protobuf",
  schemaEncoding: "protobuf",
  channelVersionMetadataKey: "net.asam.osi.trace.channel.osi_version",
};
```

Example `RequiredMessageContract` (requirement declared by a converter/consumer):

```ts
const requiredMessageContract = {
  contractId: "asam.osi.groundtruth",
  contractVersionRange: "^3.8.0",
};
```

## Practical flow

1. Decoder imports `OSI_GROUND_TRUTH_PROVIDED_MESSAGE_CONTRACT` and publishes it as `providedContract`.
2. Converter imports `OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT` and declares `requiresContract`.
3. Host matches provided vs required contract metadata and wires conversion.
