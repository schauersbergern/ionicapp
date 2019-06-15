import { Injectable } from "@angular/core";
import { RepositoryBase } from "./RepositoryBase";
import { LocationModel } from "../model/LocationModel";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class LocationRepository extends RepositoryBase<LocationModel> {

    constructor(firestore: AngularFirestore)
    {
        super(firestore);
    }
    
    getCollectionName(): string {
        return 'locationList';
    }
}