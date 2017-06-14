import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { AlertController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private geolocation: Geolocation, private googleMaps: GoogleMaps) {

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

       // move the map's camera to current position
       this.geolocation.getCurrentPosition().then((position) => {

           let latLng: LatLng = new LatLng(position.coords.latitude, position.coords.longitude);

           let pos: CameraPosition = {
            target: latLng,
            zoom: 18
           };

           map.moveCamera(pos);

           map.setMyLocationEnabled(true);

           // create new marker
           let markerOptions: MarkerOptions = {
            position: latLng,
            title: 'CREATIS'
           };

           map.addMarker(markerOptions).then((marker: Marker) => {
             marker.showInfoWindow();
           });

           map.addCircle({
            'center': pos,
            'radius': 50,
            'strokeColor' : '#27ae60',
            'strokeWidth': 2,
            'fillColor' : '#2ecc71'
          });

         });

     }
    );

  }


}
