document.addEventListener('DOMContentLoaded', function () {

    // ===============================
    // 이메일 datalist 제어
    // ===============================
    const part3Input = document.getElementById('email_part3');
    let currentValue = '';

    if (part3Input) {
        part3Input.addEventListener('focus', function () {
            currentValue = part3Input.value;
            part3Input.value = '';
        });

        part3Input.addEventListener('blur', function () {
            if (part3Input.value === '') {
                part3Input.value = currentValue;
            }
        });

        part3Input.addEventListener('change', function () {
            const part2Input = document.getElementById('email_part2');
            if (part2Input) {
                part2Input.value = part3Input.value;
            }
            part3Input.value = '';
        });
    }

    // ===============================
    // 제출하기 (폼 + 모달)
    // ===============================
    const form = document.getElementById('feedbackForm');
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');

    const closeConfirm = document.getElementById('closeConfirm');
    const cancelSubmit = document.getElementById('cancelSubmit');
    const doSubmit = document.getElementById('doSubmit');

    const closeSuccess = document.getElementById('closeSuccess');
    const justClose = document.getElementById('justClose');

    if (!form || !confirmModal || !successModal) return;

    const openModal = (el) => {
        el.classList.add('active');
        el.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (el) => {
        el.classList.remove('active');
        el.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };
//////////////////////////////////////////반복문
    form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    let firstInvalid = null;
////////////////////////////////수정
    document.querySelectorAll('[required]').forEach(function (input) {
        input.style.border = '';

        // ⬇️ 여기 추가
        const oldError = input.nextElementSibling;
        if (oldError && oldError.classList.contains('error-text')) {
            oldError.remove();
        }

        if (!input.value.trim()) {
            valid = false;
            input.style.border = '2px solid red';

            // ⬇️ 여기 추가
            const error = document.createElement('p');
            error.className = 'error-text';
            error.textContent = '필수 입력 항목입니다.';
            error.style.color = 'red';
            error.style.fontSize = '13px';
            error.style.marginTop = '4px';

            input.after(error);

            if (!firstInvalid) firstInvalid = input;
        }
    });

    if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    openModal(confirmModal);
});
////////////////////////////////////////////////////////////////
    if (closeConfirm) closeConfirm.addEventListener('click', () => closeModal(confirmModal));
    if (cancelSubmit) cancelSubmit.addEventListener('click', () => closeModal(confirmModal));

    if (doSubmit) {
        doSubmit.addEventListener('click', () => {
            closeModal(confirmModal);
            openModal(successModal);
            // 실제 전송 시:
            // form.submit();
        });
    }

    if (closeSuccess) closeSuccess.addEventListener('click', () => closeModal(successModal));
    if (justClose) justClose.addEventListener('click', () => closeModal(successModal));

});
