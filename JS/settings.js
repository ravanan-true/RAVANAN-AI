// ==========================================
// CHECK LOGIN
// ==========================================

const currentUser = JSON.parse( localStorage.getItem("ravananCurrentUser") );

if (!currentUser) {

    window.location.href = "login.html";

}


// ==========================================
// ELEMENTS
// ==========================================

const profileName = document.getElementById("profileName");

const profileEmail = document.getElementById("profileEmail");

const profileAvatar = document.getElementById("profileAvatar");

const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const logoutBtn = document.getElementById("logoutBtn");

const historyToggle = document.getElementById("historyToggle");


// ==========================================
// DISPLAY PROFILE
// ==========================================

if (currentUser) {

    profileName.value = currentUser.name;

    profileEmail.value = currentUser.email;

    profileAvatar.textContent = currentUser.name.charAt(0).toUpperCase();

}


// ==========================================
// CLEAR CHAT HISTORY
// ==========================================

clearHistoryBtn.addEventListener( "click",
    function () {

        const confirmClear = confirm( "Are you sure you want to clear all your chat history?" );

        if (!confirmClear) {
            return;
        }

        let allChats = JSON.parse( localStorage.getItem("ravananChatHistory") ) || [];


        // Remove only current user's history

        allChats = allChats.filter(function (chat) {

                return chat.userId !== currentUser.id;

            });


        localStorage.setItem(
            "ravananChatHistory",
            JSON.stringify(allChats)
        );


        alert(
            "Your chat history has been cleared."
        );

    }
);


// ==========================================
// CHAT HISTORY TOGGLE
// ==========================================

historyToggle.addEventListener( "change",
    function () {

        if (historyToggle.checked) {

            localStorage.setItem(
                "ravananSaveHistory",
                "true"
            );

        } else {

            localStorage.setItem(
                "ravananSaveHistory",
                "false"
            );

        }

    }
);


// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener( "click",
    function () {

        localStorage.removeItem( "ravananCurrentUser" );

        window.location.href = "login.html";
    }
);