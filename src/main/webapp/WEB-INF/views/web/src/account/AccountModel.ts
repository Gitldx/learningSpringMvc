
export class AccountModel{


    public children : AccountModel[] = [];

    constructor(public Id : number,private accountCode : string,public AccountName:string,public AccountType : AccountTypeEnum,private balanceSide : BalanceSideEnum,
        private isJournal : boolean){

    }



    set AccountCode(str:string){
        this.accountCode = str;
    }

    get AccountCode(){
        return this.accountCode;
    }

    set BalanceSide(val: BalanceSideEnum){
        this.balanceSide = val;
    }

    get BalanceSide (){
        return this.balanceSide;
    }

    set IsJournal(val :boolean){
        this.isJournal = val;
    }

    get IsJournal(){
        return this.isJournal;
    }




}


export enum AccountTypeEnum {
    Asset = 1,
    Liabilities,
    Equity,
    Cost,
    PL
}


export enum BalanceSideEnum{
    Debit =0 , Credit
}