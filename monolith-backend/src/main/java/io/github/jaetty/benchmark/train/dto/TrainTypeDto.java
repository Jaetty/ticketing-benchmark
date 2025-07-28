package io.github.jaetty.benchmark.train.dto;

import io.github.jaetty.benchmark.train.entity.TrainType;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainTypeDto {

    Integer trainTypeId;
    String trainName;

    public static TrainTypeDto fromEntity(TrainType entity) {
        return TrainTypeDto.builder()
                .trainTypeId(entity.getTrainTypeId())
                .trainName(entity.getTrainName())
                .build();
    }
}
