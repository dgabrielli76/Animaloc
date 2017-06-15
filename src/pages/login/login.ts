import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var firebase: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: String;
  public password: String;
  public errorEmail: boolean;
  public errorPassword: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      // User is connected
      if(user) {
        navCtrl.push(HomePage);
      }
      // User is disconnected
      else {
        if(this.navCtrl.getActive().name != 'LoginPage') navCtrl.push(LoginPage);
      }
    });
  }

  connection() {
    this.errorEmail = false;
    this.errorPassword = false;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        this.errorPassword = true;
      } else if (errorCode === 'auth/invalid-email') {
        this.errorEmail = true;
      } else if (errorCode === 'auth/user-not-found') {
        this.errorEmail = true;
      }
    });
  }

  goToRegistrationPage() {
    this.navCtrl.push(RegisterPage);
  }
}
