/// <reference path="../../providers/util/sse.d.ts"/>
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'page-order-in-process',
  templateUrl: 'order-in-process.html'
})
export class OrderProcessPage {
  kitchen;
  orderHistory;
  es = new EventSource(this.util.sseURL);
  constructor(public navCtrl: NavController, private util: UtilProvider, private ref: ChangeDetectorRef) {
    util.getReq("orderItemList")
      .then((json) => {
        this.kitchen = json;
        console.log("serverData", this.kitchen);
      });
    util.getReq("recentOrderHistory")
      .then((json) => {
        this.orderHistory = json;
        console.log("serverData", this.orderHistory);
      });
  }
  ionViewDidLoad() {
    this.es.onmessage = (event) => {
      let data = JSON.parse(event.data);
      this.orderHistory = data[0];
      this.kitchen = data[1];
      this.ref.detectChanges();
    };
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
  ngOnDestroy() {
    this.es.close();
    this.ref.detach();
  }
}
