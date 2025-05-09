import { cookieStorage, createStorage, http } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  berachainBepolia,
  berachain,
  type AppKitNetwork,
} from '@reown/appkit/networks';

// Get projectId from https://cloud.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694'; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [berachain, berachainBepolia] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [berachain.id]: http(),
    [berachainBepolia.id]: http(),
  },
});

export const config = wagmiAdapter.wagmiConfig;
