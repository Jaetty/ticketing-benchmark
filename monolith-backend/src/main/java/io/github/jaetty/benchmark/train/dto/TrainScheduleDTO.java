package io.github.jaetty.benchmark.train.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainScheduleDTO {

    Long scheduleId;
    Long trainId;
    Long routeId;
    LocalDate departureDate;
    Integer trainNumber;
    String routeName;
    String trainName;


}
