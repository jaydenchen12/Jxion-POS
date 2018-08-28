import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, Events} from 'ionic-angular';
import {OrderHistoryPage} from '../order-history/order-history';
import {TakeOrderPage} from '../take-order/take-order'
import {UtilProvider} from "../../providers/util/util";
import {OrderProcessPage} from '../order-in-process/order-in-process';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  buttonText1;
  buttonText2;
  buttonText3;
  buttonText4;

  constructor(public navCtrl: NavController, public navParams: NavParams, public util: UtilProvider, private alertCtrl: AlertController, public events: Events) {
    if (this.util.isChinese) {
      this.buttonText1 = "订单进度";
      this.buttonText2 = "订单历史";
      this.buttonText3 = "来拿";
      this.buttonText4 = "这里";
    } else {
      this.buttonText1 = "Order In Process";
      this.buttonText2 = "Order History";
      this.buttonText3 = "Pick Up";
      this.buttonText4 = "Walk In";
    }
  }

  showPrompt(orderType) {
    let prompt = this.alertCtrl.create({
      title: 'Customer Name',
      inputs: [
        {
          name: 'title',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Start Order',
          handler: data => {
            console.log('Saved clicked');
            data.title = data.title.replace(/[^a-zA-Z0-9 ]/g, "");
            let custInfo = [orderType, data.title];
            this.navCtrl.push(TakeOrderPage, {custInfo});
          }
        }
      ]
    });
    prompt.present();
  }

  activate(page) {
    if (page == 1)
      this.util.tileSelected(OrderProcessPage, this.navCtrl);
    else if (page == 2)
      this.util.tileSelected(OrderHistoryPage, this.navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  changeLanguage() {
    if (!this.util.isChinese) {
      this.util.isChinese = true;
      this.buttonText1 = "订单进度";
      this.buttonText2 = "订单历史";
      this.buttonText3 = "来拿";
      this.buttonText4 = "这里";

    } else {
      this.util.isChinese = false;
      this.buttonText1 = "Order In Process";
      this.buttonText2 = "Order History";
      this.buttonText3 = "Pick Up";
      this.buttonText4 = "Walk In";
    }
  }
}
