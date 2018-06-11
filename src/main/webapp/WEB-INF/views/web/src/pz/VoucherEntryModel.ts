export default class VoucherEntryModel{

    public AccountCode:string;
    public AccountName:string;


    constructor(
        public EntryId:number,
        public Summary:string,
        public Account:number,
        private debitAmount : number,
        public creditAmount : number,
        public IsDetailAccount : boolean,
        public IsFooter? : boolean,
        
    ){

    }



    get DebitAmount():number{
        return this.debitAmount;
    }

    set DebitAmount(amount:number){
        this.debitAmount = amount;
        if(amount!==undefined && amount.toString().length !== 0){
            this.creditAmount = undefined;
        }
        
    }

    get CreditAmount():number{
        return this.creditAmount;
    }

    set CreditAmount(amount:number){
        this.creditAmount = amount;
        if(amount!==undefined && amount.toString().length !== 0){
        this.debitAmount = undefined;
        }
    }

}