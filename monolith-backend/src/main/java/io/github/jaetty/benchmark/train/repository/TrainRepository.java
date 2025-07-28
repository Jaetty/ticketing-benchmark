package io.github.jaetty.benchmark.train.repository;

import io.github.jaetty.benchmark.train.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TrainRepository extends JpaRepository<Train, Long> {

}
