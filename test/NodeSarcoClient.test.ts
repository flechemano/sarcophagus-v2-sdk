import Bundlr from '@bundlr-network/client/build/cjs/node/bundlr';
import { privateKey } from './api/test-data';
import { ethers } from 'ethers';
import { NodeSarcoClient } from '../src/NodeSarcoClient';

// Mocks
jest.mock('libp2p', () => {
  return {
    Libp2p: jest.fn(),
  };
});
jest.mock('@bundlr-network/client/build/cjs/node/bundlr');
jest.mock('../src/Api', () => {
  // Mock class
  return {
    Api: jest.fn().mockImplementation(() => {
      return { someApiMethod: jest.fn() }; // Mock the methods as needed
    }),
  };
});
jest.mock('../src/Archaeologist', () => {
  // Mock class
  return {
    ArchaeologistApi: jest.fn(),
  };
});
jest.mock('ethers', () => {
  const ethersMock = jest.requireActual('ethers');
  return {
    ...ethersMock,
    ethers: {
      ...ethersMock.ethers,
      providers: {
        ...ethersMock.ethers.providers,
        JsonRpcProvider: jest.fn(),
        getDefaultProvider: jest.fn(),
        Web3Provider: jest.fn().mockImplementation(() => {
          return { getSigner: jest.fn() };
        }),
      },
    },
  };
});
jest.mock('../src/Token', () => {
  // Mock class
  return {
    Token: jest.fn().mockImplementation(() => {
      return { someTokenMethod: jest.fn() }; // Mock the methods as needed
    }),
  };
});
jest.mock('../src/libp2p_node', () => {
  return { bootLibp2p: jest.fn() };
});

const BundlrMock = Bundlr as jest.Mocked<typeof Bundlr>;
const JsonRpcProviderMock = ethers.providers.JsonRpcProvider as jest.MockedClass<
  typeof ethers.providers.JsonRpcProvider
>;
const Web3ProviderMock = ethers.providers.Web3Provider as jest.MockedClass<typeof ethers.providers.Web3Provider>;

// Test setup
describe('NodeSarcoClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with a private key', () => {
      const mockProviderUrl = 'mockProviderUrl';
      // Set up your mocks
      const mockJsonRpcProvider = {};
      const mockWeb3Provider = { getSigner: jest.fn() };
      JsonRpcProviderMock.mockReturnValue(mockJsonRpcProvider as any);
      Web3ProviderMock.mockReturnValue(mockWeb3Provider as any);

      const sarco = new NodeSarcoClient({ privateKey, providerUrl: mockProviderUrl });

      expect(sarco).toBeDefined();
      expect(JsonRpcProviderMock).toHaveBeenCalledWith(mockProviderUrl);
      expect(Web3ProviderMock).toHaveBeenCalledWith(mockJsonRpcProvider);
      expect(mockWeb3Provider.getSigner).toHaveBeenCalled();
    });
  });
});
