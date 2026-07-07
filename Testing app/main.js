const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const slideForm = document.querySelector('.form-outer form');
const nextButtons = document.querySelectorAll('.next');
const prevButtons = document.querySelectorAll('.prev');
const progressText = document.querySelectorAll('.step p');
const progressCheck = document.querySelectorAll('.step .check');
const bullets = document.querySelectorAll('.step .bullet');
const signupSection = document.getElementById('signupSection');
const loginSection = document.getElementById('loginSection');
const showLogin = document.getElementById('showLogin');
const showSignup = document.getElementById('showSignup');
const signupPrompt = document.getElementById('signupPrompt');
const loginPrompt = document.getElementById('loginPrompt');
const backToSignup = document.getElementById('backToSignup');
const summaryModal = document.getElementById('summaryModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const closeModalSecondary = document.getElementById('closeModalSecondary');
const downloadJson = document.getElementById('downloadJson');
const dashboardSection = document.getElementById('dashboardSection');
const dashboardName = document.getElementById('dashboardName');
const dashboardEmail = document.getElementById('dashboardEmail');
const dashboardPhone = document.getElementById('dashboardPhone');
const dashboardDob = document.getElementById('dashboardDob');
const dashboardGender = document.getElementById('dashboardGender');
const dashboardUsername = document.getElementById('dashboardUsername');
const logoutButton = document.getElementById('logoutButton');

const STORAGE_KEY = 'storedAccounts';
let currentStep = 1;
const totalSteps = bullets.length;
let accounts = [];

function loadAccounts() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            accounts = JSON.parse(saved);
            return;
        } catch (error) {
            accounts = [];
        }
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                accounts = data;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
            }
        })
        .catch(() => {
            accounts = [];
        });
}

function saveAccounts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

function updateStepper() {
    if (signupSection.classList.contains('hidden')) {
        return;
    }

    slideForm.style.transform = `translateX(-${(currentStep - 1) * 100}%)`;
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index < currentStep);
    });
    progressText.forEach((text, index) => {
        text.classList.toggle('active', index < currentStep);
    });
    progressCheck.forEach((check, index) => {
        check.classList.toggle('active', index < currentStep);
    });
}

nextButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        if (currentStep < totalSteps) {
            currentStep += 1;
            updateStepper();
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        if (currentStep > 1) {
            currentStep -= 1;
            updateStepper();
        }
    });
});

function toggleForms(showLoginForm) {
    if (showLoginForm) {
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        signupPrompt.classList.add('hidden');
        loginPrompt.classList.remove('hidden');
        document.getElementById('progressBar').classList.add('hidden');
    } else {
        signupSection.classList.remove('hidden');
        loginSection.classList.add('hidden');
        signupPrompt.classList.remove('hidden');
        loginPrompt.classList.add('hidden');
        document.getElementById('progressBar').classList.remove('hidden');
    }
}

function showModal(contentHtml) {
    modalContent.innerHTML = contentHtml;
    summaryModal.classList.remove('hidden');
}

function hideModal() {
    summaryModal.classList.add('hidden');
}

function downloadDataJson() {
    const blob = new Blob([JSON.stringify(accounts, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetSignupForm() {
    signupForm.reset();
    currentStep = 1;
    updateStepper();
}

function validateSignup(user) {
    if (accounts.some(account => account.email === user.email)) {
        alert('An account already exists with this email.');
        return false;
    }
    if (accounts.some(account => account.username === user.username)) {
        alert('Username is already taken.');
        return false;
    }
    return true;
}

signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const user = {
        firstName: document.querySelector('#FirstName').value.trim(),
        lastName: document.querySelector('#LastName').value.trim(),
        email: document.querySelector('#email').value.trim().toLowerCase(),
        phone: document.querySelector('#Phone').value.trim(),
        date: document.querySelector('#Date').value,
        gender: document.querySelector('#Gender').value,
        username: document.querySelector('#UserName').value.trim(),
        password: document.querySelector('#Password').value,
    };

    if (!validateSignup(user)) {
        return;
    }

    accounts.push(user);
    saveAccounts();

    const summaryHtml = `
        <p><strong>First Name:</strong> ${user.firstName}</p>
        <p><strong>Last Name:</strong> ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Date of Birth:</strong> ${user.date}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Password:</strong> ${'*'.repeat(Math.max(6, user.password.length))}</p>
        <p>Your account has been saved locally.</p>
    `;

    showModal(summaryHtml);
    resetSignupForm();
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const loginId = document.querySelector('#loginUser').value.trim().toLowerCase();
    const loginPassword = document.querySelector('#loginPassword').value;
    const account = accounts.find(acc => acc.username.toLowerCase() === loginId || acc.email === loginId);

    if (!account) {
        alert('No account found with that username or email.');
        return;
    }

    if (account.password !== loginPassword) {
        alert('Incorrect password.');
        return;
    }

    showDashboard(account);
    loginForm.reset();
});

function hideAllSections() {
    signupSection.classList.add('hidden');
    loginSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    document.getElementById('progressBar').classList.add('hidden');
    signupPrompt.classList.add('hidden');
    loginPrompt.classList.add('hidden');
}

function showDashboard(account) {
    hideAllSections();
    dashboardUsername.textContent = account.username;
    dashboardEmail.textContent = account.email;
    dashboardName.textContent = `${account.firstName} ${account.lastName}`;
    dashboardPhone.textContent = account.phone;
    dashboardDob.textContent = account.date;
    dashboardGender.textContent = account.gender;
    dashboardSection.classList.remove('hidden');
}

function logout() {
    dashboardSection.classList.add('hidden');
    toggleForms(true);
}

showLogin.addEventListener('click', () => toggleForms(true));
showSignup.addEventListener('click', () => toggleForms(false));
backToSignup.addEventListener('click', () => toggleForms(false));
logoutButton.addEventListener('click', logout);
closeModal.addEventListener('click', hideModal);
closeModalSecondary.addEventListener('click', hideModal);
downloadJson.addEventListener('click', downloadDataJson);

loadAccounts();
updateStepper();
