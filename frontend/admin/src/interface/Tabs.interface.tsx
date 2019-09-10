export interface TabsProps
{
  pills: TabsPill[],
  theme: "primary" | "success" | "secondary" | "danger" | "warning" | "info" | "light" | "dark" | "white"
}

export interface TabsState
{
  active: number
}

export interface TabsPill
{
  name: string,
  change: TabsChangeStateFunc,
  changeArg: string,
}

export interface TabsChangeStateFunc
{
  (name: string): void
}