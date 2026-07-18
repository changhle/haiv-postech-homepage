# 🛠️ [Tech Stack] 연구실 홈페이지 시스템 아키텍처 및 기술 명세서

## 1. Frontend (사용자 인터페이스)
* **Core Framework:** **Next.js (React 기반)** / TypeScript
  * SSR(서버 사이드 렌더링)과 SSG(정적 사이트 생성)를 지원하여 초기 로딩 속도가 빠르고 검색엔진 최적화(SEO)에 매우 유리합니다. TypeScript를 적용해 유지보수 안정성을 높입니다.
* **Styling:** **Tailwind CSS**
  * 보라색 테마를 전역으로 설정하기 쉽고, 직관적인 클래스명으로 반응형(모바일/PC) 디자인을 빠르게 구현합니다.
* **Animation & UI Libraries:**
  * **Hero 배경:** `Vanta.js (Fog)` 또는 `tsParticles` (오묘하고 신비로운 보라색 유체/파티클 효과 연출)
  * **스크롤 트랜지션:** `Framer Motion` (React 환경과 호환성이 뛰어나며 컴포넌트 단위의 페이드/슬라이드업 구현)
  * **슬라이더:** `Swiper.js` (갤러리 및 모바일 터치 스와이프 지원)

## 2. Backend (서버 및 API)
* **Framework:** **Node.js (Express)** 또는 **Next.js API Routes**
  * 프론트엔드와 동일한 언어 생태계(JavaScript/TypeScript)를 사용하여 파편화를 방지하고 개발 효율을 높입니다.
* **ORM (Object-Relational Mapping):** **Prisma**
  * 데이터베이스 스키마를 직관적으로 관리하며, 타입 안정성을 제공하여 논문 및 구성원 데이터를 다룰 때 런타임 오류를 최소화합니다.

## 3. Database (데이터베이스)
* **RDBMS:** **PostgreSQL**
  * 논문, 저자, 연도, 실적 타입 등 관계형 데이터가 뚜렷한 연구실 실적(Publications) 및 구성원 정보를 체계적으로 관리하는 데 최적화된 오픈소스 DB입니다.
* **주요 데이터 모델 (Schema Outline):**
  * `Users/Members`: 이름, 직급, 프로필 이미지 URL, 이메일, 홈페이지, 졸업 여부
  * `Publications`: 연도, 타입(국제/국내/특허), 제목, 저자 목록, 저널/학회명, DOI, PDF URL
  * `Events`: 카테고리(News/Gallery/Dates), 제목, 내용, 이미지 URL, 날짜

## 4. Infrastructure & Packaging (배포 및 인프라)
* **Containerization:** **Docker & Docker Compose**
  * 프론트엔드, 백엔드, 데이터베이스를 각각의 독립된 컨테이너로 격리 패키징합니다. 운영체제 환경에 구애받지 않고 `docker-compose up` 명령어로 손쉽게 배포 및 구동이 가능합니다.
* **Web Server / Proxy:** **Nginx**
  * 리버스 프록시(Reverse Proxy)로 사용하여 도메인 라우팅, SSL(HTTPS) 인증서 적용, 정적 파일 캐싱 등을 담당합니다.

## 5. Docker Compose 패키징 명세 (기본 구조)

```yaml
version: '3.8'

services:
  # 1. 프론트엔드 (Next.js 웹 서버)
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8080/api
    depends_on:
      - backend

  # 2. 백엔드 (Node.js API 서버)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/lab_db
    depends_on:
      - db

  # 3. 데이터베이스 (PostgreSQL)
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=lab_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```
