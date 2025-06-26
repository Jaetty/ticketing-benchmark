package io.github.jaetty.benchmark.train.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainDto {

    int trainId;
    String name;
    LocalDateTime departureTime;
    LocalDateTime arrivalTime;

}
