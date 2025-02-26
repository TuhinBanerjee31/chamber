import { Button } from "@/components/ui/simpleButton";
import { Link } from "react-router";
import { useToast } from "@/hooks/use-toast";
import hero from "@/assets/hero-img.png";
import sol_logo from "../assets/sol_logo.webp";
import eth_logo from "../assets/eth_logo.webp";
import { ChevronsDown } from "lucide-react";

const DefaultDisplay = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen mx-auto ">
      <div className="flex flex-col justify-center items-center px-5 gap-4 pt-5 pb-10">
        <h1 className="text-3xl md:text-5xl font-bold">
          <span className="text-muted-foreground">web-based</span> crypto
          wallet,
        </h1>
        <h2 className="tracking-wider">supports multiple blockchains</h2>
        <img src={hero} className="w-[45vh] mt-5" />
        <ChevronsDown size={50} className="animate-bounce mt-5" />
      </div>

      <div className="min-h-[50vh] bg-[#66666d] m-4 rounded-lg py-10 px-5">
        <h2 className="text-4xl font-semibold text-center">
          Availble Blockchains
        </h2>
        <h3 className="text-xl text-center py-2">
          Choose a blockchain to get started.
        </h3>

        <div className="max-w-screen-lg bg-[#b9bac0] mt-10 mx-auto rounded-md flex flex-col md:flex-row items-center">
          <img src={sol_logo} className="w-48" />

          <div className="p-4">
            <h3 className="text-2xl font-bold">Solana</h3>
            <h4 className="text-lg max-w-screen-md">
              Solana is a high-performance blockchain known for its fast
              transactions, low fees, and scalable architecture.
            </h4>
            <div className="flex gap-5 py-4">
              <Link to={"/solana-wallets"}>
                <Button
                  onClick={() => {
                    toast({
                      title: "Solana Wallet Selected",
                      description: "Please generate secert phrase to continue.",
                    });
                  }}
                >
                  Wallet Chamber
                </Button>
              </Link>

              <a href="https://en.wikipedia.org/wiki/Solana_(blockchain_platform)" target="_blank">
                <Button>Info</Button>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-lg bg-[#b9bac0] mt-10 mx-auto rounded-md flex flex-col md:flex-row items-center">
          <img src={eth_logo} className="w-48 p-5" />

          <div className="p-4">
            <h3 className="text-2xl font-bold">Ethereum</h3>
            <h4 className="text-lg max-w-screen-md">
              Ethereum is a decentralized blockchain platform enabling smart
              contracts and dApps, known for its flexibility but facing
              scalability challenges.
            </h4>
            <div className="flex gap-5 py-4">
              <Link to={"/ethereum-wallets"}>
                <Button
                  onClick={() => {
                    toast({
                      title: "Ethereum Wallet Selected",
                      description: "Please generate secert phrase to continue.",
                    });
                  }}
                >
                  Wallet Chamber
                </Button>
              </Link>

              <a href="https://en.wikipedia.org/wiki/Ethereum" target="_blank">
                <Button>Info</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultDisplay;
