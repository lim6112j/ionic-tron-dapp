import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import TronWeb from 'tronweb';
import {log} from '../../../utils/utils';
import {DatafeedService} from '../../services/datafeed.service';
import {Subscription, interval, of, from} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import { BoundText } from '@angular/compiler/src/render3/r3_ast';
interface DataFormat {
  hash: string;
  height?: string;
  time?: string;
  timestamp?: number;
  number?: string;
}
interface Bet {
  which: string;
  value: number;
  height: number;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
    tw: TronWeb;
    subs: Subscription;
    hash: string;
    block: any;
    questionL = null;
    questionR = null;
    selectedValue : string;
    btnDisabled = true;
    inputValue: string;
    deliveryData: DataFormat[] = [{hash: 'hash...', height: 'height', time: 'time'}];
    bet: Bet;
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
    this.subs = this.dataService.getData().subscribe((v) => {
      console.log(v);
      this.block = v;
      (this.bet && this.bet.height) === this.block.number ? this.bet.which === 'left' ? console.log('success') : console.log('failed')
        : console.log('not betted');
      this.printHash(this.block.hash.slice(2, 3));
      if (this.deliveryData.length > 4) {
        this.deliveryData.shift();
      }
      this.deliveryData.push(this.block);
    });
  }
  onSubmit() {
    const heightNum = parseInt(this.deliveryData[this.deliveryData.length - 1].number, 10) + 1;
    console.log('submitted : ', this.selectedValue, this.inputValue, heightNum);
    this.bet = {
      which: this.selectedValue,
      value: parseInt(this.inputValue, 10),
      height: heightNum
    }
  }
  onClick(e) {
    //   console.log(`%c${e.target}`, 'color: red');
    console.log(e);
    e.target.id === null ? console.log('no target')
    : e.target.id === 'left' ? this.setClass('left')
    : e.target.id === 'right' ? this.setClass('right')
    : console.log('id not matched');
  }
  setClass(prop: string) {
    if (prop === 'right') {
      this.selectedValue = 'right';
      this.questionR = 'question';
      this.questionL = null;
      this.btnDisabled = false;
    } else if (
      prop === 'left'
    ) {
      this.selectedValue = 'left';
      this.questionL = 'question';
      this.questionR = null;
      this.btnDisabled = false;
    }
  }
  printHash(v) {
    console.log(v);
  }
}
