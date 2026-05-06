let currentPage = 0;

function nextPage() {
    const pages = document.querySelectorAll(".page");

    // 🔴 Stop all videos
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    pages[currentPage].classList.remove("active");

    currentPage++;

    if (currentPage < pages.length) {
        pages[currentPage].classList.add("active");

        // ✅ RESET SCROLL TO TOP
        window.scrollTo(0, 0);
    }
}

const codes = {
    1: "1111",
    2: "2222",
    3: "3333",
    4: "4444"
};

function checkCode(num) {
    let input = document.getElementById("code" + num).value;

    if (input === codes[num]) {
        nextPage();
    } else {
        document.getElementById("error" + num).innerText = "Wrong code 😜";
    }
}

function answer(correct, pageNum) {
    if (correct) {
        document.getElementById("answerMsg" + pageNum).innerText = "";
        nextPage();
    } else {
        document.getElementById("answerMsg" + pageNum).innerText = "Nooo 😂 try again!";

        // 🔥 Add shake effect
        const current = document.querySelectorAll(".page")[currentPage];
        current.classList.add("shake");

        // Remove class after animation ends
        setTimeout(() => {
            current.classList.remove("shake");
        }, 400);
    }
}