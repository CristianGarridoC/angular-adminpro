import { Injectable } from '@angular/core';
import {IMenu} from "../interfaces/IMenu";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  public menuItems: IMenu[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenuItems: [
        {
          title: 'Main',
          path: '/dashboard'
        },
        {
          title: 'ProgressBar',
          path: 'progress'
        },
        {
          title: 'Rxjs',
          path: 'rxjs'
        }
      ]
    }
  ];
}
