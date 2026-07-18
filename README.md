# HAIV Lab Homepage

연구실 공식 홈페이지 — Next.js 프론트엔드 + Express/Prisma 백엔드 + PostgreSQL, Docker Compose로 패키징.

## 구조

```
├── frontend/          # Next.js 16 (TypeScript, Tailwind v4, Framer Motion, tsParticles, Swiper)
├── backend/           # Express + Prisma 7 API 서버 (port 8080)
│   └── prisma/        # DB 스키마 & 마이그레이션
├── nginx/             # 리버스 프록시 설정 (/ → frontend, /api → backend)
└── docker-compose.yml # nginx · frontend · backend · db (PostgreSQL 15)
```

## 전체 스택 실행 (Docker)

```bash
docker compose up -d --build
```

- 접속: **http://localhost:8090** (호스트 80 포트가 사용 중이라 8090에 바인딩 — `docker-compose.yml`에서 변경 가능)
- 첫 구동 시 backend 컨테이너가 마이그레이션(`prisma migrate deploy`)과 더미 데이터 시드를 자동 수행합니다 (시드는 멱등 — 테이블이 비었을 때만).
- DB 비밀번호는 `POSTGRES_PASSWORD` 환경변수로 재정의: `POSTGRES_PASSWORD=secret docker compose up -d`

## 개발 모드 (Docker 없이)

```bash
# 1) 개발용 DB (최초 1회)
docker run -d --name haiv-dev-pg -e POSTGRES_USER=haiv \
  -e POSTGRES_PASSWORD=haiv_dev_password -e POSTGRES_DB=haiv_lab \
  -p 5433:5432 postgres:15-alpine

# 2) 백엔드  (backend/.env 의 DATABASE_URL 사용)
cd backend
npx prisma migrate dev   # 스키마 반영
npm run seed             # 더미 데이터
npm run dev              # :8080

# 3) 프론트엔드 (별도 터미널)
cd frontend
NEXT_PUBLIC_API_URL=http://localhost:8080/api npm run dev:poll   # :3000
```

프론트엔드는 API가 없거나 죽어 있으면 **번들된 더미 데이터로 자동 폴백**하므로, 백엔드 없이 `npm run dev:poll`만 실행해도 동작합니다.
(`dev:poll`은 이 서버의 inotify 한도가 낮아 폴링 방식으로 파일을 감시하는 스크립트입니다. 일반 환경에서는 `npm run dev`를 쓰세요.)

## API

| Method | Path                | 설명 |
|--------|---------------------|------|
| GET    | `/api/health`       | DB 연결 확인 |
| GET    | `/api/members`      | 직급별 구성원 그룹 + 졸업생 |
| GET    | `/api/publications` | 연도별(내림차순) 국제/국내/특허 |
| GET    | `/api/events`       | news / gallery / importantDates |

프론트엔드 페이지는 60초 ISR로 재검증하므로 DB를 수정하면 최대 1분 내 반영됩니다.

## 데이터 수정

현재 데이터는 전부 더미입니다. 실제 데이터로 교체하려면:
- **DB 직접 수정** (권장): `docker compose exec db psql -U haiv haiv_lab`
- **시드 수정**: `backend/src/seed-data.ts` 편집 후 DB 초기화(`docker compose down -v`) → 재기동
- 사이트 문구·연구 분야 소개 등 DB에 없는 콘텐츠: `frontend/src/lib/data/` 모듈 편집
