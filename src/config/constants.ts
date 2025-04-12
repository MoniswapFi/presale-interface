import { type Address } from 'viem';

// Chain IDs
export const ChainIds = {
  bepolia: 80069,
};

export const SaleContracts: { [key: number]: Address } = {
  [ChainIds.bepolia]: '0x7C6E8e39494f2a84C4e2D28a2a59DC70CA110B7c',
};

export const ETHER = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
