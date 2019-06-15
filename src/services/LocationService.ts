import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { LocationModel } from '../services/model/LocationModel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private firestore: AngularFirestore) { }

  getAllLocations() {
    return this.firestore.collection('locationList').snapshotChanges();
  }

  addMeetup(locationModel : LocationModel) {
    this.firestore.collection('locationList').add(locationModel);
  }

}