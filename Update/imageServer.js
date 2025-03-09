// // 서버 코드(server.js:이미지 업로드용 서버)
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors'); // cors 라이브러리 추가

// const app = express();
// const port = 3001; // json-server와 다른 포트 사용

// app.use(cors({
//     origin: 'http://127.0.0.1:5500' // 허용할 출처를 명시합니다.
//   }));

// // 이미지 저장 경로 설정
// const storage = multer.diskStorage({
//   destination: './asset/',
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // 파일명 유지
//   }
// });

// const upload = multer({ storage: storage });

// // 이미지 업로드 API
// app.post('/upload', upload.single('plantImage'), (req, res) => {
//   if (req.file) {
//     const imageUrl = `/asset/${req.file.originalname}`; // 이미지 URL 생성
//     res.json({ imageUrl: imageUrl }); // 이미지 URL 반환
//   } else {
//     res.status(400).json({ error: 'No file uploaded.' });
//   }
// });

// app.use('/asset', express.static(path.join(__dirname, 'asset'))); // asset 폴더 정적 파일 제공

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors'); // cors 라이브러리 추가
// const fs = require('fs'); // 파일 시스템 모듈 추가

// const app = express();
// const port = 3001; // json-server와 다른 포트 사용

// app.use(cors({
//     origin: 'http://127.0.0.1:5500' // 허용할 출처를 명시합니다.
// }));

// // 이미지 저장 경로 설정
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const folder = `./asset/${year}-${month}-${day}/`; // 날짜별 폴더 경로 생성

//         // 폴더가 없으면 생성
//         if (!fs.existsSync(folder)) {
//             fs.mkdirSync(folder, { recursive: true });
//         }

//         cb(null, folder); // 폴더 경로를 destination으로 설정
//     },
//     filename: function (req, file, cb) {
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const filename = `${path.parse(file.originalname).name}-${year}-${month}-${day}${path.extname(file.originalname)}`; // 파일명 + 날짜 + 확장자

//         cb(null, filename); // 파일명 설정
//     }
// });

// const upload = multer({ storage: storage });

// // 이미지 업로드 API
// app.post('/upload', upload.single('plantImage'), (req, res) => {
//     if (req.file) {
//         const imageUrl = `/asset/${req.file.destination.split('./asset/')[1]}${req.file.filename}`; // 이미지 URL 생성
//         res.json({ imageUrl: imageUrl }); // 이미지 URL 반환
//     } else {
//         res.status(400).json({ error: 'No file uploaded.' });
//     }
// });

// app.use('/asset', express.static(path.join(__dirname, 'asset'))); // asset 폴더 정적 파일 제공

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors'); // cors 라이브러리 추가
// const fs = require('fs'); // 파일 시스템 모듈 추가

// const app = express();
// const port = 3001; // json-server와 다른 포트 사용

// app.use(cors({
//     origin: 'http://127.0.0.1:5500' // 허용할 출처를 명시합니다.
// }));

// // 이미지 저장 경로 설정
// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const folder = `./asset/${path.parse(file.originalname).name}-${year}-${month}-${day}/`; // 폴더명: 파일명 + 날짜

//         // 폴더가 없으면 생성
//         if (!fs.existsSync(folder)) {
//             fs.mkdirSync(folder, { recursive: true });
//         }

//         cb(null, folder); // 폴더 경로를 destination으로 설정
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // 파일명 유지
//     }
// });

// const upload = multer({ storage: storage });

// // 이미지 업로드 API
// app.post('/upload', upload.single('plantImage'), (req, res) => {
//     if (req.file) {
//         const imageUrl = `/asset/${req.file.destination.split('./asset/')[1]}${req.file.filename}`; // 이미지 URL 생성
//         res.json({ imageUrl: imageUrl }); // 이미지 URL 반환
//     } else {
//         res.status(400).json({ error: 'No file uploaded.' });
//     }
// });

// app.use('/asset', express.static(path.join(__dirname, 'asset'))); // asset 폴더 정적 파일 제공

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// const port = 3001;

// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
// }));

// // 추가: req.body 파싱을 위한 미들웨어
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const memberId = req.body.memberId;
//         const plantId = req.body.plantId;

//         if (!memberId || !plantId) {
//             return cb(new Error("memberId 또는 plantId가 없습니다."));
//         }

//         const folder = `./asset/${memberId}_${plantId}/`;

//         if (!fs.existsSync(folder)) {
//             fs.mkdirSync(folder, { recursive: true });
//         }

//         cb(null, folder);
//     },
//     filename: function (req, file, cb) {
//         const memberId = req.body.memberId;
//         const plantId = req.body.plantId;
//         const ext = path.extname(file.originalname); // 파일 확장자 추출
//         cb(null, `${memberId}_${plantId}_main${ext}`);
//     }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('plantImage'), (req, res) => {
//     console.log('req.body:', req.body); // 추가
//     if (req.file) {
//         const imageUrl = `/asset/${req.file.destination.split('./asset/')[1]}${req.file.filename}`;
//         res.json({ imageUrl: imageUrl });
//     } else {
//         res.status(400).json({ error: 'No file uploaded.' });
//     }
// });

// app.use('/asset', express.static(path.join(__dirname, 'asset')));

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('plantImage'), (req, res) => {
//     console.log('req.body:', req.body);
//     console.log('req.file:', req.file);

//     const memberId = req.body.memberId;
//     const plantId = req.body.plantId;

//     if (!memberId || !plantId) {
//         return res.status(400).json({ error: "memberId 또는 plantId가 없습니다." });
//     }

//     const folder = `./asset/${memberId}_${plantId}/`;
//     if (!fs.existsSync(folder)) {
//         fs.mkdirSync(folder, { recursive: true });
//     }

//     const ext = path.extname(req.file.originalname);
//     const filePath = `${folder}${memberId}_${plantId}_main${ext}`;

//     fs.writeFile(filePath, req.file.buffer, (err) => {
//         if (err) {
//             return res.status(500).json({ error: "파일 저장 중 오류 발생" });
//         }

//         const imageUrl = `/asset/${memberId}_${plantId}/${memberId}_${plantId}_main${ext}`;
//         res.json({ imageUrl: imageUrl });
//     });
// });
require("dotenv").config();

// 이제 process.env.GITHUB_API_URL, process.env.GITHUB_TOKEN 등 사용 가능
console.log("GITHUB_API_URL:", process.env.GITHUB_API_URL);
console.log("GITHUB_TOKEN:", process.env.GITHUB_TOKEN);

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const fs = require("fs");

// const app = express();
// const port = 3005;

// // app.use(cors({
// //     origin: 'http://127.0.0.1:5501'
// // }));
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// // app.use(cors());  // 모든 출처에서의 요청을 허용

// // 🔹 JSON 및 URL-encoded 데이터 파싱 추가
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const upload = multer({ dest: "temp/" }); // 일단 임시 폴더에 저장

// app.post("/upload", upload.single("plantImage"), (req, res) => {
//   console.log("req.body:", req.body); // 🔹 데이터 확인
//   console.log("req.file:", req.file); // 🔹 파일 정보 확인

//   const memberId = req.body.memberId;
//   const plantId = req.body.plantId;
//   const page = req.body.page;
//   const imagePath = req.body.imgPath;

//   if (!memberId) {
//     return res.status(400).json({ error: "memberId가 없습니다." });
//   }

//   if (!plantId) {
//     return res.status(400).json({ error: "plantId가 없습니다." });
//   }

//   // 🔹 새로운 저장 폴더 생성
//   const folder = `./asset/${memberId}_${plantId}/`;
//   if (!fs.existsSync(folder) && page === "update") {
//     fs.mkdirSync(folder, { recursive: true });
//   }

//   // 🔹 원본 파일 확장자 유지
//   // const ext = path.extname(req.file.originalname);
//   // const newPath = `${folder}${memberId}_${plantId}_main${ext}`;

//   // 🔹 파일 이동 (임시 저장된 파일 → 지정 폴더)

//   fs.rename(req.file.path, imagePath, (err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ error: `파일 이동 중 오류 발생 ${imagePath}` });
//     }
//     // const imageUrl = `/asset/${memberId}_${plantId}/${memberId}_${plantId}_main${ext}`;
//     const imageUrl = imagePath;
//     res.json({ imageUrl: imageUrl });
//   });
// });

// app.use("/asset", express.static(path.join(__dirname, "asset")));

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
