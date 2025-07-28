package io.github.jaetty.benchmark.train.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "trains")
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainId;

    @ManyToOne
    @JoinColumn(name = "train_type_id")
    private TrainType trainType;

}
