import { Component, OnInit, OnDestroy } from '@angular/core';
import TronWeb from 'tronweb';
import {log} from '../../../utils/utils';
import {DatafeedService} from '../../services/datafeed.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
    tw: TronWeb;
    subs: Subscription;
  constructor(
    private dataService: DatafeedService
  ) {
    this.tw = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: 'f21841659a7efc2f5a6d579724c6134fefd28cf013a261d39c9a1c232f10ec04',
    });
   }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    log('Tron Trx')(this.tw.trx);
    log('Hex Address')(this.tw.address.toHex('TNq1zwWDPAQEw37NJhbaWrNZ79kJKa7ojS'));
    log('Hex Address to String')(this.tw.address.fromHex('418d0d1f9a90cb4e5aeb9de7e2650183cf9626f140'));
    this.subs = this.dataService.getData().subscribe(v => console.log(v));
  }
  onClick(e) {
    //   console.log(`%c${e.target}`, 'color: red');
    // console.log(e);
    e.target.id === null ? console.log('no target')
    : e.target.id === 'left' ? e.target.setAttribute('class', 'box left red')
    : e.target.id === 'right' ? e.target.setAttribute('class', 'box right red')
    : console.log('id not matched');

  }
}
