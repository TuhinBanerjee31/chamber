import { Trash2, EyeOff, Eye, Copy } from "lucide-react";

const WalletBox = ({
  item,
  index,
  wallets,
  setWallets,
  toast,
  showKey,
  setShowKey,
} :any) => {
  return (
    <div key={item.path} className="border rounded-lg p-5">
      <div className="flex justify-between px-2">
        <h2 className="text-3xl font-semibold">Wallet {index + 1}</h2>
        <Trash2
          className="text-red-900 transition-colors hover:text-red-800 cursor-pointer"
          onClick={() => {
            const updatedWallet = wallets.filter((i :any) => {
              return i.path != item.path;
            });
            setWallets(updatedWallet);
            localStorage.setItem("solWallets", JSON.stringify(updatedWallet));
            toast({
              title: "Deleted",
              description: "This wallet was deleted successfully.",
            });
          }}
        />
      </div>

      <div className="bg-[#66666d3b] rounded-md mt-5 my-2 p-4 flex flex-col gap-5">
        <div>
          <h3 className="font-semibold text-xl">Public Key</h3>
          <span className="text-xs md:text-lg flex items-center justify-between">
            {" "}
            {item.publicKey}{" "}
            <Copy
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(item.publicKey);
                toast({
                  title: "Copied",
                  description: `Your wallet ${index+1} public key copied to clipboard.`,
                });
              }}
            />{" "}
          </span>
        </div>

        <div>
          <h3
            className="font-semibold text-xl"
            onClick={() => {
              navigator.clipboard.writeText(item.privateKey);
              toast({
                title: "Copied",
                description: "Your secret private key copied to clipboard.",
              });
            }}
          >
            Private Key
          </h3>
          <div className="flex">
            <input
              type={showKey.includes(item.path) ? "text" : "password"}
              value={item.privateKey}
              className="bg-transparent w-full text-xs md:text-lg"
              disabled
            />

            <div className="flex gap-4">
              <Copy
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(item.privateKey);
                  toast({
                    title: "Copied",
                    description: `Your wallet ${index+1} private key copied to clipboard.`,
                  });
                }}
              />
              {showKey.includes(item.path) ? (
                <Eye
                  onClick={() => {
                    const arr = showKey.filter((val :string) => val != item.path);
                    setShowKey(arr);
                  }}
                  className="cursor-pointer transition-all"
                />
              ) : (
                <EyeOff
                  onClick={() => setShowKey((prev :string[]) => [...prev, item.path])}
                  className="cursor-pointer transition-all"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-xl">Balance</h3>
          <h3 className="text-xs md:text-lg">{item.balance}</h3>
        </div>
      </div>
    </div>
  );
};

export default WalletBox;
