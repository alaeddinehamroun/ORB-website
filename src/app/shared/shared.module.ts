import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NbActionsModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
