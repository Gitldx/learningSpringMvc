package com.f.ldx.service;


import com.f.ldx.domain.KM;
import com.f.ldx.repository.KMMapper;
import com.f.ldx.repository.MxzMapper;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.commons.lang3.tuple.Pair;

@Service
public class MxzService {

    final static String DATE = "date";
    final static String VOUCHERTYPE = "voucherType";
    final static String VOUCHERNO = "voucherNo";
    final static String YEAR = "year";
    final static String PERIOD = "period";
    final static String SUMMARY = "summary";
    final static String JF = "jf";
    final static String DF = "df";
    final static String BALANCESIDE = "balanceSide";
    final static String BALANCE = "balance";

    @Autowired
    private SqlSessionTemplate sessionTemplate;

    @Autowired
    private MxzMapper mapper;

    @Autowired
    private KMMapper kmMapper;



    public HashMap<String, Object> Mxz(String code, int fromY, int fromM, int toY, int toM) {
        HashMap<String, Object> result = new HashMap<>();

        KM kmInfo = this.kmMapper.getByCode(code);
        result.put("accInfo", kmInfo);

        List<HashMap<String, Object>> lst = new ArrayList<>();
        result.put("list", lst);

        HashMap<String, Object> qcye = this.generateQcye(code, fromY, fromM, kmInfo);
        lst.add(qcye);

        List<HashMap<String, Object>> entries = this.mapper.getEntries(code, fromY * 100 + fromM, toY * 100 + toM);
        Map<Pair<Object, Object>, List<HashMap<String, Object>>> grp = entries.stream().collect(Collectors.groupingBy(m-> Pair.of(m.get("year"),m.get("period"))));

//        Map<Object,Object> xMap=new LinkedHashMap<>();
//        grp.keySet().stream().sorted().forEachOrdered(x->{Pair<Object, Object> key = Pair.of(x.getKey(),x.getValue()); xMap.put(key,grp.get(key));});

        BigDecimal bnjfhj = (BigDecimal)qcye.get("qcjflj");
        BigDecimal bndfhj = (BigDecimal)qcye.get("qcdflj");
        BigDecimal ye = (BigDecimal)qcye.get("realAmount");

        for(int i = fromY * 100 + fromM;  i <= toY * 100  + toM;i++ ){

            if(i - Math.floor(i/100) * 100 == 13){
                i =  ((int)Math.floor(i/100)+ 1) * 100 + 1;
            }

//            if( i != fromY * 100 + fromM){
//                HashMap<String, Object> qcye = new HashMap<>();
//                qcye.put("summary", "期初余额");
//                qcye.put("year", (int)Math.floor(i/100));
//                qcye.put("period",i - (int)Math.floor(i/100) * 100);
//                lst.add(qcye);
//            }

            int year = (int)Math.floor(i/100),month = i - (int)Math.floor(i/100) * 100;

            List<HashMap<String, Object>> es= grp.get(Pair.of(year,month));

            BigDecimal jfhj = null;
            BigDecimal dfhj = null;

            if(es != null){

                jfhj = es.stream().filter(x->!(boolean)x.get("balanceSide")).map(item->new BigDecimal(item.get("amount").toString())).reduce(BigDecimal.ZERO, (x1,x2) -> x1.add(x2));
                dfhj = es.stream().filter(x->(boolean)x.get("balanceSide")).map(item->new BigDecimal(item.get("amount").toString())).reduce(BigDecimal.ZERO, (x1,x2) -> x1.add(x2));

                for(HashMap<String, Object> e : es){
                    boolean balanceSide = (boolean)e.get("balanceSide");
                    BigDecimal amount = new BigDecimal(e.get("amount").toString());
                    BigDecimal realAmount = balanceSide == kmInfo.getBalanceSide() ? amount : amount.negate();
                    ye = ye.add(realAmount);
                    TwoTuple<String,Double> blc = this.balanceConv(kmInfo,ye.doubleValue());
                    e.put(VOUCHERTYPE,"*");
                    e.put(JF,!balanceSide ? amount.toString() : "");
                    e.put(DF,balanceSide ? amount.toString() : "");
                    e.put(BALANCESIDE, blc.item1);
                    e.put(BALANCE, blc.item2);
                }

                lst.addAll(es);

                bnjfhj = bnjfhj.add(jfhj);
                bndfhj = bndfhj.add(dfhj);
            }



            HashMap<String, Object> bqhj = this.generateBqhj(i,jfhj,dfhj,ye,kmInfo);
            HashMap<String, Object> bnlj = this.generateBnlj(i,bnjfhj,bndfhj,ye,kmInfo);
            lst.add(bqhj);
            lst.add(bnlj);
        }

//        Iterator iter = xMap.entrySet().iterator();
//        while (iter.hasNext()){
//            Map.Entry entry = (Map.Entry) iter.next();
//            List<HashMap<String, Object>> es = (List<HashMap<String, Object>>)entry.getValue();
//            lst.addAll(es);
//            HashMap<String, Object> bqhj = new HashMap<>();
//            bqhj.put("summary", "本期合计");
//            lst.add(bqhj);
//        }

//        result.put("grp",xMap);


        return result;
    }


    private HashMap<String, Object> generateBqhj(int ym,BigDecimal jfhj,BigDecimal dfhj,BigDecimal ye,KM kmInfo){
        HashMap<String, Object> bqhj = new HashMap<>();
        bqhj.put(DATE, "");
        bqhj.put(VOUCHERTYPE,"");
        bqhj.put(VOUCHERNO,"");
        bqhj.put(YEAR, (int)Math.floor(ym/100));
        bqhj.put(PERIOD,ym - (int)Math.floor(ym/100) * 100);
        bqhj.put(SUMMARY, "本期合计");
        bqhj.put(JF ,jfhj == null ? "" : jfhj);
        bqhj.put(DF,dfhj == null ? "" : dfhj);
        TwoTuple<String,Double> blc = this.balanceConv(kmInfo,ye.doubleValue());
        bqhj.put(BALANCESIDE,blc.item1);
        bqhj.put(BALANCE,blc.item2);

        return bqhj;
    }


    private HashMap<String, Object> generateBnlj(int ym,BigDecimal jfbnlj,BigDecimal dfbnlj,BigDecimal ye,KM kmInfo){
        HashMap<String, Object> bnlj = new HashMap<>();
        bnlj.put(DATE, "");
        bnlj.put(VOUCHERTYPE,"");
        bnlj.put(VOUCHERNO,"");
        bnlj.put(YEAR, (int)Math.floor(ym/100));
        bnlj.put(PERIOD,ym - (int)Math.floor(ym/100) * 100);
        bnlj.put(SUMMARY, "本年累计");
        bnlj.put(JF,jfbnlj == null ? "" : jfbnlj);
        bnlj.put(DF,dfbnlj == null ? "" : dfbnlj);
        TwoTuple<String,Double> blc = this.balanceConv(kmInfo,ye.doubleValue());
        bnlj.put(BALANCESIDE,blc.item1);
        bnlj.put(BALANCE,blc.item2);

        return bnlj;
    }


    /**
     * 设置期初余额行
     */
    private HashMap<String, Object> generateQcye(String code, int fromY, int fromM, KM kmInfo) {
        double qcyeAmount = this.mapper.getQcye(code, fromY * 100 + fromM);
        HashMap<String, Object> qclj = this.mapper.getQclj(code,fromY * 100 + 1,fromY * 100 + fromM - 1);
        HashMap<String, Object> qcye = new HashMap<>();
        qcye.put("realAmount",new BigDecimal(qcyeAmount));
        qcye.put("qcjflj",new BigDecimal(qclj.get("jflj").toString()));
        qcye.put("qcdflj",new BigDecimal(qclj.get("dflj").toString()));

        qcye.put(SUMMARY, "期初余额");

        TwoTuple<String, Double> blc = this.balanceConv(kmInfo, qcyeAmount);

        qcye.put(BALANCESIDE, blc.item1);
        qcye.put(BALANCE, blc.item2);


        qcye.put(DATE, "");
        qcye.put(VOUCHERTYPE,"");
        qcye.put(VOUCHERNO,"");
        qcye.put(YEAR, fromY);
        qcye.put(PERIOD,fromM);
        qcye.put(JF,"" );
        qcye.put(DF, "" );


        return qcye;
    }

    private TwoTuple<String, Double> balanceConv(KM kmInfo, double amount) {
        boolean blcSide = kmInfo.getBalanceSide();
        Optional<Boolean> blcSideNullable = Optional.of(blcSide);
        blcSideNullable = amount == 0 ? Optional.empty() : (amount > 0 ? blcSideNullable : Optional.of(!blcSide));
        String blcSideStr = !blcSideNullable.isPresent() ? "平" : (blcSideNullable.get() ? "贷" : "借");
        return new TwoTuple<>(blcSideStr, Math.abs(amount));
    }

    private class TwoTuple<Item1, Item2> {
        Item1 item1;
        Item2 item2;

        TwoTuple(Item1 a, Item2 b) {
            this.item1 = a;
            this.item2 = b;
        }
    }

}
