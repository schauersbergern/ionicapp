import { Injectable } from "@angular/core";
import { MeetupModel } from "../model/MeetupModel";
import { RepositoryBase } from "./RepositoryBase";

@Injectable()
export class MeetupRepository extends RepositoryBase<MeetupModel> {
}