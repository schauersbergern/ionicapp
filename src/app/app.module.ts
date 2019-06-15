import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MeetupService } from 'src/services/MeetupService';
import { UserService } from 'src/services/UserService';
import { MeetupRepository } from 'src/services/repositories/MeetupRepository';
import { LocationRepository } from 'src/services/repositories/LocationRepository';
import { UserRepository } from 'src/services/repositories/UserRepository';

import { AngularFireModule } from '@angular/fire/firebase.app.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { LocationService } from 'src/services/LocationService';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MeetupService,
    UserService,
    LocationService,
    MeetupRepository,
    LocationRepository,
    UserRepository,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
