import {Component} from '@angular/core';
import {NavController, NavParams, Events, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-add-on-cost',
  templateUrl: 'add-on-cost.html',
})
export class AddOnCostPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController,) {
  }

  inputCost;
  inputArray = ['0', '0'];
  confirmState: boolean = false;

  numberInput(num) {

    if (num == 'confirm') {
      this.events.publish('price:added', this.inputCost);
      console.log('cost input', this.inputCost);
      this.viewCtrl.dismiss();
    } else if (num == 'cancel') {
      this.viewCtrl.dismiss();
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
    this.inputCost = Number(tempArray.join('')).toFixed(2);
    return this.inputCost
  }

}
