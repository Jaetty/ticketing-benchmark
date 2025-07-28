package io.github.jaetty.benchmark.train.repository;

import io.github.jaetty.benchmark.train.entity.TrainType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainTypeRepository extends JpaRepository<TrainType, Long> {
}
