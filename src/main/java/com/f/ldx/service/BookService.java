package com.f.ldx.service;

import com.f.ldx.common.MultipleDataSource;
import com.f.ldx.domain.Book;
import com.f.ldx.repository.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookMapper mapper;

    public Book getBook(int id){
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        return this.mapper.getBook(id);
    }
}
