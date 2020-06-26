import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, flatMap, distinctUntilChanged } from 'rxjs/operators';
interface DataFormat {
  hash: string;
}
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
  getData() {
    // return this.http.get(this.apiurl);
    return interval(5000).pipe(
      flatMap(v => this.http.get(this.apiurl)),
      distinctUntilChanged((prev: DataFormat, curr: DataFormat) => prev.hash === curr.hash)
    );
  }
}
