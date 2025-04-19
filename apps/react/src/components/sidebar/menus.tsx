import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type SidebarMenuItemType = {
  title: string;
  url?: string;
  items?: SidebarMenuItemType[];
  isActive?: boolean;
};

const data: SidebarMenuItemType[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        url: "/",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: "React",
        url: "/react",
        items: [
          {
            title: "Smart Skeleton",
            url: "/react/smart-skeleton",
          },
          {
            title: "Smart Text",
            url: "/react/smart-text",
          },
        ],
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Contribution Guide",
        url: "/contribution-guide",
      },
    ],
  },
];

function getActivePath(url?: string, serverPath?: string) {
  if (!url) return false;
  return url === serverPath;
}

export function AppSidebar({
  serverPath,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  serverPath?: string;
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="font-medium">
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={getActivePath(item?.url, serverPath)}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                        <SidebarMenuSub>
                          {item.items?.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={getActivePath(item?.url, serverPath)}
                              >
                                <a href={item.url}>{item.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
