import { cloneElement, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coy from "react-syntax-highlighter/dist/esm/styles/prism/coy";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserTypescript from "prettier/plugins/typescript";
import * as prettierPluginEstree from "prettier/plugins/estree";
import {
  Tabs as TabsComponent,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "../ui/button";

type TabsProps = {
  children: React.ReactNode;
  childrenCode: string;
};

export function Tabs({ children, childrenCode }: TabsProps) {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(childrenCode);

  useEffect(() => {
    const formatCode = async () => {
      const formattedCode = await prettier.format(childrenCode, {
        parser: "typescript",
        // @ts-ignore
        plugins: [parserBabel, prettierPluginEstree, parserTypescript],
      });
      setCode(formattedCode);
    };
    formatCode();
  }, []);

  return (
    <TabsComponent
      defaultValue="visual"
      className="w-full border rounded-md p-4"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="visual">Visual</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="visual">
        <Button
          onClick={() => {
            setLoading((prev) => !prev);
          }}
          variant={loading ? "default" : "secondary"}
          className="my-4"
        >
          {loading ? "Stop Loading" : "Start Loading"}
        </Button>
        <div>
          {cloneElement(children as React.ReactElement, {
            // @ts-ignore
            loading: loading,
          })}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <SyntaxHighlighter language="tsx" style={coy}>
          {code}
        </SyntaxHighlighter>
      </TabsContent>
    </TabsComponent>
  );
}
