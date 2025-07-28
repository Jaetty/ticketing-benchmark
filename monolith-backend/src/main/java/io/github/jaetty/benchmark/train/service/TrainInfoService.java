package io.github.jaetty.benchmark.train.service;

import io.github.jaetty.benchmark.train.dto.StationDto;
import io.github.jaetty.benchmark.train.dto.TrainTypeDto;
import io.github.jaetty.benchmark.train.repository.StationRepository;
import io.github.jaetty.benchmark.train.repository.TrainRepository;
import io.github.jaetty.benchmark.train.repository.TrainTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainInfoService {

    private final TrainRepository trainRepository;
    private final TrainTypeRepository trainTypeRepository;
    private final StationRepository stationRepository;

    public List<TrainTypeDto> getTrainTypes() {

        return trainTypeRepository.findAll().stream()
                .map(TrainTypeDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<StationDto> getStations() {

        return stationRepository.findAll(Sort.by("stationId").ascending()).stream()
                .map(StationDto::fromEntity)
                .collect(Collectors.toList());
    }

}