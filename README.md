# ASAM OSI Decoder/Converter Prototype

Prototype workspace for a contract-based ASAM OSI extension model in Lichtblick.

Detailed usage:

- `USAGE.md`

## Why this repo exists

The goal is to demonstrate a cleaner split than the legacy message-converter-only flow:

1. Decoder extension deserializes bytes into a typed OSI payload.
2. Converter extension consumes typed contracts and emits target schemas.
3. Shared contract package defines the compatibility boundary between them.

Note:

- Decoder matching relies primarily on schema name, message encoding, and version/fingerprint metadata.

## Package overview

- `packages/osi-decoder`: Decoder extension package.
  - Responsibility: source matching + protobuf deserialization + `providedContract` publication.
  - Purpose: keep decode/runtime concerns isolated from conversion logic.
- `packages/osi-converters`: Converter extension package.
  - Responsibility: register `requiresContract` converters (for example GroundTruth -> SceneUpdate).
  - Purpose: allow independent evolution and installation of conversion behavior.
- `packages/osi-contract`: Shared contract/types package.
  - Responsibility: OSI contract ids/versions/schema names, requirement/provided objects, generated OSI protobuf types.
  - Purpose: single source of truth for decoder/converter compatibility.
- `packages/lichtblick-suite-placeholder`: Placeholder host API types package.
  - Responsibility: temporary definitions of proposed `@lichtblick/suite` interfaces (for example `RegisterMessageContractDecoderArgs`, `RegisterMessageContractConverterArgs`, `ProvidedMessageContract`, `RequiredMessageContract`).
  - Purpose: keep all to-be-integrated host-facing types in one place during prototyping.

## Type generation

Generated OSI protobuf TS code is emitted into:

- `packages/osi-contract/src/gen-protobufjs`

Source comes from local submodule:

- `open-simulation-interface`

Commands:

```sh
yarn update:osi-submodule
yarn generate:osi-types
```

## Build and package

Both extension packages can be built/packaged independently:

```sh
cd packages/osi-decoder
yarn build
yarn package
```

```sh
cd packages/osi-converters
yarn build
yarn package
```

## Status

This repository models the target architecture and extension shape.
Host support for these APIs must still be integrated in Lichtblick core (`@lichtblick/suite` / `@lichtblick/suite-base`).
