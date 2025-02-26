import CustomFooter from "@/custom/CustomFooter";
import CustomHeader from "@/custom/CustomHeader";
import SolanaDisplay from "@/custom/SolanaDisplay";
import { Toaster } from "@/components/ui/toaster";

const SolanaWallets = () => {
  return (
    <div>
      <CustomHeader />
      <SolanaDisplay />
      <Toaster />
      <CustomFooter />
    </div>
  );
};

export default SolanaWallets;
