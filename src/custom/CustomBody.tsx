import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import SolanaDisplay from "./SolanaDisplay";
import EthereumDisplay from "./EthereumDisplay";
import DefaultDisplay from "./DefaultDisplay";

const CustomBody = () => {
  const [status, setStatus] = useState("default");
  const { toast } = useToast();

  const handleSolanaStart = (): void => {
    setStatus("solana");
    toast({
      title: "Solana Wallet Selected",
      description: "Please generate secert phrase to continue.",
    });
  };

  const handleEthereumStart = (): void => {
    setStatus("ethereum");
    toast({
      title: "Ethereum Wallet Selected",
      description: "Please generate secert phrase to continue.",
    });
  };

  return (
    <div>
      {status == "default" && <DefaultDisplay solanaStart={ handleSolanaStart } ethereumStart={handleEthereumStart} />}

      {status == "solana" && <SolanaDisplay />}

      {status == "ethereum" && <EthereumDisplay />}
      <Toaster />
    </div>
  );
};

export default CustomBody;
