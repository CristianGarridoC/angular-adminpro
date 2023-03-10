export interface IMenu {
  title: string,
  icon: string,
  subMenuItems:ISubMenuItem[]
}

export interface ISubMenuItem {
  title: string,
  path: string
}
