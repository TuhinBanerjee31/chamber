import CustomFooter from "@/custom/CustomFooter";
import CustomHeader from "@/custom/CustomHeader";
import EthereumDisplay from "@/custom/EthereumDisplay";
import { Toaster } from "@/components/ui/toaster";

const EthereumWallets = () => {
  return (
    <div>
      <CustomHeader />
      <EthereumDisplay />
      <Toaster />
      <CustomFooter />
    </div>
  );
};

export default EthereumWallets;
