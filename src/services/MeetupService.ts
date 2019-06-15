import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MeetupModel } from '../services/model/MeetupModel';
import { MeetupRepository } from './repositories/MeetupRepository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(private firestore: AngularFirestore,
              private meetupRepository: MeetupRepository) { }

  getAllMeetups() {
    return this.firestore.collection('meetupList').snapshotChanges();
  }

  addMeetup(meetupModel : MeetupModel) {
    this.firestore.collection('meetupList').add(meetupModel);
  }

  get(id: string) : Observable<MeetupModel> {
    return this.meetupRepository.read(id);
  }
}