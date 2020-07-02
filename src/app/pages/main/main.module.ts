import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import TronWeb from 'tronweb';
import { ShortenPipe } from '../../pipe/shorten.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  exports: [ShortenPipe],
  providers: [
    TronWeb,
  ],
  declarations: [MainPage, ShortenPipe]
})
export class MainPageModule {}
