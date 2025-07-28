package io.github.jaetty.benchmark.train.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainDto {

    Long trainId;
    Integer trainTypeId;
    String trainName;

}
