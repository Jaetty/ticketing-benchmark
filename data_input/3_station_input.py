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

Gyeongbu_line_station = [
    "부산", "부산진", "동대구", "대구", "경산", "청도", "남성현", "정대",
    "고산", "수성", "신천", "고모", "대동", "동대구", "대구", "경산",
    "남성현", "청도", "밀양", "상동", "낙동", "삼랑진", "부산", "부산진",
    "부전", "센텀", "해운대", "송정", "기장", "남창", "서생", "덕하",
    "개운포", "용잠", "효문", "울산", "선암", "호계", "모량", "입실",
    "신경주", "북울산", "태화강", "외동", "불국사", "건천", "서경주", "영천",
    "금호", "하양", "경산", "가천", "동대구", "대구", "칠곡", "신동",
    "연화", "왜관", "양목", "사곡", "구미", "아포", "대신", "김천",
    "옥산", "청리", "상주", "증약", "추풍령", "황간", "계산", "영동",
    "각계", "심천", "지탄", "이원", "옥천", "신상", "세천", "대전",
    "회덕", "신탄진", "매포", "부강", "내판", "조치원", "전의", "소정리",
    "천안", "두정", "직산", "성환", "평택", "평택지제", "서정리", "송탄",
    "진위", "오산", "오산대", "세마", "병점", "세류", "수원", "화서",
    "성균관대", "의왕", "금정", "명학", "안양", "관악", "석수", "금천구청",
    "독산", "가산디지털단지", "구로", "신도림", "영등포", "신길", "대방",
    "노량진", "용산", "남영", "서울"
]

Honam_line_station = [
    "대전조차장", "서대전", "가수원", "흑석리", "원정", "계룡", "신도", "개태사",
    "연산", "부황", "논산", "채화", "채운", "강경", "용동", "함열", "다산",
    "황등", "익산", "부용", "와룡", "김제", "감곡", "신태인", "초강", "정읍",
    "천원", "노령", "백양사", "신흥리", "안평", "장성", "옥정", "임곡", "하남",
    "북송정", "광주송정", "노안", "나주", "영산포", "다시", "고막원", "함평",
    "무안", "몽탄", "명산", "일로", "임성리", "동목포", "목포"
]

Donghae_line_station = [
    "부산진", "범일", "부전", "거제해맞이", "거제", "교대", "동래", "안락",
    "부산원동", "재송", "센텀", "벡스코", "신해운대", "송정", "오시리아", "기장",
    "일광", "좌천", "월내", "서생", "남창", "망양", "덕하", "개운포",
    "태화강", "북울산", "외동", "경주", "모량", "서경주", "안강", "부조",
    "포항", "월포", "장사", "강구", "영덕", "영해", "고래불", "후포",
    "평해", "기성", "매화", "울진", "죽변", "흥부", "옥원", "임원",
    "근덕", "삼척"
]

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


input_stations(Gyeongbu_line_station, cursor, conn)
print('경부선 끝!')

input_stations(Honam_line_station, cursor, conn)
print('호남선 끝!')

input_stations(Donghae_line_station, cursor, conn)
print('동해선 끝!')