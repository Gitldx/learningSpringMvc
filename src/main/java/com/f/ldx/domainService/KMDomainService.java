package com.f.ldx.domainService;

import com.f.ldx.domain.Book;
import com.f.ldx.domain.KM;

import java.util.ArrayList;

public class KMDomainService {

    private  Book book;

    public KMDomainService(Book book){
        this.book = book;
    }

    private short getLevel(String code){
        ArrayList<Short> arr = new ArrayList<>();
        arr.add(book.getLv1());
        arr.add(book.getLv2());
        arr.add(book.getLv3());
        arr.add(book.getLv4());
        arr.add(book.getLv5());
        arr.add(book.getLv6());

        short level=0;
        for(int i=0;i<arr.size();i++){
            int length = arr.subList(0,i).stream().mapToInt(Short::byteValue).sum();
            if(code.length() == length){
                level = (short) i;
                break;
            }
        }

        return level;
    }

    public boolean isCodeLengthValidated(String code){
        short level = this.getLevel(code);
        return  level != 0;
    }

    public String upperAccountCode(KM km){

        short level= this.getLevel(km.getAccountCode());

        ArrayList<Short> arr = new ArrayList<>();
        arr.add(book.getLv1());
        arr.add(book.getLv2());
        arr.add(book.getLv3());
        arr.add(book.getLv4());
        arr.add(book.getLv5());
        arr.add(book.getLv6());

        int length = arr.subList(0,level-1 == 0 ? 1: level-1).stream().mapToInt(x->x).sum();
        return km.getAccountCode().substring(0,length);
    }

}
