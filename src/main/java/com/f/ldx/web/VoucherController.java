package com.f.ldx.web;

import com.f.ldx.domain.KM;
import com.f.ldx.domain.Voucher;
import com.f.ldx.dto.VoucherDTO;
import com.f.ldx.service.KMService;
import com.f.ldx.service.VoucherService;
import javafx.util.Pair;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/pz")
public class VoucherController {

    @Autowired
    private SqlSessionTemplate sessionTemplate;

    @Autowired
    private KMService kmService;

    @Autowired
    private VoucherService voucherService;

    @RequestMapping()
    public ModelAndView list(){

        Voucher v =  sessionTemplate.selectOne("com.f.ldx.domain.getVoucher",1);
        System.out.println(v);

        ModelAndView mv = new ModelAndView("pz");
        ArrayList<KM> list = this.kmService.getList();


        mv.addObject("accList",list);

        return mv;
    }

    @PostMapping("/add")
    @ResponseBody
    public Map<String,Object> add(@RequestBody VoucherDTO dto){
        //@RequestBody Voucher voucher,
        Voucher v = dto.getVoucher();
        v.setBookId(2);

        this.voucherService.addVouhcer(dto);
        int id = v.getId();

        Map<String,Object> result = new HashMap<>();
        result.put("status",true);
        result.put("id",id);
        result.put("ids",dto.getEntries().stream().map((item)->new Pair(item.getRowNum(),item.getId())).collect(Collectors.toList()));
        return result;
    }

}
