import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, flatMap, distinctUntilChanged, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Web3 from 'web3';
interface DataFormat {
  hash: string;
}
const OPTIONS = {
  defaultBlock: 'latest',
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
  transactionPollingTimeout: 480
};
// const web3 = new Web3(new Web3.providers.HttpProvider('http://15.164.229.155:8545'), null, OPTIONS);
// const web3 = new Web3(new Web3.providers.HttpProvider('https://blockchain.defora.io'), null, OPTIONS);
const web3 = new Web3(new Web3.providers.HttpProvider(environment.clesson.url), null); // Clesson
@Injectable({
  providedIn: 'root'
})
export class DatafeedService {
  // apiurl = 'https://api.blockcypher.com/v1/eth/main';
  // apiurl = '/api';
  apiurl = '/v1/eth/main';
  // obs$ = new Observable();
  constructor(
    private http: HttpClient
  ) { }
  getEthLatestBlock() {
    // return this.http.get(this.apiurl);
    web3.eth.getBlockNumber().then(v => console.log(v));
    return interval(3000).pipe(
      flatMap(i => web3.eth.getBlockNumber()),
      flatMap(v => web3.eth.getBlock(v)),
      distinctUntilChanged((prev, curr) => prev.hash === curr.hash),
      // tap(console.log),
    );
    // from(web3.eth.getBlockNumber().then(v => v)).pipe(

    // )
    // return interval(15000).pipe(
    //   flatMap(v => this.http.get(this.apiurl)),
    //   distinctUntilChanged((prev: DataFormat, curr: DataFormat) => prev.hash === curr.hash)
    // );
  }
}
