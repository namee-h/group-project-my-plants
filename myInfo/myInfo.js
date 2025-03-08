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
          document.getElementById("myInfo-age").textContent = member.age;
          // 성별
          document.getElementById("myInfo-gender").textContent = member.gender;
          // 이메일
          document.getElementById("myInfo-email").textContent = member.email;
          // 가입한 날짜
          document.getElementById("myInfo-update-day").textContent = member.update_day;
          console.log(member.update_day)
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