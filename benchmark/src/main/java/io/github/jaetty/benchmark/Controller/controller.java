package io.github.jaetty.benchmark.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class controller {

    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        System.out.println("start");
        return ResponseEntity.ok("hello");
    }

}
