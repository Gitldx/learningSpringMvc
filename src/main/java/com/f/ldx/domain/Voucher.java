package com.f.ldx.domain;

import java.util.Date;

public class Voucher {
    private int id;
    private int bookId;
    private short year;
    private short period;
    private Date voucherDate;
    private int voucherType;
    private int voucherNum;
    private short sourceDocs;
    private int auditMan;
    private int docMan;
    private int modifyMan;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
    }

    public short getPeriod() {
        return period;
    }

    public void setPeriod(short period) {
        this.period = period;
    }

    public Date getVoucherDate() {
        return voucherDate;
    }

    public void setVoucherDate(Date voucherDate) {
        this.voucherDate = voucherDate;
    }

    public int getVoucherType() {
        return voucherType;
    }

    public void setVoucherType(int voucherType) {
        this.voucherType = voucherType;
    }

    public int getVoucherNum() {
        return voucherNum;
    }

    public void setVoucherNum(int voucherNum) {
        this.voucherNum = voucherNum;
    }

    public short getSourceDocs() {
        return sourceDocs;
    }

    public void setSourceDocs(short sourceDocs) {
        this.sourceDocs = sourceDocs;
    }

    public int getAuditMan() {
        return auditMan;
    }

    public void setAuditMan(int auditMan) {
        this.auditMan = auditMan;
    }

    public int getDocMan() {
        return docMan;
    }

    public void setDocMan(int docMan) {
        this.docMan = docMan;
    }

    public int getModifyMan() {
        return modifyMan;
    }

    public void setModifyMan(int modifyMan) {
        this.modifyMan = modifyMan;
    }
}
