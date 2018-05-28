interface IBtnStatus{

    Disable?:boolean,
    Visible:boolean,

  }
  
  export class BtnsStatus{
    constructor(
        public Save : IBtnStatus ,
        public Add : IBtnStatus ,
        public Delete : IBtnStatus ,
        public Query : IBtnStatus
    ){}
    
  }