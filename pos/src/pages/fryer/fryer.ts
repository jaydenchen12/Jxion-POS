/// <reference path="../../providers/util/sse.d.ts"/>
import {Component, ChangeDetectorRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UtilProvider} from "../../providers/util/util";


@Component({
  selector: 'page-fryer',
  templateUrl: 'fryer.html',
})
export class FryerPage {
  importItems;
  es = new EventSource(this.util.sseURL);

  constructor(public navCtrl: NavController, public navParams: NavParams, public util: UtilProvider, private ref:ChangeDetectorRef) {
    util.getReq("orderItemList")
      .then((json) => {
        this.importItems = json;
      });
  }

  ionViewDidLoad() {
    this.es.onmessage = (event) => {
      this.importItems = JSON.parse(event.data)[1];
      console.log(this.importItems);
      this.ref.detectChanges();
    };
    console.log('ionViewDidLoad KitchenPage');
  }

  removeItem(item) {
    // let index = this.importItems.indexOf(item);
    // if (index > -1) {
    //   this.importItems.splice(index, 1);
    // }
    // else {
    //   console.log("Could not find item:\t", item);
    // }
    let data = {orderID: item.orderItemListID, orderAction: "kitchenDelete"};
    this.util.postReq("orderHistory/action", data);
  }

  changeLanguage() {
    if (!this.util.isChinese) {
      this.util.isChinese = true;
    } else {
      this.util.isChinese = false;
    }
  }

  ngOnDestroy() {
    this.es.close();
    this.ref.detach();
  }
}
