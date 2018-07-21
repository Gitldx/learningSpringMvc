package com.f.ldx.web;

import com.f.ldx.common.SaveException;
import com.f.ldx.domain.KM;
import com.f.ldx.domain.Voucher;
import com.f.ldx.domain.VoucherEntry;
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
import java.util.List;
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

        try{
            this.voucherService.addVouhcer(dto);
        }
        catch (SaveException ex){
            Map<String,Object> res = new HashMap<>();
            res.put("res",false);
            res.put("msg",ex.getMessage());
            return res;
        }

        int id = v.getId();

        Map<String,Object> result = new HashMap<>();
        result.put("res",true);
        result.put("id",id);
        result.put("ids",dto.getEntries().stream().map((item)->new Pair<>(item.getRowNum(),item.getId())).collect(Collectors.toList()));
        return result;
    }

    @GetMapping("/getVoucher")
    @ResponseBody
    public List<Map<String,Object>> getVoucher(){
        Map<String,Object> param = new HashMap<>();
        param.put("year",2018);
        param.put("period",6);
        param.put("bookId",2);
        return this.voucherService.getVoucher(param);
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
