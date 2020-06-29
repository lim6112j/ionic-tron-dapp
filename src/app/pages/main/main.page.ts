import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import TronWeb from 'tronweb';
import {log} from '../../../utils/utils';
import {DatafeedService} from '../../services/datafeed.service';
import {Subscription, interval, of, from} from 'rxjs';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

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
    leftImage = '';
    rightImage = '';
    bgImage = 'gamble.png';
    handCoinImage = '../../../assets/hand_coin.png';
  constructor(
    private dataService: DatafeedService,
    private toastCtrl: ToastController,
    private menu: MenuController
  ) {
    this.tw = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: 'f21841659a7efc2f5a6d579724c6134fefd28cf013a261d39c9a1c232f10ec04',
    });
    this.menu.enable(false);
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
      this.winOrLose(this.block);
      this.printHash(this.block.hash.slice(2, 3));
      if (this.deliveryData.length > 4) {
        this.deliveryData.shift();
      }
      this.deliveryData.push(this.block);
    });
  }
  winOrLose(block) {
    (this.bet && this.bet.height) === this.block.number
    ? this.bet.which
      ?  this.evaluate(this.block)
      : console.log('bet is not determined')
    : console.log('not betted');
  }
  evaluate(block) {
    this.bet.which === 'left'
    ? block.hash.slice(2, 3) < 8
      ? this.presentToast('your bet succeeds')
      : this.presentToast('your bet failed')
    : block.hash.slice(2, 3) > 7
      ? this.presentToast('your bet succeeds')
      : this.presentToast('your bet was failed');
  }
  onSubmit() {
    const heightNum = parseInt(this.deliveryData[this.deliveryData.length - 1].number, 10) + 1;
    console.log('submitted : ', this.selectedValue, this.inputValue, heightNum);
    this.bet = {
      which: this.selectedValue,
      value: parseInt(this.inputValue, 10),
      height: heightNum
    };
    this.presentToast(`you bet ${this.selectedValue}, amount of ${this.inputValue} on the hash height of ${heightNum}`);
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
  presentToast = async (msg: string) => {
    const toastIns = await this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toastIns.present();
  }
}
