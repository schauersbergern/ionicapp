import { Injectable } from "@angular/core";
import { RepositoryBase } from "./RepositoryBase";
import { LocationModel } from "../model/LocationModel";

@Injectable()
export class LocationRepository extends RepositoryBase<LocationModel> {
}