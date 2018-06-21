package com.f.ldx.service;


import com.f.ldx.domain.Voucher;
import com.f.ldx.dto.VoucherDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VoucherService {

    @Autowired
    private SqlSessionTemplate sessionTemplate;

    @Transactional
    public int addVouhcer(VoucherDTO dto){

        int id =  sessionTemplate.insert("com.f.ldx.domain.insertVoucher",dto.getVoucher());

        sessionTemplate.insert("com.f.ldx.domain.insertEntries",dto.getEntries());

        return id;
    }
}
