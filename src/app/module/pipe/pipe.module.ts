import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenPipe } from '../../pipe/shorten.pipe';


@NgModule({
  declarations: [ShortenPipe],
  imports: [
    CommonModule
  ],
  exports: [ShortenPipe],

})
export class PipeModule { }
