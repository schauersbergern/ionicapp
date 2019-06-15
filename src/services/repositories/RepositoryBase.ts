import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export abstract class RepositoryBase<TDataType extends RepositoryModelBase>  {

    private firebaseTable: AngularFirestoreCollection<TDataType>;

    abstract getCollectionName(): string;

    constructor(private firestore: AngularFirestore
    ) {
        this.firebaseTable = this.firestore.collection<TDataType>(this.getCollectionName());
    }

    public readAll(): Observable<TDataType[]> {
        return this.firebaseTable.valueChanges();
    }

    public read(id: string) : Observable<TDataType> {
        const key = this.findKey(id);
        return this.firebaseTable.doc<TDataType>(key).valueChanges();
    }

    public update(data: TDataType) {
        this.firebaseTable.doc(data.id).set(data);
    }

    public create(data: TDataType) {
        this.firebaseTable.add(data);
    }

    public delete(id: string) {
        const key = this.findKey(id);
        this.firebaseTable.doc(key).delete();
    }

    private findKey(id: string): string {
        return this.firestore.collection<TDataType>(this.getCollectionName(), ref => ref.where('id', '==', id)).doc().ref.id;
    }
}