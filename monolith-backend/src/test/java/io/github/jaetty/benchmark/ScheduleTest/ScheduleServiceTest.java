package io.github.jaetty.benchmark.ScheduleTest;

import io.github.jaetty.benchmark.train.dto.AvailableScheduleInterfaceDto;
import io.github.jaetty.benchmark.train.repository.ScheduleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ScheduleServiceTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Test
    // testScheduleService 레포지토리 작동 테스트
    public void testScheduleService() {

        List<AvailableScheduleInterfaceDto> list = scheduleRepository.findAvailableSchedules(1, "06:00:00", "2025-10-01", 1, 9);
        StringBuilder sb = new StringBuilder();

        sb.append("스케쥴ID 루트ID 기차ID 기차종류\t\t기차이름 \t출발시간 \t 가능한석").append("\n");
        int index = 1;

        for(AvailableScheduleInterfaceDto dto : list) {
            sb.append(dto.getScheduleId()).append("\t\t");
            sb.append(dto.getRouteId()).append("\t\t");
            sb.append(dto.getTrainId()).append("\t\t");
            sb.append(dto.getTrainTypeId()).append("\t\t");
            sb.append(dto.getTrainName()).append("\t\t");
            sb.append(dto.getDepartureTime()).append("\t\t");
            sb.append(dto.getAvailableSeats()).append("     ");
            sb.append(index++).append("\n");
        }

        System.out.print(sb.toString());


    }

}
