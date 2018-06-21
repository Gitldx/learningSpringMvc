package com.f.ldx.dto;

import com.f.ldx.domain.Voucher;
import com.f.ldx.domain.VoucherEntry;

import java.util.List;

public class VoucherDTO {
    private Voucher voucher;
    private List<VoucherEntry> entries;

    public Voucher getVoucher() {
        return voucher;
    }

    public void setVoucher(Voucher voucher) {
        this.voucher = voucher;
    }

    public List<VoucherEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<VoucherEntry> entries) {
        this.entries = entries;
    }
}
