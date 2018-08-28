import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AlertController, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/*
 Generated class for the UtilProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UtilProvider {

// URI = "http://13.90.200.43:1996/";
  // wsURL = "ws://13.90.200.43:8080/";
  // URI = "http://34.212.241.179:1996/";
  // sseURL = "http://34.212.241.179:8080/";
    URI = "http://jaydenchen12.hopto.org:1996/";
    sseURL = "http://jaydenchen12.hopto.org:8080/";
  isChinese: boolean = false;
  ws;

  constructor(public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  error(err) {
    console.log(err);
  }

  getReq(endpoint) {
    return new Promise((resolve, reject) => {
      this.http.get(this.URI + endpoint).map(res => res.json()).subscribe(data => {
        console.log("data from server", data);
        resolve(data);
      });
    });
  }

  postReq(endpoint, jsonObj) {
    let body = JSON.stringify(jsonObj)
    console.log("postData", body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(this.URI + endpoint, body, options).subscribe(
      (data) => console.log(data));
  }

  tileSelected(tile, navCtrl) {
    navCtrl.push(tile);
  }

  presentToast(toastMessage) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  presentAlert(errorMessage) {
    let alert = this.alertCtrl.create({
      title: 'ERROR!',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
