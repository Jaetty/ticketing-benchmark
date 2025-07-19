from dotenv import load_dotenv
import os
import pymysql

load_dotenv()  # .env 파일 읽기

conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset=os.getenv("DB_CHARSET")
)

cursor = conn.cursor()

# train_type 테이블에 입력
def input_train_types(cursor, conn):
    list = [(100, '무궁화'), (1000, 'ITX'), (2000, 'KTX')]
    for train_type_id, train_name in list:
        cursor.execute("""
                INSERT INTO train_types VALUES (%s, %s)
            """, (train_type_id, train_name))
    conn.commit()

# car_class 테이블에 입력
def input_car_class(cursor, conn):
    list = [(1, '일반실', 1.0), (2, '특등실',1.5)]
    for class_id, class_name, fare_multi in list:
        cursor.execute("""
                INSERT INTO car_class VALUES (%s, %s, %s)
            """, (class_id, class_name, fare_multi))
    conn.commit()

# trains 테이블 입력
def input_trains(train_type_id, limit, cursor, conn):
    for _ in range(0, limit):
        cursor.execute("""
                INSERT INTO trains(train_type_id) VALUES (%s)
            """, (train_type_id))
    conn.commit()


# 기차가 어떤 종류인지 가져오기
def get_trains(train_type_id, cursor):
    cursor.execute("SELECT train_id, train_type_id FROM trains WHERE train_type_id = %s", (train_type_id,))
    rows = cursor.fetchall()
    return rows

# 좌석 입력        
def input_seat(train_car_id, cursor):
    list = ['A','B','C','D','E','F']
    for var in range(1, 19):
        for seat in list:
            cursor.execute("""
                INSERT INTO seats (train_car_id, seat_name) VALUES (%s, %s)
            """, (train_car_id, str(var)+seat))
    
# 열차 호수 입력
def input_train_cars(train_type_id, car_number_limit, cursor):

    train_list = get_trains(train_type_id, cursor)

    for train_id, train_type in train_list:
        for car_number in range(1, car_number_limit+1):
            # 특등실은 보통 2호차부터 4호차까지 특등실이었음
            if(train_type == 2000 and 1 < car_number and car_number < 5):
                # 특등실 car_class_id = 2
                cursor.execute("""
                INSERT INTO train_cars (train_id, car_class_id, car_number) VALUES (%s, %s, %s)
                """, (train_id, 2, car_number))
                # print(train_id, " 2 ", car_number)
            else:
                # print(train_id, " 1 ", car_number)
                # 일반실 car_class_id = 1번
                cursor.execute("""
                INSERT INTO train_cars (train_id, car_class_id, car_number) VALUES (%s, %s, %s)
                """, (train_id, 1, car_number))
            last_id = cursor.lastrowid
            input_seat(last_id, cursor)

# 기차 종류 입력
# input_train_types(cursor, conn)
# print('종류 입력 끝!')

# 일반실 특등실 입력
# input_car_class(cursor, conn)
# print('호차 클래스 입력 끝!')
# 무궁화호 기차들 입력
input_trains(100, 100, cursor, conn)
print('무궁화 기차 입력 끝!')

# ITX 기차들 입력
input_trains(1000, 100, cursor, conn)
print('ITX 기차 입력 끝!')

# KTX 기차들 입력
input_trains(2000, 150, cursor, conn)
print('KTX 기차 입력 끝!')

input_train_cars(100, 6, cursor)
print('무궁화 좌석 입력 끝!')
input_train_cars(1000, 6, cursor)
print('ITX 좌석 입력 끝!')
input_train_cars(2000, 18, cursor)
print('KTX 좌석 입력 끝!')

conn.commit()
conn.close()