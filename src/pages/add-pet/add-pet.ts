import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { LoaderProvider } from '../../providers/loader/loader';

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
  private id: string;
  private name: string;
  private image: string;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private camera: Camera, private loaderProvider: LoaderProvider) {
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.id = barcodeData.text
    }, (err) => {
      // An error occurred
    });
  }

  openGallery() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((uri) => {
      this.image = uri;
    });
  }

  savePet() {
    this.loaderProvider.showLoader('Veuillez patienter...');
    if(!this.image) this.image = " ";

    firebase.database().ref(this.id).set({
      owner: firebase.auth().currentUser.uid,
      name: this.name,
      image: this.image,
      id: this.id,
      lost: false,
      positions: []
    }).then(() => {
      this.navCtrl.pop();
    });
  }

}
