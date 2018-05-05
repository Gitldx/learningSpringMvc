package com.f.ldx.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {


    @RequestMapping()
    public String listAccounts(){
        return "account";
    }

    @RequestMapping("/add")
    public String add(){
        return "addAccount";
    }
}
