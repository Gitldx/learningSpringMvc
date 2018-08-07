package com.f.ldx.web;

import com.f.ldx.common.SaveException;
import com.f.ldx.domain.KM;
import com.f.ldx.domain.Voucher;
import com.f.ldx.domain.VoucherEntry;
import com.f.ldx.dto.VoucherDTO;
import com.f.ldx.service.KMService;
import com.f.ldx.service.MxzService;
import com.f.ldx.service.VoucherService;
import javafx.util.Pair;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/mxz")
public class MxzController {

    @Autowired
    private SqlSessionTemplate sessionTemplate;

    @Autowired
    private KMService kmService;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private MxzService service;

    @RequestMapping(method = RequestMethod.GET,path = "/getMxz")
    @ResponseBody
    public HashMap<String,Object> Mxz(String code, int beginY, int beginM, int endY, int endM){

        HashMap<String,Object> result = this.service.Mxz(code,beginY,beginM,endY,endM);
        return result;
    }

    @RequestMapping()
    public ModelAndView list(){

        Voucher v =  sessionTemplate.selectOne("com.f.ldx.domain.getVoucher",1);
        System.out.println(v);

        ModelAndView mv = new ModelAndView("mxz");
        ArrayList<KM> list = this.kmService.getList();


        mv.addObject("accList",list);

        return mv;
    }




    @GetMapping("/getVoucher/{id}")
    @ResponseBody
    public Map<String,Object> getVoucher(@PathVariable("id") int id){
        Map<String,Object> result = new HashMap<>();

        Voucher v = this.voucherService.getVoucher(id);

        List<VoucherEntry> entries = this.voucherService.getEntries(id);

        result.put("voucher",v);
        result.put("entries",entries);

        return result;
    }

}
