import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition} from '@ionic-native/google-maps';
import { ProfilePage } from '../profile/profile';
import { BLE } from '@ionic-native/ble';

declare var firebase: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map: GoogleMap;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private ble: BLE) {

  }

  ionViewDidLoad() {
    this.loadMap();

    // Start BLE scan
    var services = [];
    var self = this;
    this.ble.startScanWithOptions(services, {reportDuplicates: false}).subscribe((device) => {
      console.log(device.id);
      firebase.database().ref(device.id).once('value').then((snapshot) => {
        if(snapshot.val()) {
          var pet = snapshot.val();
          self.map.getMyLocation((location) => {
            var position = {date: new Date().getTime(),
              lat: location.latLng.lat,
              lng: location.latLng.lng,
              user: firebase.auth().currentUser.uid};
            if(!pet.positions) pet.positions = [];
            pet.positions.push(position);
            firebase.database().ref(pet.id).set(pet);
          });
        }
      });
    });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    this.map.one(GoogleMapsEvent.MAP_READY).then(
     () => {
       this.map.setMyLocationEnabled(true);

       this.map.getMyLocation((location) => {
         // Set camera location
         let position: CameraPosition = {
           target: location.latLng,
           zoom: 18
         };
         this.map.moveCamera(position);
       });
     }
    );
  }

  pushProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
