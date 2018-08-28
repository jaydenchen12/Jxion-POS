import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Events, PopoverController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import {AddOnCostPage} from "../add-on-cost/add-on-cost"

/**
 * Generated class for the CustomitempopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modalpopover',
  templateUrl: 'modalPopover.html',
})
export class ModalPopverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private util: UtilProvider, public modalCtrl: ModalController, public events: Events, public popoverCtrl: PopoverController) {
  }
  submit = {
    price: 0
  };

  startItem() {
    if (!this.submit.hasOwnProperty('enMenuItemTitle') || !this.submit.hasOwnProperty('chMenuItemTitle')) {
      this.util.presentAlert("Need A Request Name.")
    }  else {
      this.util.presentToast("Request Successfully Added")
      let specialChoice = this.submit;
      this.events.publish('request:added', specialChoice)
      this.viewCtrl.dismiss();
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
