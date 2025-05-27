package io.github.jaetty.benchmark.user.controller;

import io.github.jaetty.benchmark.global.response.CustomBody;
import io.github.jaetty.benchmark.global.response.StatusEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/user")
public class UserController {

    @GetMapping("/search")
        public ResponseEntity<CustomBody> getUsers(@RequestParam String loginId) {

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "정상", "테스트 중"));
    }

}