import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { RepositoryModelBase } from '../model/RepositoryModelBase';

export abstract class RepositoryBase<TDataType extends RepositoryModelBase>  {

    private firebaseTable: AngularFirestoreCollection<TDataType>;

    abstract getCollectionName(): string;

    constructor(private firestore: AngularFirestore) {
        this.firebaseTable = this.firestore.collection<TDataType>(this.getCollectionName());
    }

    public readAll(): Observable<TDataType[]> {
        return this.firebaseTable.valueChanges();
    }

    public read(id: string): Observable<TDataType> {
        const key = this.findKey(id);
        const result = new Observable<TDataType>((observer) => {
            key.subscribe((ele) => {
                if (ele.length > 0) {
                    const docKey = ele[0].payload.doc.id;
                    return this.firebaseTable.doc<TDataType>(docKey).valueChanges().subscribe(data => {
                        observer.next(data);
                        observer.complete();
                    });
                }
            });
        });
        return result;
    }

    public update(data: TDataType) {
        this.firebaseTable.doc(data.id).set(data);
    }

    public create(data: TDataType) {
        this.firebaseTable.add(data);
    }

    public delete(id: string) {
        const key = this.findKey(id);

        key.subscribe((ele) => {
            if (ele.length > 0) {
                this.firebaseTable.doc<TDataType>(ele[0].payload.doc.id).delete();
            }
        });
    }

    private findKey(id: string): Observable<DocumentChangeAction<TDataType>[]> {
        const filtered = this.firestore.collection<TDataType>(this.getCollectionName(), ref => ref.where('id', '==', id));
        const key = filtered.snapshotChanges();
        return key;
    }
}
