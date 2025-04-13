import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import * as Sale from '@/config/abis/Sale';
import { useMemo } from 'react';
import { ETHER, SaleContracts } from '@/config/constants';
import { zeroAddress } from 'viem';

export function useSaleReadables() {
  const chainId = useChainId();
  const sale = useMemo(() => SaleContracts[chainId], [chainId]);
  const { address = zeroAddress } = useAccount();

  function useAccountContributions(refetchInterval: number = 5000) {
    const { data = BigInt(0) } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'contributions',
      args: [address],
      query: {
        enabled: !!sale && sale !== zeroAddress && address !== zeroAddress,
        refetchInterval,
      },
    });
    return data;
  }

  function useSlotLeft(refetchInterval: number = 5000) {
    const { data = BigInt(0) } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'slotLeft',
      query: {
        enabled: !!sale && sale !== zeroAddress && address !== zeroAddress,
        refetchInterval,
      },
    });
    return data;
  }

  function useSlotFilled(refetchInterval: number = 5000) {
    const { data = BigInt(0) } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'slotFilled',
      query: {
        enabled: !!sale && sale !== zeroAddress && address !== zeroAddress,
        refetchInterval,
      },
    });
    return data;
  }

  function useRate(refetchInterval: number = 5000) {
    const { data = BigInt(0) } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'rate',
      query: {
        enabled: !!sale && sale !== zeroAddress && address !== zeroAddress,
        refetchInterval,
      },
    });
    return data;
  }

  function useSoldToken() {
    const { data = zeroAddress } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'soldToken',
    });
    return data;
  }

  function useExchangeToken() {
    const { data = zeroAddress } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'exchangeToken',
    });
    return data;
  }

  function useStartTime() {
    const { data = BigInt(0) } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'startTime',
    });
    return data;
  }

  function useDuration() {
    const { data = BigInt(0) } = useReadContract({
      ...Sale,
      address: sale,
      functionName: 'duration',
    });
    return data;
  }

  return {
    useAccountContributions,
    useSlotLeft,
    useSlotFilled,
    useRate,
    useSoldToken,
    useExchangeToken,
    useStartTime,
    useDuration,
  };
}

export function useSaleExecutables() {
  const chainId = useChainId();
  const sale = useMemo(() => SaleContracts[chainId], [chainId]);
  const { useExchangeToken } = useSaleReadables();
  const exchangeToken = useExchangeToken();
  const { writeContract } = useWriteContract();

  function contribute(
    amount: bigint,
    onSuccess?: (hash: `0x${string}`) => void,
    onError?: (error: any) => void,
  ) {
    return writeContract(
      {
        ...Sale,
        address: sale,
        functionName: 'contribute',
        args: [amount],
        value:
          exchangeToken.toLowerCase() === ETHER.toLowerCase()
            ? amount
            : BigInt(0),
      },
      { onSuccess, onError },
    );
  }

  function claim(
    onSuccess?: (hash: `0x${string}`) => void,
    onError?: (error: any) => void,
  ) {
    return writeContract(
      {
        ...Sale,
        address: sale,
        functionName: 'claimAllocation',
      },
      { onSuccess, onError },
    );
  }

  return { contribute, claim };
}
