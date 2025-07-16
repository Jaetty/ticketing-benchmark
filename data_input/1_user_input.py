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

# users 테이블 입력
def input_users(login_id, password, limit, cursor):
    for _ in range(0, limit):
        cursor.execute("""
                INSERT INTO users (login_id, password) VALUES (%s, %s)
            """, (login_id, password))


input_users('test', 'pass1234', 100000, cursor)
print("유저 입력 끝!")

conn.commit()
conn.close()