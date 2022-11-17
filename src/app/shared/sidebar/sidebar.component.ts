import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  protected menuItems: any[];

  constructor(private readonly sidebarService: SidebarService) {
    this.menuItems = sidebarService.menuItems;

  }

  ngOnInit(): void {
  }

}
