export class reservation  {
    public Type:string;
    public DateArrive:string;
    public HeureArrive:string;
    public tables_id:number;   
    public id:number;
    public api_token:string;
 constructor(id,DateArrive,HeureArrive,tables_id,api_token,Type){
     this.DateArrive=DateArrive;
     this.HeureArrive=HeureArrive;
    this.tables_id=tables_id;
    this.api_token=api_token;
    this.Type=Type;
    this.id=id;
 }
}