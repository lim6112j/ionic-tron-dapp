import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatafeedService {
  apiurl = 'https://api.blockcypher.com/v1/eth/main';
  constructor(
    private http: HttpClient
  ) { }
  getData() {
    return this.http.get(this.apiurl);
  }
}
