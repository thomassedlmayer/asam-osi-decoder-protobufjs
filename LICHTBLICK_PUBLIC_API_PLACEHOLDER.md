# Lichtblick Public API Integration Placeholder

This file tracks the host API and runtime integration work required to move this prototype into Lichtblick core.

## Goal

Provide a first-class, contract-based extension pipeline where:

1. A `RegisterMessageContractDecoderArgs` registration owns deserialization (`bytes -> typed payload`).
2. A `RegisterMessageContractConverterArgs` registration transforms typed payloads to target schemas.
3. Panel/consumer subscriptions can request compatible contracts explicitly.

## Public API Additions (`@lichtblick/suite`)

Target file:
- `packages/suite/src/index.ts`

### 1) Add host-generic contract types

```ts
export type ProvidedMessageContract = {
  contractId: string;
  contractVersion: string;
  schemaName: string;
  messageEncoding: string;
  schemaEncoding?: string;
  schemaHash?: string;
};

export type RequiredMessageContract = {
  contractId: string;
  contractVersionRange: string;
  schemaHash?: string;
};
```

### 2) Add message contract decoder registration API

```ts
export type RegisterMessageContractDecoderArgs<Decoded> = {
  id: string;
  priority?: number;
  sourceSchemas: readonly string[];
  providedContract: ProvidedMessageContract;
  match(meta: ChannelMeta): boolean;
  deserialize(bytes: ArrayBufferView, meta: ChannelMeta): Decoded;
  toJson?(msg: Decoded, meta: ChannelMeta): unknown;
  validateInput?(msg: unknown): msg is Decoded;
};
```

```ts
registerMessageContractDecoder<Decoded>(args: RegisterMessageContractDecoderArgs<Decoded>): void;
```

### 3) Add contract-converter registration API

```ts
export type RegisterMessageContractConverterArgs<Decoded> = {
  id: string;
  requiresContract: RequiredMessageContract;
  toSchemaName: string;
  convert(
    msg: Decoded,
    event: Immutable<MessageEvent<Decoded>>,
    globalVariables?: Readonly<Record<string, VariableValue>>,
  ): unknown;
  panelSettings?: Record<string, PanelSettings<unknown>>;
};
```

```ts
registerMessageContractConverter<Decoded>(
  args: RegisterMessageContractConverterArgs<Decoded>,
): void;
```

### 4) Extend subscription API (consumer side)

Current `convertTo` can stay for compatibility, but add contract-based selector:

```ts
type Subscription = {
  topic: string;
  convertTo?: string;
  requiresContract?: RequiredMessageContract;
  preload?: boolean;
};
```

## Host Runtime Integration (`@lichtblick/suite-base`)

Likely integration points:

- `packages/suite-base/src/providers/helpers/buildContributionPoints.ts`
- `packages/suite-base/src/components/PanelExtensionAdapter/messageProcessing.ts`
- `packages/suite-base/src/players/IterablePlayer/DeserializingIterableSource.ts`
- `packages/suite-base/src/components/PanelExtensionAdapter/types.ts`

### Runtime TODOs

1. Add contribution point storage/validation for:
   - registered message contract decoders
   - registered contract converters
2. Implement deterministic decoder resolver:
   - match by schema/encoding/metadata
   - resolve by priority and compatibility
   - log conflict diagnostics
3. Integrate decoder deserialization path before converter resolution.
4. Resolve converters by `requiresContract` compatibility.
5. Keep legacy `registerMessageConverter` fallback when no decoder path exists.
6. Add diagnostics for unmet contract requirements.
7. Audit built-in panels that currently consume host-deserialized JSON-like objects
   directly (for example Raw Messages panel) and define compatibility behavior when
   decoder-provided decoded payloads are used instead.
8. Ensure a stable "raw inspection" path remains available:
   - preserve access to original host-deserialized/raw view data where available
   - and support decoder-provided JSON via `decoder.toJson(decoded, meta)` when
     host-native JSON is not available.
9. For JSON-oriented built-in panels, define host selection order explicitly:
   - prefer host-native JSON output when no decoder is active
   - when a decoder is active, use decoder `toJson` output as the panel input
   - if a decoder does not provide `toJson`, show a deterministic unsupported-state
     diagnostic for JSON-only panel modes.
10. Keep the decoder path single-deserialization for typed processing:
   - do not deserialize payloads twice just to satisfy JSON-based panels
   - derive inspection JSON from decoded decoder payload through `toJson`.

## Compatibility Policy TODO

1. If decoder+contract path is available for a topic, prefer it.
2. Legacy converter path remains fallback for non-adapted topics.
3. If multiple decoders satisfy the same stream contract:
   - deterministic winner or explicit conflict state
   - no silent nondeterministic behavior

## Migration TODO

1. Keep existing converter extension API supported initially.
2. Mark raw-input converter semantics as legacy/deprecated in docs.
3. Provide migration guide:
   - old converter -> decoder + contract converter split
4. Add tests for mixed deployments (legacy + new APIs).
