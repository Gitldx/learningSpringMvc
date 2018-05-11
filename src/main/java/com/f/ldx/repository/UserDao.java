package com.f.ldx.repository;

import com.f.ldx.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserDao {
    @Autowired
    private UserMapper userMapper;

    @Transactional()
    public void insertUser(){
        User n = new User();
        n.setName("ldx2");
        n.setEmail("ldx@129.com");
        userMapper.insertUser(n);

        int i = 100/0;

        User n2 = new User();
        n2.setName("ldx3");
        n2.setEmail("ldx@129.com");
        userMapper.insertUser(n2);
    }
}
