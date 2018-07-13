package com.f.ldx.web;

import com.f.ldx.common.KMException;
import com.f.ldx.domain.KM;
import com.f.ldx.service.KMService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


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
    public Map<String,Object> add(@RequestBody KM acc) {
        Map<String,Object> map = new HashMap<>();
        acc.setBookId(2);
        try{
            this.service.add(acc);
        }
        catch (KMException ex){
            map.put("res",false);
            map.put("msg",ex.getMessage());
            return map;
        }
        catch (RuntimeException ex){
            map.put("res",false);
            String msg="系统异常！";
            if(ex instanceof org.springframework.dao.DuplicateKeyException){msg = "科目代码重复！";}
//            if(ex.getClass().getName() == "org.springframework.dao.DuplicateKeyException"){msg = "科目代码重复！";}
            map.put("msg",msg);
            return map;
        }

        map.put("res",true);
        map.put("id",acc.getId().toString());
        return map;
    }
}
