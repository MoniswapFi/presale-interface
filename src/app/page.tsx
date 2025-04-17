'use client';
import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/Logo.png';
import Rocket from '../../public/Rocket.png';
import { ContributeContainer } from '@/components/ConnectButton';
import {
  useSaleExecutables,
  useSaleReadables,
} from '@/hooks/onchain/useSaleHooks';
import { useAtomicDate } from '@/hooks/misc/useAtomicDate';
import { useERC20Metadata } from '@/hooks/onchain/useERC20Hooks';
import { formatUnits } from 'viem';
import { toSF } from '@/utils/format';

const releaseSchedule = [
  {
    percentageRelease: 30,
    label: 'MONI',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 30 days',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 60 days',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 90 days',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 120 days',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 150 days',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 180 days',
  },
  {
    percentageRelease: 10,
    label: 'veMONI 210 days',
  },
];

const Page = () => {
  const now = useAtomicDate();
  const {
    useSoldToken,
    useDuration,
    useStartTime,
    useAccountContributions,
    useSlotFilled,
    useSlotLeft,
    useExchangeToken,
    useRate,
  } = useSaleReadables();
  const startTime = useStartTime();
  const duration = useDuration();
  const contributions = useAccountContributions();
  const slotFilled = useSlotFilled();
  const slotLeft = useSlotLeft();
  const exchangeToken = useExchangeToken();
  const soldToken = useSoldToken();
  const rate = useRate();

  const {
    useDecimals: useExchangeTokenDecimals,
    useSymbol: useExchangeTokenSymbol,
  } = useERC20Metadata(exchangeToken);
  const { useDecimals: useSoldTokenDecimals, useSymbol: useSoldTokenSymbol } =
    useERC20Metadata(soldToken);
  const exchangeTokenSymbol = useExchangeTokenSymbol();
  const exchangeTokenDecimals = useExchangeTokenDecimals();
  const soldTokenSymbol = useSoldTokenSymbol();
  const soldTokenDecimals = useSoldTokenDecimals();

  const goal = useMemo(() => {
    const total = slotLeft + slotFilled;
    const g =
      rate > BigInt(0)
        ? (total * BigInt(10 ** exchangeTokenDecimals)) / rate
        : BigInt(0);
    return g;
  }, [slotLeft, slotFilled, exchangeTokenDecimals, rate]);

  const raised = useMemo(() => {
    return rate > BigInt(0)
      ? (slotFilled * BigInt(10 ** exchangeTokenDecimals)) / rate
      : BigInt(0);
  }, [slotFilled, rate, exchangeTokenDecimals]);

  const exchangeTokenRate = useMemo(() => {
    return rate > BigInt(0)
      ? (BigInt(1) *
          BigInt(10 ** exchangeTokenDecimals) *
          BigInt(10 ** soldTokenDecimals)) /
          rate
      : BigInt(0);
  }, [rate, soldTokenDecimals, exchangeTokenDecimals]);

  const allocation = useMemo(() => {
    return (contributions * rate) / BigInt(10 ** exchangeTokenDecimals);
  }, [contributions, rate, exchangeTokenDecimals]);

  const progress = useMemo(() => {
    const total = slotLeft + slotFilled;
    const p =
      total > BigInt(0) ? (slotFilled * BigInt(10 ** 4)) / total : BigInt(0);
    return Number(p) / 10 ** 2;
  }, [slotLeft, slotFilled]);

  const { isStart, timeLeft } = useMemo(() => {
    const trimmedNow = Math.floor(now.getTime() / 1000);
    const isStart = BigInt(trimmedNow) <= startTime;
    const timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const asNumber = !isStart
      ? Number(startTime + duration)
      : Number(startTime);

    const diff = asNumber - trimmedNow;
    timeLeft.days = Math.floor(diff / (60 * 60 * 24)) % 30;
    timeLeft.hours = Math.floor(diff / (60 * 60)) % 24;
    timeLeft.minutes = Math.floor(diff / 60) % 60;
    timeLeft.seconds = diff % 60;
    return { isStart, timeLeft };
  }, [now, startTime, duration]);

  const { claim } = useSaleExecutables();
  const [isLoading, setIsLoading] = useState(false);
  const isOpenForClaim = useMemo(
    () =>
      !isStart &&
      timeLeft.days <= 0 &&
      timeLeft.hours <= 0 &&
      timeLeft.minutes <= 0 &&
      timeLeft.seconds <= 0,
    [isStart, timeLeft],
  );

  const submit = useCallback(() => {
    if (!isOpenForClaim) return;
    setIsLoading(true);
    claim(
      () => setIsLoading(false),
      () => setIsLoading(false),
    );
  }, [isOpenForClaim, claim]);

  return (
    <div className="w-full min-h-screen bg-[#101014] text-white font-['MinecraftRegular',sans-serif] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Title and Rocket */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="w-32 h-32 flex items-center justify-center mb-4 md:mb-0">
            <Image src={Rocket} alt="Rocket" width={128} height={128} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Panel - Title and Contribution Data */}
          <div>
            <h1 className="text-3xl md:text-5xl text-orange-500 mb-6">
              Join Moniswap Private Sale!
            </h1>
            <div className="text-center md:text-left">
              <p className="text-gray-300 mb-4">
                Join the Moniswap Token private sale and be part of an exciting
                journey on Berachain!
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded">
              <h2 className="text-xl mb-4">Your Contribution Data</h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>Total Commited</span>
                  <span>
                    {toSF(formatUnits(contributions, exchangeTokenDecimals))}{' '}
                    {exchangeTokenSymbol}
                  </span>
                </div>

                <h3 className="text-lg mt-4">Distribution</h3>
                {releaseSchedule.map((rs, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-700 pb-2"
                  >
                    <span>{rs.label}</span>
                    <span>
                      {toSF(
                        formatUnits(
                          BigInt(rs.percentageRelease) *
                            BigInt(100) *
                            allocation,
                          soldTokenDecimals + 4,
                        ),
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Sale Info */}
          <div className="bg-[#1E1E1E] p-6 rounded">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full mr-3">
                <Image src={Logo} alt="Logo" width={40} height={40} />
              </div>
              <h2 className="text-xl">Private Sale</h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">
                {isStart ? 'Starts In' : 'Ends In'}
              </p>
              <div className="grid grid-cols-4 gap-2 text-center bg-[#101014] p-4 rounded">
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 text-sm">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 text-sm">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 text-sm">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 text-sm">Seconds</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="w-full flex justify-between items-center my-3">
                  <span className="text-gray-400 text-xl">Progress</span>
                  <span className="text-xl">{toSF(progress, 2)}%</span>
                </div>
                <div className="w-full bg-[#101014] h-2 ">
                  <div
                    className="bg-[#FF8902] h-2"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>{soldTokenSymbol} Rate</span>
                <span>
                  {toSF(
                    formatUnits(exchangeTokenRate, exchangeTokenDecimals),
                    4,
                  )}{' '}
                  {exchangeTokenSymbol} = 1 {soldTokenSymbol}
                </span>
              </div>

              {/* <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>USDC Rate</span>
                <span>1 USDC = 200 MONI</span>
              </div> */}

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Goal</span>
                <span>
                  {toSF(formatUnits(goal, exchangeTokenDecimals))}{' '}
                  {exchangeTokenSymbol}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Raised</span>
                <span>
                  {toSF(formatUnits(raised, exchangeTokenDecimals))}{' '}
                  {exchangeTokenSymbol}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Available for Sale</span>
                <span>
                  {toSF(formatUnits(slotLeft, soldTokenDecimals))}{' '}
                  {soldTokenSymbol}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Raise Network</span>
                <span>Berachain</span>
              </div>

              <button
                onClick={submit}
                disabled={isLoading || !isOpenForClaim}
                className="w-full bg-white text-black py-4 text-xl font-bold mb-8 cursor-pointer my-7"
              >
                {isLoading ? (
                  'Loading...'
                ) : (
                  <>{isOpenForClaim ? 'Claim' : 'Cannot claim now'}</>
                )}
              </button>

              {/* <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Total Investors</span>
                <span>0</span>
              </div> */}
            </div>
          </div>
        </div>

        <ContributeContainer />

        {/* How to take part section */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6">How to take part?</h2>

          <div className="space-y-4">
            <div className="bg-[#1E1E1E] p-4 rounded flex">
              <div
                className="w-16 h-16 flex items-center justify-center font-bold text-xl mr-4"
                style={{
                  background: 'linear-gradient(to right, #474747, #191919)',
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: 'linear-gradient(to right, #FF8902, #824BC2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  1
                </span>
              </div>
              <div>
                <h3 className="text-xl mb-1">Connect your wallet</h3>
                <p className="text-gray-400">
                  You&apos;ll require a compatible wallet to participate in the
                  Public sale!
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-4 rounded flex ">
              <div
                className="w-16 h-16 flex items-center justify-center font-bold text-xl mr-4"
                style={{
                  background: 'linear-gradient(to right, #474747, #191919)',
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: 'linear-gradient(to right, #FF8902, #824BC2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  2
                </span>
              </div>
              <div>
                <h3 className="text-xl mb-1">Get {exchangeTokenSymbol}</h3>
                <p className="text-gray-400">
                  You&apos;ll use them to purchase tokens during the sale.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-4 rounded flex">
              <div
                className="w-16 h-16 flex items-center justify-center font-bold text-xl mr-4"
                style={{
                  background: 'linear-gradient(to right, #474747, #191919)',
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: 'linear-gradient(to right, #FF8902, #824BC2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  3
                </span>
              </div>
              <div>
                <h3 className="text-xl mb-1">Commit {exchangeTokenSymbol}</h3>
                <p className="text-gray-400">
                  Once the sale concludes, you&apos;ll be able to claim the
                  tokens you purchased.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-4 rounded flex">
              <div
                className="w-16 h-16 flex items-center justify-center font-bold text-xl mr-4"
                style={{
                  background: 'linear-gradient(to right, #474747, #191919)',
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: 'linear-gradient(to right, #FF8902, #824BC2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  4
                </span>
              </div>
              <div>
                <h3 className="text-xl mb-1">Claim your tokens</h3>
                <p className="text-gray-400">
                  After the sale finishes, you can start claiming tokens that
                  you bought.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl mb-6">FAQ</h2>

          <div className="space-y-4">
            <div className="bg-[#1E1E1E] p-6 rounded">
              <h3 className="text-xl mb-4">
                What is the difference between $MONI and $veMONI?
              </h3>
              <p className="mb-4">
                $MONI is Moniswap&apos;s ERC-20 utility token, enabling
                transactions and interactions within our ecosystem.
              </p>
              <p className="mb-4">
                $veMONI, on the other hand, is the vote-escrow version of $MONI,
                an ERC-721 governance token in the form of an NFT (non-fungible
                token).
              </p>
              <p>
                Holders can exercise voting rights in weekly pool elections and
                earn a proportionate share of the trading fees and incentives
                tied to their chosen pools.
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded">
              <h3 className="text-xl mb-4">
                What does it mean that the $veMONI is locked?
              </h3>
              <p className="mb-4">
                $veMONI represents $MONI tokens that have been time-locked. As a
                $veMONI holder, you retain complete ownership and can utilize
                its governance power.
              </p>
              <p>
                After the locked period, you can redeem your $veMONI back to the
                freely tradable $MONI.
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded">
              <h3 className="text-xl mb-4">
                What are the benefits of the $veMONI token?
              </h3>
              <p className="mb-4">
                $veMONI holders can vote for gauges weekly, and access 100% of
                the trading fees and bribes for the associated pool. Also, they
                can partake in governance and cast votes for the protocol
                improvement proposals.
              </p>
              <p>$veMONI voters receive:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Trading fees generated by the pool(s) they vote for</li>
                <li>Bribes deposited for the pools they vote for</li>
                <li>Weekly veMONI distribution (rebase)</li>
              </ul>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded">
              <h3 className="text-xl mb-4">When can I claim my tokens?</h3>
              <p>You can claim your tokens during TGE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
