const API_URL = `http://localhost:3000`;
let plantId = null;

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
        plantId = plants[0].id;
        loadPlantData(plantId);
      } else {
        alert("식물 데이터가 없습니다.");
        window.location.href = "index.html";
      }
    });
});

//식물 정보 가져오기
const loadPlantData = (plantId) => {
  fetch(`${API_URL}/plants`)
    .then((response) => response.json())
    .then((data) => {
      console.log("ddd", data);

      // 첫 번째 식물 정보 가져오기
      const plantData = data.find((p) => p.id == plantId);

      if (!plantData) {
        console.error(`no data (plantId: ${plantId})`);
        return;
      }

      // html에 뿌려주기
      document.getElementById("plant-name").textContent =
        plantData.plant_name || "이름 없음";
      document.getElementById("plant-type").textContent =
        plantData.category || "카테고리 없음";
      document.getElementById("plant-date").textContent =
        plantData.update_dat || "날짜 없음";
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
    // loadPlantData(plantId);
  });
});

// 🚨 2. DB에 저장하는 함수
function savePlantData(field, value) {
  let fieldName = "";
  if (field === "plant-name") fieldName = "plant_name";
  if (field === "plant-type") fieldName = "category";
  if (field === "plant-date") fieldName = "update_dat";

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
      // loadPlantData(plantId);
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
      const response = await fetch(`${API_URL}/water`);
      const data = await response.json();
      console.log("waterddd", data); // 디버깅용 출력
      return parseInt(data[0].water_cycle, 10); // water_cycle 값을 숫자로 변환
    } catch (error) {
      console.error("물 주기 데이터를 가져오는 데 실패했습니다:", error);
      return 1; // 기본값으로 1 (매일) 반환
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
    const interval = parseInt(event.target.value, 10); // 선택된 간격 값 가져오기
    generateWaterSchedule(interval);
  });
});
