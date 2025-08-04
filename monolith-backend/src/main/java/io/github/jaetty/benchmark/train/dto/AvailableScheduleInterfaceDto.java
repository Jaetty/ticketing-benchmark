package io.github.jaetty.benchmark.train.dto;

public interface AvailableScheduleInterfaceDto {
    Long getScheduleId();
    Long getRouteId();
    Long getTrainId();
    Integer getTrainTypeId();
    String getTrainName();
    String getDepartureTime();
    Long getAvailableSeats();
}