import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Events, PopoverController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import {SpecialItemModalPage} from "../special-item-modal/special-item-modal";
import {AddOnCostPage} from "../add-on-cost/add-on-cost"

/**
 * Generated class for the CustomitempopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-customitempopover',
  templateUrl: 'customitempopover.html',
})
export class CustomitempopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private util: UtilProvider, public modalCtrl: ModalController, public events: Events, public popoverCtrl: PopoverController) {
  }
  submit = {
    itemId: 0,
    pushToKitchen: false,
    pushToRice: false,
    pushToFryer: false,
    price: 0
  };

  startItem() {
    if (!this.submit.hasOwnProperty('enMenuItemTitle') || !this.submit.hasOwnProperty('chMenuItemTitle')) {
      this.util.presentAlert("Need A Item Name.")
    } else if (this.submit.price == 0) {
      this.util.presentAlert("Need A Price.")
    }  else if (this.submit.pushToKitchen || this.submit.pushToRice || this.submit.pushToFryer){
      this.util.presentToast("Menu Item Successfully Added")
      console.log('started item', this.submit);
      let specialChoice = this.submit;
      let myModal = this.modalCtrl.create(SpecialItemModalPage, {specialChoice});
      myModal.present();
      this.viewCtrl.dismiss();
    } else {
      this.util.presentAlert("Need A Place To Send To.")
    }

  }
  addOnCost(ev){
    let popover = this.popoverCtrl.create(AddOnCostPage);
    popover.present({
      ev: ev
    });
  }
  ionViewDidLoad() {
    this.events.subscribe('price:added', (data) => {
      this.submit.price = data;
    });
    console.log('ionViewDidLoad CustomitempopoverPage');
  }

}
