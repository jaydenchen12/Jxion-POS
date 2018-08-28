import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'page-keypadModal',
  templateUrl: 'keypadModal.html'
})
export class KeypadModalPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private util: UtilProvider) {
    if (this.navParams.get('tempOrder')) {
      this.passedOrder = this.navParams.get('tempOrder');
      this.orderCost = Number(this.passedOrder.orderPrice).toFixed(2);
    } else if (this.navParams.get('tempNewOrder')) {
      this.isNew = true;
      this.passedOrder = this.navParams.get('tempNewOrder');
      this.orderCost = Number(this.passedOrder.orderPrice).toFixed(2);
    }
  }
  isNew = false;
  passedOrder;
  orderCost;
  inputCost;
  inputArray = ['0', '0'];
  changeValue;
  confirmState: boolean = false;
  numberInput(num) {
    if (num == 'confirm') {
      if (this.isNew) {
        this.passedOrder.orderPaid = 1;
        this.util.postReq("takeorder/add/", this.passedOrder);
        this.util.presentToast("Order Successfully Added, Marked As Paid");
      } else {
        let data = { orderID: this.passedOrder.orderID, orderAction: "pay" };
        this.util.postReq("orderHistory/action", data);
        this.util.presentToast("Order Marked As Paid");
      }
      this.confirmState = true;
      this.changeValue = Number(this.inputCost - this.orderCost).toFixed(2);
    } else if (num == 'back') {
      this.inputArray.pop();
    } else if (num == 'clear') {
      this.inputArray = ['0', '0'];
    } else if (num == '00') {
      this.inputArray.push('0');
      this.inputArray.push('0');
    } else {
      this.inputArray.push(num);
    }
  }
  joinInputArray() {
    let tempArray = this.inputArray.slice();
    tempArray.splice(-2, 0, '.');
    console.log("temparray", tempArray)
    this.inputCost = Number(tempArray.join('')).toFixed(2);
    return this.inputCost
  }
  incompleteDismiss() {
    if (this.isNew) {
      this.util.postReq("takeorder/add/", this.passedOrder);
      this.util.presentToast("Order Added, Marked As Unpaid");
    }
    this.viewCtrl.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
