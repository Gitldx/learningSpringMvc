package com.f.ldx.repository;

import com.f.ldx.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.query.Param;

public interface UserMapper {
    @Select("SELECT * FROM user WHERE id = #{userId}")
    User getUser(@Param("userId") String userId);

    @Insert("Insert into user(name,email) values (#{name},#{email})")
    void insertUser(User user);
}
