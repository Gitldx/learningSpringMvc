package com.f.ldx.service;

import com.f.ldx.common.MultipleDataSource;
import com.f.ldx.domain.KM;
import com.f.ldx.repository.KMMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class KMService {
    @Autowired
    private KMMapper mapper;

    public ArrayList<KM> getList(){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        return this.mapper.getKMList();
    }

    @Transactional
    public int add(KM km){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        this.mapper.addKM(km);
        return km.getId();
    }
}
