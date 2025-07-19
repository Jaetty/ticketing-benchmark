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

routes = ['경부선 상행', '경부선 하행', '호남선 상행', '호남선 하행', '동해선 상행', '동해선 하행']

Gyeongbu_line_station = [
    "부산", "사상", "구포", "화명", "물금", "원동", "삼랑진", "밀양", "울산", "상동", "신거",
    "청도", "남성현", "삼성", "경산", "고모", "동대구", "대구", "서대구", "지천", "신동",
    "연화", "왜관", "약목", "사곡", "구미", "아포", "대신", "김천구미", "김천", "직지사", "신암",
    "추풍령", "황간", "영동", "각계", "심천", "지탄", "이원", "옥천", "세천", "대전",
    "회덕", "신탄진", "부강", "내판", "조치원", "서창", "전동", "전의", "소정리", "천안", "천안아산",
    "두정", "직산", "성환", "평택", "평택지제", "서정리", "송탄", "진위", "오산", "오산대",
    "세마", "병점", "세류", "수원", "화서", "성균관대", "의왕", "당정", "군포", "금정",
    "명학", "안양", "관악", "석수", "금천구청", "독산", "가산디지털단지", "광명", "구로", "신도림", "영등포",
    "신길", "대방", "노량진", "용산", "남영", "서울"
]

Honam_line_station = [
    "목포", "임성리", "일로", "몽탄", "무안", "함평", "다시", "나주", "노안", "광주송정",
    "하남", "임곡", "장성", "안평", "백양사", "천원", "정읍", "초강", "신태인", "감곡",
    "김제", "와룡", "부용", "익산", "황등", "함열", "용동", "강경", "채운", "논산",
    "연산", "개태사", "계룡", "가수원"
]


Donghae_line_station = [
    "부전", "거제해맞이", "거제", "교대", "동래", "안락", "부산원동", "재송", "센텀", "벡스코",
    "신해운대", "송정", "오시리아", "기장", "일광", "좌천", "월내", "서생", "남창", "망양",
    "개운포", "태화강", "북울산", "경주", "서경주", "안강", "포항", "월포", "장사", "강구",
    "영덕", "영해", "고래불", "후포", "평해", "기성", "매화", "울진", "죽변", "흥부",
    "옥원", "임원", "근덕", "삼척"
]

def input_route(cursor, conn):
    for route_id, route_name in enumerate(routes, start=1):
        try:
            cursor.execute("""
                INSERT INTO route VALUES (%s,%s)
            """, (route_id, route_name,)) # 튜플 형태로 전달 (station,)

            conn.commit()

        except pymysql.err.IntegrityError as e: # MySQL 예외 타입
            print(f"'{route_id}'은(는) 이미 존재하여 삽입되지 않았습니다.")
            conn.rollback() # 오류 발생 시 롤백
        except Exception as e:
            print(f"예상치 못한 오류 발생: {e}")
            conn.rollback() # 오류 발생 시 롤백


def input_stations(line_list, cursor, conn):
    for station in line_list:
        try:
            cursor.execute("""
                INSERT INTO stations (station_name) VALUES (%s)
            """, (station,)) # 튜플 형태로 전달 (station,)

            conn.commit()

        except pymysql.err.IntegrityError as e: # MySQL 예외 타입
            # 에러 코드를 확인하여 정확히 UNIQUE 제약 조건 위반인지 체크
            if "Duplicate entry" in str(e) or "unique constraint" in str(e):
                print(f"'{station}'은(는) 이미 존재하여 삽입되지 않았습니다.")
                conn.rollback() # 오류 발생 시 롤백
            else:
                print(f"다른 데이터베이스 오류 발생: {e}")
                conn.rollback() # 오류 발생 시 롤백
        except Exception as e:
            print(f"예상치 못한 오류 발생: {e}")
            conn.rollback() # 오류 발생 시 롤백

def input_route_staion(route_id, route_list, cursor, conn):
    cursor.execute("SELECT station_id, station_name FROM stations")
    results = cursor.fetchall()

    station_id_map = {name: sid for sid, name in results}
    for station_order, station in enumerate(route_list, start=1):
        # print(station_order, station, station_id_map[station])
        cursor.execute("""
                INSERT INTO route_station(route_id, station_id, station_order) VALUES (%s,%s,%s)
            """, (route_id, station_id_map[station], station_order))
    conn.commit()


input_route(cursor, conn)

input_stations(Gyeongbu_line_station, cursor, conn)
input_route_staion(1, Gyeongbu_line_station, cursor, conn)
input_route_staion(2, reversed(Gyeongbu_line_station), cursor, conn)
# print('경부선 끝!')

input_stations(Honam_line_station, cursor, conn)
input_route_staion(3, Honam_line_station, cursor, conn)
input_route_staion(4, reversed(Honam_line_station), cursor, conn)
# print('호남선 끝!')

input_stations(Donghae_line_station, cursor, conn)
input_route_staion(5, Donghae_line_station, cursor, conn)
input_route_staion(6, reversed(Donghae_line_station), cursor, conn)
# print('동해선 끝!')
