import { Component } from '@angular/core';
import {NavController, ViewController, ModalController, AlertController} from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { TakeOrderPage } from '../take-order/take-order';
import { KeypadModalPage } from "../keypadModal/keypadModal";
/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})

export class OrderHistoryPage {
  rows;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private util: UtilProvider, public modalCtrl: ModalController, private alertCtrl: AlertController) {
    util.getReq("orderHistory")
      .then( (json) => {
        this.rows = json;
        console.log("orderHistoryData", this.rows);
      });
  }

  selected = [];
  orderDetails;

  viewItem(row) {
      let orderDetails = row;
      console.log('View Order Processed', orderDetails);
      this.navCtrl.push(TakeOrderPage, {orderDetails});
      this.viewCtrl.dismiss();
  }

  removeItem(row)
  {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are You Sure You Want To Delete This Order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            let data = {orderID:row.orderID, orderAction:"delete"};
            this.util.postReq("orderHistory/action", data);
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  payItem(row){
    // let data = {orderID:row.orderID, orderAction:"pay"};
    // this.util.postReq("orderHistory/action", data);
    let tempOrder = row;
    let keypadModal = this.modalCtrl.create(KeypadModalPage, {tempOrder});
    keypadModal.present();
    this.viewCtrl.dismiss();
  }
  getRowClass(row) {
    return {
      'paidInFull': (row.orderPaid) === 1,
      'notPaidInFull': (row.orderPaid) === 0
    };
  }

}
