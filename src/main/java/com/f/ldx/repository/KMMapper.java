package com.f.ldx.repository;

import com.f.ldx.domain.KM;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

public interface KMMapper {

    @Select("select Id,AccountCode,AccountName,AccountType,BalanceSide,IsJournal from Account")
    ArrayList<KM> getKMList();

    @Insert("INSERT INTO Account (AccountCode,AccountName,AccountType,BalanceSide,IsJournal,[Level],BookId) " +
            "VALUES(#{accountCode},#{accountName},#{accountType},#{balanceSide},#{isJournal},#{level},#{bookId})")
    @Options(useGeneratedKeys=true, keyProperty="id", keyColumn="Id")
    void addKM(KM km);
}
