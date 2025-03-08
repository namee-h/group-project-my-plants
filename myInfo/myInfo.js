// plant.id API 이용하여 fetch
// const apiKey = "LwhsR0lRF7zLcrajlJp4UIGKcmx76jt1YXC3iUTwKCUkJiyshZ";
// const apiKey = "Ca3PIS48HHlrC8cdCaXxv9UhITquuINY6HpgREw6gsWyRpFM2L";
const apiKey = "DXdKpnlTkQmRIXEcb1KNKI5EYNOKEOMyAH8x5rdulD21KJ5ou2";
const apiUrl = "https://plant.id/api/v3/kb/plants/name_search?q=";
const sessionValue = sessionStorage.getItem("plantsSessionNumOne");

// member에서 name 값 가져와서 왼쪽 상단에 띄우기
  document.addEventListener('DOMContentLoaded', async function() {
    const memberNameElement = document.getElementById('update-member-name'); // <span> 요소 가져오기

    if (!sessionValue) {
        console.error("세션 값 없음");
        return;
    }

    try {
        // API 호출하여 member 정보 가져오기
        const response = await callApi(`https://silk-scandalous-boa.glitch.me/members/${sessionValue}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }, "멤버 정보 조회 실패");

        const memberData = await response.json(); // 응답 데이터를 JSON으로 변환
        console.log("가져온 멤버 데이터:", memberData);

        if (memberData && memberData.name) {
            memberNameElement.innerHTML = `<strong>${memberData.name}🌱</strong>님 환영합니다.`;
            // memberNameElement.textContent = `${memberData.name}님 환영합니다.`; // name 값을 <span>에 삽입
            memberNameElement.classList.remove('display-none'); // display-none 제거하여 표시
        } else {
            console.warn("이름이 없는 멤버 데이터:", memberData);
        }
    } catch (error) {
        console.error("멤버 정보를 가져오는 중 오류 발생:", error);
    }
    const logoutBtn = document.getElementById("index-logout"); // 로그아웃 버튼 가져오기
    //로그아웃버튼 추가
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("plantsSessionNumOne"); // 로그인 정보 삭제
        window.location.href = "/Login/login.html";
      });

});