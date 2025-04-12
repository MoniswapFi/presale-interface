import { ETHER } from '@/config/constants';
import { useMemo } from 'react';
import { Address, erc20Abi, zeroAddress } from 'viem';
import { useAccount, useBalance, useReadContract } from 'wagmi';

export function useGetBalance(
  token: Address = zeroAddress,
  refetchInterval: number = 10000,
) {
  const { address } = useAccount();
  const { data: etherData = { value: BigInt(0) } } = useBalance({
    address,
    query: {
      enabled:
        token === zeroAddress || token.toLowerCase() === ETHER.toLowerCase(),
      refetchInterval,
    },
  });
  const { data: erc20Balance = BigInt(0) } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address ?? zeroAddress],
    query: {
      enabled:
        token !== zeroAddress && token.toLowerCase() !== ETHER.toLowerCase(),
      refetchInterval,
    },
  });

  return useMemo(
    () =>
      token.toLowerCase() === ETHER.toLowerCase() || token === zeroAddress
        ? etherData.value
        : erc20Balance,
    [token, etherData.value, erc20Balance],
  );
}
