import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent implements OnInit {
  protected defaultTheme!: string;

  constructor(private readonly settingsService: SettingsService) { }

  public ngOnInit(): void {
    this.defaultTheme = this.settingsService.defaultTheme;
  }

  protected changeTheme(theme: string): void {
    this.defaultTheme = theme;
    this.settingsService.saveThemeInLocalStorage(this.defaultTheme);
  }

}
