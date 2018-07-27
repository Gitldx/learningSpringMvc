package com.f.ldx.service;

import com.f.ldx.common.SaveException;
import com.f.ldx.common.MultipleDataSource;
import com.f.ldx.domain.Book;
import com.f.ldx.domain.KM;

import com.f.ldx.domainService.KMDomainService;
import com.f.ldx.repository.BookMapper;
import com.f.ldx.repository.KMMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;


import java.util.ArrayList;
import java.util.HashMap;


@Service
public class KMService {
    @Autowired
    private KMMapper mapper;

    @Autowired
    private BookMapper bookMapper;

    public ArrayList<KM> getList(){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        return this.mapper.getKMList();
    }

    public ArrayList<KM> findByCode(String code){
        return  this.mapper.findByCode(code);
    }

    public ArrayList<HashMap<String,Object>> findByCompanyCode(String code){
        return this.mapper.findByCompanyCode(code);
    }

    @Transactional
    public int add(KM km) throws SaveException {
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        Book book = this.bookMapper.getBook(2);
        KMDomainService domainService =  new KMDomainService(book);

        boolean isCodelengthValidate = domainService.isCodeLengthValidated(km.getAccountCode());
        if(!isCodelengthValidate){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new SaveException("科目长度不合法");
        }


        String upperCode = domainService.upperAccountCode(km);
        KM upperKM = this.mapper.getByCode(upperCode);
        if(km.getAccountCode().length() != book.getLv1() && upperKM == null){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new SaveException("科目代码不存在上级科目");
        }
        if(upperKM!=null){
            upperKM.setDetailedAccount(false);
            this.doUpdate(upperKM);
        }

        km.setDetailedAccount(true);
        return this.doInsert(km);
    }

    @Transactional
    private int doInsert(KM km){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");

        this.mapper.addKM(km);
        return km.getId();
    }

    @Transactional
    private void doUpdate(KM km){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        this.mapper.update(km);
    }




}
