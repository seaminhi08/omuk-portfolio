/* ========================================================
    1번째 기능! 검색창기능!
======================================================== */
function searchRecipe(event) {
    event.preventDefault();

    const keyword = document.querySelector('.search-input').value.trim();

    // 🔗 키워드 → 링크 매핑
    const links = {
        "냉어묵우동": "http://www.omadeng.com/m/brand/recipe_view.html?seq=3",
        "어묵냉우동": "http://www.omadeng.com/m/brand/recipe_view.html?seq=3",
        "냉우동": "http://www.omadeng.com/m/brand/recipe_view.html?seq=3",

        "어묵국수": "http://www.omadeng.com/m/brand/recipe_view.html?seq=1",
        "국수": "http://www.omadeng.com/m/brand/recipe_view.html?seq=1",

        "어묵전골": "http://www.omadeng.com/m/brand/recipe_view.html?seq=5",
        "전골": "http://www.omadeng.com/m/brand/recipe_view.html?seq=5",

        "어묵볶음": "http://www.omadeng.com/m/brand/recipe_view.html?seq=2",
        "매콤어묵볶음": "http://www.omadeng.com/m/brand/recipe_view.html?seq=2",
        "볶음": "http://www.omadeng.com/m/brand/recipe_view.html?seq=2"
    };

    // 이동 처리
    if (links[keyword]) {
        window.location.href = links[keyword];
    } else {
        alert("검색 결과가 없습니다.");
    }
}

/* ========================================================
    2번째 기능! 슬라이드 데이터 (여기에 원하는 이미지/내용 추가!)
======================================================== */
const slides = [
    {
        img:"img2/fishs-img1(14).png",   
        time: "20분",
        title: "매운 볶음 요리",
        tags: "#3無어묵# 우리가 아는 그맛!"
    },
    {
        img:"img2/fishs-img1(20).png",  
        time: "15분",
        title: "🌶️🔥 매운 어묵우동",
        tags: "#초간단 #청양고추 #속풀리는"
    },
    {
        img: "img2/fishs-img1(21).png",  
        time: "30분",
        title: "마라 어묵탕",
        tags: "#따뜻한요리 #중식풍 국물"
    }
];
let currentIndex = 0;


/* ========================================================
    ⭐ 슬라이드 화면 렌더링 (이미지+텍스트 동시에 변경)
======================================================== */
function renderSlide() {
    const slide = slides[currentIndex];

    // 이미지 변경
    document.getElementById("slideImage").src = slide.img;

    // 텍스트 변경
    document.getElementById("slideTime").innerHTML = slide.time;
    document.getElementById("slideTitle").innerHTML = slide.title;
    document.getElementById("slideTags").innerHTML = slide.tags;

    // dot 업데이트
    updateDots();
}


/* ========================================================
    🔵 dot(아래 점) 생성
======================================================== */
function createDots() {
    const dotsWrapper = document.getElementById("dotsWrapper");
    dotsWrapper.innerHTML = "";

    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        dot.addEventListener("click", () => {
            currentIndex = index;
            renderSlide();
        });

        dotsWrapper.appendChild(dot);
    });
}


/* ========================================================
    🔵 dot 활성화 표시
======================================================== */
function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}


/* ========================================================
    ◀ ▶ 버튼 기능
======================================================== */
// 오른쪽 (다음)
document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    renderSlide();
});

// 왼쪽 (이전)
document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderSlide();
});


/* ========================================================
    초기 실행
======================================================== */
createDots();
renderSlide();