import { Component, Input, Renderer2, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AppComponent } from '../../app/app.component';
import { RouterModule, Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { Guid } from 'guid-typescript';
import { UserModel } from 'src/services/model/UserModel';
import { UserService } from 'src/services/UserService';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private userlist: UserModel[];

    public id: any;
    public options: any;

    constructor(private service: UserService, private firestore: AngularFirestore, private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document, public nav : Router){        
        this.options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
          };      
    }

    success(pos) {
      var crd = pos.coords;
    
// TODO: Update coordinates in firestore...

/*      if (this.target.latitude === crd.latitude && this.target.longitude === crd.longitude) {
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(this.id);
      } */
    }
    
    error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }               

    ngOnInit(){

        this.id = navigator.geolocation.watchPosition(this.success, this.error, this.options);        

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
            this.service.getAllUsers().subscribe(actionArray => {
                this.userlist = actionArray.map(item => {
                  return {
                    id: item.payload.doc.id,                    
                    ...item.payload.doc.data()
                    /*                    name: item.payload.doc.data.name,
                    hash : item.payload.doc.data.hash,
                    email : item.payload.doc.email,
                    lat : item.payload.doc.lat,
                    lon : item.payload.doc.lon                                     */
                  } as UserModel;
                });
                this.afterTestMarker(mymap);
            });
        } 
    } 

    afterTestMarker(mymap : any)
    {
        let center = mymap.getCenter();
        //this.addMarker(center.lat(), center.lng());        

        this.DeleteMarkers();
        
        let userArray = new Array();

        if (this.userlist != null)
         {
             for(let j=0; j < this.userlist.length;j++)
             {
                  let userMarkX = new UserMark();     
                  userMarkX.Comp = this;
                  userMarkX.Mark = this.addMarker(this.userlist[j].lat,this.userlist[j].lon, this.userlist[j].name);           
                  userMarkX.Id = this.userlist[j].id;
                  userArray.push(userMarkX);            
             }     
         }
 
        for(let i=0;i<userArray.length;i++){        
             userArray[i].Mark.addListener('click', () => {
             userArray[i].HandleClick();
             });                          
         }

        let locMark1 = new LocationMark();
        locMark1.Comp = this;
        locMark1.Mark = this.addLocation(47.085700,9.885500, "Kaffeemaschine");
        locMark1.Id = "A";
        
        let locMark2 = new LocationMark();
        locMark2.Comp = this;
        locMark2.Mark = this.addLocation(47.085700,9.882450, "Kaffeemaschine 2");
        locMark2.Id = "B";

        let arrayCoffee = [locMark1, locMark2];

         for (let i=0;i<arrayCoffee.length;i++) {
             arrayCoffee[i].Mark.addListener('click',() => {                
                 arrayCoffee[i].HandleClick();
             });
         }
         
         // Reposition marks...
             //mrk1.setPosition(new google.maps.LatLng( 47.085350,10 ));
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

    DeleteMarkers() {
        //Loop through all the markers and remove
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    };
}

export class UserMark {
    public Comp: GoogleMapsComponent;
    public Id: string;
    public Mark: google.maps.Marker;

    public HandleClick()
    {
        window.confirm("Hello " + this.Mark.getTitle()); 
        this.Comp.nav.navigate(['home']);
    }
}

export class LocationMark {
    public Comp: GoogleMapsComponent;
    public Id: string;
    public Mark: google.maps.Marker;

    public HandleClick()
    {
        window.confirm("Hello " + this.Mark.getTitle()); 
        this.Comp.nav.navigate(['home']);
    }
}


