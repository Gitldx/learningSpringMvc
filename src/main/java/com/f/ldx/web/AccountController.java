package com.f.ldx.web;


import com.f.ldx.common.MultipleDataSource;
import com.f.ldx.domain.User;
import com.f.ldx.repository.UserDao;
import com.f.ldx.repository.UserDao_jdbc;
import com.f.ldx.repository.UserMapper;
import com.f.ldx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/account0")
public class AccountController {


    @RequestMapping()
    public String listAccounts(){
        return "account";
    }

    @PostMapping("/add")
    public String add(){

        User n = new User();
        n.setName("ldx");
        n.setEmail("ldx@129.com");
        userMapper.insertUser(n);

        userDao.insertUser();
        return "addAccount";
    }




//    @Autowired
//    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserDao_jdbc userDaoJdbc;


//    @GetMapping(path="/addUser") // Map ONLY GET Requests
//    public String addNewUser (@RequestParam String name
//            , @RequestParam String email) {
//        // @ResponseBody means the returned String is the response, not a view name
//        // @RequestParam means it is a parameter from the GET or POST request
//
//        User n = new User();
//        n.setName(name);
//        n.setEmail(email);
//        userRepository.save(n);
//        return "addAccount";
//    }

    @GetMapping("/getUser")
    @ResponseBody
    public User getUser(@RequestParam String userId){
        //return this.userMapper.getUser(userId);
        MultipleDataSource.setDataSourceKey("sqlServerDataSource");
        return this.userMapper.getUser(userId);
        //return this.userDaoJdbc.getUser(Integer.parseInt(userId));
    }


}
