import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UserModel } from '../services/model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getAllUsers() {
    return this.firestore.collection('userList').snapshotChanges();
  }

  addUser(userModel : UserModel) {
    this.firestore.collection('userList').add(userModel);
  }
}