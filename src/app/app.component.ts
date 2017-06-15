import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LatLng } from '@ionic-native/google-maps';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, private statusBar: StatusBar, private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.setStatusBarStyle();
      this.scheduleNotifications();
    });
  }

  setStatusBarStyle() {
    this.statusBar.styleLightContent();
  }

  scheduleNotifications() {
    this.localNotifications.on('click', (result, state)=>{
      JSON.parse(result.data).secret;
    })
  }
}
