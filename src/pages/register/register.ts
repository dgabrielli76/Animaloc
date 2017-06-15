import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var firebase: any;

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public email: String;
  public password: String;
  public passwordConfirmation: String;
  public errorEmail: boolean;
  public errorPassword: boolean;

  constructor(public navCtrl: NavController) {

  }

  createAccount() {
    this.errorEmail = false;
    this.errorPassword = false;

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);

      if (errorCode == 'auth/weak-password') {
        this.errorPassword = true;
      } else if (errorCode == 'auth/invalid-email') {
        this.errorEmail = true;
      } else if (errorCode == 'auth/email-already-in-use') {
        this.errorEmail = true;
      }
    });
  }
}
