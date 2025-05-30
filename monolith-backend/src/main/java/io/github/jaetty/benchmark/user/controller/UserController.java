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

    @GetMapping("/search") // 아이디를 기준으로 확인 체크
    public ResponseEntity<CustomBody> getUsers(@RequestParam String loginId) {

        /* github action 변경 확인 테스트 3 */

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "정상", "테스트 중"));
    }

}