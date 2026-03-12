// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import type { ProvidedMessageContract, RequiredMessageContract } from "./contractTypes";
import { OSI_VERSION } from "./osiVersion";

export const OSI_DEFAULT_CONTRACT_VERSION = OSI_VERSION;
export const OSI_PROTOBUF_ENCODING = "protobuf";
export const OSI_CHANNEL_VERSION_METADATA_KEY = "net.asam.osi.trace.channel.osi_version";

type CreateOsiMessageContractArgs = {
  contractId: string;
  schemaName: string;
  contractVersion?: string;
  messageEncoding?: string;
  schemaEncoding?: string;
  channelVersionMetadataKey?: string;
};

export type OsiMessageContractSet = {
  contractId: string;
  contractVersion: string;
  schemaName: string;
  messageEncoding: string;
  schemaEncoding: string;
  channelVersionMetadataKey: string;
  providedMessageContract: ProvidedMessageContract;
  requiredMessageContract: RequiredMessageContract;
};

/**
 * Builds the repetitive contract metadata bundle used by adapter/converter contracts.
 */
export function createOsiMessageContract(
  args: CreateOsiMessageContractArgs,
): OsiMessageContractSet {
  const contractVersion = args.contractVersion ?? OSI_DEFAULT_CONTRACT_VERSION;
  const messageEncoding = args.messageEncoding ?? OSI_PROTOBUF_ENCODING;
  const schemaEncoding = args.schemaEncoding ?? OSI_PROTOBUF_ENCODING;
  const channelVersionMetadataKey =
    args.channelVersionMetadataKey ?? OSI_CHANNEL_VERSION_METADATA_KEY;

  const providedMessageContract: ProvidedMessageContract = {
    contractId: args.contractId,
    contractVersion,
    schemaName: args.schemaName,
    messageEncoding,
    schemaEncoding,
    channelVersionMetadataKey,
  };

  const requiredMessageContract: RequiredMessageContract = {
    contractId: args.contractId,
    contractVersionRange: `^${contractVersion}`,
  };

  return {
    contractId: args.contractId,
    contractVersion,
    schemaName: args.schemaName,
    messageEncoding,
    schemaEncoding,
    channelVersionMetadataKey,
    providedMessageContract,
    requiredMessageContract,
  };
}
