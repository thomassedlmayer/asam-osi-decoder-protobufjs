// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

export type ProvidedMessageContract = {
  contractId: string;
  contractVersion: string;
  schemaName: string;
  messageEncoding: string;
  schemaEncoding?: string;
  channelVersionMetadataKey?: string;
  schemaHash?: string;
};

export type RequiredMessageContract = {
  contractId: string;
  contractVersionRange: string;
  schemaHash?: string;
};
