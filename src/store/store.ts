import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Wallet {
  path: string;
  publicKey: string;
  privateKey: string;
  balance: string;
}

interface StoreState {
  solMnemonic: string;
  ethMnemonic: string;
  solWallet: Wallet[];
  ethWallet: Wallet[];
  setMnemonic: (title: string, mnemonic: string) => void;
  addWallet: (title: string, walletData: Wallet) => void;
  clearWallet: (title: string, path: string) => void;
  clearAllWallets: (title: string) => void;
}

const useWalletStore = create<StoreState>()(
  persist(
    (set) => ({
      solMnemonic: "",
      ethMnemonic: "",
      solWallet: [],
      ethWallet: [],
      setMnemonic: (title, mnemonic) => {
        if (title == "Solana") {
          set({ solMnemonic: mnemonic });
        }
        if (title == "Ethereum") {
          set({ ethMnemonic: mnemonic });
        }
      },
      addWallet: (title, walletData) => {
        if (title == "Solana") {
          set((state) => ({
            solWallet: [...state.solWallet, { ...walletData }],
          }));
        }
        if (title == "Ethereum") {
          set((state) => ({
            ethWallet: [...state.ethWallet, { ...walletData }],
          }));
        }
      },
      clearWallet: (title, path) => {
        if (title == "Solana") {
          set((state) => ({
            solWallet: state.solWallet.filter((wallet) => wallet.path !== path),
          }));
        }
        if (title == "Ethereum") {
          set((state) => ({
            ethWallet: state.ethWallet.filter((wallet) => wallet.path !== path),
          }));
        }
      },
      clearAllWallets: (title) => {
        if (title == "Solana") {
          set({
            solWallet: [],
          });
        }
        if (title == "Ethereum") {
          set({
            ethWallet: [],
          });
        }
      },
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWalletStore;
