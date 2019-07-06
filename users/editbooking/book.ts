export class book {
    public Type:string;
    public DateArrive:string;
    public HeureArrive:string;
    public id:number;   
    
 constructor(id,Type,DateArrive,HeureArrive){
     this.DateArrive=DateArrive;
     this.HeureArrive=HeureArrive;
    this.id=id;

    this.Type=Type;
 }
}