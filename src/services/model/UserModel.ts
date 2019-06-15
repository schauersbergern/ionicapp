import { RepositoryModelBase } from './RepositoryModelBase';

export class UserModel extends RepositoryModelBase {
    name : string;
    hash : string;
    email : string;
    lat : number;
    lon : number;
}