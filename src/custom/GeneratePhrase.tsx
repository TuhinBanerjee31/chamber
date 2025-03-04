import { Button } from "@/components/ui/simpleButton";
import { Input } from "@/components/ui/input";

type Incoming = {
  mnemonic: string,
  generateWallet: () => void
}

const GeneratePhrase = ({ mnemonic, generateWallet }: Incoming) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Secret Recovery Phrase</h1>
      <h3 className="text-xl font-semibold text-muted-foreground py-3">
        Save these words in a safe place.
      </h3>

      {!mnemonic && (
        <div className="flex gap-5">
          <Input
            type="text"
            placeholder="Enter your secret phrase (or leave blank to generate)"
            className="py-4"
          />
          <Button onClick={() => generateWallet()}>Generate Wallet</Button>
        </div>
      )}
    </div>
  );
};

export default GeneratePhrase;
