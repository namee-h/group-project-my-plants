// 카카오 api 주소검색창 팝업

document.addEventListener("DOMContentLoaded", function () {
  const addressInput = document.getElementById("address");

  addressInput.addEventListener("click", function () {
    new daum.Postcode({
      oncomplete: function (data) {
        addressInput.value = data.address;
      },
    }).open();
    addressInput.value = "";
  });
});

function postMemberData(event) {
  event.preventDefault();

  const nameInput = document.querySelector('input[name="name"]').value.trim();
  const namePattern = /^[가-힣a-zA-Z0-9]+$/; // 한글, 영어, 숫자만 허용하는 정규 표현식
  if (!namePattern.test(nameInput)) {
    alert("이름은 공백 없이 입력해주세요.");
    return; // 검증 실패 시 함수 종료
  }

  const form = document.querySelector(".member-form-area");
  const formData = new FormData(form);

  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if (!selectedGender) {
    alert("성별을 선택해주세요.");
    return; // 성별이 선택되지 않았다면 함수 종료
  }
  //  update_data format yyyy-mm--dd
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const member = {
    name: formData.get("name"),
    age: formData.get("age"),
    gender: selectedGender.value, // 체크된 성별 값 추가
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
    update_dat: formattedDate,
  };

  fetch("https://silk-scandalous-boa.glitch.me/members", {
    method: "POST",
    body: JSON.stringify(member),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP 오류 발생: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      window.location.href = "/Login/login.html";
      alert("회원가입이 완료되었습니다");
    })
    .catch((error) => {
      console.error("저장 실패:", error);
      alert("가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    });
}
