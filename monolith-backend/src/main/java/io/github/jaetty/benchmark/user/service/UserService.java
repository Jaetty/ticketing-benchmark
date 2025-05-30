package io.github.jaetty.benchmark.user.service;

import io.github.jaetty.benchmark.user.dto.UserDto;
import io.github.jaetty.benchmark.user.entity.User;
import io.github.jaetty.benchmark.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Transactional
    public void addNewUser(UserDto userDto) {

        User user = User.builder()
                .loginId(userDto.getLoginId())
                .password(userDto.getPassword())
                .build();

        userRepository.save(user);

    }

}
