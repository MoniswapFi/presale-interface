// components/ContributeModal.tsx
"use client";
import Image from "next/image";

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContributeModal = ({ isOpen, onClose }: ContributeModalProps) => {
  // No state needed in this component yet

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click was directly on the backdrop, not on the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 font-['MinecraftRegular',sans-serif]"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#1A1A1A] text-white rounded-none w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl">Contribute BERA</h2>
          <button onClick={onClose} className="text-white text-2xl">
            ×
          </button>
        </div>

        {/* Contribute Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span>Contribute</span>
            <span>Wallet: 0.00</span>
          </div>

          <div className="bg-[#2A2A2A] p-4 flex items-center">
            <div className="mr-4">
              <Image src="/USDC.svg" width={40} height={40} alt="BERA" />
            </div>
            <span className="text-2xl">0.00</span>
          </div>
        </div>

        {/* Receive Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span>Receive</span>
            <span>Purchased: 0.00</span>
          </div>

          <div className="bg-[#2A2A2A] p-4 flex items-center">
            <div className="mr-4">
              <Image src="/Logo.svg" width={40} height={40} alt="MONI" />
            </div>
            <span className="text-2xl">0.00</span>
          </div>
        </div>

        {/* Contribute Button */}
        <button className="w-full bg-white text-black py-4 text-xl font-bold mb-8">
          Contribute
        </button>

        {/* Footer Message */}
        <p className="text-center text-[#FF8902]">
          Once the sale concludes, you&apos;ll be able to claim
          <br />
          the tokens you purchased.
        </p>
      </div>
    </div>
  );
};

export default ContributeModal;
