# Usage Guide: Decoder + Contract Converter + Contract Package

This page documents how to use the three extension components in this prototype:

1. `packages/osi-contract` (shared contract and types)
2. `packages/osi-decoder` (deserialization + contract publication)
3. `packages/osi-converters` (contract-based conversions)

## 1) Define and consume contracts (`packages/osi-contract`)

Purpose:
- One source of truth for contract ids/versions and payload types.

Key files:
- `packages/osi-contract/src/lichtblickContract.ts`
- `packages/osi-contract/src/groundTruthContract.ts`

What to put here:
- Generic host contract types (`ProvidedMessageContract`, `RequiredMessageContract`)
- OSI-specific constants (`OSI_GROUND_TRUTH_PROVIDED_MESSAGE_CONTRACT`, version requirement helpers)
- Generated protobuf runtime (`osi.js`) and typings (`osi.d.ts`) in `packages/osi-contract/src/gen-protobufjs`
- Generated OSI version constant (`osiVersion.ts`) in `packages/osi-contract/src`

Consumer example:

```ts
import {
  OSI_GROUND_TRUTH_REQUIRED_MESSAGE_CONTRACT,
  type OsiGroundTruthPayload,
} from "../packages/osi-contract/src";
```

## 2) Register a decoder (`packages/osi-decoder`)

Purpose:
- Match source channels and deserialize bytes into typed payloads.

Key files:
- `packages/osi-decoder/src/decoder/createOsiDecoder.ts`
- `packages/osi-decoder/src/decoder/groundTruthDecoder.ts`
- `packages/osi-decoder/src/protobufDecoder.ts`

Decoder responsibilities:
- `match(meta)` determines if this decoder handles the source stream.
- `deserialize(bytes, meta)` returns typed payload.
- `providedContract` announces what decoded contract this decoder provides.

Registration happens in decoder extension entrypoint:
- `packages/osi-decoder/src/index.ts`

```ts
ctx.registerMessageContractDecoder(groundTruthDecoder);
```

## 3) Register contract converters (`packages/osi-converters`)

Purpose:
- Convert decoded contract payloads to target schemas (`foxglove.SceneUpdate`, etc.).

Key files:
- `packages/osi-converters/src/groundTruthConverters.ts`
- `packages/osi-converters/src/groundTruth.ts`

Converter responsibilities:
- `requiresContract` states required decoded input contract.
- `toSchemaName` is the output schema for `convertTo`.
- `convert(...)` maps typed input payload to output object.

Registration in converter extension entrypoint:

```ts
for (const converter of groundTruthConverters) {
  ctx.registerMessageContractConverter(converter);
}
```

## 4) End-to-end flow

1. Host receives binary message.
2. Matching decoder deserializes it and publishes the declared contract.
3. Consumers that support the decoder-provided contract can consume that decoded output directly.
4. Compatible contract converters can additionally run and produce target schema outputs.
5. Panels/extensions consume either direct contract output or converter output, depending on their declared requirements.

## 5) Add a new OSI message type

1. Add contract constants/types in `packages/osi-contract/src`.
2. Extend decoder dispatch in `packages/osi-decoder/src/protobufDecoder.ts`.
3. Add a decoder matcher + decoder factory in `packages/osi-decoder/src/decoder`.
4. Add one or more contract converters in `packages/osi-converters/src`.
5. Register the decoder in `packages/osi-decoder/src/index.ts`.
6. Register contract-converters in `packages/osi-converters/src/index.ts`.

## 6) Important note

These APIs are currently prototype interfaces. Current Lichtblick releases do not yet provide:
- `registerMessageContractDecoder`
- `registerMessageContractConverter`

The extension therefore performs runtime checks and no-ops with warnings when these APIs are unavailable.
