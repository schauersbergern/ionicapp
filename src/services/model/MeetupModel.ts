import { RepositoryModelBase } from './RepositoryModelBase';

export class MeetupModel extends RepositoryModelBase {
    title: string;
    description: string;
    startedAt: Date;
    startedByUserId: string;
    closed: boolean;
    locationId: string;
}