import { Fragment } from "react";
import { AppSidebar } from "@/components/sidebar/menus";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../theme/toggle";

type SidebarProps = {
  children: React.ReactNode;
  serverPath?: string;
  breadcrumbs?: {
    title: string;
    url: string;
    active?: boolean;
  }[];
};

export default function Sidebar({
  children,
  breadcrumbs,
  serverPath,
}: SidebarProps) {
  return (
    <SidebarProvider>
      <AppSidebar serverPath={serverPath} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  if (item?.active) {
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                        {!isLast ? <BreadcrumbSeparator /> : null}
                      </Fragment>
                    );
                  }

                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem key={index}>
                        <BreadcrumbLink href={item.url}>
                          {item.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {!isLast ? <BreadcrumbSeparator /> : null}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
