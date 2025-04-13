import { type Address } from 'viem';

// Chain IDs
export const ChainIds = {
  bepolia: 80069,
  berachain: 80094,
};

export const SaleContracts: { [key: number]: Address } = {
  [ChainIds.bepolia]: '0x7C6E8e39494f2a84C4e2D28a2a59DC70CA110B7c',
  [ChainIds.berachain]: '0x829b614ddAdb745D2586CEAdAc52bb35eCC9cEC6',
};

export const ETHER = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
