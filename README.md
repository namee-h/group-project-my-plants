## 🌿 MyPlants - 당신만의 식물 성장 다이어리

MyPlants는 식물 애호가들을 위한 웹사이트로, 사용자가 직접 기르는 식물의 정보를 기록하고 관리할 수 있도록 도와줍니다.

물 주기 일정 및 성장 기록을 시각적으로 확인할 수 있어, 보다 체계적으로 반려식물을 돌볼 수 있습니다.

특히, Plant.id API를 활용하여 업로드한 식물 사진을 분석하고 자동으로 식물 종류를 판별하는 기능을 제공합니다.

## 👥 팀 구성

| 역할     | 프로덕트 오너 (PO) | 스크럼 마스터 (SM) | 개발자 (Developers)    |
| -------- | ------------------ | ------------------ | ---------------------- |
| **이름** | 이도윤             | 한사라             | 김종호, 권이슬, 김다예 |

## 📌 프로젝트 개요

🌱 MyPlants는 사용자가 직접 기르는 식물을 체계적으로 관리할 수 있도록 도와주는 웹 애플리케이션입니다.

사용자는 식물 정보를 등록하고 성장 히스토리를 기록하며, 물 주기 스케줄을 자동으로 관리할 수 있습니다.

특히 Plant.id API를 활용하여 업로드한 식물 사진을 분석해 자동으로 식물 종류를 판별하는 기능이 포함되어 있습니다.

## 🛠 기술 스택

Frontend-----------------------------

HTML, CSS, JavaScript

스타일링: CSS

클라이언트 사이드 스크립트: JavaScript

-------------------------------Backend

JSON Server (로컬 개발 환경)

배포된 DB 서버 사용

기능 관련 기술---------------------------

Node.js: 로컬 환경에서 이미지 업로드 처리

Plant.id API: 식물 이미지 업로드 시, 자동으로 식물 종류 판별

Daum 주소 API: 회원가입 주소 검색 및 선택

## 📁 프로젝트 구조

```bash
JS-PROJECT/
│── asset/           # 정적 파일 (이미지, 아이콘 등)
│── Detail/          # 상세 페이지 관련 파일
│   ├── detail.html
│   ├── detail.js
│   ├── detail.css
│── Login/           # 로그인 관련 파일
│   ├── login.html
│   ├── login.js
│   ├── login.css
│── Member/          # 회원 관련 기능
│   ├── member.html
│   ├── member.js
│   ├── member.css
│── Update/          # 업데이트 관련 파일
│   ├── update.html
│   ├── update.js
│   ├── update.css
│── .gitignore       # Git에서 제외할 파일 설정
│── db.json          # JSON Server를 위한 가짜 데이터베이스
│── index.html       # 메인 페이지
│── main.js          # 주요 JavaScript 기능
│── package.json
│── README.md        # 프로젝트 문서
│── style.css        # 전체 스타일링
```

## 🔥 주요 기능

🔹 회원가입 및 로그인

사용자는 이름, 주소, 나이, 성별, 이메일, 비밀번호를 입력하여 회원가입 가능

로그인 후, 메인 페이지에서 본인의 식물 피드를 확인 가능

🔹 식물 등록

식물 별명 입력 (ex. "우리집 몬스테라")

식물 사진 업로드 (자동으로 식물 종류 판별 기능 제공)

Plant.id API를 활용하여 자동 식물 판별 기능 제공

식물 종류 직접 입력 가능

물 주기 간격 설정 (ex. 3일마다 물 주기)

간단한 설명 입력 (ex. "햇빛을 좋아하고 3~4일마다 물을 줘야 함.")

등록 후, 메인 페이지에서 내 피드에 식물 표시

🔹 식물 상세 페이지

등록한 식물 정보 확인 (사진, 이름, 종류, 등록 날짜)

물 주기 스케줄 관리

어제(-1일)부터 총 12일치 일정이 표시됨

물 주기 간격에 맞춰 물방울 아이콘 자동 표시

물을 준 날에는 클릭하면 회색으로 변경 (물 준 기록 저장)

식물 성장 히스토리 관리

새로운 사진 업로드하여 성장 과정 기록

📡 API 엔드포인트

🔹 회원가입 API

Endpoint: POST /api/members

Request Body:

```json
{
  "name": "홍길동",
  "age": 25,
  "gender": "male",
  "address": "제주시",
  "email": "gildong@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "id": "random_user_id",
  "name": "홍길동",
  "age": 25,
  "gender": "male",
  "address": "제주시",
  "email": "gildong@example.com",
  "update_day": "2025-03-08"
}
```

🔹 식물 등록 API

Endpoint: POST /api/plants

Request Body:

```json
{
  "plant_name": "몬스테라",
  "description": "강한 빛을 좋아하고 물은 3~4일마다 줘야 함.",
  "category": "Monstera",
  "member_id": "user-id",
  "plant_mainimg": "/asset/member_id_plant_id/member_id_main.jpg",
  "water_cycle": 3
}
```

Response:

```json
{
  "id": "random_plant_id",
  "plant_name": "몬스테라",
  "description": "강한 빛을 좋아하고 물은 3~4일마다 줘야 함.",
  "category": "Monstera",
  "member_id": "user-id",
  "plant_main_img": "/asset/member_id_plant_id/member_id_main.jpg",
  "water_cycle": 3,
  "history_img": [],
  "history_memo": []
}
```

## 🚀 향후 기능 개발 로드맵

✅ v1.0 (현재 버전)

회원가입 및 로그인

식물 등록 및 관리

물 주기 스케줄 기능

성장 히스토리 기록

Plant.id API를 활용한 자동 식물 판별

🚀 v1.1 (예정)

SNS 스타일의 댓글 및 좋아요 기능 추가

커뮤니티 페이지 구현 (사용자 간 식물 관리 팁 공유)

AI 기반 식물 건강 진단 기능 추가

## 🎯 MyPlants와 함께 나만의 반려 식물 기록을 시작하세요! 🌱✨

식물 관리가 더욱 편리해지고, 나만의 작은 정원을 온라인에서 가꿀 수 있습니다.

지금 바로 MyPlants에 가입하여 여러분의 식물을 체계적으로 관리해보세요! 🚀
