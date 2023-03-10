import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IncreaserComponent} from "./increaser/increaser.component";
import {
  InputPasswordWithVisibilityComponent
} from "./input-password-with-visibility/input-password-with-visibility.component";


@NgModule({
  declarations: [
    IncreaserComponent,
    InputPasswordWithVisibilityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    IncreaserComponent,
    InputPasswordWithVisibilityComponent
  ]
})
export class ComponentsModule { }
