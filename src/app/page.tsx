"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/Logo.png";
import Rocket from "../../public/Rocket.png";
import { ContributeContainer } from "@/components/ConnectButton";

const Page = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set target date to March 22nd at 12:00 CST
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("March 25, 2025 12:00:00 CST");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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
              Join Moniswap Public Sale!
            </h1>
            <div className="text-center md:text-left">
              <p className="text-gray-300 mb-4">
                Join the Moniswap Token public sale and be part of an exciting
                journey on Berachain!
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded">
              <h2 className="text-xl mb-4">Your Contribution Data</h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>Total Commited</span>
                  <span>0.00 BERA</span>
                </div>

                <h3 className="text-lg mt-4">Distribution</h3>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>MONI</span>
                  <span>0.00</span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>veMONI 30 days</span>
                  <span>0.00</span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>veMONI 60 days</span>
                  <span>0.00</span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>veMONI 90 days</span>
                  <span>0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Sale Info */}
          <div className="bg-[#1E1E1E] p-6 rounded">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full mr-3">
                <Image src={Logo} alt="Logo" width={40} height={40} />
              </div>
              <h2 className="text-xl">Public Sale</h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">Ends In</p>
              <div className="grid grid-cols-4 gap-2 text-center bg-[#101014] p-4 rounded">
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-gray-400 text-sm">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-gray-400 text-sm">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-gray-400 text-sm">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-gray-400 text-sm">Seconds</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="w-full flex justify-between items-center my-3">
                  <span className="text-gray-400 text-xl">Progress</span>
                  <span className="text-xl">0%</span>
                </div>
                <div className="w-full bg-[#101014] h-2 ">
                  <div className="bg-[#FF8902] h-2  w-0"></div>
                </div>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Bera Rate</span>
                <span>0.06 BERA = 1 MONI</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>USDC Rate</span>
                <span>1 USDC = 200 MONI</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Goal</span>
                <span>10,000 BERA</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Raised</span>
                <span>0.00 BERA</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Available for Sale</span>
                <span>20,000,000 MONI</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Raise Network</span>
                <span>Berachain</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span>Total Investors</span>
                <span>0</span>
              </div>
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
                  background: "linear-gradient(to right, #474747, #191919)",
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: "linear-gradient(to right, #FF8902, #824BC2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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
                  background: "linear-gradient(to right, #474747, #191919)",
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: "linear-gradient(to right, #FF8902, #824BC2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  2
                </span>
              </div>
              <div>
                <h3 className="text-xl mb-1">Get BERA</h3>
                <p className="text-gray-400">
                  You&apos;ll use them to purchase tokens during the sale.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-4 rounded flex">
              <div
                className="w-16 h-16 flex items-center justify-center font-bold text-xl mr-4"
                style={{
                  background: "linear-gradient(to right, #474747, #191919)",
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: "linear-gradient(to right, #FF8902, #824BC2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  3
                </span>
              </div>
              <div>
                <h3 className="text-xl mb-1">Commit BERA</h3>
                <p className="text-gray-400">
                  Once the sale concludes, you&apos;ll be able to claim the tokens
                  you purchased.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-4 rounded flex">
              <div
                className="w-16 h-16 flex items-center justify-center font-bold text-xl mr-4"
                style={{
                  background: "linear-gradient(to right, #474747, #191919)",
                }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    background: "linear-gradient(to right, #FF8902, #824BC2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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
                $MONI is Moniswap&apos;s ERC-20 utility token, enabling transactions
                and interactions within our ecosystem.
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
              <p>
                You can claim your tokens on March the 28th, one day after the
                public sale ends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
