const GITHUB_ACCESS_TOKEN = "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"; // 🔹 본인의 GitHub Personal Access Token 입력
const GITHUB_API_URL = "https://api.github.com/gists";

// 📌 이미지 파일을 Base64로 변환하는 함수
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Base64 부분만 추출
        reader.onerror = error => reject(error);
    });
}

// 📌 GitHub Gist에 Base64로 이미지 업로드
async function uploadToGist(file) {
    try {
        const base64Image = await toBase64(file);
        const filename = `${Date.now()}_image.txt`; // 🔹 고유한 파일 이름 설정

        const gistData = {
            description: "Plant image uploaded via API",
            public: false, // 🔹 Gist를 비공개로 설정
            files: {
                [filename]: {
                    content: base64Image
                }
            }
        };

        const response = await fetch(GITHUB_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `token ${GITHUB_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gistData)
        });

        if (!response.ok) {
            throw new Error(`GitHub Gist 업로드 실패: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Gist 업로드 성공:", result);

        // 📌 Gist에서 Base64 데이터 가져오기
        const rawUrl = result.files[filename].raw_url;
        const base64Data = await fetch(rawUrl).then(res => res.text());

        // 📌 `<img>` 태그에서 사용할 수 있도록 변환
        return `data:image/png;base64,${base64Data}`;
    } catch (error) {
        console.error("❌ Gist 업로드 오류:", error);
        return null;
    }
}

// 📌 이미지 업로드 이벤트 리스너
document.getElementById("plantImage").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    console.log("📸 이미지 업로드 중...");
    
    const imageUrl = await uploadToGist(file);
    
    if (imageUrl) {
        console.log("🌿 업로드된 이미지 URL:", imageUrl);
        document.getElementById("previewImage").src = imageUrl;
        document.getElementById("previewImage").style.display = "block";
    } else {
        alert("이미지 업로드에 실패했습니다.");
    }
});
