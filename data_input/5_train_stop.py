import pymysql
from datetime import datetime, timedelta
from dotenv import load_dotenv
import calendar
import os

def get_station_id_map(cursor):
    cursor.execute("SELECT station_id, station_name FROM stations")
    result = cursor.fetchall()
    return {name: sid for sid, name in result}

def insert_train_stops(
    train_type,
    route_id,
    start_time,
    stations_data,
    station_id_map,
    departure_interval,
    cursor,
    conn
):
    
    cursor.execute("""SELECT schedules.schedule_id, schedules.departure_date FROM schedules
                    INNER JOIN trains ON trains.train_id = schedules.train_id AND trains.train_type_id = %s AND schedules.route_id = %s
                    ORDER BY schedules.schedule_id;""", (train_type, route_id))
    schedules_fetch = cursor.fetchall()

    date = 'garbage'
    first_departure_time = datetime.strptime(start_time, "%H:%M")
    cur_time = first_departure_time

    for schedule_id, schedule_date in schedules_fetch:
        if schedule_date != date :
            date = schedule_date
            first_departure_time = datetime.strptime(start_time, "%H:%M")
        else :
            first_departure_time += timedelta(minutes=departure_interval)
        
        cur_time = first_departure_time
        # print(schedule_id," ", station_id_map[stations_data[0][0]], " ", None, " ", cur_time.time(), " ", 0)

        cursor.execute("""INSERT INTO train_stops(schedule_id, station_id, arrival_time, departure_time, fare) VALUES(
                           %s, %s, %s, %s, %s)""", (schedule_id, station_id_map[stations_data[0][0]], None, cur_time.time(), 0))

        for data in stations_data[1:]:  # '구포'부터 반복
            # 역 사이 운행 시간
            cur_time += timedelta(minutes=data[1])
            # 대기 후 역 출발 시간
            departure_time = cur_time + timedelta(minutes=2)
            # print(schedule_id," ", station_id_map[data[0]], " ", None, " ", cur_time.time(), " ", 0)
            cursor.execute("""INSERT INTO train_stops(schedule_id, station_id, arrival_time, departure_time, fare) VALUES(
                           %s, %s, %s, %s, %s)""", (schedule_id, station_id_map[data[0]], cur_time.time(), departure_time.time(), data[2]))
            cur_time = departure_time
    conn.commit()
            

load_dotenv()  # .env 파일 읽기

conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset=os.getenv("DB_CHARSET")
)

cursor = conn.cursor()

mugunghwa_interval = [
    ("부산", 0, 2600), ("구포", 13, 2600), ("물금", 8, 2600), ("원동", 7, 2600), ("삼랑진", 7, 2600),
    ("밀양", 8, 2600), ("청도", 12, 2600), ("남성현", 7, 2600), ("경산", 9, 2600), ("동대구", 9, 2600),
    ("대구", 4, 2600), ("왜관", 18, 2600), ("구미", 12, 2600), ("김천", 15, 2600), ("추풍령", 13, 2600),
    ("영동", 15, 2600), ("옥천", 18, 2600), ("대전", 11, 2600), ("신탄진", 10, 2600), ("조치원", 15, 2600),
    ("천안", 20, 2600), ("평택", 13, 2600), ("수원", 18, 2600), ("안양", 12, 2600), ("영등포", 11, 2600),
    ("서울", 11, 2600),
]

ITX_interval = [
    ("부산", 0, 0), ("구포", 12, 4800), ("밀양", 22, 4800), ("청도", 12, 4800), ("동대구", 21, 4800), ("대구", 4, 4800), ("구미", 27, 4800), ("김천", 14, 4800),
    ("대전", 51, 8400), ("조치원", 23, 4800), ("천안", 15, 4800), ("수원", 27, 4800), ("영등포", 19, 4800), ("서울", 11, 4800),
]

KTX_interval = [
    ("부산", 0, 0), ("울산", 21, 8400), ("경주", 10, 8400), ("동대구", 16, 8400), ("대전", 41, 19700), ("천안아산", 23, 9600), ("광명", 24, 11600), ("서울", 18, 8400),
]

station_id_map = get_station_id_map(cursor)

#무궁화 입력
insert_train_stops(
    train_type = 100,
    route_id = 1,
    start_time = '06:00',
    stations_data = mugunghwa_interval,
    station_id_map = station_id_map,
    departure_interval = 60,
    cursor=cursor,
    conn=conn
)

print('무궁화 루트 stop 끝')

# ITX 입력
insert_train_stops(
    train_type = 1000,
    route_id = 1,
    start_time = '06:30',
    stations_data = ITX_interval,
    station_id_map = station_id_map,
    departure_interval = 60,
    cursor=cursor,
    conn=conn
)

print('ITX 루트 stop 끝')

# KTX 입력
insert_train_stops(
    train_type = 2000,
    route_id = 1,
    start_time = '06:20',
    stations_data = KTX_interval,
    station_id_map = station_id_map,
    departure_interval = 20,
    cursor=cursor,
    conn=conn
)

print('KTX 루트 stop 끝')

conn.commit()
conn.close()
