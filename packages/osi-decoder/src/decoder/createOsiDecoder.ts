// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import type {
  ChannelMeta,
  RegisterMessageContractDecoderArgs,
  ProvidedMessageContract,
} from "../../../lichtblick-suite-placeholder/src";

type CreateOsiDecoderArgs<TPayload> = {
  id: string;
  providedContract: ProvidedMessageContract;
  sourceSchemaName: string;
  priority?: number;
  match: (meta: Readonly<ChannelMeta>) => boolean;
  deserialize: (bytes: ArrayBufferView, meta: Readonly<ChannelMeta>) => TPayload;
  toJson?: (msg: TPayload, meta: Readonly<ChannelMeta>) => unknown;
  validateInput?: (msg: unknown) => msg is TPayload;
};

export function createOsiDecoder<TPayload>(
  args: CreateOsiDecoderArgs<TPayload>,
): RegisterMessageContractDecoderArgs<TPayload> {
  return {
    id: args.id,
    providedContract: args.providedContract,
    priority: args.priority ?? 100,
    sourceSchemas: [args.sourceSchemaName],
    match: args.match,
    deserialize: args.deserialize,
    toJson: args.toJson,
    validateInput: args.validateInput,
  };
}
