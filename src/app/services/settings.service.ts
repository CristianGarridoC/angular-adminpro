import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly linkTheme: HTMLLinkElement | null = document.querySelector('#app-theme');

  constructor() { }

  public get defaultTheme(): string {
    return localStorage.getItem('app-theme') ?? 'purple-dark';
  }

  public setLinkTheme(): void {
    if(!this.linkTheme){
      return;
    }
    this.linkTheme.href = `./assets/css/colors/${this.defaultTheme}.css`;
  }

  public saveThemeInLocalStorage(theme: string): void {
    localStorage.setItem('app-theme', theme);
    this.setLinkTheme();
  }
}
