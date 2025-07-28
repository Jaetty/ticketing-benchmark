package io.github.jaetty.benchmark.train.dto;

import io.github.jaetty.benchmark.train.entity.Station;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StationDto {

    Long stationId;
    String stationName;

    public static StationDto fromEntity(Station entity) {
        return StationDto.builder()
                .stationId(entity.getStationId())
                .stationName(entity.getStationName())
                .build();
    }


}
