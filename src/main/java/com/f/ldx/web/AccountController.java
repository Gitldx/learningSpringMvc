package com.f.ldx.web;


import com.f.ldx.domain.User;
import com.f.ldx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/account")
public class AccountController {


    @RequestMapping()
    public String listAccounts(){
        return "account";
    }

    @RequestMapping("/add")
    public String add(){
        return "addAccount";
    }


    @Autowired
    private UserRepository userRepository;

    @GetMapping(path="/addUser") // Map ONLY GET Requests
    public String addNewUser (@RequestParam String name
            , @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User n = new User();
        n.setName(name);
        n.setEmail(email);
        userRepository.save(n);
        return "addAccount";
    }
}
