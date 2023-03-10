import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AuthModule { }
