import { SmartSkeleton } from "@ela-labs/smart-skeleton-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/tabs";

export function ExempleBasics({ loading }: { loading?: boolean }) {
  return (
    <Tabs
      childrenCode={`import { SmartSkeleton } from "@ela-labs/smart-skeleton-react";
import { Button } from "@/components/ui/button";

export function ExempleBasics({ loading }: { loading: boolean }) {
  return (
    <SmartSkeleton loading={loading}>
        <Button>Hello World</Button>
    </SmartSkeleton>
  );
}
`}
    >
      <SmartSkeleton loading={loading || false}>
        <Button>Hello World</Button>
      </SmartSkeleton>
    </Tabs>
  );
}
