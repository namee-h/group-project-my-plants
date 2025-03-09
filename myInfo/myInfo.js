// URL에서 'id' 파라미터 값 가져오기
const sessionValue = sessionStorage.getItem("plantsSessionNumOne");
const logoutButton = document.getElementById("index-logout");
const memberName = document.getElementById("myInfo-member-name");

// 가져온 ID 값 확인
console.log(sessionValue); // 예: 123

if (sessionValue !== null) {
  fetch("https://silk-scandalous-boa.glitch.me/members")
    .then((response) => response.json())
    .then((data) => {
      const member = data.find((member) => member.id === sessionValue);
      console.log("Member:", member); // 멤버 확인: undefined, DB 불일치
      if (member) {
        // 이름
        document.getElementById("myInfo-name").textContent = member.name;
        // 나이
        document.getElementById("myInfo-age").textContent = member.age + "살";
        // 성별
        let memberGender = member.gender;
        if (memberGender === "male") {
          memberGender = "남자";
        } else {
          memberGender = "여자";
        }
        document.getElementById("myInfo-gender").textContent = memberGender;
        // 이메일
        document.getElementById("myInfo-email").textContent = member.email;
        // 가입한 날짜
        document.getElementById("myInfo-update-day").textContent =
          member.update_dat;
        console.log(member.update_dat);
        // 주소
        document.getElementById("myInfo-address").textContent = member.address;
        memberName.innerHTML = `<strong>${member.name}🌱</strong>님 환영합니다.`;
      } else {
        console.log("⚠️ 로그인된 사용자 정보가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // 로그아웃 기능
  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("plantsSessionNumOne"); // 로그인 정보 삭제
    window.location.href = "/Login/login.html";
  });

  memberName.classList.remove("display-none");
}

//   날씨 API
async function fetchWeather() {
  const weatherApiKey = "adf1e5487a63448d8cc201205250803"; // 여기에 API 키 입력
  let weatherCountry = document.getElementById("countrySelect").value;
  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${weatherCountry}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temp = data.current.temp_c; // 현재 기온 (℃)
    const humidity = data.current.humidity; // 습도 (%)
    const rainfall = data.current.precip_mm; // 강수량 (mm)

    console.log("weatherCountry:", weatherCountry);
    if (weatherCountry === "South Korea") {
      weatherCountry = "대한민국";
    } else if (weatherCountry === "United States") {
      weatherCountry = "미국";
    } else if (weatherCountry === "Germany") {
      weatherCountry = "독일";
    } else if (weatherCountry === "Japan") {
      weatherCountry = "일본";
    }

    let message = `현재 ${weatherCountry}의 날씨: ${temp}°C, 습도: ${humidity}%, 강수량: ${rainfall}mm. `;

    // 🌱 물 주기 추천 로직
    if (humidity < 40 || temp > 30) {
      message += "식물이 건조할 수 있어요! 물을 주세요. 💧";
    } else if (rainfall > 5) {
      message += "오늘은 비가 많이 와요! 물을 적게 주세요. ☔";
    } else {
      message += "현재 날씨가 적당해요! 일반적인 물 주기를 유지하세요. 🌿";
    }

    document.getElementById("recommendation").innerText = message;
  } catch (error) {
    console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
  }
}

// 페이지 이동 함수
function goHome() {
  window.location.href = "../index.html";
}
