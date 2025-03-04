import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import GeneratePhrase from "./GeneratePhrase";
import PhraseHolder from "./PhraseHolder";
import FncWallet from "./FncWallet";
import WalletBox from "./WalletBox";
import useWalletStore from "@/store/store";



const EthereumDisplay = () => {
  const [title] = useState<string>("Ethereum");
  const [showKey, setShowKey] = useState<string[]>([]);
  const { toast } = useToast();

  const {ethMnemonic, ethWallet, setMnemonic, addWallet} = useWalletStore()

  const getBalance = async (key: string) => {
    const res = await axios.post(import.meta.env.VITE_ETH_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [key, "latest"],
    });

    return ethers.formatEther(res.data.result);
  };

  const generateWallet = async () => {
    let val = ethMnemonic;
    if (ethMnemonic === "") {
      val = generateMnemonic();
      setMnemonic(title, val);
    }

    const seed = mnemonicToSeedSync(val);
    let path = `m/44'/60'/${ethWallet.length}'/0'`;

    if (ethWallet.length > 1 && path === ethWallet[ethWallet.length - 1].path) {
      path = `m/44'/60'/${ethWallet.length + 1}'/0'`;
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

    addWallet(title, wallet);

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
              toast={toast}
            />

            <div className="mt-5 flex flex-col gap-8">
              {ethWallet.map((item, index) => (
                <WalletBox
                  key={item.path}
                  title={title}
                  item={item}
                  index={index}
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
