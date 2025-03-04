import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy } from "lucide-react";

type Incoming = {
  mnemonic: string,
  toast: (params: { title: string; description: string }) => void;
}

const PhraseHolder = ({ mnemonic, toast } :Incoming) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-2xl">
          Your Secret Phrase
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap justify-around gap-5 md:max-w-screen-md mx-auto py-8">
            {mnemonic.split(" ").map((item :string, index :number) => (
              <span
                key={index}
                className="min-w-[20%] py-2 px-4 text-xl bg-[#a1a1aa50] rounded transition-all cursor-pointer hover:bg-[#a1a1aa73]"
              >
                {item}
              </span>
            ))}
          </div>

          <span
            className="flex justify-center items-center gap-2 transition-colors cursor-pointer pt-5 hover:text-muted-foreground"
            onClick={() => {
              navigator.clipboard.writeText(mnemonic);
              toast({
                title: "Copied",
                description: "Your secret phrase copied to clipboard.",
              });
            }}
          >
            <Copy /> Click here to copy the phrase
          </span>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PhraseHolder;
