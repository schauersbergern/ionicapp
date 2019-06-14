import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

    constructor() {

    }

    testMarker(){

        let center = this.mapComponent.map.getCenter();
        this.mapComponent.addMarker(center.lat(), center.lng());

    }
  
}
