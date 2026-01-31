// =========================================
// jQuery 영역
// =========================================
$(function () {

    // 1. 물고기 클릭 통통 튀기기 🐟
    if ($('.fishs img').length) {
        $('.fishs img').on('click', function () {
            const $img = $(this);
            $img.addClass('is-bouncing');
            $img.one('animationend', function () {
                $img.removeClass('is-bouncing');
            });
        });
    }

    // 2. 타임라인 원 클릭
    if ($('.item-circle').length) {
        $('.item-circle').on('click', function () {
            $(this).siblings('.item-content').slideToggle();
        });
    }

    // 3. 이미지 자동 슬라이드
    $(".item-wrap").each(function () {
        const $slides = $(this).find(".menu-image");
        const total = $slides.length;
        if (!total) return;

        let current = 0;
        const duration = 1000;
        const delay = 3000;

        $slides.css("left", "100%");
        $slides.eq(0).css("left", "0");

        function slideNext() {
            const next = (current + 1) % total;

            $slides.eq(current).stop().animate({ left: "-100%" }, duration);
            $slides.eq(next).css("left", "100%").stop().animate({ left: "0" }, duration);

            current = next;
            setTimeout(slideNext, delay);
        }

        setTimeout(slideNext, delay);
    });

});


// =========================================
// Vanilla JS 영역
// =========================================
document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // A. 네비게이션 active
    // ==============================
    const navButtons = document.querySelectorAll('.nav-button');
    if (navButtons.length) {
        navButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                navButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ==============================
    // B. Intersection Observer
    // ==============================
    const observeTargets = document.querySelectorAll(".product-card, .promo-section");
    if (observeTargets.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.1 });

        observeTargets.forEach(el => observer.observe(el));
    }

    // ==============================
    // C. 팝업 (안전 가드)
    // ==============================
    const popup = document.getElementById("popup");
    if (popup) {
        const closePopup = document.getElementById("closePopup");
        const closeBottom = document.getElementById("closeBottom");
        const noToday = document.getElementById("noToday");

        const closePopupFunc = () => {
            popup.style.display = "none";
        };

        if (closePopup) closePopup.onclick = closePopupFunc;
        if (closeBottom) closeBottom.onclick = closePopupFunc;

        if (noToday) {
            noToday.onclick = () => {
                const date = new Date();
                date.setHours(24, 0, 0, 0);
                document.cookie =
                    "popupHide=true; expires=" + date.toUTCString() + "; path=/";
                closePopupFunc();
            };
        }

        if (document.cookie.includes("popupHide=true")) {
            popup.style.display = "none";
        } else {
            popup.style.display = "flex";
        }
    }

    // ==============================
    // D. 맨 위로 버튼
    // ==============================
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==============================
    // E. 메뉴 버튼 이미지 변경
    // ==============================
    const boxes = document.querySelectorAll('.menu-box');
    const menuImage = document.getElementById('menuImage');

    if (menuImage && boxes.length) {
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                e.preventDefault();

                menuImage.style.opacity = 0;

                setTimeout(() => {
                    menuImage.src = box.dataset.img;
                    menuImage.style.opacity = 1;
                }, 150);

                boxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active');
            });
        });
    }

    // ==============================
    // F. 시그니처 메뉴 슬라이드 (< >)
    // ==============================
    const foods = [
        {
            img: "img2/main-food1.png",
            title: "양파크림 떡볶이",
            subtitle: "오묵의 비법 소스로 만든 우리 쌀"
        },
        {
            img: "img2/main-poodimg1-2.png",
            title: "마라 떡볶이",
            subtitle: "얼얼한 마라 소스의 깊은 맛"
        },
        {
            img: "img2/main-poodimg1-3.png",
            title: "로제 떡볶이",
            subtitle: "부드러운 로제의 만남"
        }
    ];

    const foodImage = document.getElementById("foodImage");
    const title = document.getElementById("foodTitle");
    const subtitle = document.getElementById("foodSubtitle");
    const prevBtn = document.querySelector(".arrow-lefts");
    const nextBtn = document.querySelector(".arrow-rights");

    if (foodImage && title && subtitle && prevBtn && nextBtn) {
        let currentIndex = 0;

        function updateSlide(index) {
            foodImage.style.opacity = 0;
            title.style.opacity = 0;
            subtitle.style.opacity = 0;

            setTimeout(() => {
                foodImage.src = foods[index].img;
                title.textContent = foods[index].title;
                subtitle.textContent = foods[index].subtitle;

                foodImage.style.opacity = 1;
                title.style.opacity = 1;
                subtitle.style.opacity = 1;
            }, 200);
        }

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + foods.length) % foods.length;
            updateSlide(currentIndex);
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % foods.length;
            updateSlide(currentIndex);
        });
    }

});
