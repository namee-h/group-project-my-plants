
// plant.id API 이용하여 fetch
// const apiKey = "LwhsR0lRF7zLcrajlJp4UIGKcmx76jt1YXC3iUTwKCUkJiyshZ";
// const apiKey = "Ca3PIS48HHlrC8cdCaXxv9UhITquuINY6HpgREw6gsWyRpFM2L";
const apiKey = "DXdKpnlTkQmRIXEcb1KNKI5EYNOKEOMyAH8x5rdulD21KJ5ou2";
const apiUrl = "https://plant.id/api/v3/kb/plants/name_search?q=";

document.getElementById("plantSearch").addEventListener("input", async function () {
    const query = this.value.trim();
    if (query.length < 2) return;

    try {
        const response = await fetch(apiUrl + encodeURIComponent(query), {
            method: "GET",
            headers: {
                "Api-Key": apiKey,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log("API 응답 데이터:", data); // 📌 응답 데이터 확인

        if (data.entities && Array.isArray(data.entities)) {
            displaySearchResults(data.entities); // 🔹 entities 배열 사용
        } else {
            displaySearchResults([]); // 검색 결과 없음
        }
    } catch (error) {
        console.error("식물 검색 오류:", error);
    }
});

function displaySearchResults(results) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
        return;
    }

    results.forEach((plant) => {
        const plantItem = document.createElement("div");
        plantItem.textContent = plant.matched_in || "이름 없음"; // ✅ matched_in 값 표시

        plantItem.classList.add("search-item");

        plantItem.addEventListener("click", () => {
            document.getElementById("selectedPlant").value = plantItem.textContent;
            resultsContainer.innerHTML = "";
        });

        resultsContainer.appendChild(plantItem);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const plantForm = document.getElementById("plantForm");

    plantForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const plantName = document.getElementById("plantName").value.trim();
        const plantDescription = document.getElementById("plantDescription").value;
        const plantCategory = document.getElementById("selectedPlant").value;
        const wateringInterval = document.getElementById("wateringInterval").value;
        const plantImage = document.getElementById("plantImage").files[0];
        let member_id = 1;

        if (!validatePlantName(plantName) || !validatePlantDescription(plantDescription)) {
            return;
        }

        const formData = prepareFormData({
            plants_name: plantName,
            description: plantDescription,
            category: plantCategory,
            memberId: member_id,
            update_day: new Date().toISOString(),
            etc: null,
            water_cycle:wateringInterval,
            history_img:[],
            history_memo :[],
        }, plantImage);

        try {
            // 먼저 preparePlantData로 plantData 생성
            const plantData = preparePlantData(plantName, plantDescription, plantCategory, wateringInterval);
            console.log("plantData id생성 전:",plantData);  
            
            // savePlantData로 plantId 생성
            const plantId = await savePlantData(plantData);
            console.log("plantId:",plantId);  // plantData의 값을 로그로 출력해 보세요.
            
            // plantId 생성 후 formData에 추가
            formData.append("plantId", plantId);
            console.log("plantData id생성 후:",plantData);
            console.log("plantData의 키들(id생성 후):", Object.keys(plantData));

            // plantData에 id 추가
            plantData.id = plantId;
            console.log("id 추가 후 plantData:", plantData);
        
            // imageUrl 업로드 후, plant_main_img에 imageUrl을 추가
            const imageUrl = await uploadImage(formData);
            console.log("imageUrl:", imageUrl);
            plantData.plant_main_img = imageUrl;  // imageUrl을 plant_main_img에 넣음
            console.log("이미지 URL:", plantData.plant_main_img);
            console.log("imageUrl넣은 후 plantData:", plantData);
            
            // 이제, plantData를 다시 updatePlantData로 업데이트 (혹은 다른 필요한 작업)
            console.log("plantData.plantId(updatePlantData()전):", plantData.plantId)
            console.log("plantData의 키들(updatePlantData()전):", Object.keys(plantData));
            await updatePlantData(plantData);  
        
            handleSuccess();
        } catch (error) {
            handleError(error);
        }

        console.log("FormData 확인:");
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

    });
});

// 유효성 검사 함수
function validatePlantName(plantName) { //식물 이름 유효성 검사
    if (!plantName) {
        alert("식물 이름을 입력해주세요.");
        return false;
    }

    if (plantName.length > 10) {
        alert("식물 이름을 10자 이내로 입력해주세요.");
        return false;
    }

    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialChars.test(plantName)) {
        alert("특수문자는 사용할 수 없습니다.");
        return false;
    }

    return true; // 모든 유효성 검사를 통과한 경우 true 반환
}

function validatePlantDescription(plantDescription) { //식물 정보 유효성 검사
    if (plantDescription.length > 100) {
        alert("식물 정보는 100자 이내로 입력해주세요.");
        return false;
    }

    return true; // 모든 유효성 검사를 통과한 경우 true 반환
}

// 데이터 준비 함수
function prepareFormData(plantData, plantImage) {
    const formData = new FormData();
    if (plantImage) {
        formData.append("plantImage", plantImage);
    }
    for (const key in plantData) {
        formData.append(key, plantData[key]);
    }
    return formData;
}

function preparePlantData(plantName, plantDescription, plantCategory,wateringInterval) { //plants 데이터 객체 생성 로직
    return {
        plants_name: plantName,
        description: plantDescription,
        category: plantCategory,
        member_id: 1, // 예시: 실제로는 동적으로 가져와야 함
        update_day: new Date().toISOString(),
        etc: null,
        water_cycle:wateringInterval,
        history_img:[],
        history_memo :[],
    };
}

// API 호출 함수
async function uploadImage(formData) {
    const response = await callApi("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
    }, "이미지 업로드 실패");

    const uploadResult = await response.json();
    return uploadResult.imageUrl;
}

async function savePlantData(plantData) {
    const response = await callApi("https://silk-scandalous-boa.glitch.me/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantData)
        // mode: 'no-cors'  // CORS 오류를 피하기 위한 설정
    }, "식물 정보 저장 실패");

    const plantResult = await response.json();
    console.log("API 응답(plantResult):", plantResult);  // API 응답 로그 추가
    return plantResult.id;
}

async function updatePlantData(plantData) {
    console.log("plantData.id(in updatePlantData):", plantData.id);
    console.log("plantData.plant_main_img(in updatePlantData):", plantData.plant_main_img);

    try {
         // 'id' 제외한 데이터만 보내기
         const { id, ...updateData } = plantData; // 'id'는 제외하고 나머지 데이터만 보냄
         console.log("updateData:", updateData)
         console.log("updateData의 키들:", Object.keys(updateData));
        // PUT 요청을 사용하여 전체 업데이트
        const response = await fetch(`https://silk-scandalous-boa.glitch.me/plants/${plantData.id}`, {
            method: "PUT",  // 전체 식물 정보 업데이트
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });
        console.log("updatePlantData response:",response)
        // 응답 처리
        if (!response.ok) {
            const errorText = await response.text();
            console.log("에러 코드:", response.status);  // 응답 코드 확인
            console.log("에러 메시지:", errorText);  // 응답 내용 확인
            throw new Error(`식물 정보 업데이트 실패: ${response.status}, ${errorText}`);
        }

        // 응답을 JSON으로 파싱
        const plantResult = await response.json();
        console.log("업데이트된 plantData:", plantResult);

        return plantResult;
    } catch (error) {
        console.error("업데이트 실패:", error);
        throw error;  // 오류가 발생하면 에러를 던져서 호출한 곳에서 처리할 수 있도록 함
    }
}

async function callApi(url, options, errorMessage) {
    try {
        console.log("callApi url:", url)
        const response = await fetch(url, options);
        console.log("API 응답:", response); // 응답 객체 출력
        if (!response.ok) {
            const errorText = await response.text();
            console.log("에러 코드:", response.status);  // 응답 코드 확인
            console.log("에러 메시지:", errorText);  // 응답 내용 확인
            throw new Error(`${errorMessage}: ${response.status}, ${errorText}`);
        }
        return response;
    } catch (error) {
        console.error(errorMessage + " 오류:", error);
        throw error;
    }
}

// 결과 처리 함수
function handleSuccess() {
    alert("데이터가 성공적으로 저장되었습니다.");
}

function handleError(error) {
    console.error("오류 발생:", error);

    // error.message와 error.stack을 함께 출력
    const errorDetails = error.stack ? `${error.message}\n\n${error.stack}` : error.message;

    alert(`오류가 발생했습니다: ${errorDetails}`);
}

// 이미지 식별하는 함수
document.getElementById("plantImage").addEventListener("change", async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // "이미지 인식" 라디오 버튼이 선택된 경우에만 실행
    if (!document.getElementById("methodImage").checked) {
        console.log("이미지 인식 모드가 활성화되지 않음.");
        return;
    }

    const formData = new FormData();
    formData.append("images", file);

    try {
        const response = await fetch("https://api.plant.id/v2/identify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Api-Key": apiKey  // 자신의 plant.id API 키 입력
            },
            body: JSON.stringify({
                images: [await toBase64(file)],
                organs: ["leaf", "flower"], // 분석할 식물 부위
            })
        });

        const data = await response.json();
        console.log("식물 분석 결과:", data);
        
        if (data.suggestions && data.suggestions.length > 0) {
            const plantName = data.suggestions[0].plant_name;
            document.getElementById("selectedPlant").value = plantName;
            document.getElementById("imageResult").textContent = `분석 결과: ${plantName}`;
        } else {
            document.getElementById("imageResult").textContent = "식물을 식별할 수 없습니다.";
        }

    } catch (error) {
        console.error("식물 정보 가져오기 실패:", error);
    }
});

// 파일을 Base64로 변환하는 함수
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = error => reject(error);
    });
}

// 라디오 버튼에 따라 보이는 식물 종류 입력 방식
document.querySelectorAll('input[name="plantMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // 각 라디오 버튼에 맞는 동작
        if (document.getElementById("methodImage").checked) {
            document.getElementById("searchInput").style.display = "none";
            document.getElementById("manualInput").style.display = "none";
        } else if (document.getElementById("methodSearch").checked) {
            document.getElementById("searchInput").style.display = "block";
            document.getElementById("manualInput").style.display = "none";
        } else if (document.getElementById("methodManual").checked) {
            document.getElementById("searchInput").style.display = "none";
            document.getElementById("manualInput").style.display = "block";
        }
    });
});

// 초기 상태에서 methodImage 선택 시 숨기기
if (document.getElementById("methodImage").checked) {
    document.getElementById("searchInput").style.display = "none";
    document.getElementById("manualInput").style.display = "none";
}

// 라디오 버튼이 변경될 때 선택된 식물 초기화
document.querySelectorAll('input[name="plantMethod"]').forEach(radio => {
    radio.addEventListener("change", function() {
        document.getElementById("selectedPlant").value = ""; // 선택된 식물 종류 초기화
    });
});

// "확인" 버튼 클릭 시 선택된 식물 종류로 설정
document.getElementById("manualConfirm").addEventListener("click", function() {
    const manualInput = document.getElementById("manualPlant").value.trim(); // 공백 제거한 값 가져오기
    if (manualInput) {
        document.getElementById("selectedPlant").value = manualInput; // 선택된 식물 종류로 설정
        document.getElementById("manualPlant").value = ""; // 입력창 초기화
    } else {
        alert("식물 이름을 입력하세요."); // 빈 값 입력 방지
    }
});

// 페이지 이동 함수
function goHome() {
    window.location.href = "../index.html";
}

// 물주기 숫자만 입력되게 하는 function
function validateNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '');  // 숫자만 허용
}