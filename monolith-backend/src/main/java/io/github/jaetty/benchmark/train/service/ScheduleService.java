package io.github.jaetty.benchmark.train.service;

import io.github.jaetty.benchmark.train.dto.AvailableScheduleDto;
import io.github.jaetty.benchmark.train.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    @Autowired
    private final ScheduleRepository scheduleRepository;

    public List<AvailableScheduleDto> getAvailableSchedules() {


        return null;
    }

}
