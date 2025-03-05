const sessionValue = sessionStorage.getItem("plantsSessionNumOne");
const loginButton = document.getElementById("index-login-button");
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