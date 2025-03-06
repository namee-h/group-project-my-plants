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

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // cors 라이브러리 추가
const fs = require('fs'); // 파일 시스템 모듈 추가

const app = express();
const port = 3001; // json-server와 다른 포트 사용

app.use(cors({
    origin: 'http://127.0.0.1:5500' // 허용할 출처를 명시합니다.
}));

// 이미지 저장 경로 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const folder = `./asset/${path.parse(file.originalname).name}-${year}-${month}-${day}/`; // 폴더명: 파일명 + 날짜

        // 폴더가 없으면 생성
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder); // 폴더 경로를 destination으로 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 파일명 유지
    }
});

const upload = multer({ storage: storage });

// 이미지 업로드 API
app.post('/upload', upload.single('plantImage'), (req, res) => {
    if (req.file) {
        const imageUrl = `/asset/${req.file.destination.split('./asset/')[1]}${req.file.filename}`; // 이미지 URL 생성
        res.json({ imageUrl: imageUrl }); // 이미지 URL 반환
    } else {
        res.status(400).json({ error: 'No file uploaded.' });
    }
});

app.use('/asset', express.static(path.join(__dirname, 'asset'))); // asset 폴더 정적 파일 제공

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});