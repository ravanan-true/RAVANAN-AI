// ---------- REGISTER ----------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim().toLowerCase();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");


        // Password check
        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";
            message.style.color = "#DC2626";

            return;
        }


        // Get existing users
        let users = JSON.parse( localStorage.getItem("ravananUsers") ) || [];


        // Check email already exists
        const existingUser = users.find(
            user => user.email === email
        );


        if (existingUser) {

            message.textContent = "Email already registered.";
            message.style.color = "#DC2626";

            return;
        }


        // Create user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };


        // Add user
        users.push(newUser);


        // Save users
        localStorage.setItem( "ravananUsers",
            JSON.stringify(users)
        );


        message.textContent = "Account created successfully!";
        message.style.color = "#16A34A";


        // Clear form
        registerForm.reset();


        // Go to login
        setTimeout(() => {

            window.location.href = "login.html";

        }, 1000);

    });
}



// ---------- LOGIN ----------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        
        const passwordInput = document.getElementById("loginPassword");

        const message = document.getElementById("loginMessage");

        const email = emailInput.value.trim().toLowerCase();

        const password = passwordInput.value;


        // Get registered users
        const users = JSON.parse( localStorage.getItem("ravananUsers") ) || [];


        console.log("Registered Users:", users);
        console.log("Login Email:", email);


        // Find matching user
        const user = users.find( 
        user => user.email === email &&
                user.password === password
        );


        // Invalid login
        if (!user) {

            message.textContent = "Invalid email or password.";

            message.style.color = "#DC2626";

            return;
        }


        // Save current user
        localStorage.setItem( "ravananCurrentUser",
            JSON.stringify(user)
        );


        message.textContent = "Login successful!";

        message.style.color = "#16A34A";


        // Redirect
        setTimeout(() => {

            window.location.href = "chat.html";

        }, 500);

    });
}