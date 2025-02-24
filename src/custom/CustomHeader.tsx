import { ModeToggle } from "../components/mode-toggle";
import { WalletMinimal } from "lucide-react";
import { House } from "lucide-react";

const CustomHeader = () => {
  return (
    <div className="max-w-screen-xl flex justify-between items-center py-10 mx-auto px-5">
      <div className="flex items-center gap-2">
        <WalletMinimal size={36} color="#A1A1AA" />
        <h1 className="text-3xl font-semibold tracking-tighter text-muted-foreground">
          chamber
        </h1>
      </div>

      <div className="flex items-center gap-4">
      <span className="border-2 p-2 rounded cursor-pointer hover:bg-[#27272A]"><House size={17} /></span>
      <ModeToggle />
      </div>
    </div>
  );
};

export default CustomHeader;
