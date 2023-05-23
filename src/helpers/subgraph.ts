import { SarcophagusRewrap } from '../types';

export interface ArchDataSubgraph {
  address: string;
  successes: string[];
  accusals: string;
  failures: string;
  peerId: string;
  freeBond: string;
  maximumResurrectionTime: string;
  maximumRewrapInterval: string;
  minimumDiggingFeePerSecond: string;
  curseFee: string;
}

export interface SarcoDataSubgraph {
  sarcoId: string;
  arweaveTxId: string;
  embalmer: string;
  publishes: string[];
  resurrectionTime: string;
  previousRewrapTime: string;
  blockTimestamp: string;
}

export interface SarcoRewrapsSubgraph {
  blockTimestamp: string;
  totalDiggingFees: string;
  rewrapSarcophagusProtocolFees: string;
}

async function queryGraphQl(subgraphUrl: string, query: string) {
  let response: Response;
  const fetchOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
  };

  if (window === undefined) {
    let fetch = require('isomorphic-fetch');
    response = await fetch(subgraphUrl, fetchOptions);
  } else {
    response = await fetch(subgraphUrl, fetchOptions);
  }

  const { data } = (await response!.json()) as { data: any };
  return data;
}

const getArchsQuery = `query {
    archaeologists (orderBy: blockTimestamp, first: 1000) {
        address
        successes
        accusals
        failures
        freeBond
        maximumResurrectionTime
        maximumRewrapInterval
        minimumDiggingFeePerSecond
        curseFee
        peerId
    }
  }`;

const getSarcoWithRewrapsQuery = (sarcoId: string) => {
  return `query {
    sarcophagusData (id: "${sarcoId}") {
        sarcoId
        resurrectionTime
        embalmer
        previousRewrapTime
        publishes
        arweaveTxId
        blockTimestamp
    },
    rewrapSarcophaguses (where:{sarcoId: "${sarcoId}"}) {
      blockTimestamp
      totalDiggingFees
      rewrapSarcophagusProtocolFees
    }
  }`;
};

const getSarcosQuery = (sarcoIds: string[]) => `query {
  sarcophagusDatas (where: {sarcoId_in: [${sarcoIds.map(id => `"${id}",`)}]}) {
      sarcoId
      resurrectionTime
      embalmer
      previousRewrapTime
      publishes
      arweaveTxId
      blockTimestamp
  }
}`;

const getSarcoRewrapsQuery = (sarcoId: string) => `query {
  rewrapSarcophaguses (where: {sarcoId: "${sarcoId}"}) {
    blockTimestamp
    totalDiggingFees
    rewrapSarcophagusProtocolFees
  }
}`;

export const getArchaeologists = async (subgraphUrl: string): Promise<ArchDataSubgraph[]> => {
  try {
    const { archaeologists } = (await queryGraphQl(subgraphUrl, getArchsQuery)) as {
      archaeologists: ArchDataSubgraph[];
    };
    return archaeologists;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to get archaeolgists from subgraph');
  }
};

export const getSubgraphSarcophagi = async (subgraphUrl: string, sarcoIds: string[]): Promise<SarcoDataSubgraph[]> => {
  try {
    const { sarcophagusDatas } = (await queryGraphQl(subgraphUrl, getSarcosQuery(sarcoIds))) as {
      sarcophagusDatas: SarcoDataSubgraph[];
    };

    return sarcophagusDatas;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to get sarcophagi from subgraph');
  }
};

export const getSubgraphSarcophagusWithRewraps = async (
  subgraphUrl: string,
  sarcoId: string
): Promise<SarcoDataSubgraph & { rewraps: SarcophagusRewrap[] }> => {
  try {
    const { sarcophagusData, rewrapSarcophaguses } = (await queryGraphQl(
      subgraphUrl,
      getSarcoWithRewrapsQuery(sarcoId)
    )) as {
      rewrapSarcophaguses: SarcophagusRewrap[];
      sarcophagusData: SarcoDataSubgraph;
    };

    return { ...sarcophagusData, rewraps: rewrapSarcophaguses };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to get sarcophagi from subgraph');
  }
};

export const getSarcophagusRewraps = async (subgraphUrl: string, sarcoId: string): Promise<SarcoRewrapsSubgraph[]> => {
  try {
    const { rewrapSarcophaguses } = (await queryGraphQl(subgraphUrl, getSarcoRewrapsQuery(sarcoId))) as {
      rewrapSarcophaguses: SarcoRewrapsSubgraph[];
    };

    return rewrapSarcophaguses;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to get rewraps from subgraph');
  }
};
