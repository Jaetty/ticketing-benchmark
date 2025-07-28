package io.github.jaetty.benchmark.train.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "train_types")
public class TrainType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer trainTypeId;

    private String trainName;

}
