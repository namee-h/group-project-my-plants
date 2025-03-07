// document.addEventListener("DOMContentLoaded", () => {
//     const plantTypeSelect = document.getElementById("plantType");

//     // API 키 (data.go.kr에서 발급받은 키 입력)
//     const API_KEY = "2cL4%2Fj22bZFylrcWybU6Wt4BZ8ROoGlC4zCK9S%2F15maNTZNSkviTz7V56wkkqJSejMjr8hfhWhHRyeVlj7wXFg%3D%3D";
//     const API_URL = `http://openapi.nature.go.kr/openapi/service/rest/PlantService/plntIlstrSearch?serviceKey=${API_KEY}&numOfRows=10&pageNo=1`;
//     const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

//     //  XML을 가져와서 select 옵션으로 추가하는 함수
//     async function fetchPlantTypes() {
//         try {
//             const response = await fetch(CORS_PROXY + API_URL)
//                                     .then(response => response.text())
//                                     .then(data => console.log(data))
//                                     .catch(error => console.error("Error:", error));
//             const xmlString = await response.text();; // 여기에 XML 데이터 입력

//             // XML 파싱
//             const parser = new DOMParser();
//             const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            
//             // 식물 목록 가져오기
//             const items = xmlDoc.getElementsByTagName("item");
//             console.log("items:",items)
//             // 결과 저장할 배열
//             const plants = [];
            
//             for (let i = 0; i < items.length; i++) {
//                 const plant = {
//                     plantName: items[i].getElementsByTagName("plantGnrlNm")[0].textContent, // 식물 이름
//                     familyKor: items[i].getElementsByTagName("familyKorNm")[0].textContent, // 과(科)
//                     genusKor: items[i].getElementsByTagName("genusKorNm")[0].textContent, // 속(屬)
//                     scientificName: items[i].getElementsByTagName("plantSpecsScnm")[0].textContent, // 학명
//                     imgUrl: items[i].getElementsByTagName("imgUrl")[0].textContent, // 이미지 URL
//                 };
//                 plants.push(plant);
//             }
            
//             // 출력 테스트
//             console.log(plants);
//         } catch (error) {
//             console.error(" API 호출 오류:", error);
//         }
//     }

//     // 함수 호출
//     fetchPlantTypes();
// });

// //  폼 제출 이벤트 리스너
// document.getElementById('plantForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // 폼 기본 제출 방지

//     const startDate = document.getElementById('plantStartDate').value;
//     const selectedPlant = document.getElementById('plantType').value;

//     console.log(" 선택한 식물:", selectedPlant);
//     console.log(" 식물 등록 날짜:", startDate);
// });

// // 메타데이터 파일 경로
// const metadataPath = 'plantnet300K_metadata.json';
// const speciesPath = 'plantnet300K_species_id_2_name.json';

// // 이미지 데이터 경로
// const imageRoot = 'path/to/plantnet300K/images/'; // 실제 이미지 경로로 수정

// // 메타데이터 로드
// Promise.all([fetch(metadataPath), fetch(speciesPath)])
//   .then((responses) => Promise.all(responses.map((res) => res.json())))
//   .then(([metadata, species]) => {
//     // 이미지 정보 추출
//     for (const imageId in metadata) {
//       const imageInfo = metadata[imageId];
//       const speciesId = imageInfo.species_id;
//       const speciesName = species[speciesId];
//       const imageFilename = `${imageId}.jpg`;
//       const imagePath = imageRoot + imageFilename;

//       // 이미지 로드 및 활용
//       const img = new Image();
//       img.onload = () => {
//         console.log(`Image ID: ${imageId}, Species: ${speciesName}`);
//         // 이미지 활용 (예: 표시)
//         document.body.appendChild(img);
//       };
//       img.onerror = () => {
//         console.log(`Image not found: ${imagePath}`);
//       };
//       img.src = imagePath;
//     }
//   })
//   .catch((error) => console.error('Error loading data:', error));

// Trefle API 이용하여 fetch
// // const apiKey = "g5riRcq5JDjWlHCMEXffSADFbTjZixLYxf38oWbtYw8"; // 🔹 Trefle API 키
// const apiUrl = `https://trefle.io/api/v1/species?token=${apiKey}`;
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// // const proxyUrl = 'https://api.allorigins.win/raw?url='; // 다른 프록시 서버

// async function fetchPlantTypes() {
//     try {
//         // const response = await fetch(proxyUrl + apiUrl);
//         // const data = await response.json();

//         // console.log("data :",data)
//         // if (data && data.data) {
//         //     populatePlantCategoryDropdown(data.data); // 🔹 드롭다운에 식물 종류 추가
//         // } else {
//         //     console.error("식물 종류를 불러오는 데 실패했습니다.");
//         // }

//         let combinedData = []; // 두 페이지 데이터를 합칠 배열
        
//         for (let page = 1; page <= 2; page++) {
//             const response = await fetch(proxyUrl + apiUrl + `&page=${page}`);
//             const data = await response.json();
//             if (data && data.data) {
//                 combinedData = combinedData.concat(data.data); // 각 페이지의 데이터를 결합
//             } else {
//                 console.error(`${page} 페이지의 데이터를 불러오는 데 실패했습니다.`);
//             }
//         }

//         console.log("data :",combinedData)
//         // 데이터가 모두 합쳐졌으면 드롭다운에 추가
//         if (combinedData.length > 0) {
//             populatePlantTypeDropdown(combinedData);
//         } else {
//             console.error("식물 종류를 불러오는 데 실패했습니다.");
//         }

//     } catch (error) {
//         console.error("API 요청 중 오류 발생:", error);
//     }
// }

// function populatePlantTypeDropdown(plants) {
//     const plantCategorySelect = document.getElementById("plantCategory");

//     // 기존 옵션 내용 초기화
//     plantCategorySelect.innerHTML = `<option value="">식물 종류를 선택하세요</option>`;

//     plants.forEach(plant => {
//         const option = document.createElement("option");
//         option.value = plant.slug; // 식물의 슬러그값을 value로 설정
//         option.textContent = plant.common_name || plant.scientific_name; // 공통 이름 또는 학명
//         plantCategorySelect.appendChild(option); // 드롭다운에 추가
//     });
// }

// plant.id API 이용하여 fetch
const apiKey = "LwhsR0lRF7zLcrajlJp4UIGKcmx76jt1YXC3iUTwKCUkJiyshZ";
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
        plantItem.textContent = plant.matched_in || "이름 없음"; // ✅ `matched_in` 값 표시

        plantItem.classList.add("search-item");

        plantItem.addEventListener("click", () => {
            document.getElementById("selectedPlant").value = plantItem.textContent;
            resultsContainer.innerHTML = "";
        });

        resultsContainer.appendChild(plantItem);
    });
}

// document.addEventListener("DOMContentLoaded", () => {
//     const plantNameInput = document.getElementById("plantName");
//     const plantNameError = document.getElementById("plantNameError");
//     const plantDescriptionInput = document.getElementById("plantDescription");
//     const plantDescriptionError = document.getElementById("plantDescriptionError");
//     const plantForm = document.getElementById("plantForm");

//     // 식물 이름 예외 처리
//     plantNameInput.addEventListener("input", () => {
//         const plantName = plantNameInput.value.trim();

//         if (plantName.length > 10) {
//             plantNameError.textContent = "10자 이내로 입력해주세요.";
//             return;
//         }

//         const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//         if (specialChars.test(plantName)) {
//             plantNameError.textContent = "특수문자는 사용할 수 없습니다.";
//             return;
//         }

//         plantNameError.textContent = "";
//     });

//     // 식물 정보 입력 예외 처리 (수정된 부분)
//     plantDescriptionInput.addEventListener("input", () => {
//         const plantDescription = plantDescriptionInput.value;

//         if (plantDescription.length > 100) {
//             plantDescriptionError.textContent = "100자 이내로 입력해주세요.";
//         } else {
//             plantDescriptionError.textContent = "";
//         }
//     });

//     plantForm.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         const plantName = plantNameInput.value.trim();
//         if (!plantName) {
//             alert("식물 이름을 입력해주세요.");
//             return;
//         }

//         if (plantName.length > 10) {
//             alert("식물 이름을 10자 이내로 입력해주세요.");
//             return;
//         }

//         const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//         if (specialChars.test(plantName)) {
//             alert("특수문자는 사용할 수 없습니다.");
//             return;
//         }

//         const plantDescriptionValue = plantDescriptionInput.value;
//         if (plantDescriptionValue.length > 100) {
//             alert("식물 정보는 100자 이내로 입력해주세요.");
//             return;
//         }

//         const plantCategory = document.getElementById("selectedPlant").value;
//         const wateringStartDate = document.getElementById("wateringStartDate").value;
//         const wateringInterval = document.getElementById("wateringInterval").value;
//         const plantDescription = document.getElementById("plantDescription").value;
//         const plantImage = document.getElementById("plantImage").files[0];

//         console.log("파일 객체:", plantImage);
//         const formData = new FormData();
//         // formData.append("plantImage", plantImage);


//         // 이미지 파일 추가
//         if (plantImage) {
//             formData.append("plantImage", plantImage);
//         }

//         // 나머지 필드 값 추가
//         formData.append("plants_name", plantName);
//         formData.append("description", plantDescription);
//         formData.append("category", plantCategory);
//         formData.append("member_id", 1); // 예제에서는 1, 실제로는 동적으로 가져와야 함
//         formData.append("update_day", new Date().toISOString());
//         formData.append("etc", null);

//         console.log("FormData 확인:");
//         for (const pair of formData.entries()) {
//             console.log(pair[0], pair[1]);
//         }

//         try {
//             // 이미지 업로드
//             const uploadResponse = await fetch("http://localhost:3001/upload", {
//                 method: "POST",
//                 body: formData
//             });

//             if (!uploadResponse.ok) {
//                 throw new Error("이미지 업로드 실패");
//             }

//             const uploadResult = await uploadResponse.json();
//             const imageUrl = uploadResult.imageUrl;

//             // plants 데이터 저장
//             const plantData = {
//                 plants_name: plantName,
//                 description: plantDescription,
//                 category: plantCategory,
//                 member_id: 1,
//                 update_day: new Date().toISOString(),
//                 etc: null
//             };

//             const plantResponse = await fetch("http://localhost:3000/plants", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(plantData)
//             });

//             if (!plantResponse.ok) {
//                 throw new Error("식물 정보 저장 실패");
//             }

//             // plants 데이터 저장 후 id 값 가져오기
//             const plantResult = await plantResponse.json();
//             const plantId = plantResult.id;

//             // memberId 가져오기
//             const memberId = 1; // 예시: 실제 구현에서는 동적으로 가져와야 함(페이지에 있는 유저 id)

//             // FormData에 memberId와 plantId 추가
//             formData.append("memberId", memberId);
//             formData.append("plantId", plantId);

//             // img 데이터 저장
//             const imgData = {
//                 plant_main_img: imageUrl,
//                 plant_history: [],
//                 plants_id: plantId,
//                 etc: null,
//                 update_day: new Date().toISOString()
//             };

//             const imgResponse = await fetch("http://localhost:3000/images", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(imgData)
//             });

//             if (!imgResponse.ok) {
//                 throw new Error("이미지 정보 저장 실패");
//             }

//             // water 데이터 저장
//             const waterData = {
//                 water_cycle: wateringInterval,
//                 water_start_day: wateringStartDate,
//                 water_check: false,
//                 water_memo: [],
//                 plants_id: plantId,
//                 etc: null,
//                 update_day: new Date().toISOString()
//             };

//             const waterResponse = await fetch("http://localhost:3000/water", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(waterData)
//             });

//             if (!waterResponse.ok) {
//                 throw new Error("물주기 정보 저장 실패");
//             }

//             alert("데이터가 성공적으로 저장되었습니다.");

//         } catch (error) {
//             console.error("오류 발생:", error);
//             alert(`오류가 발생했습니다: ${error.message}`);
//         }
//     });
// });

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
        }, plantImage);


        try {
            const plantId = await savePlantData(preparePlantData(plantName, plantDescription, plantCategory));
            
            // plantId 생성 후 formData에 추가
            formData.append("plantId", plantId);
            const imageUrl = await uploadImage(formData);

            await saveImageData(prepareImageData(imageUrl, plantId));
            await saveWaterData(prepareWaterData(wateringInterval, plantId));
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

function preparePlantData(plantName, plantDescription, plantCategory) { //plants 데이터 객체 생성 로직
    return {
        plants_name: plantName,
        description: plantDescription,
        category: plantCategory,
        member_id: 1, // 예시: 실제로는 동적으로 가져와야 함
        update_day: new Date().toISOString(),
        etc: null
    };
}

function prepareImageData(imageUrl, plantId) { //images 데이터 객체 생성 로직
    return {
        plant_main_img: imageUrl,
        plant_history: [],
        plants_id: plantId,
        etc: null,
        update_day: new Date().toISOString()
    };
}

function prepareWaterData(wateringInterval, plantId) { //water 데이터 객체 생성 로직
    return {
        water_cycle: wateringInterval,
        water_start_day: null,
        water_check: false,
        water_memo: [],
        plants_id: plantId,
        etc: null,
        update_day: new Date().toISOString()
    };
}

// API 호출 함수
async function uploadImage(formData) {
    const response = await callApi("http://localhost:3001/upload", {
        method: "POST",
        body: formData
    }, "이미지 업로드 실패");

    const uploadResult = await response.json();
    return uploadResult.imageUrl;
}

async function savePlantData(plantData) {
    const response = await callApi("http://localhost:3000/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantData)
    }, "식물 정보 저장 실패");

    const plantResult = await response.json();
    return plantResult.id;
}

async function saveImageData(imgData) {
    await callApi("http://localhost:3000/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imgData)
    }, "이미지 정보 저장 실패");
}

async function saveWaterData(waterData) {
    await callApi("http://localhost:3000/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waterData)
    }, "물주기 정보 저장 실패");
}

async function callApi(url, options, errorMessage) {
    try {
        const response = await fetch(url, options);
        console.log("API 응답:", response); // 응답 객체 출력
        if (!response.ok) {
            const errorText = await response.text();
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
    alert(`오류가 발생했습니다: ${error.message}`);
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