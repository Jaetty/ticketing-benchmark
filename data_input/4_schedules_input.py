import pymysql
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

def insert_train_schedules(
    cursor,
    initial_departure,
    start_train_id,
    start_train_number,
    route,
    departure_date,
    train_interval,
    station_interval_list,
    repeat_count
):
    train_id = start_train_id
    train_number = start_train_number

    for _ in range(1, repeat_count + 1):
        cursor.execute("""
            INSERT INTO schedules (train_id, route_id, departure_date, train_number)
            VALUES (%s, %s, %s, %s)
        """, (train_id, route, departure_date, train_number))

        depart_time = initial_departure
        # print("  도착      출발        역")
        # print("   ", None, " ", depart_time.strftime("%H:%M:%S"), "     1")

        last_id = cursor.lastrowid
        cursor.execute("""
                INSERT INTO train_stops (schedule_id, station_id, arrival_time, departure_time)
                VALUES (%s, %s, %s, %s)
            """, (last_id, 1, None, depart_time))

        for i, interval in enumerate(station_interval_list):
            station_order = i + 2

            arrive_time = depart_time + timedelta(minutes=interval)
            depart_time = arrive_time + timedelta(minutes=2)

            arrive_str = arrive_time.strftime("%H:%M:%S")
            depart_str = depart_time.strftime("%H:%M:%S")

            if station_order == 12:
                depart_str = None

            # print(arrive_str, " ", depart_str, "    ", station_order)

            cursor.execute("""
                INSERT INTO train_stops (schedule_id, station_id, arrival_time, departure_time)
                VALUES (%s, %s, %s, %s)
            """, (last_id, station_order, arrive_str, depart_str))

        train_id += 1
        train_number += 1
        initial_departure += timedelta(minutes=train_interval)
        # print('\n')

load_dotenv()  # .env 파일 읽기

conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset=os.getenv("DB_CHARSET")
)

cursor = conn.cursor()

mugunghwa_interval = [13, 9, 20, 27, 10, 8, 90, 80, 25, 10, 15]
ITX_interval = [12,8,19,26,9,7,89,79,24,9,14]
KTX_interval = [4,2,6,8,3,2,29,26,8,3,4]
# SRT_interval = [12,8,19,26,9,7,89,79,24,9,14] # KTX랑 같음

# 무궁화 입력
base_date = datetime.strptime("2025-10-01", "%Y-%m-%d")

for date_offset in range(0, 31):
    departure_date = (base_date + timedelta(days=date_offset)).strftime("%Y-%m-%d")

    insert_train_schedules(
        cursor=cursor,
        initial_departure=datetime.strptime("06:00", "%H:%M"),
        start_train_id=100,
        start_train_number=100,
        route=1,
        departure_date = departure_date,
        train_interval=30,
        station_interval_list=mugunghwa_interval,
        repeat_count = 25
    )

print('무궁화 끝!')

# # ITX 입력
for date_offset in range(0, 31):
    departure_date = (base_date + timedelta(days=date_offset)).strftime("%Y-%m-%d")

    insert_train_schedules(
        cursor=cursor,
        initial_departure=datetime.strptime("06:30", "%H:%M"),
        start_train_id=1000,
        start_train_number=200,
        route=1,
        departure_date = departure_date,
        train_interval=30,
        station_interval_list=ITX_interval,
        repeat_count = 25
    )

print('ITX 끝!')

for date_offset in range(0, 31):
    departure_date = (base_date + timedelta(days=date_offset)).strftime("%Y-%m-%d")

    insert_train_schedules(
        cursor=cursor,
        initial_departure=datetime.strptime("06:00", "%H:%M"),
        start_train_id=2000,
        start_train_number=300,
        route=1,
        departure_date = departure_date,
        train_interval=20,
        station_interval_list=KTX_interval,
        repeat_count = 49
    )

print('KTX 끝!')

conn.commit()
conn.close()
