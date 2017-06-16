import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition, LatLng } from '@ionic-native/google-maps';
import { ProfilePage } from '../profile/profile';
import { BLE } from '@ionic-native/ble';
import { LoaderProvider } from '../../providers/loader/loader';

declare var firebase: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map: GoogleMap;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private ble: BLE, public loaderProvider: LoaderProvider) {

  }

  ionViewDidLoad() {
    this.loadMap();

    // Start BLE scan
    var services = [];
    var self = this;
    this.ble.startScanWithOptions(services, {reportDuplicates: false}).subscribe((device) => {
      console.log(JSON.stringify(device));
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
         this.getPets();
       });
     }
    );
  }

  pushProfile() {
    this.navCtrl.push(ProfilePage);
  }

  getPets() {
    this.loaderProvider.showLoader('Veuillez patienter...');

    firebase.database().ref('/').once('value').then((snapshot) => {
      if(snapshot.val()) {
        for(let key of Object.keys(snapshot.val())) {
          if(snapshot.val()[key].owner == firebase.auth().currentUser.uid) {
            if(snapshot.val()[key].positions) {
              var last = snapshot.val()[key].positions[snapshot.val()[key].positions.length - 1];
              var lastPos = new LatLng(last.lat, last.lng);
              this.map.addMarker({
                position: lastPos,
                icon: '#2ecc71',
                title: snapshot.val()[key].name + '\n' + this.formatDate(new Date(last.date))
              })
              this.map.addCircle({
                'center': lastPos,
                'radius': 50,
                'strokeColor' : '#2ecc71',
                'strokeWidth': 0,
                'fillColor' : '#2ecc71'
              });
            }
          }
          else if(snapshot.val()[key].lost){
            if(snapshot.val()[key].positions) {
              var last = snapshot.val()[key].positions[snapshot.val()[key].positions.length - 1];
              var lastPos = new LatLng(last.lat, last.lng);
              this.map.addMarker({
                position: lastPos,
                icon: '#f53d3d',
                title: snapshot.val()[key].name + '\n' + this.formatDate(new Date(last.date))
              })
              this.map.addCircle({
                'center': lastPos,
                'radius': 50,
                'strokeColor' : '#f53d3d',
                'strokeWidth': 0,
                'fillColor' : '#f53d3d'
              });
            }
          }
        }
      }
      this.loaderProvider.hideLoader();
    });
  }

  formatDate(d) {
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring;
  }
}
