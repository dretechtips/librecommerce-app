export interface MainProps
{
  route: string,
}

export interface MainState
{
  route: string,
}

export interface MainRouter
{
  (route: string): void
}