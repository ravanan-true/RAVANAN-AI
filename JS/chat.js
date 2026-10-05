// ==========================================
// CHECK LOGIN
// ==========================================

const currentUser = JSON.parse( localStorage.getItem("ravananCurrentUser") );

if (!currentUser) {
    window.location.href = "login.html";
}


// ==========================================
// GET ELEMENTS
// ==========================================

const userName = document.getElementById("userName");

const userEmail = document.getElementById("userEmail");

const userAvatar = document.getElementById("userAvatar");

const welcomeName = document.getElementById("welcomeName");

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const messagesContainer = document.getElementById("messagesContainer");

const chatWelcome = document.getElementById("chatWelcome");

const newChatBtn = document.getElementById("newChatBtn");

const logoutBtn = document.getElementById("logoutBtn");


// ==========================================
// DISPLAY CURRENT USER
// ==========================================

if (currentUser) {

    userName.textContent = currentUser.name;

    userEmail.textContent = currentUser.email;

    welcomeName.textContent = currentUser.name;

    userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
}


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage() {

    const message = messageInput.value.trim();

    // Don't send empty message
    if (message === "") {
        return;
    }


    // Hide welcome screen
    chatWelcome.style.display = "none";


    // Show user message
    addMessage(message, "user");


    // Save user message
    saveChatMessage(message, "user");


    // Clear input
    messageInput.value = "";


    // AI response delay
    setTimeout(function () {

        const response = generateAIResponse(message);

        // Show AI response
        addMessage(response, "ai");

        // Save AI response
        saveChatMessage(response, "ai");

    }, 700);
}


// ==========================================
// ADD MESSAGE TO CHAT
// ==========================================

function addMessage(text, sender) {

    const messageRow = document.createElement("div");

    messageRow.className = "message-row " + sender;

    const messageBubble = document.createElement("div");

    messageBubble.className = "message-bubble";

    messageBubble.textContent = text;


    messageRow.appendChild( messageBubble );

    messagesContainer.appendChild( messageRow );

    // Scroll to latest message
    messageRow.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// ==========================================
// SAVE CHAT HISTORY
// ==========================================

function saveChatMessage(message, sender) {

    if (!currentUser) {
        return;
    }


    // Get existing history
    let allChats = JSON.parse( localStorage.getItem( "ravananChatHistory") ) || [];


    // Find current user's chat
    let userChat = allChats.find(function (chat) {

            return chat.userId === currentUser.id;

        });


    // If user doesn't have history
    if (!userChat) {

        userChat = {

            userId: currentUser.id,

            messages: []

        };

        allChats.push(userChat);
    }


    // Add message
    userChat.messages.push({

        sender: sender,

        message: message,

        time:
            new Date().toLocaleString()

    });


    // Save to LocalStorage
    localStorage.setItem( "ravananChatHistory", JSON.stringify(allChats) );
}


// ==========================================
// AI RESPONSE
// ==========================================

function generateAIResponse(message) {

    const text = message.toLowerCase();


    // Welcome
    if ( text === "hello" || text === "hi" || text === "hey" ) {
        return "Hello! 👋 How can I help you today?";
    }


    // Help with coding
    if ( text === "help with coding" || text === "coding help" ) {

            return `Sure! 👨‍💻💻

        I can help you with HTML 🌐, CSS 🎨, JavaScript 🟨, Java ☕, SQL 🗄️, jQuery 🔧, Bootstrap 🅱️ and more.

        You can send me your code 📄 and tell me what problem you're facing 🛠️.

        I'll help you understand the error ❌, explain the code 📚, and find a solution 💡.`;
    }


    // Learn something
    if (text === "learn something") {

            return `Sure! 📚✨

        Tell me what you want to learn 🧠.

        It can be programming 💻, web development 🌐, databases 🗄️, or any other topic you're interested in. 🚀`;
    }


    // Get ideas
    if (text === "get ideas") {

            return `Of course! 💡🔥

        I can help you come up with ideas for projects 🚀, websites 🌐, applications 📱, or creative solutions 🧠.

        Tell me what you're planning to build! 👨‍💻✨`;
    }


    // Write something
    if (text === "write something") {

            return `Sure! ✍️✨

        I can help you write messages 💬, descriptions 📝, captions 📱, project content 💻, and more.

        Tell me what you want to write, and I'll help you create it. 🚀`;
    }


    // HTML
    if ( text === "html" || text === "definition of html" || 
        text === "html definition" || text === "what is html" ) 
    {

            return `HTML (HyperText Markup Language) 🌐 is the standard markup language 💻 used to create 🛠️ and structure 📐 web pages 🖥️.

        It acts as the skeleton 🦴 or foundational blueprint 📋 of a web page 🌐.

        It uses tags 🏷️ and elements 🧩 to define content like text 📝, links 🔗, and images 🖼️ for web browsers 🌍.`;
    }


    // HTML History
    if ( text === "html history" || text === "history of html" ) {
        return "HTML (HyperText Markup Language) 🌐 was invented by Tim Berners-Lee 👨‍💻 at CERN 🏢 in 1989–1991 📅 to share scientific documents 📚🔬.";
    }


    // HTML Boilerplate
    if ( text === "html boilerplate" || text === "html boiler plate" || text === "html basic structure" || text === "html structure" ) {

            return `HTML Boilerplate is the basic structure of an HTML webpage. 🌐💻

        Here is a basic HTML Boilerplate:

        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>

        </body>

        </html>

        In simple words:
        HTML Boilerplate = Basic starting structure of an HTML page. 🏗️✨`;
    }


    // CSS
    if ( text === "css" || text === "definition of css" || text === "css definition" || text === "what is css" ) {

            return `CSS (Cascading Style Sheets) 🎨 is a standard stylesheet language 💻 used to describe the visual presentation 👀, layout 📐, and design ✨ of a web page 🌐 written in HTML 🧱.

        While HTML provides the structural skeleton 🦴 of a website, CSS provides the skin 🎨, clothing 👕, and overall aesthetic ✨.`;
    }


    // CSS History
    if ( text === "css history" || text === "history of css" ) {

            return `The History of CSS 🎨 began in 1994 📅 when Norwegian web pioneer Håkon Wium Lie 👨‍💻 proposed the concept while working alongside Tim Berners-Lee 🌐 (the inventor of HTML 🧱) at CERN 🏢.

        Before CSS, the early World Wide Web 🌍 consisted of plain, boring text documents 📄 with no universal standard for styling layout 📐, colors 🎨, or fonts 🔤.`;
    }


    // JavaScript
    if ( text === "javascript" || text === "js" || text === "definition of javascript" || text === "javascript definition" ||
        text === "what is javascript" || text === "definition of js" || text === "js definition" || text === "what is js" ) {

            return `JavaScript (JS) 🟨 is a lightweight ⚡, interpreted programming language 💻 used primarily to create dynamic 🔄 and interactive 🖱️ content on web pages 🌐.

        Alongside HTML 🧱 and CSS 🎨, it serves as one of the three core technologies 🌍 of the World Wide Web 🚀.`;
    }


    // JS History
    if ( text === "js history" || text === "history of js" || text === "javascript history" || text === "history of javascript" ) {

            return `JavaScript (JS) 🟨 was created in May 1995 📅 by American programmer Brendan Eich 👨‍💻 while working at Netscape Communications 🌐.

        Remarkably, Eich designed and coded the initial prototype of the language in just 10 days ⏱️🔥.`;
    }


    // Bootstrap
    if ( text === "bootstrap" || text === "definition of bootstrap" || text === "bootstrap definition" || text === "what is bootstrap" ) {

            return `Bootstrap 🅱️ is a popular, open-source 🔓 CSS 🎨 and JavaScript 🟨 front-end framework used to build responsive 📱, mobile-first 📲 websites 🌐.

        Created originally by Twitter 🐦, it provides a pre-written collection of CSS styles 🎨, grid layout tools 📐, and interactive JavaScript components ⚡.`;
    }


    // Bootstrap History
    if ( text === "bootstrap history" || text === "history of bootstrap" ) {

            return `The History of Bootstrap 🅱️ began in mid-2010 📅 at Twitter 🐦, where it was originally developed by Mark Otto 👨‍💻 and Jacob Thornton 👨‍💻 under the name Twitter Blueprint 🏗️.

        It was built to solve a major problem 🛠️: internal engineering teams were using different custom libraries 📚, which caused massive visual inconsistencies 🎨 and a heavy maintenance burden ⚙️ across Twitter's tools 🐦💻.`;
    }


    // Java
    if ( text === "java" || text === "definition of java" || text === "java definition" || text === "what java" ) {

            return `Java ☕ is a high-level, class-based, object-oriented programming language 👨‍💻 widely used for backend systems ⚙️, applications 📱 and enterprise software 🏢.

        It is built around the core philosophy of [Write Once, Run Anywhere] (WORA) 🌍, meaning that compiled Java code can run on any platform 💻 that supports Java without the need for recompilation 🔄.`;
    }


    // Java History
    if ( text === "java history" || text === "history of java" ) {

        return `Java ☕ was created by James Gosling 👨‍💻 and the Green Team 🌱 at Sun Microsystems 🏢 in 1991 📅 to power smart consumer electronic devices 📱💡.`;
    }


    // SQL
    if ( text === "sql" || text === "database" || text === "definition of sql" || text === "sql definition" ||
        text === "what sql" || text === "definition of database" || text === "database definition" || text === "what database" ) {

            return `SQL is used to store 💾, retrieve 🔍, update 🔄 and manage 🛠️ data in relational databases 🗄️.

        A database is an organized, digital storage room 🗃️ used to securely 🔐 save, manage ⚙️, and retrieve 🔎 large amounts of data 📊.`;
    }


    // jQuery
    if (text === "jquery") {

        return "jQuery is a JavaScript library that makes DOM manipulation, events and animations easier.";
    }


    // AI
    if ( text === "ai" || text === "artificial intelligence" ) {

        return "AI🤖 stands for Artificial Intelligence. It enables computers to perform tasks that normally require human intelligence.";
    }


    // Who are you
    if ( text === "who are you" || text === "what are you" || text === "what is your name" ) {

        return "I'm RAVANAN AI🤖, your intelligent digital assistant. 🤖";
    }


    // RAVANAN
    if ( text === "ravanan" || text === "hi ravanan" ) {

        return "I'm RAVANAN AI🤖, a smart chat interface designed to help you learn, create and explore.";
    }

    // keerthi maha
    if ( text === "keerthi maha" || text === "maha keerthi" ) {

            return `Keerthi and Maha are lovers. ❤️✨

        They share a beautiful bond filled with love, care, understanding, and countless special moments. 🫂💫

        They are not just two people together —
        they are two hearts connected by a special bond. ❤️♾️

        In simple words:
        Two hearts. One beautiful love story. ❤️✨`;
    }

    // Miruthula
    if ( text === "miruthula" || text === "miru" || text === "miruthula best friend" ) {

            return `Miruthula is one of the best and closest friends in Ragul's life. 🫂❤️

        She is someone who makes every moment more fun 😄,
        every conversation more special 💬✨,
        and every memory worth remembering. 📸💫

        A true best friend who is always special in her own way. 🤝❤️

        In simple words:
        Best friend. Best memories. Best bond. 🫂♾️`;
    }

    // Miruthula Birthday
    if ( text === "03.09.2005" || text === "03/09/2005" || text === "miruthula birthday" ) {

            return `🎂✨ Happy Birthday, Miruthula! 🥳❤️

        You are not just a best friend,
        you are one of the most special people in my life. 🫂❤️

        May your life always be filled with happiness,
        beautiful memories, endless smiles, and success. 🌸✨

        No matter what happens,
        I hope you will always be with me and stay by my side. 🫂❤️♾️

        Yeppavum ippadiye en kooda iru. ❤️

        Once again...
        🎉 HAPPIEST BIRTHDAY MIRUTHULA! 🎂🥳
        Stay happy, stay crazy, and always keep smiling! ❤️✨`;
    }


    // Murugan Mouleswari
    if( text === "murugan mouleswari" || text === "mouleswari murugan"){
        
            return `Murugan and Mouleswari are best friends 🤝❤️.

        They share a beautiful friendship filled with fun 😄, support 💪, laughter 😂, and countless memories 📸✨.

        Their bond is truly special 🫂💫, and they are always there for each other. ❤️

        In simple words:
        They are best friends. 🫶♾️`;
    }

    // Tamil 
    if( text === "tamil" || text === "tamilselvan" || text === "tamil selvan"){
        
            return `🌟 **Tamilselvan is a really good and kind-hearted person.** ❤️

    😊 He always tries to learn something new and improve himself every single day. 📚✨ He has a strong interest in learning and never stops exploring new things. 🔍🧠

    💻 Whether it is technology, studies, or everyday life, he is always ready to learn, grow, and gain new knowledge. 🚀📖 He believes that **learning is a continuous journey** and there is always something new to discover. 🌱✨

    🔥 His dedication, curiosity, positive mindset, and willingness to learn make him a truly special person. 💯👏

    🌍 **He keeps learning every time, every place, and from every experience.** 💡📚 He doesn't give up easily and always tries to become a better version of himself. 💪😎
    
    ❤️ In short, **Tamilselvan is a good person, a continuous learner, and someone who is always growing, improving, and moving forward!** 🚀🌟😊
    `;
    }


    // About Creator
    if ( text === "who created you" || text === "who created this ai" || text === "who made you" || text === "who developed you" ||
        text === "who built you" || text === "who is your creator" || text === "who created ravanan ai" || text === "who developed ravanan ai" ) {

            return `👑 😎 Ragul is the creator and developer behind RAVANAN AI 🤖.

        He designed and developed this AI project 💻 with a vision of creating a simple, modern ✨, and user-friendly AI experience 🤝.

        As a Full Stack Developer 👨‍💻, Ragul enjoys building web applications 🌐, exploring new technologies 🔥, and turning creative ideas 💡 into real-world projects 🚀.

        Created & Developed by Ragul B 💻👑`;
    }


    // About me
    if ( text === "ragul" || text === "who is ragul" || text === "about ragul" || text === "about creater" || text === "creator") {

            return `Ragul is a passionate 💻 aspiring Full Stack Developer 🚀 who enjoys building modern ✨, responsive 📱, and user-friendly web applications 🌐.

        He has experience working with technologies such as HTML 🧱, CSS 🎨, Bootstrap ⚡, JavaScript 🟨, jQuery 🔧, Java ☕, and SQL 🗄️.

        He is passionate about coding 👨‍💻, creating innovative projects 💡, and solving real-world problems through technology 🌍. 🚀

        Goal 🎯: To build impactful digital solutions 💻 and continuously grow 📈 as a professional Full Stack Developer 🚀. 💻`;
    }


    // Shalini / Sowmiya
    if ( text === "shalini" || text === "sowmiya" ) {

            return `She is one of the most special people 💖 in Ragul's life.

        No matter what happens, her presence brings a sense of comfort 🫂, happiness 😊, and strength 💪✨.

        She has been a part of many beautiful memories 📸💫 and holds a place in his heart ❤️ that nobody else can replace. 🫶

        Some people are special ✨. Some people become a part of you ❤️. She is both. ♾️💖`;
    }


    // Vicky
    if ( text === "vicky" || text === "vignesh waran" || text === "vignesh" ) {

            return `Vicky is Ragul's best friend 🫂 and The most important people in his life. 🤝✨

        They share a special bond ❤️ filled with friendship 🤝, fun 😄, support 💪, and countless memories. 📸💫

        Vicky isn't just a friend to Ragul — he is Ragul considers his everything. 🫂❤️♾️

        In simple words:
        Special person of Ragul's life. ❤️✨`;
    }


    // Gowtham
    if ( text === "gowtham" || text === "gow" ) {

            return `Gowtham is Ragul's close friend 🤝 and a special part of his friend circle. 😎✨

        He is someone who has shared many fun moments 😄, conversations 💬, and memories 📸 with Ragul.

        From jokes 😂 and random talks 🗣️ to supporting each other 🤝, Gowtham definitely makes the journey more enjoyable. 🔥✨

        In simple words:
        An important part of Ragul's life. ❤️`;
    }


    // Life Facts
    if (text === "life facts") {

            return `Life Facts 🌍✨

        • Life doesn't always go the way we plan — and that's okay. 🌱
        • Some people stay forever, while some become beautiful memories. 🫂💫
        • Mistakes are not failures; they are lessons. 📚✨
        • Not everyone will understand your journey, and they don't have to. 🚶‍♂️
        • Small moments often become the biggest memories. ❤️📸
        • Protect your peace 🕊️, value your time ⏳, and appreciate the people who truly care. ❤️
        • Keep moving forward, even when the path isn't clear. 🚶‍♂️✨

        Life is not about having everything. It's about making the most of what you have. ❤️🌟`;
    }


    // Fun Question - Can you sleep?
    if ( text === "can you sleep" || text === "do you sleep" || text === "are you sleeping" ) {

            return `Sleep? 😴🤖

        Nope! I don't need sleep. 😂

        While you're sleeping 🛌💤,
        I'm still here waiting for your next question. 💻⚡

        In simple words:
        You sleep... I stay online! 😂🤖`;
    }


    // Honest - Definition
    if ( text === "what is honest" || text === "define honest" || text === "honest meaning" || text === "meaning of honest" || text === "honest" ) {

            return `Honest means telling the truth and being sincere. ❤️

        An honest person does not lie, cheat, or intentionally hide the truth.

        Example:
        If you make a mistake and admit it instead of blaming someone else,
        that is being honest. 🤝✨

        In simple words:
        Honest = Truthful and sincere. ❤️`;
    }


    // Everything is only for a while
    if ( text === "everything is only for a while" || text === "everything is temporary" || text === "is everything temporary" ) {

            return `Yes. 🌱

        Everything in life is temporary.
        Good moments, bad moments, happiness, sadness, success, and struggles — everything changes with time. ⏳

        So enjoy the good moments, learn from the difficult ones,
        and remember that nothing stays the same forever. ❤️✨

        In simple words:
        Everything is temporary. ⏳`;
    }


    // Default response
    return "That's interesting! 🤖✨ I'm currently running in demo mode 🧪. A real AI API 🔗🤖 can be connected later to generate more intelligent responses 🧠💡.";
}


// ==========================================
// SEND BUTTON
// ==========================================

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        sendMessage
    );

}


// ==========================================
// ENTER KEY
// ==========================================

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// ==========================================
// NEW CHAT
// ==========================================

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        function () {

            // Clear current chat screen
            messagesContainer.innerHTML = "";


            // Show welcome screen
            chatWelcome.style.display = "block";


            // Clear input
            messageInput.value = "";


            // Focus input
            messageInput.focus();

        }
    );

}


// ==========================================
// SUGGESTION CARDS
// ==========================================

const suggestionCards =
    document.querySelectorAll(
        ".suggestion-card"
    );


suggestionCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const title =
                card.querySelector(
                    "strong"
                ).textContent;


            messageInput.value =
                title;

            messageInput.focus();

        }
    );

});


// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            // Remove current login session
            localStorage.removeItem(
                "ravananCurrentUser"
            );


            // Go to login
            window.location.href =
                "login.html";

        }
    );
}


// ==========================================
// LOAD CHAT HISTORY IN SIDEBAR
// ==========================================

function loadSidebarHistory() {

    if (!currentUser) {
        return;
    }


    const historyContainer =
        document.getElementById(
            "chatHistoryList"
        );


    if (!historyContainer) {
        return;
    }


    const allChats =
        JSON.parse(
            localStorage.getItem(
                "ravananChatHistory"
            )
        ) || [];


    const userChat =
        allChats.find(function (chat) {

            return chat.userId ===
                currentUser.id;

        });


    historyContainer.innerHTML = "";


    // No history
    if (
        !userChat ||
        userChat.messages.length === 0
    ) {

        historyContainer.innerHTML =
            `<p class="no-history">
                No conversations yet
            </p>`;

        return;
    }


    // Get latest messages
    const messages =
        userChat.messages
            .slice(-5)
            .reverse();


    messages.forEach(function (item) {

        // Only show user messages
        if (item.sender !== "user") {
            return;
        }


        const historyItem =
            document.createElement("div");


        historyItem.className =
            "history-item";


        historyItem.innerHTML =
            `<span>💬</span>
             <span>${item.message}</span>`;


        historyContainer.appendChild(
            historyItem
        );

    });
}


// Load history when page opens
loadSidebarHistory();



// =====================================================
// MOBILE MENU - ADDED
// =====================================================

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

const mobileMenuOverlay =
    document.getElementById(
        "mobileMenuOverlay"
    );

const closeMobileMenu =
    document.getElementById(
        "closeMobileMenu"
    );

const mobileNewChatBtn =
    document.getElementById(
        "mobileNewChatBtn"
    );

const mobileLogoutBtn =
    document.getElementById(
        "mobileLogoutBtn"
    );


// ==========================================
// OPEN MOBILE MENU
// ==========================================

if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener(
        "click",
        function () {

            mobileMenu.classList.add(
                "active"
            );

            mobileMenuOverlay.classList.add(
                "active"
            );

        }
    );

}


// ==========================================
// CLOSE MOBILE MENU
// ==========================================

function closeMobileMenuFunction() {

    mobileMenu.classList.remove(
        "active"
    );

    mobileMenuOverlay.classList.remove(
        "active"
    );

}


if (closeMobileMenu) {

    closeMobileMenu.addEventListener(
        "click",
        closeMobileMenuFunction
    );

}


if (mobileMenuOverlay) {

    mobileMenuOverlay.addEventListener(
        "click",
        closeMobileMenuFunction
    );

}


// ==========================================
// MOBILE NEW CHAT
// ==========================================

if (mobileNewChatBtn) {

    mobileNewChatBtn.addEventListener(
        "click",
        function () {

            messagesContainer.innerHTML =
                "";

            chatWelcome.style.display =
                "block";

            messageInput.value =
                "";

            closeMobileMenuFunction();

            messageInput.focus();

        }
    );

}


// ==========================================
// MOBILE LOGOUT
// ==========================================

if (mobileLogoutBtn) {

    mobileLogoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "ravananCurrentUser"
            );

            window.location.href =
                "login.html";

        }
    );

}
