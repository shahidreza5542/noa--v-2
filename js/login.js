document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");





    // Register Function
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            const name = document.getElementById("regName").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value.trim();

            if (!name || !email || !password) {
                alert("Please fill all fields");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.email === email)) {
                alert("Email already registered");
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        });
    }


    // Login Function
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                alert(`Welcome ${validUser.name}!`);
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password");
            }

        });
    }
});

