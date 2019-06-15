import { Injectable } from "@angular/core";
import { RepositoryBase } from "./RepositoryBase";
import { UserModel } from "../model/UserModel";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserRepository extends RepositoryBase<UserModel> {

    constructor(firestore: AngularFirestore)
    {
        super(firestore);
    }
    
    getCollectionName(): string {
       return 'userList';
    }
}