import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {KitchenPage} from '../kitchen/kitchen';
import {FryerPage} from '../fryer/fryer';
import {RicePage} from '../rice/rice';
import {AdminPage} from '../admin/admin';
import {PackerPage} from '../packer/packer'
import {UtilProvider} from '../../providers/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pages: any = {
    itemsPerRow: 3,
    items: [
      {page: KitchenPage, image: "img/kitchen.png"},
      {page: FryerPage, image: "img/fryer.png"},
      {page: RicePage, image: "img/rice.png"},
      {page: RegisterPage, image: "img/cash_register.png"},
      {page: PackerPage, image: "img/packer.png"},
      {page: AdminPage, image: "img/admin.png"}
    ]
  };



  constructor(public navCtrl: NavController, public util: UtilProvider) {
  }


  changeLanguage() {
    if (!this.util.isChinese) {
      this.util.isChinese = true;


    } else {
      this.util.isChinese = false;
    }
  }
}
