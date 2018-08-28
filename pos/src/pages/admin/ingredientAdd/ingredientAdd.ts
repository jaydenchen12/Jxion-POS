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
  selector: 'page-ingredientAdd',
  templateUrl: 'ingredientAdd.html',
})
export class ingredientAddPage {
  ingredientCategory;
  constructor(public navCtrl: NavController, private util: UtilProvider) {
    util.getReq("menuEdit/ingredientCategory")
      .then( (json) => {
        this.ingredientCategory = json;
        console.log('add pulled',this.ingredientCategory)
      });
  }
  submit = {postDest:"ingredient"};
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  submitItem() {

    if (!this.submit.hasOwnProperty('ingredientItemCategoryID')){
      this.util.presentAlert("Need Ingredient Category.");
    } else if (!this.submit.hasOwnProperty('ingredientItemTitleEn')) {
      this.util.presentAlert("Need Ingredient Title (English).");
    } else if (!this.submit.hasOwnProperty('ingredientItemTitleCh')) {
      this.util.presentAlert("Need Ingredient Title (Chinese).");
    } else {
      this.util.postReq("menuEdit/post/", this.submit);
      this.util.presentToast("Ingredient Successfully Added")
      console.log('submitted item', this.submit);
      this.submit = {postDest:"ingredient"};}
  }


}
