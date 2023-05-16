import {
  ArchaeologistData,
  ArchaeologistEncryptedShard,
  ArchaeologistException,
  ArchaeologistExceptionCode,
  ArchaeologistNegotiationResponse,
  ArchaeologistNegotiationResult,
  ArchaeologistProfile,
  ArchaeologistSignatureNegotiationParams,
  SarcophagusArchaeologist,
  SarcophagusValidationError,
} from './types/archaeologist';
import { SarcoClient } from './SarcoClient';
import { SarcoClientConfig, SarcoNetworkConfig } from './types';
import { goerliNetworkConfig, mainnetNetworkConfig, sepoliaNetworkConfig } from './networkConfig';
import { NEGOTIATION_SIGNATURE_STREAM } from './libp2p_node/p2pNodeConfig';
import {
  calculateProjectedDiggingFees,
  convertSarcoPerSecondToPerMonth,
  getLowestResurrectionTime,
  getLowestRewrapInterval,
  getTotalFeesInSarco,
} from './helpers/archHelpers';
import { calculateDiggingFees, formatSarco } from './helpers/misc';
import { getSarcophagusRewraps } from 'helpers/subgraph';

export { sarco } from './singleton';
export { SarcoClient };
export type { SarcoClientConfig, SarcoNetworkConfig };
export type {
  ArchaeologistData,
  ArchaeologistException,
  ArchaeologistProfile,
  SarcophagusArchaeologist,
  ArchaeologistEncryptedShard,
  ArchaeologistSignatureNegotiationParams,
  ArchaeologistNegotiationResponse,
  ArchaeologistNegotiationResult,
};

export { ArchaeologistExceptionCode, SarcophagusValidationError };
export { NEGOTIATION_SIGNATURE_STREAM };

export { goerliNetworkConfig, mainnetNetworkConfig, sepoliaNetworkConfig };

export {
  getSarcophagusRewraps,
  getLowestRewrapInterval,
  getLowestResurrectionTime,
  getTotalFeesInSarco,
  calculateDiggingFees,
  formatSarco,
  calculateProjectedDiggingFees,
  convertSarcoPerSecondToPerMonth,
};
