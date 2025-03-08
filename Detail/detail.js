const windowUrl = new URL(window.location.href);
const plantId =  windowUrl.search.replace("?", "");
const API_URL = `https://silk-scandalous-boa.glitch.me`;
let historyImgData = [];

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById("preview").src = "";
  }
}

// 🚨 1. DB에서 식물정보 뿌려주는 로직 : 첫번째 식물 가져오기 -> 선택한 식물의 id값(주소 파라미터)에 따라서 가져오도록 변경필요
document.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_URL}/plants`)
    .then((response) => response.json())
    .then((plants) => {
      if (plants.length > 0) {
        loadPlantData(plantId);
      } else {
        alert("식물 데이터가 없습니다.");
        window.location.href = "index.html";
      }
    });
});

//식물 정보 가져오기
const loadPlantData = async (plantId) => {
  await fetch(`${API_URL}/plants`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("ddd", data);

      // 첫 번째 식물 정보 가져오기
      const plantData = data.find((p) => p.id == plantId);

      if (!plantData) {
        console.error(`no data (plantId: ${plantId})`);
        return;
      }

      // html에 뿌려주기
      document.getElementById("plants-name").textContent = plantData.plants_name ? plantData.plants_name : "이름 없음";
      document.getElementById("plants-type").textContent = plantData.category ? plantData.category : "카테고리 없음";
      document.getElementById("plants-date").textContent = plantData.update_day ? plantData.update_day : "날짜 없음";
      document.getElementById("detail-img-main").src = plantData.plant_main_img ? plantData.plant_main_img : "/asset/detail/detail-sample-img.png";
    })
    .catch((error) => console.error("error", error));
};

// 식물 정보 수정 및 저장
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const targetId = event.currentTarget.dataset.target;
    const targetElement = document.getElementById(targetId);

    // 눌렀을때 수정가능하게
    targetElement.contentEditable = "true";
    targetElement.focus();
    // targetElement.style.border = "1px solid #4CAF50";
    targetElement.style.borderRadius = "10px";

    // 🚨 3. 수정할때 뭔가 ID랑 매핑이 안되고있는 거 같음
    targetElement.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        savePlantData(targetId, targetElement.textContent);
      }
    });

    targetElement.addEventListener("blur", () => {
      savePlantData(targetId, targetElement.textContent);
    });
    loadPlantData(plantId);
  });
});

// 🚨 2. DB에 저장하는 함수
function savePlantData(field, value) {
  let fieldName = "";
  if (field === "plants-name") fieldName = "plants_name";
  if (field === "plants-type") fieldName = "category";
  if (field === "plants-date") fieldName = "update_day";
  
  // 🚨 여기 다시봐야됨 근데 수정-저장은 잘되고 있음
  fetch(`${API_URL}/plants/${plantId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [fieldName]: value }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`✅ ${fieldName} 저장 완료:`, data);
      document.getElementById(field).contentEditable = "false";
      document.getElementById(field).style.border = "none";

      // 저장 후 다시 불러오기
      loadPlantData(plantId);
    })
    .catch((error) => console.error);
}

// 물 주기 섹션
document.addEventListener("DOMContentLoaded", () => {
  const waterScheduleContainer = document.querySelector(".water-schedule");
  const selectElement = document.getElementById("floatingSelect");

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  // 물 주기 데이터를 가져오는 함수
  const fetchWaterCycle = async () => {
    try {
      const response = await fetch(`${API_URL}/plants/${plantId}`);
      const data = await response.json();
      console.log("waterddd", data);
      return parseInt(data.water_cycle, 10); // water_cycle 값을 숫자로 변환
    } catch (error) {
      console.error("물 주기 데이터를 가져오는 데 실패했습니다:", error);
      return 1; // 기본값으로 1 (매일) 반환
    }
  };
  // 물 주기 데이터를 업데이트하는 함수
  const updateWaterCycle = async (newCycle) => {
    try {
      const response = await fetch(`${API_URL}/plants/${plantId}`, {
        // 1은 water 데이터ID 실제 ID에 맞게 조정해야함
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ water_cycle: newCycle }),
      });
      const data = await response.json();
      console.log("Updated water cycle data:", data);
      return data;
    } catch (error) {
      console.error("물 주기 데이터 업데이트에 실패했습니다:", error);
    }
  };

  const generateWaterSchedule = (interval) => {
    // 기존 내용 초기화
    waterScheduleContainer.innerHTML = "";

    const today = new Date();

    // 11일 범위 날짜 계산
    for (let i = -1; i <= 10; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const day = currentDate.getDate();
      const weekdayIndex = currentDate.getDay();
      const weekdayName = weekdays[weekdayIndex];

      // 날짜 요일 물방울 이미지 들어갈 보드 추가
      const waterInfoDiv = document.createElement("div");
      waterInfoDiv.classList.add(
        "col-lg-2",
        "col-md-2",
        "col-sm-3",
        "col-4",
        "mb-1",
        "detail-water-info"
      );

      // 주말 평일 구분
      let dayClass = "";
      if (weekdayIndex === 0) dayClass = "sun";
      else if (weekdayIndex === 6) dayClass = "sat";

      const isToday = i === 0;

      // 물방울 아이콘 표시 여부 (옵션에 따라 오늘 날짜 기준 앞뒤로 표시됨)
      const showWaterIcon = i % interval === 0;

      // HTML에 내용 뿌리기
      waterInfoDiv.innerHTML = `
      <div class="detail-water-day ${dayClass}">${String(day).padStart(
        2,
        "0"
      )} (${weekdayName})</div>
      <div class="detail-water-text ${isToday ? "today" : ""}">
          ${
            showWaterIcon
              ? `<img src="/asset/detail/detail-water.png" class="detail-water-img" alt="물방울 아이콘">`
              : ""
          }
      </div>
  `;
      waterScheduleContainer.appendChild(waterInfoDiv);
    }
    // 물방울 이미지 클릭 이벤트
    const waterImages = document.querySelectorAll(".detail-water-img");
    waterImages.forEach((img) => {
      img.addEventListener("click", () => {
        if (img.src.includes("detail-water.png")) {
          img.src = "/asset/detail/detail-water-done.png"; // 회색물방울 (완료상태)
        } else {
          img.src = "/asset/detail/detail-water.png"; // 파란색물방울
        }
      });
    });
  };

  // 초기 옵션 로드 (DB에서 가져온 water_cycle 사용)
  fetchWaterCycle().then((waterCycle) => {
    generateWaterSchedule(waterCycle); // DB에서 가져온 값으로 물주기 일정 생성
    selectElement.value = waterCycle; // select 요소의 값도 설정
  });

  // 물주기 옵션 변경 시 동작
  selectElement.addEventListener("change", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    const interval = parseInt(event.target.value, 10);
    generateWaterSchedule(interval);

    // fetch API를 사용한 비동기 업데이트
    updateWaterCycle(interval)
      .then(() => {
        console.log("물주기 값이 성공적으로 업데이트되었습니다.");
      })
      .catch((error) => {
        console.error("물주기 값 업데이트 중 오류 발생:", error);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const historyForm = document.getElementById("historyForm");

  historyForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const plantImage = document.getElementById("formFile").files[0];
      if (!plantImage) {
        alert("기록을 남기실 이미지를 넣어주세요");
        return;
      } else {
        historyImgData = historyImgLoad();
      }
      
      console.log(historyImgData);

      let formData = {
        id: plantId,
        history_img: historyImgLoad,
        history_memo :[]
      }; 

      // try {
      //     // imageUrl 업로드 후, plant_main_img에 imageUrl을 추가
      //     const imageUrl = await uploadImage(formData);
      //     console.log("imageUrl:", imageUrl);
      //     plantData.history_img = imageUrl;  // imageUrl을 plant_main_img에 넣음
      //     console.log("이미지 URL:", plantData.plant_main_img);
      //     console.log("imageUrl넣은 후 plantData:", plantData);

      //     // 이제, plantData를 다시 updatePlantData로 업데이트 (혹은 다른 필요한 작업)
      //     const plantResult = updatePlantData(plantData);  
      //     console.log("plantResult:", plantResult);

      // } catch (error) {
      //     console.log(error);
      // }

      // console.log("FormData 확인:");
      // for (const pair of formData.entries()) {
      //     console.log(pair[0], pair[1]);
      // }

  });
});

const historyImgLoad = async () => {
  await fetch(`${API_URL}/plants`)
    .then((response) => response.json())
    .then((plants) => {
      if (plants.length > 0) {
        for (let i=0; i < plants.length; i++) {
          if(plants[i].id === plantId) {
            console.log(JSON.parse(["test1","test2"]));
          }
        }
      }
    }).catch(error => {
      console.log(error);
    });
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