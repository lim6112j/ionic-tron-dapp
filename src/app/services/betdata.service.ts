import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
const log = (msg) => (v) => console.log(`%c[${msg}] => [${v}]`, 'color: #0beb43');
@Injectable({
  providedIn: 'root'
})
export class BetdataService {
  obs$: Observable<any>;
  subs: Subscription;
  constructor(
    private fire: AngularFirestore
  ) {
    // this.subs = this.fire.collection<any>('delivery').snapshotChanges().pipe(
    //   tap(log('firestore'))
    // ).subscribe(console.log);
  }
  addData(data) {
    this.fire.collection('bet').add(data)
    .then(res => log('firestore data add success')(res));
  }
  getData(height) {
    return this.fire.collection('bet', ref => ref.where('height', '==', height)).valueChanges();
  }
}