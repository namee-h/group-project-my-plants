let inputEmail = document.getElementById('floatingInput');
let inputPassword = document.getElementById('floatingPassword');
const loginButton = document.getElementById('member-login');

loginButton.addEventListener('click', () => memberLogin());

let memberLogin = () => {
    fetch('http://localhost:3000/members')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const member = data.find(member => member.email === inputEmail.value && member.password === inputPassword.value);
            if (member) {
                alert('Login Successful');
                sessionStorage.setItem("plantsSessionNumOne", member.id ); // 저장
                window.location.href = '/index.html';
            } else {
                alert('Login Failed');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
}