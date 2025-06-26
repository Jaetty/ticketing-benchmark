package io.github.jaetty.benchmark.user.controller;

import io.github.jaetty.benchmark.global.response.CustomBody;
import io.github.jaetty.benchmark.global.response.StatusEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/search") // 아이디를 기준으로 확인 체크
    public ResponseEntity<CustomBody> getUsers(@RequestParam String loginId) {

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "정상", "테스트 중"));
    }

    @GetMapping("/loginTest") // 로그인 테스트용 임시 API
    public ResponseEntity<CustomBody> testLogin(@RequestParam String loginId, @RequestParam String password) {

        if(loginId.equals("bench01") && password.equals("password01")) {
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "로그인 성공", true));
        }
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "계정 정보가 일치하지 않습니다.", false));
    }

}