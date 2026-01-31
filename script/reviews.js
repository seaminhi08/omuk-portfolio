/*==============================================================
인스타 / 네이버 모달 (공통)
=============================================================== */

const openBtns = document.querySelectorAll('.open-modal');
const modals = document.querySelectorAll('.review-modal');

// 모달 열기
openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const target = btn.dataset.target;

        modals.forEach(modal => {
            modal.style.display =
                modal.dataset.modal === target ? 'block' : 'none';
        });
    });
});

// 복사하기
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const textarea = btn
            .closest('.review-box')
            .querySelector('.review-text');

        textarea.select();
        navigator.clipboard.writeText(textarea.value);
        alert('복사됐어요! 붙여넣기만 하세요 😊');
    });
});

// 바깥 클릭 시 닫기
modals.forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
/*==============================================================
                닫기 모달
=============================================================== */
// 닫기 버튼 클릭
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.review-modal').style.display = 'none';
    });
});

// ESC 키로 닫기
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.review-modal')
            .forEach(modal => modal.style.display = 'none');
    }
});
/*==============================================================
이벤트 당첨 
=============================================================== */
const goBtn = document.querySelector('.go-btn');
const codeModal = document.getElementById('codeModal');
const qrModal = document.getElementById('qrModal');

goBtn.addEventListener('click', () => {
    codeModal.style.display = 'flex';
});

function generateQR() {
    const code = document.getElementById('authCode').value.trim();

    if (!code) {
        alert('인증 코드를 입력해주세요');
        return;
    }

    codeModal.style.display = 'none';
    qrModal.style.display = 'flex';

    const qrArea = document.getElementById('qrArea');
    qrArea.innerHTML = '';

    new QRCode(qrArea, {
        text: `EVENT_CODE:${code}`,
        width: 180,
        height: 180
    });
}


/*==============================================================
닫기
=============================================================== */

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// 바깥 클릭 시 닫기
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
});

// ESC 키로 닫기
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => {
            m.style.display = 'none';
        });
    }
});


