// 1️⃣ 세션 값을 강제로 설정 (임시 로그인, 로그아웃 상태에서는 실행되지 않도록 수정)
// if (!sessionStorage.getItem("plantsSessionNumOne") && sessionStorage.getItem("forceLogout") !== "true") {
//   sessionStorage.setItem("plantsSessionNumOne", "testUser123");
// }

const sessionValue = sessionStorage.getItem("plantsSessionNumOne");
const loginButton = document.getElementById("index-login");
const memberName = document.getElementById("index-member-name");
const signButton = document.getElementById("index-signup");
const indexMyPlantsSection = document.getElementById("index-my-plants-section");
const indexFeed = document.querySelector("#index-feed");

console.log("Session value:", sessionValue); // 세션 값 확인: null, 로그아웃 상태

if (sessionValue !== null) {
  console.log("로그인 상태");

  // 2️⃣ 가짜 데이터 생성 (디비 없이 테스트용)
  // const fakeData = [{ id: "testUser123", name: "김다예" }];

  // 3️⃣ `sessionValue`와 일치하는 멤버 찾기
  // const member = fakeData.find((member) => member.id === sessionValue);

  fetch('https://silk-scandalous-boa.glitch.me/members')
      .then(response => response.json())
      .then(data => {
          console.log("Fetched data:", data);  // 데이터 확인: undefined, 요청실패

          const member = data.find(member => member.id === sessionValue);
          // const plant = data.find(plant => plant.member.id === sessionValue);
          console.log("Member:", member);  // 멤버 확인: undefined, DB 불일치
          // console.log("Plant:", plant);  // 식물 확인: undefined, DB 불일치

  if (member) {
    loginButton.href = "";
    loginButton.textContent = "Logout";
    memberName.textContent = `${member.name}님 환영합니다.`;
    signButton.style.display = "none"; // 회원가입 버튼 숨기기
    indexMyPlantsSection.style.display = "block"; // 내가 등록한 식물 보이기

    // pagination 추가
    for (let i = 0; i < 9; i++) {
      const temp = document.createElement("div");
      temp.innerHTML = `
          <a href="/Detail/detail.html" class="index-plant">
            <img
            src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F6098%2F6098665.png&type=a340"
            alt="내 식물"
            />
          </a>`;
      document.querySelector("#index-my-plants-list").append(temp);
      console.log("UI 변경 완료");
    }
  } else {
    console.log("⚠️ 로그인된 사용자 정보가 없습니다.");
  }
  }).catch(error => {
      console.error('Error:', error);
  });

  // 로그아웃 기능
  loginButton.addEventListener("click", () => {
    sessionStorage.removeItem("plantsSessionNumOne"); // 로그인 정보 삭제
    sessionStorage.setItem("forceLogout", "true"); // 강제 로그아웃 상태 설정
    window.location.href = "/Login/login.html";
  });

  memberName.classList.remove("display-none");
}

console.log("로그아웃 상태");


// 식물 피드
for (let i = 0; i < 10; i++) {
   const feedItem = document.createElement("div");
   feedItem.classList.add("feed-item");

   feedItem.innerHTML = `
        <a href="/Detail/detail.html" class="index-feed-plant">
          <img
          src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F6098%2F6098665.png&type=a340"
          alt="내 식물"
          />
        </a>`;
    document.querySelector("#index-feed").append(feedItem);
  }
  

// 맨 위로 가기 버튼 추가
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector("#index-top-button");

  window.addEventListener("scroll", () => {
    // console.log("ScrollY:", window.scrollY); // 현재 스크롤 위치 확인

    if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
