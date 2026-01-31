/********************************** 공통 전역 변수 ******************************************/
let redirectTimer; // 이동 타이머

/********************************** 지도 클릭 시 ******************************************/
function openModal(event, link) {
  event.preventDefault();

  const modal = document.getElementById("storeModal");
  const storeTitle = document.getElementById("storeTitle");
  const storeInfo = document.getElementById("storeInfo");

  // 클릭한 지도에 맞게 내용 변경
  if (link.includes("xTSVAHgXTfgp1YUP8")) {
    storeTitle.textContent = "오마뎅 대치점";
    storeInfo.innerHTML = "서울특별시 강남구 대치동 123-4<br>📞 02-123-4567";
  } else if (link.includes("DsTbJWGAHUcUZ2ug6")) {
    storeTitle.textContent = "오마뎅 엘스점";
    storeInfo.innerHTML = "서울특별시 송파구 올림픽로 35길 124<br>📞 02-234-5678";
  } else if (link.includes("UvDvEVR4BunWdPSU6")) {
    storeTitle.textContent = "오마뎅 수내점";
    storeInfo.innerHTML = "경기도 성남시 분당구 수내로 20<br>📞 031-456-7890";
  } else {
    storeTitle.textContent = "오마뎅 매장 안내";
    storeInfo.innerHTML = "지점을 선택해주세요.";
  }

  modal.style.display = "flex";
  clearTimeout(redirectTimer);

  // 2초 후 자동 이동
  redirectTimer = setTimeout(() => {
    window.open(link, "_blank");
  }, 2000);
}

/********************************** 매장 검색 ******************************************/
function searchStore() {
  const input = document.getElementById("storeName").value.trim();
  const mapImage = document.getElementById("mapImage");
  const modal = document.getElementById("storeModal");
  const storeTitle = document.getElementById("storeTitle");
  const storeInfo = document.getElementById("storeInfo");

  if (input === "") {
    alert("매장명을 입력해주세요 🙂");
    return false;
  }

  const storeData = {
    "대치점": {
      img: "img4/warps1.png",
      link: "https://maps.app.goo.gl/xTSVAHgXTfgp1YUP8",
      title: "오마뎅 대치점",
      info: "서울특별시 강남구 대치동 123-4<br>📞 02-123-4567"
    },
    "엘스점": {
      img: "img4/warps2.png",
      link: "https://maps.app.goo.gl/DsTbJWGAHUcUZ2ug6",
      title: "오마뎅 엘스점",
      info: "서울특별시 송파구 올림픽로 35길 124<br>📞 02-234-5678"
    },
    "수내점": {
      img: "img4/warps3.png",
      link: "https://maps.app.goo.gl/UvDvEVR4BunWdPSU6",
      title: "오마뎅 수내점",
      info: "경기도 성남시 분당구 수내로 20<br>📞 031-456-7890"
    }
  };

  const store = storeData[input];
  if (store) {
    mapImage.src = store.img;

    storeTitle.textContent = store.title;
    storeInfo.innerHTML = store.info;
    modal.style.display = "flex";

    clearTimeout(redirectTimer);
    redirectTimer = setTimeout(() => {
      window.open(store.link, "_blank");
    }, 2000);
  } else {
    alert("해당 매장을 찾을 수 없습니다 😢");
  }

  return false;
}

/********************************** 모달 닫기 ******************************************/
// ✅ 지도용 모달 닫기 함수 (기존 유지)
function closeModal() {
  const storeModal = document.getElementById("storeModal");
  if (storeModal) {
    storeModal.style.display = "none";
    clearTimeout(redirectTimer);
  }
}

// ✅ 이미지 확대용 모달
document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = imageModal ? imageModal.querySelector(".close-btn") : null;
  const galleryImgs = document.querySelectorAll(".image-gallery img");

  console.log("✅ JS 실행됨"); // 실행 확인용

  // 이미지 클릭 시 모달 열기
  galleryImgs.forEach(img => {
    img.addEventListener("click", () => {
      if (!imageModal || !modalImg) return;
      imageModal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      console.log("🟢 이미지 모달 열림");
    });
  });

  // 닫기 버튼 클릭 시 닫기
  if (closeBtn) {
    closeBtn.addEventListener("click", e => {
      e.stopPropagation(); // 배경 클릭 이벤트 중복 방지
      console.log("❌ 이미지 모달 닫기 클릭됨");
      imageModal.style.display = "none";
    });
  } else {
    console.warn("⚠️ close-btn을 찾지 못했습니다.");
  }

  // 배경 클릭 시 닫기
  if (imageModal) {
    imageModal.addEventListener("click", e => {
      if (e.target === imageModal) {
        console.log("⚫ 배경 클릭 닫힘");
        imageModal.style.display = "none";
      }
    });
  }
});

