import { Button } from "@/components/ui/simpleButton";
import DailogBtn from "./DailogBtn";
import useWalletStore from "@/store/store";

type Incoming = {
  title: string,
  generateWallet: () => void,
  toast: (params: { title: string; description: string }) => void;
}

const FncWallet = ({ title, generateWallet, toast }: Incoming) => {

  const {clearAllWallets} = useWalletStore();

  return (
    <div className="flex justify-between flex-col md:flex-row gap-3">
      <h1 className="text-3xl font-bold">{title} Wallets</h1>

      <div className="flex gap-5">
        <DailogBtn title={title} />
        <Button onClick={() => generateWallet()}>Add New Wallet</Button>
        <Button
          className="bg-red-900 text-white transition-colors hover:bg-red-800"
          onClick={(e) => {
            e.preventDefault();
            clearAllWallets(title);
            if(title == "Solana") {
              localStorage.removeItem("solWallets");
            }
            if(title == "Ethereum"){
              localStorage.removeItem("ethWallets");
            }
            toast({
              title: "Cleared",
              description: "All wallets have been deleted successfully",
            });
          }}
        >
          Clear All Wallets
        </Button>
      </div>
    </div>
  );
};

export default FncWallet;
