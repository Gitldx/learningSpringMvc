package com.f.ldx.repository;

import com.f.ldx.domain.KM;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;
import java.util.HashMap;

public interface MxzMapper {

    @Select("select V.voucherDate as date,V.year,V.period,V.voucherTypeId,V.voucherNum as voucherNo,VE.summary,VE.amount,VE.balanceSide,Acc.accountCode,Acc.accountName" +
            " FROM dbo.Voucher V INNER JOIN VoucherEntries VE ON V.id = VE.VoucherId INNER JOIN Account Acc ON VE.AccountId = Acc.id\n" +
            "WHERE V.BookId = 2 AND V.Year *100 + V.Period between #{fromYM} and #{toYM} AND Acc.AccountCode LIKE CONCAT(#{code},'%')")
    ArrayList<HashMap<String,Object>> getEntries(String code,int fromYM,int toYM);

    @Select("select ISNULL(SUM(IIF(Acc.BalanceSide = VE.BalanceSide,VE.Amount,VE.Amount * -1)),0) FROM dbo.Voucher V INNER JOIN VoucherEntries VE ON V.id = VE.VoucherId INNER JOIN Account Acc ON VE.AccountId = Acc.id\n" +
            "WHERE V.BookId = 2 AND V.Year *100 + V.Period < #{ym} AND Acc.AccountCode LIKE CONCAT(#{code},'%')")
    double getQcye(String code,int ym);

    @Select("select ISNULL(SUM(IIF(Acc.BalanceSide = 0,VE.Amount,0)),0) jflj,ISNULL(SUM(IIF(Acc.BalanceSide = 1,VE.Amount,0)),0) dflj FROM dbo.Voucher V INNER JOIN VoucherEntries VE ON V.id = VE.VoucherId INNER JOIN Account Acc ON VE.AccountId = Acc.id\n" +
            "WHERE V.BookId = 2 AND V.Year *100 + V.Period between #{beginYm} and #{toYm} AND Acc.AccountCode LIKE CONCAT(#{code},'%')")
    HashMap<String,Object> getQclj(String code,int beginYm,int toYm);

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
