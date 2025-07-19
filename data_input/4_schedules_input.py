import pymysql
from datetime import datetime, timedelta, date
from dotenv import load_dotenv
import calendar
import os

# 첫 시작 날짜, 
def count_trains_with_runtime(start_time_str, end_time_str, interval_minutes, runtime_minutes):
    start_time = datetime.strptime(start_time_str, "%H:%M")
    end_time = datetime.strptime(end_time_str, "%H:%M")
    runtime = timedelta(minutes=runtime_minutes)

    count = 0
    current_departure = start_time

    while current_departure + runtime <= end_time:
        count += 1
        current_departure += timedelta(minutes=interval_minutes)

    return count


def insert_train_schedules(
    start_train_number,
    route_id,
    start_year,
    start_month,
    train_type,
    start_time_str,
    end_time_str,
    interval_minutes,
    runtime_minutes,
    cursor,
    conn
):
    
    # 그 달의 마지막 날짜 구하기
    last_day = calendar.monthrange(start_year, start_month)[1]
    end_date = datetime(start_year, start_month, last_day).date()

    # 현재 날짜부터 그 달 마지막 날까지 반복
    current_date = date(start_year, start_month, 1)

    # 그날 기차가 몇대까지 출발할 수 있는지 가져오기
    # 필요한 매개변수 : 첫 출발 시간, 최대 도착 시간, 차량 출발 간격 시간, 총 운행시간(주행시간 + 역에서 기다리는 시간)
    last_idx = count_trains_with_runtime(start_time_str, end_time_str, interval_minutes, runtime_minutes)

    while current_date <= end_date:

        train_number = start_train_number
        
        # 스케쥴이 없는 기차들 뽑아오기
        cursor.execute("""
        SELECT trains.train_id 
        FROM trains 
        LEFT OUTER JOIN schedules 
        ON trains.train_id = schedules.train_id 
        AND schedules.departure_date = %s
        WHERE trains.train_type_id = %s
        AND schedules.schedule_id IS NULL;
        """, (current_date, train_type))

        train_ids = [row[0] for row in cursor.fetchall()]

        for idx in range(1, last_idx):
            cursor.execute("""
                INSERT INTO schedules (train_id, route_id, departure_date, train_number)
                VALUES (%s, %s, %s, %s)
            """, (train_ids[idx-1], route_id, current_date, train_number))
            train_number += 1
        
        conn.commit()
        current_date += timedelta(days=1)


load_dotenv()  # .env 파일 읽기

conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset=os.getenv("DB_CHARSET")
)

cursor = conn.cursor()

# 경부선 상행 무궁화호 열차 번호는 100+@, ITX는 200+@, KTX는 300+@
Gyeongbu_up_train_number = [100, 200, 300]

# 경부선 하행 무궁화호 열차 번호는 100+@, ITX는 200+@, KTX는 300+@
Gyeongbu_down_train_number = [400, 500, 600]

# 무궁화 넣는 코드
insert_train_schedules(
    start_train_number = Gyeongbu_up_train_number[0],
    route_id = 1,
    start_year = 2025,
    start_month = 10,
    train_type = 100,
    start_time_str = '06:00',
    end_time_str = '23:50',
    interval_minutes = 60,
    runtime_minutes = 335,
    cursor = cursor,
    conn = conn)

# ITX 넣는 코드
insert_train_schedules(
    start_train_number = Gyeongbu_up_train_number[1],
    route_id = 1,
    start_year = 2025,
    start_month = 10,
    train_type = 1000,
    start_time_str = '06:30',
    end_time_str = '23:50',
    interval_minutes = 60,
    runtime_minutes = 279,
    cursor = cursor,
    conn = conn)


# KTX 넣는 코드
insert_train_schedules(
    start_train_number = Gyeongbu_up_train_number[2],
    route_id = 1,
    start_year = 2025,
    start_month = 10,
    train_type = 2000,
    start_time_str = '06:20',
    end_time_str = '23:50',
    interval_minutes = 20,
    runtime_minutes = 164,
    cursor = cursor,
    conn = conn)


conn.close()
