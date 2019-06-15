import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { UserModel } from '../../services/model/UserModel';

@Component({
  selector: 'app-employee-list',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserListPage implements OnInit {

  list: UserModel[];

  constructor(private service: UserService, private firestore: AngularFirestore) { }

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

}