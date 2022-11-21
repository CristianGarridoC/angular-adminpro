import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  public menuItems: any[] = [
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
