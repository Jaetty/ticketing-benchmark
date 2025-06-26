package io.github.jaetty.benchmark.train.controller;

import io.github.jaetty.benchmark.global.response.CustomBody;
import io.github.jaetty.benchmark.global.response.StatusEnum;
import io.github.jaetty.benchmark.train.dto.SeatDto;
import io.github.jaetty.benchmark.train.dto.TrainDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/train")
public class TrainController {

    @GetMapping("/list") // 조건에 맞는 기차 목록 가져오기
    public ResponseEntity<CustomBody> getList(@RequestParam int size) {

        List<TrainDto> result = new ArrayList<>();

        for(int i=1; i<=size; i++) {

            result.add(TrainDto.builder()
                    .trainId(i)
                    .departureTime(LocalDateTime.now())
                    .arrivalTime(LocalDateTime.now().plusMinutes(10))
                    .name("KTX - " + i)
                    .build());
        }

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "정상", result));
    }

    @GetMapping("/seatList") // 특정 기차의 좌석 가져오기 (현재 테스트용)
    public ResponseEntity<CustomBody> getSeatList(@RequestParam int trainId, @RequestParam int size) {

        List<SeatDto> result = new ArrayList<>();

        for(int i=1; i<=size; i++) {

            result.add(SeatDto.builder()
                    .seatId(i)
                    .build());
        }

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, "정상", result));
    }

}
