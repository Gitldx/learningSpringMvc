package com.f.ldx.domain;

public class KM {
    private Integer id;
    private Integer bookId;
    private String accountCode;
    private String accountName;
    private String fullName;
    private short accountType;
    private Boolean balanceSide;
    private Boolean isJournal;
    private Boolean isDetailedAccount;
    private Short level;
    private Boolean isForbidden;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public short getAccountType() {
        return accountType;
    }

    public void setAccountType(short accountType) {
        this.accountType = accountType;
    }

    public Boolean getBalanceSide() {
        return balanceSide;
    }

    public void setBalanceSide(Boolean balanceSide) {
        this.balanceSide = balanceSide;
    }

    public Boolean getJournal() {
        return isJournal;
    }

    public void setJournal(Boolean journal) {
        isJournal = journal;
    }

    public Boolean getDetailedAccount() {
        return isDetailedAccount;
    }

    public void setDetailedAccount(Boolean detailedAccount) {
        isDetailedAccount = detailedAccount;
    }

    public Short getLevel() {
        return level;
    }

    public void setLevel(Short level) {
        this.level = level;
    }

    public Boolean getForbidden() {
        return isForbidden;
    }

    public void setForbidden(Boolean forbidden) {
        isForbidden = forbidden;
    }




}
