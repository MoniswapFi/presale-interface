// components/ConnectButton.tsx
"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import ContributeModal from "./ContributeModal";

const ConnectButton = () => {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openContributeModal = () => {
    setIsModalOpen(true);
  };

  const closeContributeModal = () => {
    setIsModalOpen(false);
  };

  // This wrapper ensures the entire area is clickable
  const handleWrapperClick = () => {
    if (address) {
      openContributeModal();
    }
  };

  return (
    <>
      <div
        onClick={handleWrapperClick}
        className="w-full h-full flex justify-center items-center cursor-pointer"
      >
        {address ? (
          <div className="font-bold text-lg">Contribute</div>
        ) : (
          <appkit-button />
        )}
      </div>
      <ContributeModal isOpen={isModalOpen} onClose={closeContributeModal} />
    </>
  );
};

export default ConnectButton;

// Container component
export const ContributeContainer = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center w-full mb-12">
      <div className="w-full bg-[#FF8902]/10 border py-4 border-[#FF8902] mb-6 text-center">
        <div className="font-bold text-xl font-['MinecraftRegular']">
          Contribute Below
        </div>
      </div>

      <div className="w-full max-w-md">
        {isConnected ? (
          <ConnectButton />
        ) : (
          <button className="w-full flex justify-center items-center bg-white text-black py-3 font-bold text-lg transition rounded">
            <ConnectButton />
          </button>
        )}
      </div>
    </div>
  );
};
