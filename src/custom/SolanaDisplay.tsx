import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import bs58 from "bs58";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import GeneratePhrase from "./GeneratePhrase";
import PhraseHolder from "./PhraseHolder";
import FncWallet from "./FncWallet";
import WalletBox from "./WalletBox";
import useWalletStore from "@/store/store";


const SolanaDisplay = () => {
  const [title] = useState<string>("Solana");
  const [showKey, setShowKey] = useState<string[]>([]);

  const {solMnemonic, solWallet, setMnemonic, addWallet} = useWalletStore();

  const { toast } = useToast();

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("mnemonic") &&
  //     localStorage.getItem("solWallets")
  //   ) {
  //     const val = localStorage.getItem("mnemonic") || "";
  //     const wlt = localStorage.getItem("solWallets") || "";

  //     setMnemonic(JSON.parse(val));
  //     setWallets(JSON.parse(wlt));
  //     console.log(val.split(" "));
  //     console.log("on mount");
  //   }
  // }, []);

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
    let val = solMnemonic;
    if (val === "") {
      val = generateMnemonic();
      setMnemonic(title, val);

      // localStorage.setItem("mnemonic", JSON.stringify(val));

      console.log("Not present");
    }
    console.log("mnemonic: ", val);
    const seed = mnemonicToSeedSync(val);

    let path = `m/44'/501'/${solWallet.length}'/0'`;

    if (solWallet.length > 1 && path === solWallet[solWallet.length - 1].path) {
      console.log("in");
      path = `m/44'/501'/0'/${solWallet.length + 1}'`;
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

    console.log("wallet: ", wallet);

    addWallet(title, wallet);
    // localStorage.setItem("solWallets", JSON.stringify(updatedWallet));
    toast({
      title: "Here You Go",
      description: "Your solana wallet has been generated successfully.",
    });
  };

  return (
    <div className="min-h-[75vh] max-w-screen-xl mx-auto px-5 pb-10">
      <GeneratePhrase mnemonic={solMnemonic} generateWallet={generateWallet} />
      {solMnemonic && (
        <>
          <PhraseHolder mnemonic={solMnemonic} toast={toast} />

          <div className="py-14 px-2">
            <FncWallet
              title={title}
              generateWallet={generateWallet}
              toast={toast}
            />

            <div className="mt-5 flex flex-col gap-8">
              {solWallet.map((item, index) => (
                <WalletBox
                  key={index}
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

export default SolanaDisplay;
