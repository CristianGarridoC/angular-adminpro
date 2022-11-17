import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

import {ProgressComponent} from "./progress/progress.component";
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ComponentsModule} from "../components/components.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    ProgressComponent,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule {
}
