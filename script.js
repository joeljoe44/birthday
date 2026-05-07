let currentPage = 0;

// 🚫 Prevent context menu and download on media elements
document.addEventListener('DOMContentLoaded', function() {
    const mediaElements = document.querySelectorAll('video, img');
    
    mediaElements.forEach(element => {
        // Prevent right-click context menu
        element.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Prevent long-press on mobile
        element.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) return;
            
            const touch = e.touches[0];
            const startTime = Date.now();
            const startX = touch.clientX;
            const startY = touch.clientY;
            
            const touchEndHandler = () => {
                element.removeEventListener('touchmove', touchMoveHandler);
                element.removeEventListener('touchend', touchEndHandler);
            };
            
            const touchMoveHandler = (moveEvent) => {
                const moveTouch = moveEvent.touches[0];
                const distX = Math.abs(moveTouch.clientX - startX);
                const distY = Math.abs(moveTouch.clientY - startY);
                
                if (distX > 10 || distY > 10) {
                    touchEndHandler();
                }
            };
            
            element.addEventListener('touchmove', touchMoveHandler, false);
            element.addEventListener('touchend', touchEndHandler, false);
        });
        
        // Prevent dragging
        element.addEventListener('dragstart', (e) => e.preventDefault());
    });
});

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
        pages[currentPage].scrollTop = 0;

        // ✅ RESET SCROLL TO TOP
        try {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } catch (error) {
            window.scrollTo(0, 0);
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

const codes = {
    1: "JULIE",
    2: "MUMBAI",
    3: "11223344",
    4: "EMIKA"
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