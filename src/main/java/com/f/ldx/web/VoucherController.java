package com.f.ldx.web;

import com.f.ldx.domain.KM;
import com.f.ldx.domain.Voucher;
import com.f.ldx.dto.VoucherDTO;
import com.f.ldx.service.KMService;
import com.f.ldx.service.VoucherService;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;

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
    public int add(@RequestBody VoucherDTO dto){
        //@RequestBody Voucher voucher,
        Voucher v = dto.getVoucher();
        v.setBookId(2);

        this.voucherService.addVouhcer(dto);
        int id = v.getId();

        return id;
    }

}
