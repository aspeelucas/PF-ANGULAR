import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';





@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {}


