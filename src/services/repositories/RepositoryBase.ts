import { Observable } from "rxjs";

export abstract class RepositoryBase<TDataType> {
	constructor(
    ){}
    
    public readAll() : Observable<TDataType[]>
    {
        return new Observable<TDataType[]>();
    }
    
    public read(key : string) : Observable<TDataType>
	{
        return new Observable<TDataType>();
    }

    public update(data: TDataType) : Observable<TDataType> {
        return new Observable<TDataType>();
    }
    
    public create(data : TDataType) : Observable<TDataType> {
        return new Observable<TDataType>();
    }

    public delete(key : string)
    {

    }
}