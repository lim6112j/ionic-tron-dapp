import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import TronWeb from 'tronweb';
import { PipeModule } from '../../module/pipe/pipe.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    PipeModule
  ],
  providers: [
    TronWeb,
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
