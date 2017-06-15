import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPetPage } from '../add-pet/add-pet';

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

  constructor(public navCtrl: NavController) {
    this.pets = new Array<Object>();

    //this.pets = firebase.database().list('/' + firebase.auth().currentUser.uid);

    firebase.database().ref('/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
      for(let key of Object.keys(snapshot.val())) {
        this.pets.push({name: snapshot.val()[key].name, photo: snapshot.val()[key].photo});
      }
    });

  }

  showAddPetPage() {
    this.navCtrl.push(AddPetPage);
  }

  disconnect() {
    firebase.auth().signOut();
  }
}
