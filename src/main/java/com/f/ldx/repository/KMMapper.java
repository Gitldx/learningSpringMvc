package com.f.ldx.repository;

import com.f.ldx.domain.KM;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;
import java.util.HashMap;

public interface KMMapper {

    @Select("select Id,AccountCode,AccountName,AccountType,BalanceSide,IsJournal,IsDetailedAccount,Level from Account")
    ArrayList<KM> getKMList();

    @Insert("INSERT INTO Account (AccountCode,AccountName,AccountType,BalanceSide,IsJournal,[Level],BookId) " +
            "VALUES(#{accountCode},#{accountName},#{accountType},#{balanceSide},#{isJournal},#{level},#{bookId})")
    @Options(useGeneratedKeys=true, keyProperty="id", keyColumn="Id")
    void addKM(KM km);

    @Select("select Id,AccountCode,AccountName,AccountType,BalanceSide,IsJournal,IsDetailedAccount from Account where AccountCode like CONCAT(#{code},'%')")
    ArrayList<KM> findByCode(String code);

    @Select("SELECT id,code,name FROM company WHERE code like CONCAT('%',#{code},'%')")
    ArrayList<HashMap<String,Object>> findByCompanyCode(String code);


    @Select("select Id,AccountCode,AccountName,AccountType,BalanceSide,IsJournal,IsDetailedAccount,Level from Account where AccountCode = #{code}")
    KM getByCode(String code);

    @Update("UPDATE dbo.Account SET AccountCode=#{accountCode},AccountName=#{accountName},AccountType=#{accountType},BalanceSide= #{balanceSide}," +
            "IsJournal= #{isJournal},IsDetailedAccount= #{isDetailedAccount},Level= #{level} WHERE id =#{id}")
    void update(KM km);
}
