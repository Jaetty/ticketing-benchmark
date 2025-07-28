package io.github.jaetty.benchmark.train.repository;

import io.github.jaetty.benchmark.train.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
}
