/// <reference path="../../providers/util/sse.d.ts"/>

import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'page-packer',
  templateUrl: 'packer.html'
})
export class PackerPage {
  isChinese;
  orderPickUp = [];
  orderWalkin = [];
  es = new EventSource(this.util.sseURL);

  constructor(public navCtrl: NavController, private util: UtilProvider, private ref: ChangeDetectorRef) {
    this.isChinese = util.isChinese;

    util.getReq("recentOrderHistory")
      .then((json) => {
        let orderHistory = json;
        for (let order of orderHistory[0]) {
          if (order.isComplete == 0 && order.orderType == 'Pick Up') {
            let tempInfo = {
              orderID: order.orderID,
              customerName: order.customerName,
              orderDetail: order.orderDetail,
              incompleteItems: []
            };
            this.orderPickUp.push(tempInfo);
          } else if (order.isComplete == 0 && order.orderType == 'Walk In') {
            let tempInfo = {
              orderID: order.orderID,
              customerName: order.customerName,
              orderDetail: order.orderDetail,
              incompleteItems: []
            };
            this.orderWalkin.push(tempInfo);
          };
        };
        console.log(this.orderPickUp);
        console.log(this.orderWalkin);
        for (let order of this.orderPickUp) {
          for (let item of orderHistory[1]) {
            if (item.customerOrderID == order.orderID) {
              let index = this.orderPickUp.indexOf(order);
              this.orderPickUp[index].incompleteItems.push(item);
            };
          };
        }
        for (let item of orderHistory[1]) {
          for (let order of this.orderWalkin) {
            if (item.customerOrderID == order.orderID) {
              let index = this.orderWalkin.indexOf(order);
              this.orderWalkin[index].incompleteItems.push(item);
            };
          };
        }
      });
  }

  ionViewDidLoad() {
    this.es.onmessage = (event) => {
      let orderHistory = JSON.parse(event.data);
        this.orderPickUp = [];
        this.orderWalkin = [];
      for (let order of orderHistory[0]) {
        if (order.isComplete == 0 && order.orderType == 'Pick Up') {
          let tempInfo = {
            orderID: order.orderID,
            customerName: order.customerName,
            orderDetail: order.orderDetail,
            incompleteItems: []
          };
          this.orderPickUp.push(tempInfo);
        } else if (order.isComplete == 0 && order.orderType == 'Walk In') {
          let tempInfo = {
            orderID: order.orderID,
            customerName: order.customerName,
            orderDetail: order.orderDetail,
            incompleteItems: []
          };
          this.orderWalkin.push(tempInfo);
        };
      };
      console.log(this.orderPickUp);
      console.log(this.orderWalkin);
      for (let order of this.orderPickUp) {
        for (let item of orderHistory[1]) {
          if (item.customerOrderID == order.orderID) {
            let index = this.orderPickUp.indexOf(order);
            this.orderPickUp[index].incompleteItems.push(item);
          };
        };
        if (order.incompleteItems.length == 0) {
          let data = { orderID: order.orderID, orderAction: "orderComplete" };
          this.util.postReq("orderHistory/action", data);
        };
      }
      for (let order of this.orderWalkin) {
        for (let item of orderHistory[1]) {
          if (item.customerOrderID == order.orderID) {
            let index = this.orderWalkin.indexOf(order);
            this.orderWalkin[index].incompleteItems.push(item);
          };
        };
        if (order.incompleteItems.length == 0) {
          let data = { orderID: order.orderID, orderAction: "orderComplete" };
          this.util.postReq("orderHistory/action", data);
        };
      }
      console.log("item left", this.orderPickUp)
      this.ref.detectChanges();
    };
  }
  onActivate(event) {
    console.log('Activate Event', event);
  }

  removeItem(item) {
    let data = { orderID: item.orderItemListID, orderAction: "kitchenDelete" };
    this.util.postReq("orderHistory/action", data);
  }

  ngOnDestroy() {
    this.es.close();
    this.ref.detach();
  }
}
