
const currentUser = JSON.parse( localStorage.getItem("ravananCurrentUser") );

// Login check

if (!currentUser) {
    window.location.href = "login.html";

}


// Elements

const historyList = document.getElementById("historyList");

const emptyHistory = document.getElementById("emptyHistory");

const clearHistoryBtn = document.getElementById("clearHistoryBtn");


// ==========================================
// LOAD HISTORY
// ==========================================

function loadHistory() {

    const allChats = JSON.parse( localStorage.getItem("ravananChatHistory") ) || [];


    const userChat = allChats.find(function (chat) {

        return chat.userId === currentUser.id;

    });


    historyList.innerHTML = "";


    if ( !userChat || userChat.messages.length === 0 ) 
    {

        emptyHistory.style.display = "block";

        return;

    }


    emptyHistory.style.display = "none";


    // Show latest first

    const messages = [...userChat.messages].reverse();

    messages.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "history-card";


        card.innerHTML = 
        `
            <div class="history-card-header">

                <span class="history-sender">
                    ${item.sender === "user"
                        ? "You"
                        : "RAVANAN AI"}
                </span>

                <span class="history-time">
                    ${item.time}
                </span>

            </div>

            <p class="history-message">
                ${item.message}
            </p>

        `;


        historyList.appendChild(card);

    });

}


// ==========================================
// CLEAR HISTORY
// ==========================================

clearHistoryBtn.addEventListener(
    "click",
    function () {

        const confirmClear =
            confirm(
                "Are you sure you want to clear your chat history?"
            );


        if (!confirmClear) {
            return;
        }


        let allChats =
            JSON.parse( localStorage.getItem("ravananChatHistory") ) || [];


        allChats = allChats.filter(function (chat) {

                return chat.userId !== currentUser.id;

            });


        localStorage.setItem( "ravananChatHistory",
            JSON.stringify(allChats)
        );


        loadHistory();

    }
);


// Load when page opens

loadHistory();