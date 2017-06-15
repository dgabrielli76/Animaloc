import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';

declare var firebase: any;

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

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  private IBeaconId: string;
  private blazeDuPet: string;
  private imageSrc: string;

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.IBeaconId = barcodeData.text
    }, (err) => {
      // An error occurred
    });
  }

  accessGallery() {
    let cameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 100,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true
  }

  this.camera.getPicture(cameraOptions)
    .then(file_uri => this.imageSrc = file_uri,
    err => console.log(err));
  }

  finish() {
    firebase.database().ref('/' + firebase.auth().currentUser.uid).push({
        name: this.blazeDuPet,
        photo: this.imageSrc,
        IBeaconId: this.IBeaconId
    });
  }

}
