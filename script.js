const usersDb = JSON.parse(localStorage.getItem('usersDb')) || {}; 
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Kiểm tra trạng thái đăng nhập từ localStorage

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (usersDb[username] && usersDb[username] === password) {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập

        // Ẩn form đăng nhập và hiển thị dashboard
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('logout-btn').classList.remove('hidden'); // Hiển thị nút đăng xuất

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
    const username = document.getElementById('forgot-username').value; // Lấy tài khoản từ input (email/số điện thoại)
    
    // Kiểm tra xem tài khoản có tồn tại trong usersDb không
    if (usersDb[username]) {
        // Hiển thị mật khẩu
        alert("Mật khẩu của bạn là: " + usersDb[username]);
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

// Đăng xuất: Xóa trạng thái đăng nhập và quay lại màn hình đăng nhập
function logout() {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage

    // Ẩn dashboard và hiển thị lại form đăng nhập
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('logout-btn').classList.add('hidden'); // Ẩn nút đăng xuất
}

// Kiểm tra trạng thái đăng nhập khi tải lại trang
document.addEventListener("DOMContentLoaded", () => {
    if (isLoggedIn) {
        // Nếu người dùng đã đăng nhập, ẩn form đăng nhập và hiển thị dashboard
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('logout-btn').classList.remove('hidden'); // Hiển thị nút đăng xuất
        displayEvents();
    }
});
