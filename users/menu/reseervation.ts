export class reservation  {
    public api_toekn:string;
     public reservations_id:number;
  constructor(reservasions_id,api_token){
      
     this.reservations_id=reservasions_id;
     this.api_toekn=api_token;
    
  }
 }