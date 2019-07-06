export class reservationcom  {
    public api_token:string;
     public Type:string;
     public DateArrive:string;
     public HeureArrive:string;
     public tables_id:number;

  constructor(api_token,Type,DateArrive,HeureArrive,tables_id){
      
     this.Type=Type;
     this.DateArrive=DateArrive;
     this.HeureArrive=HeureArrive;
     this.api_token=api_token;
     this.tables_id=tables_id;
    
  }
 }