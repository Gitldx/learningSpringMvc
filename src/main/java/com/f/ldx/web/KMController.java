package com.f.ldx.web;

import com.f.ldx.domain.KM;
import com.f.ldx.service.KMService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;



import java.util.ArrayList;


@Controller
@RequestMapping("/account")
public class KMController {

    @Autowired
    private KMService service;

    @RequestMapping()
    public ModelAndView listAccounts(){
        ModelAndView mv = new ModelAndView("account");
        ArrayList<KM> list = this.service.getList();


        mv.addObject("accList",list);

        return mv;
    }

    @GetMapping("/list")
    @ResponseBody
    public ArrayList<KM> list(){
        return this.service.getList();
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody KM acc) {

        acc.setBookId(2);
        this.service.add(acc);

        return acc.getId().toString();
    }
}
