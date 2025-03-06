const sessionValue = sessionStorage.getItem("plantsSessionNumOne");
const loginButton = document.getElementById("index-login");
const memberName = document.getElementById("index-member-name");

if (sessionValue !== null) {
    console.log(sessionValue);
    fetch('http://localhost:3000/members')
        .then(response => response.json())
        .then(data => {
            const member = data.find(member => member.id === sessionValue);
            if (member) {
                loginButton.href = "";
                loginButton.textContent = "Logout";
                memberName.textContent = `${member.name}님 환영합니다.`;
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    
    loginButton.addEventListener("click", () => {
        sessionStorage.removeItem("plantsSessionNumOne");
        window.location.href = "/Login/login.html";
    });

    memberName.classList.remove("display-none");
} else {
    console.log(sessionValue);   
}

// 맨 위로 가기 버튼 추가
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector("#index-top-button");

    window.addEventListener("scroll", () => {
        console.log("ScrollY:", window.scrollY); // 현재 스크롤 위치 확인

        if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }   );

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
});
