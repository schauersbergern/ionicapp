import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MeetupModel } from '../services/model/MeetupModel';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(private firestore: AngularFirestore) { }

  getAllMeetups() {
    return this.firestore.collection('meetupList').snapshotChanges();
  }

  addMeetup(meetupModel : MeetupModel) {
    this.firestore.collection('meetupList').add(meetupModel);
  }
}