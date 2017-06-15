import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { LoaderProvider } from '../../providers/loader/loader';

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
  public alreadyConnected: boolean;

  constructor(public navCtrl: NavController, public loaderProvider: LoaderProvider) {
    firebase.auth().onAuthStateChanged((user) => {
      // User is connected
      if(user) {
        if(!this.alreadyConnected) {
          this.alreadyConnected = true;
          if(this.navCtrl.getActive().name != 'HomePage') navCtrl.setRoot(HomePage);
        }
      }
      // User is disconnected
      else {
        this.alreadyConnected = false;
        if(this.navCtrl.getActive().name != 'LoginPage') navCtrl.setRoot(LoginPage);
      }
    });
  }

  connection() {
    this.loaderProvider.showLoader('Veuillez patienter...');

    this.errorEmail = false;
    this.errorPassword = false;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
      this.loaderProvider.hideLoader();

      var errorCode = error.code;

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
