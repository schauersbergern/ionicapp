import { Injectable } from "@angular/core";
import { MeetupModel } from "./model/MeetupModel";
import { UserService } from "./UserService";
import { Guid } from "guid-typescript"

@Injectable()
export class MeetupService {

    constructor(
            private userService : UserService,
        ) {}
        

        public create(locationId : string): MeetupModel
        {
            let meetup = new MeetupModel();

            meetup.closed = false;
            meetup.id = Guid.create().toString();
            meetup.locationId = locationId;
            meetup.startedAt = new Date();
            meetup.startedByUserId = this.userService.currentUserId;

            return meetup;
        }
}