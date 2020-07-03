import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import TronWeb from 'tronweb';
import {log} from '../../../utils/utils';
import {DatafeedService} from '../../services/datafeed.service';
import {Subscription, interval, of, from, Observable} from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { BetdataService } from 'src/app/services/betdata.service';
interface DataFormat {
  hash: string;
  height?: string;
  time?: string;
  timestamp?: number;
  number?: string;
}
interface Bet {
  id?: string;
  which: string;
  value: number;
  height: number;
  name: string;
  account: number;
}
const observer =  {
    next: function(data: any) {
      log('Subscription value')(data);
      this.unsubscribe();
    },
    error: log('Subscription Error'),
    complete: function(){
      log('completed')(this);
    }
  };
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
    tw: TronWeb;
    latestBlockSubs: Subscription;
    userDataObs$: Observable<any>;
    userDataSubs: Subscription;
    heightDataSubs: Subscription;
    hash: string;
    block: any;
    questionL = null;
    questionR = null;
    selectedValue : string;
    btnDisabled = true;
    inputValue: string;
    inputName = '';
    deliveryData: DataFormat[] = [{hash: 'hash...', height: 'height', time: 'time'}];
    userData: Bet[];
    bet: Bet;
    leftImage = '';
    rightImage = '';
    bgImage = 'gamble.png';
    handCoinImage = '../../../assets/hand_coin.png';
    account = 1000;
    betHistory: any;
    testStr = 'sdljfoijsdf  osdjfosijdfojdf';
  constructor(
    private dataService: DatafeedService,
    private toastCtrl: ToastController,
    private menu: MenuController,
    private betData: BetdataService
  ) {
    this.tw = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: 'f21841659a7efc2f5a6d579724c6134fefd28cf013a261d39c9a1c232f10ec04',
    });
    this.menu.enable(false);
   }
  ngOnDestroy(): void {
    this.latestBlockSubs.unsubscribe();
    this.heightDataSubs.unsubscribe();
    this.userDataSubs.unsubscribe();
  }

  ngOnInit() {
    log('Tron Trx')(this.tw.trx);
    log('Hex Address')(this.tw.address.toHex('TNq1zwWDPAQEw37NJhbaWrNZ79kJKa7ojS'));
    log('Hex Address to String')(this.tw.address.fromHex('418d0d1f9a90cb4e5aeb9de7e2650183cf9626f140'));
    this.inputName = 'User-' + Math.round(Math.random() * 100).toString();
    this.userDataObs$ = this.betData.getUserData(this.inputName);
    this.userDataSubs = this.userDataObs$.subscribe(v => {
      log('userData from firebase ')(v);
      this.userData = v;
    });
    this.latestBlockSubs = this.dataService.getEthLatestBlock().subscribe((v) => {
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
    (this.bet && this.bet.height) === block.number
    ? this.bet.which
      ?  this.evaluate(block)
      : console.log('bet is not determined')
    : console.log('not betted');
  }
  evaluate(block) {
    this.bet.which === 'left'
    ? parseInt(block.hash.slice(2, 3), 16) < 8
      ? this.win(block)
      : this.lose(block)
    : parseInt(block.hash.slice(2, 3), 16) > 7
      ? this.win(block)
      : this.lose(block);
  }
  win(block) {
    const currentUserBet = this.userData.filter(v => v.height === block.number);
    this.heightDataSubs = this.betData.getHeightData(block.number).subscribe(data => {
      console.log('heightdata => ');
      console.log(data);
      const result = data.reduce((acc: any, c: any) => {
        acc.idx += 1;
        acc.sum += c.value;
        return acc;
      }, {sum: 0, idx: 0});
      const winners: number = data.filter((v: any) => v.which === this.bet.which).reduce((acc: number, c) => acc += 1, 0);
      console.log(`%c reward => `, 'color: #ff0000', result.sum / winners, winners);
      this.account += result.sum / winners;
      this.betData.updateUserData(currentUserBet[0].id, {...this.bet, account: this.account, result: 'Win'});
      this.heightDataSubs.unsubscribe();
    });
    this.presentToast('your bet succeeds');
  }
  lose(block) {
    const currentUserBet = this.userData.filter(v => v.height === block.number);
    this.betData.updateUserData(currentUserBet[0].id, {...this.bet, account: this.account, result: 'Lose'});
    this.presentToast('your bet was failed');
  }
  onSubmit() {
    const heightNum = parseInt(this.deliveryData[this.deliveryData.length - 1].number, 10) + 1;
    if (this.bet && this.bet.height === heightNum) {
      console.log(`you already bet on the ${heightNum} block`);
      this.presentToast('You can not bet on the same block twice');
      return;
    }
    console.log('submitted : ', this.selectedValue, this.inputValue, heightNum);
    const betValue = parseInt(this.inputValue, 10);
    if (this.account >= betValue) {
      this.account -= betValue;
      this.bet = {
        which: this.selectedValue,
        value: betValue,
        height: heightNum,
        name: this.inputName,
        account: this.account
      };
      this.betData.addData(this.bet);
      this.presentToast(`you bet ${this.selectedValue}, amount of ${this.inputValue} on the hash height of ${heightNum}`);
    } else {
      this.presentToast(`You don't have enough points to bet`);
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
  presentToast = async (msg: string) => {
    const toastIns = await this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toastIns.present();
  }
}
