// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import {
  ExtensionContext,
  Immutable,
  MessageEvent,
  PanelSettings,
  VariableValue,
} from "@lichtblick/suite";

/**
 * Lichtblick-generic descriptor for a decoded stream contract provided by an adapter.
 * This is domain-agnostic and can be used for any schema family.
 */
export type ProvidedMessageContract = {
  /** Stable semantic identifier for the decoded output stream. */
  contractId: string;
  /** Semantic version of the decoded output stream contract. */
  contractVersion: string;
  /** Fully qualified source schema name this contract is derived from. */
  schemaName: string;
  /** Wire encoding expected for source messages. */
  messageEncoding: string;
  /** Optional source schema encoding exposed by the host/source. */
  schemaEncoding?: string;
  /** Optional metadata key where schema version information is expected. */
  channelVersionMetadataKey?: string;
  /** Optional strict source schema fingerprint/hash. */
  schemaHash?: string;
};

/**
 * Lichtblick-generic requirement declared by a consumer extension.
 */
export type RequiredMessageContract = {
  /** Required semantic contract id. */
  contractId: string;
  /** Required version range (for example `^1.0.0`). */
  contractVersionRange: string;
  /** Optional strict source schema fingerprint/hash. */
  schemaHash?: string;
};

/**
 * Placeholder API surface intended to move into `@lichtblick/suite`.
 * Keep all prototype host-facing extension interface types centralized here.
 */

/**
 * Channel-level metadata exposed by the host runtime when deciding whether an
 * adapter should handle a source message stream.
 */
export type ChannelMeta = {
  /** Topic name the binary message was received on. */
  topic: string;
  /** Fully qualified source schema name (for example `osi3.GroundTruth`). */
  schemaName?: string;
  /** Wire message encoding (for example `protobuf`). */
  messageEncoding?: string;
  /**
   * Schema encoding type of the schema content embedded in the source MCAP
   * file (for example `protobuf`, `ros2idl`).
   */
  schemaEncoding?: string;
  /** Raw encoded schema payload provided by the data source (if available). */
  schemaData?: Uint8Array;
  /** Stable schema fingerprint/hash provided by the data source (if available). */
  schemaHash?: string;
  /** Optional semantic schema version exposed by the source. */
  schemaVersion?: string;
  /** Per-channel metadata key/value pairs from the source file/stream. */
  channelMetadata?: Readonly<Record<string, string>>;
  /** File/global metadata records keyed by metadata name. */
  fileMetadata?: Readonly<Record<string, Readonly<Record<string, string>>>>;
};

/**
 * Function that converts one decoded contract payload into a target schema object.
 */
export type ContractConvertFn<TIn> = (
  /** Strongly typed output of this adapter's `deserialize` function. */
  msg: TIn,
  /** Message envelope containing topic and timestamps for the input message. */
  event: Immutable<MessageEvent<TIn>>,
  /** Current global variables provided by the host, if available. */
  globalVariables?: Readonly<Record<string, VariableValue>>,
) => unknown;

/**
 * Registration contract for a decoder that owns deserialization only.
 */
export type RegisterMessageContractDecoderArgs<TIn> = {
  /** Globally unique decoder id for diagnostics and conflict resolution. */
  id: string;
  /** Host-level contract descriptor of the decoded output this decoder publishes. */
  providedContract: ProvidedMessageContract;
  /** Optional decoder precedence. Higher values should win when multiple decoders match. */
  priority?: number;
  /** Source schema names this decoder is expected to handle. */
  sourceSchemas: readonly string[];
  /** Returns true if this decoder can handle the channel described by `meta`. */
  match: (meta: Readonly<ChannelMeta>) => boolean;
  /** Decodes raw source bytes into a runtime object consumed by contract converters. */
  deserialize: (bytes: ArrayBufferView, meta: Readonly<ChannelMeta>) => TIn;
  /**
   * Optional decoder-owned projection for raw/inspection UIs.
   * When present, host/panels can render this JSON-like output instead of
   * assuming host built-in deserializer semantics.
   */
  toJson?: (msg: TIn, meta: Readonly<ChannelMeta>) => unknown;
  /** Optional runtime type guard for defensive validation before conversion. */
  validateInput?: (msg: unknown) => msg is TIn;
};

/**
 * Registration contract for a converter that transforms decoded adapter payloads
 * into additional output schemas.
 */
export type RegisterMessageContractConverterArgs<TIn> = {
  /** Globally unique converter id for diagnostics and conflict resolution. */
  id: string;
  /** Input contract requirement that must be available before converter is active. */
  requiresContract: RequiredMessageContract;
  /** Fully qualified target schema name for `convertTo` subscriptions. */
  toSchemaName: string;
  /** Converts one decoded source payload into `toSchemaName` output. */
  convert: ContractConvertFn<TIn>;
  /** Optional panel settings contributions scoped to this conversion. */
  panelSettings?: Record<string, PanelSettings<unknown>>;
};

/**
 * Extension context augmentation placeholder until suite ships these APIs.
 */
export type AdapterExtensionContext = ExtensionContext & {
  registerMessageContractDecoder: <TIn>(args: RegisterMessageContractDecoderArgs<TIn>) => void;
  registerMessageAdapter: <TIn>(adapter: RegisterMessageContractDecoderArgs<TIn>) => void;
  registerMessageContractConverter: <TIn>(args: RegisterMessageContractConverterArgs<TIn>) => void;
};
