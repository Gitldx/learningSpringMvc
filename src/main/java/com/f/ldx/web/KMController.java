package com.f.ldx.web;

import com.f.ldx.common.SaveException;
import com.f.ldx.domain.KM;
import com.f.ldx.service.KMService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


import java.util.*;


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

    @GetMapping("/filter")
    @ResponseBody
    public ArrayList<KM> findeByCode(@RequestParam(value = "q",required = false) String code){
        if(code ==null || code.isEmpty()){
            return null;
        }
        ArrayList<KM> result = this.service.findByCode(code);
//       Collections.sort(result, new Comparator<KM>() {
//            @Override
//            public int compare(KM o1, KM o2) {
//                return o1.getAccountCode().compareTo(o2.getAccountCode());
//            }
//        }) ;
        Collections.sort(result,(km1,km2)->km1.getAccountCode().compareTo(km2.getAccountCode()));

        return result;
    }

    @GetMapping("/filterCompany")
    @ResponseBody
    public ArrayList<HashMap<String,Object>> findByCompanyCode(@RequestParam(value = "q",required = false) String code){
        if(code ==null || code.isEmpty()){
            return null;
        }
         return this.service.findByCompanyCode(code);
    }

    @PostMapping("/add")
    @ResponseBody
    public Map<String,Object> add(@RequestBody KM acc) {
        Map<String,Object> map = new HashMap<>();
        acc.setBookId(2);
        try{
            this.service.add(acc);
        }
        catch (SaveException ex){
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
