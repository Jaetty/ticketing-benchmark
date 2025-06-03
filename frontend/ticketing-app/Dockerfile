# 1단계: React 앱 빌드
FROM node:22.16.0 as builder
WORKDIR /app

# package.json과 package-lock.json 먼저 복사 (빌드 속도 최적화)
COPY package*.json ./

RUN npm install

# 소스 전체 복사
COPY . .

# React 앱 빌드 (빌드 결과물이 /app/build에 생성됨)
RUN npm run build

# 2단계: nginx에 빌드 결과물 복사
FROM nginx:alpine

# nginx 기본 html 디렉토리에 React 빌드 파일 복사
COPY --from=builder /app/build /usr/share/nginx/html

# 커스텀 nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너 기본 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
