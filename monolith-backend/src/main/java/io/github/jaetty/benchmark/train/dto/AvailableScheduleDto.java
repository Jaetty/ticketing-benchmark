package io.github.jaetty.benchmark.train.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvailableScheduleDto {

    Long scheduleId;
    Long routeId;
    Long trainId;
    Integer trainTypeId;
    String trainName;
    String departureTime;
    Long availableSeats;

    @Override
    public String toString() {
        return "AvailableScheduleDto [scheduleId=" + scheduleId + ", routeId=" + routeId + ", trainId=" + trainId + ", trainTypeId=" + trainTypeId + ", trainName=" + trainName + ", departureTime=" + departureTime + "]";
    }
}
