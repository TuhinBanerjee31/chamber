import { Button } from "@/components/ui/simpleButton";
import DailogBtn from "./DailogBtn";

const FncWallet = ({ title, generateWallet, setWallets, setMnemonic, toast }) => {
  return (
    <div className="flex justify-between flex-col md:flex-row gap-3">
      <h1 className="text-3xl font-bold">{title} Wallets</h1>

      <div className="flex gap-5">
        <DailogBtn setMnemonic={setMnemonic} setWallets={setWallets} />
        <Button onClick={() => generateWallet()}>Add New Wallet</Button>
        <Button
          className="bg-red-900 text-white transition-colors hover:bg-red-800"
          onClick={() => {
            setWallets([]);
            localStorage.removeItem("solWallets");
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
