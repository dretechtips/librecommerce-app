export interface SidePanelProps
{
  items: SidePanelItem[],
}

export interface SidePanelState
{
  active: number;
}

export interface SidePanelItem
{
  name: string,
  icon: string,
}
