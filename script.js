const usersDb = {}; 
let isLoggedIn = false; 

const events = [
    "Học Toán - 8:00 đến 10:00",
    "Học Văn - 10:30 đến 12:00"
];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (usersDb[username] && usersDb[username] === password) {
        isLoggedIn = true;
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        displayEvents();
        document.getElementById('message').classList.add('hidden'); 
    } else {
        alert("Tài khoản hoặc mật khẩu không đúng!");
    }
}

function register() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    if (newUsername && newPassword) {
        if (!usersDb[newUsername]) { 
            usersDb[newUsername] = newPassword;
            alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
            toggleForms();
        } else {
            alert("Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.");
        }
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

function displayEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; 
    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        eventList.appendChild(li);
    });
}

function showMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `
        Bạn cần phải đăng nhập để truy cập vào trang này. 
        <span style="color: blue; cursor: pointer;" onclick="showLogin()">Đăng nhập</span>
    `;
    messageDiv.classList.remove('hidden');
}

function showLogin() {
    document.getElementById('login-form').classList.remove('hidden'); 
    document.getElementById('message').classList.add('hidden'); 
}

const navLinks = document.querySelectorAll('.nav-link'); 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (!isLoggedIn) {
            showMessage(); 
        } else {

            alert("Chuyển đến trang tương ứng...");
        }
    });
});


