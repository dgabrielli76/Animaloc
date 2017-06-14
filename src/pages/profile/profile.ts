import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPetPage } from '../add-pet/add-pet';

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
    this.pets.push({name: 'Killian', photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/1185135_404256463007751_173406248_n.jpg?oh=7f2153792c766e60dc1f8de59beafd87&oe=59E8CD95'});
  }

  showAddPetPage() {
    this.navCtrl.push(AddPetPage);
  }

}
