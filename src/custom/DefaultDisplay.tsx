import { Button } from "@/components/ui/button";

const DefaultDisplay = ({solanaStart, ethereumStart}) => {
  return (
    <div className="min-h-[75vh] max-w-screen-xl mx-auto px-5">
    <h1 className="text-4xl font-bold">
      Web-based crypto wallet, for multiple blockchains
    </h1>
    <h3 className="text-xl font-semibold text-muted-foreground py-3">
      Choose a blockchain to get started.
    </h3>
    <div className="flex gap-5">
      <Button onClick={() => solanaStart()}>Solana</Button>
      <Button onClick={() => ethereumStart()}>Ethereum</Button>
    </div>
  </div>
  )
}

export default DefaultDisplay
