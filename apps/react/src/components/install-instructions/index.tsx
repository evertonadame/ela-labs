import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" className="ml-2" onClick={handleCopy}>
      {copied ? "Copied!" : <Copy size={16} />}
    </Button>
  );
}

type InstallInstructionsProps = {
  componentName: string;
};

export function InstallInstructions({
  componentName,
}: InstallInstructionsProps) {
  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4">Installation</h2>
      <p className="mb-4 text-muted-foreground">
        Install <code>{componentName}</code> using your preferred package
        manager:
      </p>
      <Tabs defaultValue="pnpm" className="w-full">
        <TabsList>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="yarn">yarn</TabsTrigger>
        </TabsList>

        <TabsContent value="pnpm">
          <div className="flex items-center bg-muted p-4 rounded-md font-mono text-sm text-muted-foreground">
            <span>pnpm add @ela-labs/{componentName}</span>
            <CopyButton command={`pnpm add @ela-labs/${componentName}`} />
          </div>
        </TabsContent>

        <TabsContent value="npm">
          <div className="flex items-center bg-muted p-4 rounded-md font-mono text-sm text-muted-foreground">
            <span>npm install @ela-labs/{componentName}</span>
            <CopyButton command={`npm install @ela-labs/${componentName}`} />
          </div>
        </TabsContent>

        <TabsContent value="yarn">
          <div className="flex items-center bg-muted p-4 rounded-md font-mono text-sm text-muted-foreground">
            <span>yarn add @ela-labs/{componentName}</span>
            <CopyButton command={`yarn add @ela-labs/${componentName}`} />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
