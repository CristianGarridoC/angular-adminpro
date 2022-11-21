import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(
    private readonly settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settingsService.setLinkTheme();
    (window as any).customInitFunction();
  }

}
