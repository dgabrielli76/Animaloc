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
  private IBeaconId: string;
  private blazeDuPet: string;
  private imageSrc: string;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private camera: Camera, private loaderProvider: LoaderProvider) {
  }

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

  savePet() {
    this.loaderProvider.showLoader('Veuillez patienter...');

    firebase.database().ref('/' + firebase.auth().currentUser.uid).push({
        name: this.blazeDuPet,
        photo: this.imageSrc,
        IBeaconId: this.IBeaconId
    }).then(() => {
      this.navCtrl.pop();
    });
  }

}
