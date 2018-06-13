package com.f.ldx.web;

import com.f.ldx.domain.Book;
import com.f.ldx.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/book/{id}")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping()
    @ResponseBody
    public Book getBook(@PathVariable int id){
        return this.service.getBook(id);
    }
}
