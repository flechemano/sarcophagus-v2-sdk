export { WebSarcoClient } from './browser/WebSarcoClient';
export { goerliNetworkConfig, mainnetNetworkConfig, sepoliaNetworkConfig } from './shared/networkConfig';
export { sarco } from './browser/index';
export type {
  ArchaeologistData,
  ArchaeologistEncryptedShard,
  SarcophagusArchaeologist,
  ArchaeologistException,
} from './shared/types/archaeologist';
export type { SarcophagusData, SarcophagusDetails } from './shared/types/sarcophagi';
export { SarcophagusState } from './shared/types/sarcophagi';
export type { SarcoNetworkConfig } from './shared/types/index';
