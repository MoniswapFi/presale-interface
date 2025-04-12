// components/ContributeContainer.tsx
'use client';
import ConnectButton from './ConnectButton';

const ContributeContainer = () => {
  return (
    <div className="flex justify-center w-full mb-12 bg-[#FF8902]/10 border py-4 border-[#FF8902]">
      <div className="w-full max-w-md">
        <ConnectButton />
      </div>
    </div>
  );
};

export default ContributeContainer;
