export interface TabsProps
{
  pills: TabsPill[],
  theme: "primary" | "success" | "secondary" | "danger" | "warning" | "info" | "light" | "dark" | "white"
}

export interface TabsState
{
  active: number;
  content: React.ReactChildren;
}

export interface TabsPill
{
  name: string,
  children: React.ReactChildren;
}

export interface TabsChangeStateFunc
{
  (name: string): void
}