import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.page.html',
  styleUrls: ['./goods.page.scss'],
})
export class GoodsPage implements OnInit {
  handCoinImage = '../../../assets/crude-oil-wiki.jpg';

  constructor() { }

  ngOnInit() {
  }

}
