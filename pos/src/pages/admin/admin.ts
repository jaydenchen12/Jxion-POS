import { Component } from '@angular/core';
import { menuAddPage } from './menuAdd/menuAdd';
import { sauceAddPage } from './sauceAdd/sauceAdd';
import { ingredientAddPage } from './ingredientAdd/ingredientAdd';
import { NavController } from 'ionic-angular';
import { ReportingPage } from '../reporting/reporting'

/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'admin.html'
})
export class AdminPage {
  tab1Root = menuAddPage;
  tab2Root = sauceAddPage;
  tab3Root = ingredientAddPage;
  tab4Root = ReportingPage;
  constructor(public navCtrl: NavController) {
  }
}
