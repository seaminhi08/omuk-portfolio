document.querySelectorAll('.recipe-search-form-form-a')
    .forEach(form => {
        form.addEventListener('submit', function () {
            let keyword = this.querySelector('input[name="keyword"]').value;
            alert("검색어: " + keyword);

        });
    });

// =========================================
// 뉴스박스 3개 중요한내용
// =========================================
const cards = document.querySelectorAll('.card');
let current = 0;

function updateCarousel() {
    cards.forEach(card => card.classList.remove('active'));
    cards[current].classList.add('active');

    current = (current + 1) % cards.length;
}

setInterval(updateCarousel, 2500);
