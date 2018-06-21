package com.f.ldx.service;

import com.f.ldx.common.MultipleDataSource;
import com.f.ldx.domain.Book;
import com.f.ldx.domain.KM;
import com.f.ldx.repository.BookMapper;
import com.f.ldx.repository.KMMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;

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

    @Transactional
    public int add(KM km){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        Book book = this.bookMapper.getBook(2);
        List<Short> arr = new ArrayList<>();
        arr.add(book.getLv1());
        arr.add(book.getLv2());
        arr.add(book.getLv3());
        arr.add(book.getLv4());
        arr.add(book.getLv5());
        arr.add(book.getLv6());

        int level=0;
        for(int i=0;i<arr.size();i++){
            int length = arr.subList(0,i).stream().mapToInt(Short::byteValue).sum();
            if(km.getAccountCode().length() == length){
                level = i;
                break;
            }
        }
        int length = arr.subList(0,level-1 == 0 ? 1: level-1).stream().mapToInt(x->x).sum();

        KM m = this.mapper.getByCode(km.getAccountCode().substring(0,length));
        if(m!=null){
            m.setDetailedAccount(false);
            this.doUpdate(m);
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
