import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    map.one(GoogleMapsEvent.MAP_READY).then(
     () => {
       map.setMyLocationEnabled(true);

       map.getMyLocation((location) => {
         // Set camera location
         let position: CameraPosition = {
           target: location.latLng,
           zoom: 18
         };
         map.moveCamera(position);
       });
     }
    );
  }
}
