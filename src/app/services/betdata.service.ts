import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { tap, take, map, skip} from 'rxjs/operators';
const log = (msg) => (v) => console.log(`%c[${msg}] => [${v}]`, 'color: #0beb43');
interface Sortable {
  height: number;
}
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
  getHeightData(height: number) {
    return this.fire.collection('bet', ref => ref.where('height', '==', height))
    .get({source: 'server'}).pipe(
      map(snapshot => {
          let items = [];
          snapshot.docs.map(a => {
              const data = a.data();
              const id = a.id;
              items.push({ id, ...data })
          })
          return items
      }),
  );
  }
  getUserData(name) {
    return this.fire.collection<Sortable>('bet', ref => ref.where('name', '==', name)
    .orderBy('height', 'desc').limit(6)).valueChanges({idField: 'id'});
  }
  updateUserData(id, data) {
    this.fire.collection('bet').doc(id).update(data)
    .then(v => console.log(v))
    .catch(e => console.log(e));
  }
}
