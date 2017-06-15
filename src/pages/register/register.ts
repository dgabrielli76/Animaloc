import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';

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

  constructor(public navCtrl: NavController, public loaderProvider: LoaderProvider) {

  }

  createAccount() {
    this.loaderProvider.showLoader('Veuillez patienter...');

    this.errorEmail = false;
    this.errorPassword = false;

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
      this.loaderProvider.hideLoader();

      var errorCode = error.code;

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
