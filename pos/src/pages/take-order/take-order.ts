import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, AlertController, ViewController, PopoverController } from 'ionic-angular';
import { AddonModalPage } from "../addon-modal/addon-modal";
import { UtilProvider } from "../../providers/util/util";
import { KeypadModalPage } from "../keypadModal/keypadModal";
import { CustomitempopoverPage } from "../customitempopover/customitempopover";

@Component({
  selector: 'page-take-order',
  templateUrl: 'take-order.html',
})
export class TakeOrderPage {

  menuCategory;
  selected;
  importData;
  orderCart = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController,
    public events: Events, private alertCtrl: AlertController, private util: UtilProvider, public popoverCtrl: PopoverController) {
    this.isChinese = util.isChinese;
    console.log(this.isChinese);
    util.getReq("takeorderDB")
      .then((json) => {
        this.menuCategory = json;
        this.selected = this.menuCategory[0].menuCateItem;
        this.pushToKitchen = this.menuCategory[0].pushToKitchen;
        this.pushToFryer = this.menuCategory[0].pushToFryer;
        this.pushToRice = this.menuCategory[0].pushToRice;
      });
    if (this.navParams.get('orderDetails')) {
      this.importData = this.navParams.get('orderDetails');
      this.orderCart = this.importData.orderDetail;
      this.custInfo = [this.importData.orderType, this.importData.customerName];
      this.custOrderId = this.importData.orderID;
      console.log("order Cart", this.orderCart);
    } else if (this.navParams.get('custInfo'))
      this.custInfo = this.navParams.get('custInfo');
    console.log(this.custInfo);
  }

  taxPercent = 0.06;
  custOrderId = null;
  orderCost = 0;
  paidInfo = 0;
  selectedId = 1;
  custInfo = [];
  orderInfo = [];
  pushToKitchen;
  pushToFryer;
  pushToRice;
  isChinese;

  openModal(itemID) {
    let choice = itemID;
    choice.pushToKitchen = this.pushToKitchen;
    choice.pushToFryer = this.pushToFryer;
    choice.pushToRice = this.pushToRice;
    if (this.selectedId == 1) {
      choice.special = true;
      let myModal = this.modalCtrl.create(AddonModalPage, { choice });
      myModal.present();
    } else if (this.selectedId == 7) {
      let drinks = {
        chMenuItemTitle: itemID.chMenuItemTitle,
        chSauceTitle: "",
        chSizeTitle: "",
        enMenuItemTitle: itemID.enMenuItemTitle,
        enSauceTitle: "No Sauce",
        menuItemId: itemID.itemId,
        pushToFryer: 0,
        pushToKitchen: 0,
        pushToRice: 0,
        quantityValue: 1,
        sauceID: null,
        sizeAbre: "",
        sizeID: 1,
        sizeValue: itemID.price[1]
      };
      let packageArray = [drinks, []];
      this.orderCart.push(packageArray);
    } else {
      let myModal = this.modalCtrl.create(AddonModalPage, { choice });
      myModal.present();
    }
    console.log("menu Item was passed", choice);
  }
  openSpecial(ev) {
    let popover = this.popoverCtrl.create(CustomitempopoverPage);
    popover.present({
      ev: ev
    });
  }
  ionViewDidLoad() {
    this.events.subscribe('item:added', (data) => {
      this.orderCart.push(data);
      console.log('cartItems', this.orderCart)
    });
  }

  categorySelected(item) {
    this.selected = item.menuCateItem;
    this.selectedId = item.cateID;
    this.pushToKitchen = item.pushToKitchen;
    this.pushToFryer = item.pushToFryer;
    this.pushToRice = item.pushToRice;
  }

  removeItem(item) {
    let index = this.orderCart.indexOf(item);
    if (index > -1) {
      setTimeout(() => this.orderCart.splice(index, 1), 200);
    }
    else {
      console.log("Could not find item:\t", item);
    }
  }
  makeFree(item) {
    let index = this.orderCart.indexOf(item);
    console.log(this.orderCart[index]);
    this.orderCart[index][0].sizeValue = 0;
  }

  getTaxAndTotal() {
    let total = 0;
    let tempArray;
    let quanity;
    for (let i = 0; i < this.orderCart.length; i++) {
      tempArray = this.orderCart[i];
      quanity = Number(tempArray[0].quantityValue)
      total += Number(tempArray[0].sizeValue) * quanity;
      for (let j = 0; j < tempArray[1].length; j++) {
        total += Number(tempArray[1][j].addonCost) * quanity;
      }
    }
    let returnValue = [(total * this.taxPercent).toFixed(2), (total + (total * this.taxPercent)).toFixed(2)];
    this.orderCost = Number(returnValue[1]);
    return returnValue;
  }

  completeOrder() {
    if (this.orderCart.length == 0) {
      this.viewCtrl.dismiss()
    }
    else if (this.custInfo[0] == "Pick Up") {
      this.paidInfo = 0;
      console.log('Pay Later')
      this.orderInfo.push({
        orderId: this.custOrderId,
        orderType: this.custInfo[0],
        customerName: this.custInfo[1],
        orderPaid: this.paidInfo,
        orderTime: null,
        orderPrice: this.orderCost,
        orderDetail: this.orderCart
      });
      let cart = this.orderInfo;
      this.util.postReq("takeorder/add/", cart[0]);
      this.util.presentToast("Order Successfully Added");
      this.viewCtrl.dismiss();
    }
    else {
      let payPrompt = this.alertCtrl.create({
        title: 'Pay Now or Later',
        buttons: [
          {
            text: '   Pay Later    ',
            handler: data => {
              this.paidInfo = 0;
              console.log('Pay Later')
              this.orderInfo.push({
                orderId: this.custOrderId,
                orderType: this.custInfo[0],
                customerName: this.custInfo[1],
                orderPaid: this.paidInfo,
                orderTime: null,
                orderPrice: this.orderCost,
                orderDetail: this.orderCart
              });
              let cart = this.orderInfo;
              this.util.postReq("takeorder/add/", cart[0]);
              this.util.presentToast("Order Successfully Added");
              this.viewCtrl.dismiss();
            }
          },
          {
            text: '   Pay Now   ',
            handler: data => {
              console.log('Paid');
              this.orderInfo.push({
                orderId: this.custOrderId,
                orderType: this.custInfo[0],
                customerName: this.custInfo[1],
                orderPaid: 0,
                orderTime: null,
                orderPrice: this.orderCost,
                orderDetail: this.orderCart
              });
              let tempNewOrder = this.orderInfo[0];
              let keypadModal = this.modalCtrl.create(KeypadModalPage, { tempNewOrder });
              keypadModal.present();
              this.viewCtrl.dismiss();
            }
          }
        ]
      });
      payPrompt.present();
    }
  }
}
