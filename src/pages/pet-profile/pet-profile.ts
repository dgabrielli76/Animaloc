import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LatLng } from '@ionic-native/google-maps';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications, public alertCtrl: AlertController) {
  }

  modifiePetInfos() {
    // firebase.database().ref('/' + firebase.auth().currentUser.uid).modifie({
    //
    // });
  }

  lostPetAction() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Votre animal a été retrouvé.\nCliquez pour savoir où.',
      at: new Date(new Date().getTime() + 1),
      data: { secret: new LatLng(43.0741904,-89.3809802) }
    });
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer',
      message: 'Etes-vous sur de vouloir supprimer votre animal ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {

          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.deleteConfirmation()
          }
        }
      ]
    });
    confirm.present();
  }

  deleteConfirmation() {
    // firebase.database().ref('/' + firebase.auth().currentUser.uid).delete({
    //
    // });
  }

}
