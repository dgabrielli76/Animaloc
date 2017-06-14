import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

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

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
     () => {
       // create LatLng object
       let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

       // create CameraPosition
       let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
       };

       // move the map's camera to position
       map.moveCamera(position);

       // create new marker
       let markerOptions: MarkerOptions = {
        position: ionic,
        title: 'Ionic'
       };

       map.addMarker(markerOptions).then((marker: Marker) => {
         marker.showInfoWindow();
       });
     }
    );
  }
}
