function stripNumber(num:number, precision:number = 12):number{
    return +parseFloat(Number(num).toPrecision(precision));
}








export {stripNumber}