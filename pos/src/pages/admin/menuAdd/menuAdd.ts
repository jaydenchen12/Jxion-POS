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
  selector: 'page-menuAdd',
  templateUrl: 'menuAdd.html',
})
export class menuAddPage {
  category;
  sauces;
  constructor(public navCtrl: NavController, private util: UtilProvider) {
    util.getReq("menuEdit/Category")
      .then( (json) => {
        this.category = json;
        console.log("serverCategory", this.category);
      });
    util.getReq("menuEdit/Sauce")
      .then( (json) => {
        this.sauces = json;
        console.log("serversauces", this.sauces);
      });
  }
  submit = {postDest:"menuItem"};
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  submitItem() {
    if (!(this.submit.hasOwnProperty('PriceSm')))
      this.submit['PriceSm'] = 0;
    if (!this.submit.hasOwnProperty('PriceLg')){
      this.util.presentAlert("Need Price Large.")
    } else if (!this.submit.hasOwnProperty('categoryID')) {
        this.util.presentAlert("Need Category.")
    } else if (!this.submit.hasOwnProperty('enItemTitle')) {
      this.util.presentAlert("Need English Title.")
    } else if (!this.submit.hasOwnProperty('chItemTitle')) {
      this.util.presentAlert("Need Chinese Title.")
    } else if (!this.submit.hasOwnProperty('defaultSauID')) {
      this.util.presentAlert("Need Default Sauce.")
    } else {
      this.util.postReq("menuEdit/post/", this.submit);
      this.util.presentToast("Menu Item Successfully Added")
      console.log('submitted item', this.submit);
      this.submit = {postDest:"menuItem"};}
  }
}
