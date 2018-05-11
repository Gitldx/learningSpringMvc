package com.f.ldx.repository;

import com.f.ldx.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao_jdbc {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public User getUser(int userId){
        return jdbcTemplate.query(
                "SELECT * FROM user WHERE id = ?", new Object[] { userId},
                (rs, rowNum) -> new User(rs.getString("name"),rs.getString("email"))).get(0);

    }
}
