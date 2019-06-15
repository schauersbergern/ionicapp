import { Component, Input, Renderer2, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AppComponent } from '../../app/app.component';
import { RouterModule, Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { Guid } from 'guid-typescript';

const { Geolocation, Network } = Plugins;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})

export class GoogleMapsComponent implements OnInit {

    @Input('apiKey') apiKey: string;

    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;

    constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document, public nav : Router){        

    }

    ngOnInit(){

        this.init(Geolocation.getCurrentPosition()).then((res) => {
            console.log("Google Maps ready.");
            this.testMarker();
        }, (err) => {    
            console.log(err);
        });

    }

    testMarker(){

        let mymap = this.map;
        this.map.mapOptions
        if (mymap != null)
        {
           let center = mymap.getCenter();
           //this.addMarker(center.lat(), center.lng());
           let userMark1 = new UserMark();
           userMark1.Comp = this;
           userMark1.Mark = this.addMarker(47.085350,9.8856, "Dr. No.");           
           userMark1.Id = Guid.create();

           let userMark2 = new UserMark();
           userMark2.Comp = this;
           userMark2.Mark = this.addMarker(47.085550,9.885300, "Bernhard");
           userMark2.Id = Guid.create();

           let arrayUser = [userMark1, userMark2];

           let locMark1 = new LocationMark();
           locMark1.Comp = this;
           locMark1.Mark = this.addLocation(47.085700,9.885500, "Kaffeemaschine");
           locMark1.Id = Guid.create();
           
           let locMark2 = new LocationMark();
           locMark2.Comp = this;
           locMark2.Mark = this.addLocation(47.085700,9.882450, "Kaffeemaschine 2");
           locMark2.Id = Guid.create();

           let arrayCoffee = [locMark1, locMark2];

           for(let i=0;i<arrayUser.length;i++){        
                arrayUser[i].Mark.addListener('click', () => {
                    arrayUser[i].HandleClick();
                });                          
            } 

            for (let i=0;i<arrayCoffee.length;i++) {
                arrayCoffee[i].Mark.addListener('click',() => {                
                    arrayCoffee[i].HandleClick();
                });
            }
            
            // Reposition marks...
                //mrk1.setPosition(new google.maps.LatLng( 47.085350,10 ));

        } 
    } 

    private init(locCenter: Promise<GeolocationPosition>): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                this.initMap(locCenter).then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });

            }, (err) => {

                reject(err);

            });

        });

    }

    private loadSDK(): Promise<any> {

        console.log("Loading Google Maps SDK");

        return new Promise((resolve, reject) => {

            if(!this.mapsLoaded){

                Network.getStatus().then((status) => {

                    if(status.connected){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {

                        if(this.networkHandler == null){

                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                                if(status.connected){

                                    this.networkHandler.remove();

                                    this.init(Geolocation.getCurrentPosition()).then((res) => {
                                        console.log("Google Maps ready.")
                                    }, (err) => {    
                                        console.log(err);
                                    });

                                }

                            });

                        }

                        reject('Not online');
                    }

                }, (err) => {

                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if(navigator.onLine){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {
                        reject('Not online');
                    }

                });

            } else {
                reject('SDK already loaded');
            }

        });


    }

    private injectSDK(): Promise<any> {

        return new Promise((resolve, reject) => {

            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            }

            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if(this.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';       
            }

            this.renderer.appendChild(this._document.body, script);

        });

    }

    private initMap(locCenter: Promise<GeolocationPosition>): Promise<any> {

        return new Promise((resolve, reject) => {

            //Geolocation.getCurrentPosition().then((position) => {
               locCenter.then((position) => {

                console.log(position);

                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 20
                };

                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
                resolve(true);

            }, (err) => {

                reject('Could not initialise map');

            }); 

        });

    }

    public addMarker(lat: number, lng: number, user: string): google.maps.Marker {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            label: user,
            title: user
        });

        this.markers.push(marker);

        return marker;
    }

    public addLocation(lat: number, lng: number, user: string): google.maps.Marker {

        let latLng = new google.maps.LatLng(lat, lng);

        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            label: user,
            title: user,
            icon: image
        });

        this.markers.push(marker);

        return marker;
    }

}

export class UserMark {
    public Comp: GoogleMapsComponent;
    public Id: Guid;
    public Mark: google.maps.Marker;

    public HandleClick()
    {
        window.confirm("Hello " + this.Mark.getTitle()); 
        this.Comp.nav.navigate(['home']);
    }
}

export class LocationMark {
    public Comp: GoogleMapsComponent;
    public Id: Guid;
    public Mark: google.maps.Marker;

    public HandleClick()
    {
        window.confirm("Hello " + this.Mark.getTitle()); 
        this.Comp.nav.navigate(['home']);
    }
}


