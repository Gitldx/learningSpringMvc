
export default class VoucherEntryModel{

    


    constructor(
        public EntryId:number,
        public Summary:string,
        public Account:number,
        public AccountCode:string,
        public AccountName:string,
        private debitAmount : number,
        private creditAmount : number,
        public IsDetailAccount : boolean,
        public IsFooter? : boolean,
        
    ){

    }



    get DebitAmount():number{
        return this.debitAmount;
    }

    set DebitAmount(amount:number){
        this.debitAmount =Number(Number(amount).toFixed(2));

        if(amount!==undefined && amount.toString().length !== 0){
            this.creditAmount = undefined;
        }
        
    }

    get CreditAmount():number{
        return this.creditAmount;
    }

    set CreditAmount(amount:number){
        this.creditAmount = Number(Number(amount).toFixed(2));
        if(amount!==undefined && amount.toString().length !== 0){
        this.debitAmount = undefined;
        }
    }

    get HasAmount(){
        return $.isNumeric(this.debitAmount) || $.isNumeric(this.creditAmount);
    }

    get Amount():{amount : number,balanceSide : boolean}{
        return {
            amount : !this.debitAmount ? this.creditAmount : this.debitAmount,
            balanceSide : !this.debitAmount ? true : false
        }
    }
}