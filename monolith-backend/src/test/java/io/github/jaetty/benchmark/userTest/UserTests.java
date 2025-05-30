package io.github.jaetty.benchmark.userTest;

import io.github.jaetty.benchmark.user.dto.UserDto;
import io.github.jaetty.benchmark.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootTest
public class UserTests {

    @Autowired
    private UserService userService;

    @Test
    public void addUserTest() {

        System.out.println(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        UserDto userDto = UserDto.builder()
                .loginId(LocalDateTime.now().format(formatter))
                .password("123456")
                .build();

        userService.addNewUser(userDto);

    }

}
