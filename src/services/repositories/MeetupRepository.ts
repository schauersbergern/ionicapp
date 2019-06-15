import { Injectable } from '@angular/core';
import { MeetupModel } from '../model/MeetupModel';
import { RepositoryBase } from './RepositoryBase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class MeetupRepository extends RepositoryBase<MeetupModel> {

    constructor(firestore: AngularFirestore)
    {
        super(firestore);
    }

    getCollectionName(): string {
        return 'meetupList';
    }
}
