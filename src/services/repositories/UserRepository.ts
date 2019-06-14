import { Injectable } from "@angular/core";
import { RepositoryBase } from "./RepositoryBase";
import { UserModel } from "../model/UserModel";

@Injectable()
export class UserRepository extends RepositoryBase<UserModel> {
}