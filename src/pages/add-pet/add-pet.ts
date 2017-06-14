import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the AddPetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-pet',
  templateUrl: 'add-pet.html',
})
export class AddPetPage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }


  pushScanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
  }
}
