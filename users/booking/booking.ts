export class booking  {
   public PartySize:number;
   public DateArrive:string;
   public HeureArrive:string;
   public FullName:string;
   public  api_token:string;
   public Type:string;
 constructor(api_token,PartySize,DateArrive,HeureArrive,FullName,Type){
     this.DateArrive=DateArrive;
     this.FullName=FullName;
     this.HeureArrive=HeureArrive;
     this.PartySize=PartySize;
     this.Type=Type;
    this.api_token=api_token;
   
 }
}