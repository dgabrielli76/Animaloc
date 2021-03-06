import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPetPage } from '../add-pet/add-pet';
import { PetProfilePage } from '../pet-profile/pet-profile';
import { LoaderProvider } from '../../providers/loader/loader';

declare var firebase: any;
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  menu: string = "profile";
  pets: Array<Object>;
  public user: string;

  public name: string;
  public email: string;
  public phone: string;

  constructor(public navCtrl: NavController, public loaderProvider: LoaderProvider) {
    this.user = firebase.auth().currentUser.uid;

    this.email = firebase.auth().currentUser.email;

    firebase.auth().currentUser.providerData.forEach((profile) => {
      this.name = profile.displayName;
      this.phone = profile.phone;
    });
  }

  ionViewWillEnter() {
    this.pets = new Array<Object>();
    this.loaderProvider.showLoader('Veuillez patienter...');

    firebase.database().ref('/').once('value').then((snapshot) => {
      if(snapshot.val()) {
        for(let key of Object.keys(snapshot.val())) {
          this.pets.push({owner: firebase.auth().currentUser.uid, name: snapshot.val()[key].name, image: snapshot.val()[key].image, id: key, lost: snapshot.val()[key].lost, positions: snapshot.val()[key].positions});
        }
      }
      this.loaderProvider.hideLoader();
    });
  }

  showAddPetPage() {
    this.navCtrl.push(AddPetPage);
  }

  showPetProfile(pet) {
    this.navCtrl.push(PetProfilePage, {pet: pet});
  }

  disconnect() {
    firebase.auth().signOut();
  }

  updateProfile() {
    firebase.auth().currentUser.updateProfile({
      displayName: this.name,
      phone: this.phone
    }).then(function() {
      console.log('Saved');
    });
  }
}
