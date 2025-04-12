import { Address, erc20Abi, zeroAddress } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

export function useERC20Metadata(token: Address = zeroAddress) {
  function useDecimals() {
    const { data = 0 } = useReadContract({
      abi: erc20Abi,
      address: token,
      functionName: 'decimals',
      query: { enabled: token !== zeroAddress },
    });
    return data;
  }

  function useName() {
    const { data = '' } = useReadContract({
      abi: erc20Abi,
      address: token,
      functionName: 'name',
      query: { enabled: token !== zeroAddress },
    });
    return data;
  }

  function useSymbol() {
    const { data = '' } = useReadContract({
      abi: erc20Abi,
      address: token,
      functionName: 'symbol',
      query: { enabled: token !== zeroAddress },
    });
    return data;
  }

  return { useName, useDecimals, useSymbol };
}

export function useERC20Allowance(token: Address = zeroAddress) {
  const { address = zeroAddress } = useAccount();
  const { writeContract } = useWriteContract();
  function useCheckAllowance(
    spender: Address = zeroAddress,
    amount: bigint = BigInt(0),
    refetchInterval: number = 10000,
  ) {
    const { data = BigInt(0) } = useReadContract({
      abi: erc20Abi,
      address: token,
      functionName: 'allowance',
      args: [address, spender],
      query: {
        enabled:
          amount > BigInt(0) &&
          spender !== zeroAddress &&
          address !== zeroAddress,
        refetchInterval,
      },
    });
    return data >= amount;
  }

  function grantAllowance(
    spender: Address = zeroAddress,
    amount: bigint = BigInt(0),
    onSuccess?: (hash: `0x${string}`) => void,
    onError?: (error: any) => void,
  ) {
    return writeContract(
      {
        abi: erc20Abi,
        address: token,
        functionName: 'approve',
        args: [spender, amount],
      },
      { onSuccess, onError },
    );
  }

  return { useCheckAllowance, grantAllowance };
}
