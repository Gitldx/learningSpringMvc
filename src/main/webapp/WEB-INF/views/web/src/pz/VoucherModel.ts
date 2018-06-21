export default class VoucherModel{
    
    constructor(
        public Id : number,
        public BookId: number,
        public Year: number,
        public Period: number,
        public VoucherDate : Date,
        public VoucherType :number,
        public VoucherNum: number,
        public SourceDocs: number,
        public AuditMan: number,
        public DocMan: number,
        public ModifyMan: number,
    ){}
}