package com.f.ldx.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/csye")
public class CSYEController {

    @RequestMapping()
    public String listAccounts(){
        return "csye";
    }
}
