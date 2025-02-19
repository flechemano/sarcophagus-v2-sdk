import { ethers } from 'ethers';
import { Api } from '../../src/Api';
import { SarcoWebBundlr } from '../../src/SarcoWebBundlr';
import { SarcoNetworkConfig } from '../../src/types';

const signer = ethers.Wallet.createRandom({});
jest.mock('ethers');
jest.mock('@sarcophagus-org/sarcophagus-v2-contracts');
jest.mock('../../src/SarcoWebBundlr');

describe('Api', () => {
  describe('Api Constructor', () => {
    test('should initialize with a contract address, signer, and url string', () => {
      const api = new Api(
        '0x0',
        signer,
        { subgraphUrl: 'subgraph/url/test' } as SarcoNetworkConfig,
        {} as SarcoWebBundlr
      );
      expect(api).toBeDefined();
    });

    test('should have an embalmerFacet instance', () => {
      const api = new Api(
        '0x0',
        signer,
        { subgraphUrl: 'subgraph/url/test' } as SarcoNetworkConfig,
        {} as SarcoWebBundlr
      );
      expect(api['embalmerFacet']).toBeDefined();
    });

    test('should set its subgraph url', () => {
      const api = new Api(
        '0x0',
        signer,
        { subgraphUrl: 'subgraph/url/test' } as SarcoNetworkConfig,
        {} as SarcoWebBundlr
      );
      expect(api['subgraphUrl']).toEqual('subgraph/url/test');
    });
  });
});
