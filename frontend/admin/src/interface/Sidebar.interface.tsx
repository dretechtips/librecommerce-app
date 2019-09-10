export interface SidebarProps
{
  items: SidebarItem[],
  reroute: SidebarReroute
}

export interface SidebarState
{
  
}

export interface SidebarItem
{
  name: string,
  icon: string,
}

export interface SidebarReroute
{
  (route: string): void
}