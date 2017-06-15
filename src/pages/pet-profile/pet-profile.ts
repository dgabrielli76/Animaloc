import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LatLng } from '@ionic-native/google-maps';
import { AlertController } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';

declare var firebase: any;

/**
 * Generated class for the PetProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pet-profile',
  templateUrl: 'pet-profile.html',
})
export class PetProfilePage {
  public pet: {name: string, photo: string, IBeaconId: string, id: string, lost: boolean};

  constructor(public navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications, public alertCtrl: AlertController, public loaderProvider: LoaderProvider) {
    this.pet = this.navParams.get('pet');
  }

  lostPetAction() {
    this.loaderProvider.showLoader('Veuillez patienter...');
    if(!this.pet.lost) {
      this.pet.lost = true;
      firebase.database().ref('/' + firebase.auth().currentUser.uid + '/' + this.pet.id).update(this.pet).then(() => {
        this.loaderProvider.hideLoader();
      });
      this.localNotifications.schedule({
        id: 1,
        text: 'Votre animal a été détecté.',
        at: new Date(new Date().getTime() + 5000),
        data: { secret: new LatLng(43.0741904,-89.3809802) }
      });
    }
    else {
      this.pet.lost = false;
      firebase.database().ref('/' + firebase.auth().currentUser.uid + '/' + this.pet.id).update(this.pet).then(() => {
        this.loaderProvider.hideLoader();
      });;
    }
  }

  deletePet() {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer',
      message: 'êtes-vous sur de vouloir supprimer votre animal ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {

          }
        },
        {
          text: 'Oui',
          handler: () => {
            firebase.database().ref('/' + firebase.auth().currentUser.uid + '/' + this.pet.id).remove().then(() => {
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
