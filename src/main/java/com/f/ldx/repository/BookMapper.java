package com.f.ldx.repository;

import com.f.ldx.domain.Book;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.query.Param;

public interface BookMapper {

    @Select("SELECT CompanyId,BookName,TaxNo,StartYear,StartYear,CurrentYear,CurrentPeriod,Lv1,Lv2,Lv3,lv4,Lv5,Lv6,MustBeAudited," +
            "MustBePosted,VoucherNumByWord FROM dbo.Book WHERE Id = #{id}")
    Book getBook(int id);
}
