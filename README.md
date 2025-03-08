## 🌿 MyPlants - Your Personal Plant Growth Diary

MyPlants is a web application designed for plant enthusiasts, helping users record and manage information about the plants they grow.

With features such as a watering schedule and visual growth tracking, users can systematically care for their plants.

Additionally, MyPlants utilizes Plant.id API to analyze uploaded plant photos and automatically identify plant species.

## 👥 Team Members

| Role     | Product Owner (PO) | Scrum Master (SM) | Developer  | Developer  | Developer |
| -------- | ------------------ | ----------------- | ---------- | ---------- | --------- |
| **Name** | Lee Doyoon         | Han Sara          | Kim Jongho | Kwon Iseul | Kim Daye  |

## 📌 Project Overview

🌱 MyPlants is a web application that enables users to efficiently manage their plants.

Users can register plant information, log growth history, and automatically manage watering schedules.

Additionally, the Plant.id API is integrated to analyze uploaded plant photos and automatically identify plant species.

## 🛠 Tech Stack

- Frontend

HTML, CSS, JavaScript

Styling: CSS

Client-side scripting: JavaScript

- Backend

JSON Server (Local Development)

Deployed Database Server

- Additional Features & APIs

Node.js: Handles image uploads in the local environment

Plant.id API: Identifies plant species from uploaded images

Daum Address API: Enables users to search and select addresses during registration

##📁 Project Structure

```bash
JS-PROJECT/
│── asset/           # Static files (images, icons, etc.)
│── Detail/          # Detail page-related files
│   ├── detail.html
│   ├── detail.js
│   ├── detail.css
│── Login/           # Login-related files
│   ├── login.html
│   ├── login.js
│   ├── login.css
│── Member/          # Member management-related files
│   ├── member.html
│   ├── member.js
│   ├── member.css
│── Update/          # Update-related files
│   ├── update.html
│   ├── update.js
│   ├── update.css
│── .gitignore       # Git ignore settings
│── db.json          # JSON Server mock database
│── index.html       # Main page
│── main.js          # Core JavaScript logic
│── package.json
│── README.md        # Project documentation
│── style.css        # Global styling
```

## 🔥 Key Features

🔹 User Registration & Login

Users can register with name, address, age, gender, email, and password

After logging in, users can view their personal plant feed on the main page

🔹 Plant Registration

Enter a plant nickname (e.g., "My Monstera")

Upload a plant image (automatically identifies the plant species)

Plant.id API integration for automatic plant identification

Manual plant species input option

Set watering intervals (e.g., "Water every 3 days")

Add a brief description (e.g., "Prefers sunlight, water every 3-4 days")

After registration, the plant appears in the user's personal feed

🔹 Plant Detail Page

View registered plant information (photo, name, species, registration date)

Manage watering schedule

Displays past 12 days of watering history, starting from yesterday (-1 day)

Automatically displays water droplet icons based on watering interval

Clicking a water droplet icon grays it out to mark the plant as watered

Track plant growth history

Upload new photos to log plant growth

## 📡 API Endpoints

🔹 User Registration API

Endpoint: POST /api/members

Request Body:

```json
{
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "address": "Seoul",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "id": "random_user_id",
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "address": "Seoul",
  "email": "johndoe@example.com",
  "update_day": "2025-03-08"
}
```

🔹 Plant Registration API

Endpoint: POST /api/plants

Request Body:

```json
{
  "plant_name": "Monstera",
  "description": "Prefers bright light, water every 3-4 days.",
  "category": "Monstera",
  "member_id": "user-id",
  "plant_mainimg": "/asset/member_id_plant_id/member_id_plant_id_main.jpg",
  "water_cycle": 3
}
```

Response:

```json
{
  "id": "random_plant_id",
  "plant_name": "Monstera",
  "description": "Prefers bright light, water every 3-4 days.",
  "category": "Monstera",
  "member_id": "user-id",
  "plant_main_img": "/asset/member_id_plant_id/member_id_plant_id_main.jpg",
  "water_cycle": 3,
  "history_img": [],
  "history_memo": []
}
```

## 🚀 Future Development Roadmap

✅ v1.0 (Current Version)

User Registration & Login

Plant Registration & Management

Watering Schedule Management

Growth History Logging

Plant.id API Integration for automatic plant identification

🚀 v1.1 (Upcoming Features)

Comments & Like Feature (Similar to social media interactions)

Community Page Implementation (Users can share plant care tips)

AI-based Plant Health Diagnosis Feature

✅ Next Steps

Copy & Paste the English README into your project

Review & Edit if any additional details are needed

Commit & Push to GitHub! 🚀

## 🎯 Start Your Personal Plant Growth Diary with MyPlants! 🌱✨

Managing plants has never been easier! Grow and track your personal garden online with MyPlants.

Sign up now and start managing your plants efficiently! 🚀

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
  "plant_mainimg": "/asset/member_id_plant_id/member_id_plant_id_main.jpg",
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
  "plant_main_img": "/asset/member_id_plant_id/member_id_plant_id_main.jpg",
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
