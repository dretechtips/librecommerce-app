export interface ReturnbarProps
{
  previousState: Return
}

export interface Return
{
  component: React.Component,
  stateName: string,
}