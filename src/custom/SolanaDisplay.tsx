import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";
import bs58 from "bs58";
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

const SolanaDisplay = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showKey, setShowKey] = useState<string[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    if (
      localStorage.getItem("mnemonic") &&
      localStorage.getItem("solWallets")
    ) {
      const val = localStorage.getItem("mnemonic") || "";
      const wlt = localStorage.getItem("solWallets") || "";

      setMnemonic(JSON.parse(val));
      setWallets(JSON.parse(wlt));
      console.log(val.split(" "));
      console.log("on mount");
    }
  }, []);

  //Func to calculate balanace
  const getBalance = async (key: string) => {
    const res = await axios.post(import.meta.env.VITE_SOL_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [key],
    });

    const val = res.data.result.value / LAMPORTS_PER_SOL;

    return val.toString();
  };

  //Func to generate wallet
  const generateWallet = async () => {
    if (mnemonic === "") {
      const val = generateMnemonic();
      setMnemonic(val);

      localStorage.setItem("mnemonic", JSON.stringify(val));

      console.log("Not present");
    }

    const seed = mnemonicToSeedSync(mnemonic);

    let path = `m/44'/501'/${wallets.length}'/0'`;

    if (wallets.length > 1 && path === wallets[wallets.length - 1].path) {
      path = `m/44'/501'/${wallets.length + 1}'/0'`;
    }

    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privateKey = bs58.encode(secret);
    console.log(publicKey);
    console.log(privateKey);

    const balance = (await getBalance(publicKey)) + " sol";

    const wallet = {
      path,
      publicKey,
      privateKey,
      balance,
    };

    const updatedWallet = [...wallets, wallet];
    setWallets((prev) => [...prev, wallet]);
    localStorage.setItem("solWallets", JSON.stringify(updatedWallet));
    toast({
      title: "Here You Go",
      description: "Your solana wallet has been generated successfully.",
    });
  };

  return (
    <div className="min-h-[75vh] max-w-screen-xl mx-auto px-5 pb-10">
      <GeneratePhrase mnemonic={mnemonic} generateWallet={generateWallet} />
      {mnemonic && (
        <>
          <PhraseHolder mnemonic={mnemonic} toast={toast} />

          <div className="py-14 px-2">
            <FncWallet
              title={"Solana"}
              generateWallet={generateWallet}
              setWallets={setWallets}
              setMnemonic={setMnemonic}
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

export default SolanaDisplay;
