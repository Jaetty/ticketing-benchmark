package io.github.jaetty.benchmark.train.repository;

import io.github.jaetty.benchmark.train.dto.AvailableScheduleInterfaceDto;
import io.github.jaetty.benchmark.train.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query(value = "SELECT sch1.schedule_id AS scheduleId, sch1.route_id AS routeId, sch1.train_id AS trainId, " +
            "trains.train_type_id AS trainTypeId, train_types.train_name AS trainName, " +
            "train_stops.departure_time, COUNT(seats.seat_id) AS availableSeats " +
            "FROM schedules AS sch1 " +
            "JOIN trains ON trains.train_id = sch1.train_id " +
            "JOIN train_stops ON train_stops.schedule_id = sch1.schedule_id AND train_stops.station_id = :departureStationId AND train_stops.departure_time >= :departureTime " +
            "JOIN train_types ON trains.train_type_id = train_types.train_type_id " +
            "JOIN train_cars AS tc ON tc.train_id = sch1.train_id AND sch1.departure_date = :departureDate " +
            "JOIN seats ON seats.train_car_id = tc.train_car_id " +
            "WHERE seats.seat_id NOT IN (" +
            "    SELECT ti.seat_id FROM schedules AS sch2 " +
            "    JOIN tickets AS ti ON sch2.schedule_id = ti.schedule_id AND sch2.departure_date = :departureDate " +
            "    JOIN route_station AS d2 ON d2.route_id = sch2.route_id AND ti.departure_id = d2.station_id " +
            "    JOIN route_station AS a2 ON a2.route_id = sch2.route_id AND a2.station_order > d2.station_order AND ti.arrival_id = a2.station_id " +
            "    WHERE d2.station_order < :arrivalOrder AND a2.station_order > :departureOrder" +
            ") GROUP BY sch1.schedule_id " +
            "ORDER BY train_stops.departure_time",
            nativeQuery = true)
    List<AvailableScheduleInterfaceDto> findAvailableSchedules(@Param("departureStationId") int departureStationId,
                                                               @Param("departureTime") String departureTime,
                                                               @Param("departureDate") String departureDate,
                                                               @Param("departureOrder") int departureOrder,
                                                               @Param("arrivalOrder") int arrivalOrder);

}
