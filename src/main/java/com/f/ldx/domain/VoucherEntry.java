package com.f.ldx.domain;

import java.math.BigDecimal;

public class VoucherEntry {
    private int id;
    private int voucherId;
    private int accountId;
    private String summary;
    private String amount;
    private Boolean balanceSide;
    private int rowNum;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVoucherId() {
        return voucherId;
    }

    public void setVoucherId(int voucherId) {
        this.voucherId = voucherId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Boolean getBalanceSide() {
        return balanceSide;
    }

    public void setBalanceSide(Boolean balanceSide) {
        this.balanceSide = balanceSide;
    }

    public int getRowNum() {
        return rowNum;
    }

    public void setRowNum(int rowNum) {
        this.rowNum = rowNum;
    }
}
