package io.github.jaetty.benchmark.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 권한 규칙 작성
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/*").permitAll() //GET허용
                        .anyRequest().permitAll() //모든 경로에 대한 인증처리는 Pass
        );
        return http.build();
    }
}
