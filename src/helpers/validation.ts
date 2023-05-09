import { object, string, number, mixed, InferType, ArraySchema } from 'yup';
import { Address } from '../types';
import { BigNumber } from 'ethers';

export const sarcophagusSettingsSchema = object({
  name: string().required(),
  recipientAddress: string<Address>().required(),
  creationTime: number().required().positive().integer(),
  resurrectionTime: number().required().positive().integer(),
  threshold: number().required().positive().integer(),
  maximumRewrapInterval: number().required().positive().integer(),
  maximumResurrectionTime: number().required().positive().integer(),
});

const archaeologistSettingsSchema = object({
  publicKey: string().required(),
  archAddress: string<Address>().required(),
  diggingFeePerSecond: mixed<BigNumber>().required(),
  curseFee: mixed<BigNumber>().required(),
  v: number().required().positive().integer(),
  r: string().required(),
  s: string().required(),
});

export const archaeologistSettingsArraySchema = new ArraySchema()
  .of(archaeologistSettingsSchema)
  .required();

export type SarcophagusSettings = InferType<typeof sarcophagusSettingsSchema>;
export type ArchaeologistSettings = InferType<typeof archaeologistSettingsSchema>;
