// components/ContributeModal.tsx
'use client';
import Image from 'next/image';
import { X } from 'lucide-react';
import {
  useSaleExecutables,
  useSaleReadables,
} from '@/hooks/onchain/useSaleHooks';
import { useGetBalance } from '@/hooks/onchain/useBalanceHooks';
import {
  useERC20Allowance,
  useERC20Metadata,
} from '@/hooks/onchain/useERC20Hooks';
import { useCallback, useMemo, useState } from 'react';
import { toSF } from '@/utils/format';
import { formatUnits, parseUnits } from 'viem';
import { useChainId } from 'wagmi';
import { SaleContracts } from '@/config/constants';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContributeModal = ({ isOpen, onClose }: ContributeModalProps) => {
  const [contributionAmount, setContributionAmount] = useState(0);
  const chainId = useChainId();
  const { useSoldToken, useAccountContributions, useExchangeToken, useRate } =
    useSaleReadables();

  const contributions = useAccountContributions();
  const rate = useRate();
  const exchangeToken = useExchangeToken();
  const soldToken = useSoldToken();
  const balance = useGetBalance(exchangeToken);

  const {
    useDecimals: useExchangeTokenDecimals,
    useSymbol: useExchangeTokenSymbol,
  } = useERC20Metadata(exchangeToken);
  const { useDecimals: useSoldTokenDecimals } = useERC20Metadata(soldToken);
  const exchangeTokenSymbol = useExchangeTokenSymbol();
  const exchangeTokenDecimals = useExchangeTokenDecimals();
  const soldTokenDecimals = useSoldTokenDecimals();

  const sales = useMemo(() => SaleContracts[chainId], [chainId]);

  const allocation = useMemo(() => {
    return (contributions * rate) / BigInt(10 ** exchangeTokenDecimals);
  }, [contributions, rate, exchangeTokenDecimals]);

  const received = useMemo(() => {
    return (
      (parseUnits(String(contributionAmount), exchangeTokenDecimals) * rate) /
      BigInt(10 ** exchangeTokenDecimals)
    );
  }, [contributionAmount, rate, exchangeTokenDecimals]);

  const { useCheckAllowance, grantAllowance } =
    useERC20Allowance(exchangeToken);
  const { contribute } = useSaleExecutables();
  const isAllowed = useCheckAllowance(
    sales,
    parseUnits(String(contributionAmount), exchangeTokenDecimals),
  );

  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(() => {
    setIsLoading(true);
    if (!isAllowed) {
      grantAllowance(
        sales,
        parseUnits(String(contributionAmount), exchangeTokenDecimals),
        () => setIsLoading(false),
      );
      return;
    }
    contribute(
      parseUnits(String(contributionAmount), exchangeTokenDecimals),
      () => {
        setContributionAmount(0);
        setIsLoading(false);
      },
    );
  }, [
    isAllowed,
    sales,
    contributionAmount,
    exchangeTokenDecimals,
    setContributionAmount,
    setIsLoading,
    grantAllowance,
    contribute,
  ]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click was directly on the backdrop, not on the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 font-['MinecraftRegular',sans-serif]"
        onClick={handleBackdropClick}
      >
        <div className="bg-[#1A1A1A] text-white rounded-none w-full max-w-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl">Contribute {exchangeTokenSymbol}</h2>
            <button
              onClick={onClose}
              className="text-white text-2xl cursor-pointer"
            >
              <X />
            </button>
          </div>

          {/* Contribute Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span>Contribute</span>
              <span>
                Wallet: {toSF(formatUnits(balance, exchangeTokenDecimals))}
              </span>
            </div>

            <div className="bg-[#2A2A2A] p-4 flex items-center">
              <div className="mr-4">
                <Image src="/USDC.svg" width={40} height={40} alt="BERA" />
              </div>
              <input
                value={String(contributionAmount)}
                type="number"
                className="text-2xl bg-transparent outline-0 px-3 py-3"
                onChange={(e) => {
                  const value = e.target.valueAsNumber;
                  const realValue = !isNaN(value)
                    ? value
                    : String(contributionAmount).length <= 1
                    ? 0
                    : contributionAmount;
                  setContributionAmount(realValue);
                }}
              />
            </div>
          </div>

          {/* Receive Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span>Receive</span>
              <span>
                Purchased: {toSF(formatUnits(allocation, soldTokenDecimals))}
              </span>
            </div>

            <div className="bg-[#2A2A2A] p-4 flex items-center">
              <div className="mr-4">
                <Image src="/Logo.svg" width={40} height={40} alt="MONI" />
              </div>
              <span className="text-2xl">
                {toSF(formatUnits(received, soldTokenDecimals))}
              </span>
            </div>
          </div>

          {/* Contribute Button */}
          <button
            onClick={submit}
            disabled={isLoading || contributionAmount <= 0}
            className="w-full bg-white text-black py-4 text-xl font-bold mb-8 cursor-pointer"
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                {isAllowed
                  ? 'Contribute'
                  : 'Approve to spend ' + exchangeTokenSymbol}
              </>
            )}
          </button>

          {/* Footer Message */}
          <p className="text-center text-[#FF8902]">
            Once the sale concludes, you&apos;ll be able to claim
            <br />
            the tokens you purchased.
          </p>
        </div>
      </div>
    )
  );
};

export default ContributeModal;
