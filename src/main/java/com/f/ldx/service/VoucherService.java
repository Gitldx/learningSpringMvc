package com.f.ldx.service;


import com.f.ldx.common.SaveException;
import com.f.ldx.domain.Voucher;
import com.f.ldx.domain.VoucherEntry;
import com.f.ldx.dto.VoucherDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;


@Service
public class VoucherService {

    @Autowired
    private SqlSessionTemplate sessionTemplate;

    @Transactional
    public int addVouhcer(VoucherDTO dto) throws SaveException {

        BigDecimal jfAmount = dto.getEntries().stream().filter((item)->item.getBalanceSide() == false).map((item)->new BigDecimal(item.getAmount()))
                .reduce(BigDecimal.ZERO, (x,y) -> x.add(y));
        BigDecimal dfAmount = dto.getEntries().stream().filter((item)->item.getBalanceSide() == true).map((item)->new BigDecimal(item.getAmount()))
                .reduce(BigDecimal.ZERO, (x,y) -> x.add(y));
        if(!jfAmount.equals(dfAmount) ){
            throw new SaveException("借贷不平衡");
        }

        sessionTemplate.insert("com.f.ldx.domain.insertVoucher",dto.getVoucher());

        dto.getEntries().forEach((item)->item.setVoucherId(dto.getVoucher().getId()));
//        sessionTemplate.insert("com.f.ldx.domain.insertEntries",dto.getEntries());

        dto.getEntries().forEach((item)->sessionTemplate.insert("com.f.ldx.domain.insertEntry",item));

        return dto.getVoucher().getId();
    }

    public List<Map<String,Object>> getVoucher(Map<String,Object> param){
        return sessionTemplate.selectList("com.f.ldx.domain.getVoucherByYM",param);
    }

    public Voucher getVoucher(int id){
        return sessionTemplate.selectOne("com.f.ldx.domain.getVoucher",id);
    }

    public List<VoucherEntry> getEntries(int voucherId){
        return sessionTemplate.selectList("com.f.ldx.domain.getVoucherEntries",voucherId);
    }
}
