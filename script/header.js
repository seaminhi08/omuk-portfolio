document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SNS 드롭다운
  =============================== */
  const snsLink = document.querySelector(".sns-link");
  const snsDropdown = document.querySelector(".sns-dropdown");

  if (snsLink && snsDropdown) {
    snsLink.addEventListener("click", (e) => {
      e.preventDefault();
      snsDropdown.classList.toggle("show");
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      if (!snsLink.contains(e.target) && !snsDropdown.contains(e.target)) {
        snsDropdown.classList.remove("show");
      }
    });
  }


  /* ===============================
      햄버거 → 사이드 메뉴 열기/닫기
  =============================== */
  const menuToggle = document.getElementById("menu-toggle");
  const sideMenu = document.getElementById("side-menu");
  const closeMenu = document.getElementById("close-menu");

  if (menuToggle && sideMenu && closeMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      sideMenu.classList.add("open");
    });

    closeMenu.addEventListener("click", (e) => {
      e.preventDefault();
      sideMenu.classList.remove("open");
    });

    // 메뉴 외부 클릭 시 닫음
    document.addEventListener("click", (e) => {
      if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        sideMenu.classList.remove("open");
      }
    });
  }


  /* ===============================
      사이드 메뉴 — 서브메뉴 토글
  =============================== */
  const subMenus = document.querySelectorAll(".siders > li.has-sub > a");

  subMenus.forEach(menu => {
    menu.addEventListener("click", (e) => {
      e.preventDefault();

      const li = menu.parentElement;

      // 이미 열려있으면 닫기
      if (li.classList.contains("active")) {
        li.classList.remove("active");
        return;
      }

      // 다른 메뉴 닫기
      document.querySelectorAll(".siders li.active").forEach(open => {
        open.classList.remove("active");
      });

      // 현재 메뉴 열기
      li.classList.add("active");
    });
  });


  /* ===============================
      PC 전체메뉴(mega-all) hover
  =============================== */
  const navBottom = document.querySelector(".nav-bottoms");
  const megaAll = document.querySelector(".mega-all");

  if (navBottom && megaAll) {
    navBottom.addEventListener("mouseenter", () => {
      megaAll.style.opacity = "1";
      megaAll.style.visibility = "visible";
      megaAll.style.pointerEvents = "auto";
      megaAll.style.transform = "translateY(0)";
    });

    navBottom.addEventListener("mouseleave", () => {
      megaAll.style.opacity = "0";
      megaAll.style.visibility = "hidden";
      megaAll.style.pointerEvents = "none";
      megaAll.style.transform = "translateY(10px)";
    });
  }

});
