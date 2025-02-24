import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import GeneratePhrase from "./GeneratePhrase";
import PhraseHolder from "./PhraseHolder";
import FncWallet from "./FncWallet";
import WalletBox from "./WalletBox";

type Wallet = {
  path: string;
  publicKey: string;
  privateKey: string;
  balance: string;
};

const EthereumDisplay = () => {
  const [ethMnemonic, setEthMnemonic] = useState("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showKey, setShowKey] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    if (
      localStorage.getItem("ethMnemonic") &&
      localStorage.getItem("ethWallets")
    ) {
      const val = localStorage.getItem("ethMnemonic") || "";
      const wlt = localStorage.getItem("ethWallets") || "";

      setEthMnemonic(JSON.parse(val));
      setWallets(JSON.parse(wlt));
      console.log(val.split(" "));
      console.log("on mount");
    }
  }, []);

  const getBalance = async (key: string) => {
    const res = await axios.post(
      "https://eth-mainnet.g.alchemy.com/v2/pxGCK6bf0tYaIXRNyeM2UXqVftmHcyj-",
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [key, "latest"],
      }
    );

    return ethers.formatEther(res.data.result);
  };

  const generateWallet = async () => {
    if (ethMnemonic === "") {
      const val = generateMnemonic();
      setEthMnemonic(val);

      localStorage.setItem("ethMnemonic", JSON.stringify(val));
      console.log(val);
      console.log("Not present");
    }

    const seed = mnemonicToSeedSync(ethMnemonic);
    let path = `m/44'/60'/${wallets.length}'/0'`;

    if (wallets.length > 1 && path === wallets[wallets.length - 1].path) {
      path = `m/44'/60'/${wallets.length + 1}'/0'`;
    }

    const hdNode = ethers.HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const newWallet = new ethers.Wallet(privateKey);
    const publicKey = newWallet.address;

    console.log(publicKey);
    console.log(privateKey);

    const balance = (await getBalance(publicKey)) + " eth";

    const wallet = {
      path,
      publicKey,
      privateKey,
      balance,
    };

    const updatedWallet = [...wallets, wallet];
    setWallets((prev) => [...prev, wallet]);
    localStorage.setItem("ethWallets", JSON.stringify(updatedWallet));
    toast({
      title: "Here You Go",
      description: "Your solana wallet has been generated successfully.",
    });
  };

  return (
    <div className="min-h-[75vh] max-w-screen-xl mx-auto px-5 pb-10">
      <GeneratePhrase mnemonic={ethMnemonic} generateWallet={generateWallet} />
      {ethMnemonic && (
        <>
          <PhraseHolder mnemonic={ethMnemonic} toast={toast} />

          <div className="py-14 px-2">
            <FncWallet
              title={"Ethereum"}
              generateWallet={generateWallet}
              setWallets={setWallets}
              toast={toast}
            />

            <div className="mt-5 flex flex-col gap-8">
              {wallets.map((item, index) => (
                <WalletBox
                  item={item}
                  index={index}
                  wallets={wallets}
                  setWallets={setWallets}
                  toast={toast}
                  showKey={showKey}
                  setShowKey={setShowKey}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EthereumDisplay;
