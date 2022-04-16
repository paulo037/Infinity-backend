export abstract class Entity<T> {
    public props: T;
    protected _id: number | undefined;

    
    public get id() {
        return this._id
    }
    
    constructor(props: T, id?: number){
        this._id = id 
        this.props = props;
    }
}