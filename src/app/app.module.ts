import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BLE } from '@ionic-native/ble';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { AddPetPage } from '../pages/add-pet/add-pet';
import { PetProfilePage } from '../pages/pet-profile/pet-profile';
import { LoaderProvider } from '../providers/loader/loader';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AddPetPage,
    PetProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'wp'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AddPetPage,
    PetProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    BarcodeScanner,
    Camera,
    LocalNotifications,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderProvider
  ]
})
export class AppModule {}
