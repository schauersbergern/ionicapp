import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { UserModel } from '../../services/model/UserModel';
import { MeetupService } from 'src/services/MeetupService';

import { MeetupModel } from '../../services/model/MeetupModel';

@Component({
  selector: 'app-employee-list',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserListPage implements OnInit {

  list: UserModel[];

  constructor(private service: UserService, private meetupService: MeetupService, private firestore: AngularFirestore) { }

  ngOnInit() {

    this.service.getAllUsers().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as UserModel;
      })
      console.log(this.list)
    });

  }

  addUser() {
    /*
    const user : UserModel = {
      id: "3",
      name : "Hallo",
      hash : "wweer",
      email : "abc@d.e",
      lat : 47.08546,
      lon : 9.8858
    }
    this.service.addUser(user)
  */

    /*
    const meetup : MeetupModel = {
      title: "Bei Kaffeemaschine",
      description: "Heute ist ein schöner Tag",
      id : "3123123",
      startedAt: new Date(),
      startedByUserId: "1",
      closed: false,
      locationId: "234"
    }
    this.meetupService.addMeetup(meetup)
    */
  }

}