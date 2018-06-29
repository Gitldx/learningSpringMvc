import {AccountModel, BalanceSideEnum} from '../account/AccountModel'
import {stripNumber} from '../common/util/numberHelper'

export default class EditModel{
    constructor(
        private account:AccountModel,
        private ncye : number,
        private ljjf : number,
        private ljdf : number,
        private qcye : number
    ){}

    get IsDetailed(){
        return this.account.IsDetailed;
    }

    get AccountCode(){
        return this.account.AccountCode;
    }

    get AccountName(){
        return this.account.AccountName;
    }

    set Ncye(val : number){
        this.ncye = stripNumber(val);
        this.qcye = this.account.BalanceSide === BalanceSideEnum.Debit ? stripNumber(val) + this.ljjf - this.ljdf : stripNumber(val) - this.ljjf + this.ljdf;
    }

    get Ncye(){
        return this.ncye;
    }

    set Ljjf(val:number){
        this.ljjf = stripNumber(val);
        this.qcye = this.account.BalanceSide === BalanceSideEnum.Debit ? this.ncye + stripNumber(val) - this.ljdf : this.ncye - stripNumber(val) + this.ljdf;
    }

    get Ljjf(){
        return this.ljjf;
    }

    set Ljdf(val:number){
        this.ljdf = stripNumber(val);
        this.qcye = this.account.BalanceSide === BalanceSideEnum.Debit ? this.ncye + this.ljjf - stripNumber(val) : this.ncye - this.ljjf + stripNumber(val);
    }

    get Ljdf(){
        return this.ljdf;
    }

    set Qcye(val : number){
        this.qcye = stripNumber(val);
        this.ncye = this.account.BalanceSide === BalanceSideEnum.Debit ? stripNumber(val) - this.ljjf + this.ljdf : stripNumber(val) + this.ljjf - this.ljdf;
    }

    get Qcye(){
        return this.qcye;
    }
}