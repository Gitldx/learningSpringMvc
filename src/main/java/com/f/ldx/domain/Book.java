package com.f.ldx.domain;

public class Book {
    private Integer id;
    private Integer companyId;
    private String bookName;
    private String taxNo;
    private Short startYear;
    private Short startPeriod;
    private Short currentYear;
    private Short currentPeriod;
    private Short lv1;
    private Short lv2;
    private Short lv3;
    private Short lv4;
    private Short lv5;
    private Short lv6;
    private Boolean mustBeAudited;
    private Boolean mustBePosted;
    private Boolean voucherNumByWord;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getTaxNo() {
        return taxNo;
    }

    public void setTaxNo(String taxNo) {
        this.taxNo = taxNo;
    }

    public Short getStartYear() {
        return startYear;
    }

    public void setStartYear(Short startYear) {
        this.startYear = startYear;
    }

    public Short getStartPeriod() {
        return startPeriod;
    }

    public void setStartPeriod(Short startPeriod) {
        this.startPeriod = startPeriod;
    }

    public Short getCurrentYear() {
        return currentYear;
    }

    public void setCurrentYear(Short currentYear) {
        this.currentYear = currentYear;
    }

    public Short getCurrentPeriod() {
        return currentPeriod;
    }

    public void setCurrentPeriod(Short currentPeriod) {
        this.currentPeriod = currentPeriod;
    }

    public Short getLv1() {
        return lv1;
    }

    public void setLv1(Short lv1) {
        this.lv1 = lv1;
    }

    public Short getLv2() {
        return lv2;
    }

    public void setLv2(Short lv2) {
        this.lv2 = lv2;
    }

    public Short getLv3() {
        return lv3;
    }

    public void setLv3(Short lv3) {
        this.lv3 = lv3;
    }

    public Short getLv4() {
        return lv4;
    }

    public void setLv4(Short lv4) {
        this.lv4 = lv4;
    }

    public Short getLv5() {
        return lv5;
    }

    public void setLv5(Short lv5) {
        this.lv5 = lv5;
    }

    public Short getLv6() {
        return lv6;
    }

    public void setLv6(Short lv6) {
        this.lv6 = lv6;
    }

    public Boolean getMustBeAudited() {
        return mustBeAudited;
    }

    public void setMustBeAudited(Boolean mustBeAudited) {
        this.mustBeAudited = mustBeAudited;
    }

    public Boolean getMustBePosted() {
        return mustBePosted;
    }

    public void setMustBePosted(Boolean mustBePosted) {
        this.mustBePosted = mustBePosted;
    }

    public Boolean getVoucherNumByWord() {
        return voucherNumByWord;
    }

    public void setVoucherNumByWord(Boolean voucherNumByWord) {
        this.voucherNumByWord = voucherNumByWord;
    }


}
