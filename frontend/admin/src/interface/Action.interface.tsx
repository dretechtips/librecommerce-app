export interface ActionProps
{
  items: Action[]
}

export interface ActionState
{
  
}

export interface Action
{
  name: string,
  icon: string,
  component: React.Component,
  route: string,
}