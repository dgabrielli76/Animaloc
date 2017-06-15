import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoaderProvider {
  public loader: Loading;

  constructor(public loadingCtrl: LoadingController) {

  }

  showLoader(message) {
    this.loader = this.loadingCtrl.create({
      content: message,
      spinner: 'crescent',
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  hideLoader() {
    if(this.loader) this.loader.dismiss();
  }
}
