// 카카오 api 주소검색창 팝업

document.addEventListener("DOMContentLoaded", function () {
  const addressInput = document.getElementById("address");
  let isPopupOpen = false;

  function openPostcodePopup(e) {
    // 이미 팝업이 열려 있으면 동작하지 않음
    if (isPopupOpen) return;
    // 포커스 이벤트인 경우, 이미 값이 있으면 팝업을 열지 않음
    if (e.type === "focus" && addressInput.value.trim() !== "") return;

    isPopupOpen = true;

    new daum.Postcode({
      oncomplete: function (data) {
        addressInput.value = data.address;
      },
      onclose: function () {
        isPopupOpen = false;
      },
    }).open();
    // 팝업을 열기 전에 입력값을 초기화
    addressInput.value = "";
  }

  addressInput.addEventListener("click", openPostcodePopup);
  addressInput.addEventListener("focus", openPostcodePopup);

  
});

 // 이메일 도메인 선택 변경 이벤트 처리
 const emailDomainSelect = document.getElementById("emailDomain");
 const customDomainInput = document.getElementById("customDomain");
 const emailIdInput = document.querySelector('input[name="emailId"]'); // 이메일 아이디 입력 필드

 emailDomainSelect.addEventListener("change", function () {
   if (emailDomainSelect.value === "custom") {
     customDomainInput.style.display = "block"; // '직접 입력' 입력란 표시
     customDomainInput.value = ""; // 기존의 도메인 값 초기화
     emailIdInput.placeholder = "이메일 아이디"; // 아이디 입력 필드의 플레이스홀더 변경
   } else {
     customDomainInput.style.display = "none"; // '직접 입력' 입력란 숨김
     emailIdInput.placeholder = "이메일 아이디"; // 기본 플레이스홀더 유지
   }
 });



// 비밀번호 확인 버튼 기능
document.addEventListener("DOMContentLoaded", function() {
  const passwordInput = document.getElementById("password");
  const passwordCheckInput = document.getElementById("passwordCheck");
  const submitButton = document.getElementById("submitButton");
  const checkPasswordButton = document.getElementById("checkPasswordButton");
  const message = document.getElementById("passwordCheckMessage");

  // 비밀번호 입력란에 값이 들어가면 가입하기 버튼 비활성화
  function disableSubmitButton() {
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();

    if (password !== "" || passwordCheck !== "") {
      submitButton.disabled = true; // 값이 있으면 가입하기 버튼 비활성화
    }
  }

  // 비밀번호 확인 함수
  function checkPasswords() {
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    // 두 비밀번호가 일치하면 버튼 활성화, 아니면 비활성화
    if (password !== passwordCheck) {
      message.style.display = "block"; // 비밀번호가 다르면 경고 메시지 표시
      submitButton.disabled = true; // 비밀번호가 다르면 버튼 비활성화
    } else {
      message.style.display = "none"; // 비밀번호가 일치하면 경고 메시지 숨김
      submitButton.disabled = false; // 비밀번호가 일치하면 버튼 활성화
      alert("비밀번호가 일치합니다.");
    }
  }

  // 비밀번호 입력 시 확인
  passwordInput.addEventListener("input", disableSubmitButton);
  passwordCheckInput.addEventListener("input", disableSubmitButton);

  // 비밀번호 확인 버튼 클릭 시 비밀번호 확인
  checkPasswordButton.addEventListener("click", checkPasswords);
});



// member fetch
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

  // 이메일 아이디와 도메인 부분을 별도로 가져오기
  const emailId = document.querySelector('input[name="emailId"]').value.trim();  // 이메일 아이디
  const emailDomain = document.querySelector('select[name="emailDomain"]').value.trim();  // 이메일 도메인

  // 만약 "직접 입력" 옵션을 선택했다면, 사용자가 입력한 도메인 값을 사용
  const emailDomainInput = document.getElementById("customDomain");
  const email = emailDomain === "custom" ? `${emailId}@${emailDomainInput.value.trim()}` : `${emailId}@${emailDomain}`;//custom일때만 앞에 아니면 원래대로

  // // 이메일 합치기
  // const email = `${emailId}@${emailDomain}`;

  // 이메일 형식이 올바른지 체크 (정규식 사용)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return; // 이메일 형식이 맞지 않으면 함수 종료
  }

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

   // 비밀번호 같은지 체크
 document.getElementById("submitButton").addEventListener("click", function(event) {
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("passwordCheck").value;
  

  if (password !== passwordCheck) {
      event.preventDefault(); // 폼 제출 방지
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
  } else {
      // 비밀번호가 일치하면 폼을 제출
      alert("회원가입이 완료되었습니다.");
  }
});

  const member = {
    name: formData.get("name"),
    age: formData.get("age"),
    gender: selectedGender.value, // 체크된 성별 값 추가
    address: formData.get("address"),
    email: email,
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
