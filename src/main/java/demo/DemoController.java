package demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/demo")
public class DemoController {

    @RequestMapping(method = RequestMethod.GET)
    public String sayHello(ModelMap model) {
        System.out.println("sayHello");
        model.addAttribute("msg","Welcome to ldx javawebtutor Spring 4 MVC Tutorial");
        return "ldx";
    }


    @RequestMapping(value="/greeting", method = RequestMethod.GET)
    public String greeting(ModelMap model) {
        System.out.println("greeting");
        model.addAttribute("msg", "Greetings from javawebtutor.com");
        return "ldx";
    }
}
