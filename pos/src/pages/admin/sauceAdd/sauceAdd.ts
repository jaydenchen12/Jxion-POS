import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilProvider } from "../../../providers/util/util";
/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sauceAdd',
  templateUrl: 'sauceAdd.html',
})
export class sauceAddPage {
  constructor(public navCtrl: NavController, private util: UtilProvider) {
  }
  submit = {postDest:"sauce"};
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  submitItem() {
    if (!this.submit.hasOwnProperty('sauceItemTitleEn')){
      this.util.presentAlert("Need Sauce Name English.")
    } else if (!this.submit.hasOwnProperty('sauceItemTitleCh')) {
      this.util.presentAlert("Need Sauce Name Chinese.")
    } else {
      this.util.postReq("menuEdit/post/", this.submit);
      this.util.presentToast("Sauce Successfully Added")
      console.log('submitted item', this.submit);
      this.submit = {postDest:"sauce"};}
  }
}
