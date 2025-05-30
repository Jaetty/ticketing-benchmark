package io.github.jaetty.benchmark.user.repository;

import io.github.jaetty.benchmark.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(Long userId);
    User findByLoginId(String loginId);

}
