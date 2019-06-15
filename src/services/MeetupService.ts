import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MeetupModel } from '../services/model/MeetupModel';
import { MeetupRepository } from './repositories/MeetupRepository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(private meetupRepository: MeetupRepository) { }

  getAllMeetups(): Observable<MeetupModel[]> {
    return this.meetupRepository.readAll();
  }

  add(meetupModel: MeetupModel) {
    this.meetupRepository.create(meetupModel);
  }

  update(meetupModel: MeetupModel)
  {
    this.meetupRepository.update(meetupModel);
  }

  get(id: string): Observable<MeetupModel> {
    return this.meetupRepository.read(id);
  }
}