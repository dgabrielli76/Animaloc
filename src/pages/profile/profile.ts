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
    this.pets.push({name: 'Zara', photo: 'https://funtastique.fr/wp-content/uploads/2015/11/des-chats-moches-6.jpg'});
    this.pets.push({name: 'Killian', photo: 'https://www.google.fr/search?q=the+rock&rlz=1C5CHFA_enFR738FR738&tbm=isch&imgil=EXAxPonaznZm4M%253A%253Bc64ypeer5Z5CPM%253Bhttp%25253A%25252F%25252Fwww.muscleandfitness.com%25252Fnutrition%25252Fmeal-plans%25252Fsmell-what-rock-cooking&source=iu&pf=m&fir=EXAxPonaznZm4M%253A%252Cc64ypeer5Z5CPM%252C_&usg=__Or4afuxCr2EY-7FnCfRYUq5LsmI%3D&biw=1440&bih=706&ved=0ahUKEwiJ8OLfyb_UAhVJfRoKHXpMANUQyjcImQE&ei=kVhCWcnjOMn6afqYgagN#imgrc=EXAxPonaznZm4M:'});
  }

  showAddPetPage() {
    this.navCtrl.push(AddPetPage);
  }

  disconnect() {
    firebase.auth().signOut();
  }
}
