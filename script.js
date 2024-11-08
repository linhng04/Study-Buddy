const usersDb = JSON.parse(localStorage.getItem('usersDb')) || {}; 
let isLoggedIn = false; 

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

    const emailOrPhonePattern = /^(?:\w+@\w+\.\w+|\d{10,11})$/; // Email hoặc số điện thoại
    if (newUsername && newPassword) {
        if (emailOrPhonePattern.test(newUsername)) { 
            if (newPassword.length >= 8) {
                if (!usersDb[newUsername]) {
                    usersDb[newUsername] = newPassword;
                    localStorage.setItem('usersDb', JSON.stringify(usersDb));
                    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
                    toggleForms();
                } else {
                    alert("Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.");
                }
            } else {
                alert("Mật khẩu phải có ít nhất 8 ký tự.");
            }
        } else {
            alert("Tài khoản phải là email hoặc số điện thoại hợp lệ.");
        }
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    forgotPasswordForm.classList.add('hidden');
}

function showForgotPassword() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-password-form').classList.remove('hidden');
}

function toggleForgotPassword() {
    document.getElementById('forgot-password-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function resetPassword() {
    const username = document.getElementById('forgot-username').value;
    if (usersDb[username]) {
        alert("Đã gửi yêu cầu đặt lại mật khẩu đến " + username);
    } else {
        alert("Tài khoản không tồn tại.");
    }
}

function displayEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; 
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        eventList.appendChild(li);
    });
}

function addEvent() {
    const eventInput = document.getElementById('event-input');
    const eventValue = eventInput.value.trim();
    if (eventValue) {
        const eventList = document.getElementById('event-list');
        const li = document.createElement('li');
        li.textContent = eventValue;
        eventList.appendChild(li);
        
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(eventValue);
        localStorage.setItem('events', JSON.stringify(events));
        
        eventInput.value = ''; // Xóa input sau khi thêm
    } else {
        alert("Vui lòng nhập sự kiện.");
    }
}

function calculateGPA() {
    const gpaInput = document.getElementById('gpa-input').value;
    const grades = gpaInput.split(',').map(Number);
    const validGrades = grades.filter(grade => !isNaN(grade));

    if (validGrades.length > 0) {
        const sum = validGrades.reduce((a, b) => a + b, 0);
        const gpa = (sum / validGrades.length).toFixed(2);
        document.getElementById('gpa-result').textContent = `GPA của bạn là: ${gpa}`;
    } else {
        alert("Vui lòng nhập điểm hợp lệ.");
    }
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    if (isLoggedIn) {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        displayEvents();
    }
});

// Thêm phần hiển thị thông báo cần đăng nhập
function showMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = 'Bạn cần phải đăng nhập để truy cập vào trang này.';
    messageDiv.classList.remove('hidden'); // Hiện thông báo
}

// Thêm phần kiểm tra khi nhấp vào liên kết trên thanh tiêu đề
const navLinks = document.querySelectorAll('.nav-link'); 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định

        if (!isLoggedIn) {
            showMessage(); // Hiển thị thông báo cần đăng nhập
        } else {
            // Chuyển đến trang tương ứng (hoặc thực hiện hành động nào đó)
            alert("Chuyển đến trang tương ứng...");
        }
    });
});
