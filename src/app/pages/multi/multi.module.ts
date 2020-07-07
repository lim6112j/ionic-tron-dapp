import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiPageRoutingModule } from './multi-routing.module';

import { MultiPage } from './multi.page';
import TronWeb from 'tronweb';
import { PipeModule } from '../../module/pipe/pipe.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiPageRoutingModule,
    PipeModule
  ],
    providers: [
    TronWeb,
  ],
  declarations: [MultiPage]
})
export class MultiPageModule {}
