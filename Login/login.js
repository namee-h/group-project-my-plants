let inputEmail = document.getElementById("floatingInput");
let inputPassword = document.getElementById("floatingPassword");
const loginButton = document.getElementById("member-login");

loginButton.addEventListener("click", () => memberLogin());

let memberLogin = () => {
  fetch("https://silk-scandalous-boa.glitch.me/members")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const member = data.find(
        (member) =>
          member.email === inputEmail.value &&
          member.password === inputPassword.value
      );
      if (member) {
        alert("Login Successful");
        sessionStorage.setItem("plantsSessionNumOne", member.id); // 저장
        window.location.href = "/index.html";
      } else {
        alert("Login Failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// 계정만들기 버튼 경로이동
const moveMember = document.getElementById("move-member");
moveMember.addEventListener("click", () => {
  window.location.href = "/Member/member.html";
});

// 취소버튼 경로이동
const moveHome = document.getElementById("move-home");
moveHome.addEventListener("click", () => {
  window.location.href = "/index.html";
});
