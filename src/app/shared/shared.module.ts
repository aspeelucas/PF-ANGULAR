import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { FontSizeDirectiveDirective } from './font-size-directive.directive';




@NgModule({
  declarations: [
    FullNamePipe,
    FontSizeDirectiveDirective,
   
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    FontSizeDirectiveDirective,
    
  ]
})
export class SharedModule { }
