import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useWalletStore from "@/store/store";

type Incoming = {
  title: string,
}

const DailogBtn = ({ title }: Incoming) => {
  const {setMnemonic, clearAllWallets} = useWalletStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-black border-2 border-white py-1 px-3 rounded-md text-white transition-colors hover:bg-gray-950">
          Clear Seed
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirming this will lead to deletion of your seed pharse.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              clearAllWallets(title);
              setMnemonic(title, "");
              // if(title == "Solana"){
              //   localStorage.removeItem("solWallets")
              //   localStorage.removeItem("mnemonic")
              // }
              // if(title == "Ethereum"){
              //   localStorage.removeItem("ethWallets")
              //   localStorage.removeItem("ethMnemonic")
              // }
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DailogBtn;
