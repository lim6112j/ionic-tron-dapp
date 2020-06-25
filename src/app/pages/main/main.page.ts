import { Component, OnInit } from '@angular/core';
import TronWeb from 'tronweb';
import {log} from '../../../utils/utils.ts';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    tw: TronWeb;
  constructor() {
    this.tw = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: 'f21841659a7efc2f5a6d579724c6134fefd28cf013a261d39c9a1c232f10ec04',
    });
   }

  ngOnInit() {
    log('Tron Trx')(this.tw.trx);
    log('Hex Address')(this.tw.address.toHex('TNq1zwWDPAQEw37NJhbaWrNZ79kJKa7ojS'));
    log('Hex Address to String')(this.tw.address.fromHex('418d0d1f9a90cb4e5aeb9de7e2650183cf9626f140'));
  }
  onClick(e) {
    //   console.log(`%c${e.target}`, 'color: red');
    // console.log(e);
    e.target.id === null ? null 
    : e.target.id === 'left' ? e.target.setAttribute('class', 'box left red')
    : e.target.id === 'right' ? e.target.setAttribute('class', 'box right red')
    : null;

  }
}
