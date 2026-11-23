function changeGreeting() {
  const greetingElement = document.getElementById("greeting-text");
  if (greetingElement) {
    greetingElement.textContent = "สวัสดีครับ! ยินดีที่ได้รู้จักนะครับ 😊";
    greetingElement.style.color = "#16a34a";
  }
}

// ==========================================
// 1. ระบบสลับโหมดมืด / สว่าง (Dark/Light Mode)
// ==========================================
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const themeText = themeToggleBtn.querySelector(".theme-text");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.textContent = "☀️";
  themeText.textContent = "โหมดสว่าง";
} else {
  themeIcon.textContent = "🌙";
  themeText.textContent = "โหมดมืด";
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    themeIcon.textContent = "☀️";
    themeText.textContent = "โหมดสว่าง";
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    themeIcon.textContent = "🌙";
    themeText.textContent = "โหมดมืด";
    localStorage.setItem("portfolio-theme", "light");
  }
});

// ==========================================
// 2. ระบบกรองผลงานตามหมวดหมู่ (Category Filter)
// ==========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // ปรับสถานะปุ่ม active
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // ซ่อนหรือแสดงการ์ดผลงานตามหมวดหมู่
    projectItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// ==========================================
// 3. ระบบหน้าต่างป๊อปอัปรายละเอียดผลงาน (Modal Popup)
// ==========================================
// ฐานข้อมูลรายละเอียดผลงานเพิ่มเติม
const projectDetails = {
  1: {
    title: "1. เว็บไซต์แนะนำตัวเอง (My Developer Profile)",
    category: "JavaScript / Front-End",
    description:
      "เว็บไซต์หน้าเดียว (Single Page) ที่จัดทำขึ้นเพื่อแนะนำประวัติส่วนตัว คติประจำใจ และทักษะเริ่มต้นในการเขียนโปรแกรม พร้อมปุ่มกดโต้ตอบกับผู้เยี่ยมชม",
    previewEmoji: "👤",
    previewTitle: "My Developer Profile",
    techStack: ["HTML5", "CSS3", "JavaScript", "VS Code", "Git"],
    highlights: [
      "ใช้ Semantic HTML ในการจัดโครงสร้างเนื้อหาให้อ่านง่ายและถูกต้องตามหลักสากล",
      "มีระบบโต้ตอบกับผู้ใช้งานด้วย JavaScript DOM Manipulation เบื้องต้น",
      "ออกแบบด้วย CSS Flexbox ให้แสดงผลได้เรียบร้อยทั้งบนมือถือและคอมพิวเตอร์"
    ]
  },
  2: {
    title: "2. เว็บไซต์พอร์ตโฟลิโอนักพัฒนา (My Developer Portfolio)",
    category: "HTML & CSS",
    description:
      "เว็บไซต์รวบรวมประวัติการเรียน ทักษะด้านไอที และผลงานของนักศึกษา จัดวางเลย์เอาต์ด้วยแนวคิด Modern Card Design พร้อมเมนูนำทาง (Smooth Scrolling)",
    previewEmoji: "💼",
    previewTitle: "My Developer Portfolio",
    techStack: ["HTML5", "CSS3", "CSS Flexbox", "CSS Grid", "GitHub Pages"],
    highlights: [
      "ระบบแถบเมนูนำทางแบบ Smooth Scroll ไปยังส่วนต่าง ๆ ภายในหน้าเดียว",
      "การจัดสัดส่วนเนื้อหาแบบ Card Layout เพิ่มความสบายตาและความเป็นระเบียบ",
      "ฝึกการใช้ Git & GitHub ในการจัดการเวอร์ชันและอัปโหลดโปรเจกต์ขึ้น Hosting"
    ]
  },
  3: {
    title: "3. ระบบสลับธีม Dark / Light Mode",
    category: "JavaScript / UI Features",
    description:
      "ฟีเจอร์สลับโหมดการแสดงผลหน้าเว็บกลางวันและกลางคืน เพิ่มความสบายตาในการอ่าน พร้อมบันทึกสถานะลงใน LocalStorage ของเบราว์เซอร์",
    previewEmoji: "🌓",
    previewTitle: "Dark / Light Mode System",
    techStack: ["Vanilla JavaScript", "CSS Custom Properties (Variables)", "Web Storage API"],
    highlights: [
      "ใช้ประโยชน์จาก CSS Variables ในการสลับโทนสีทั้งเว็บไซต์ได้อย่างรวดเร็วและสะอาด",
      "ใช้ LocalStorage เพื่อให้เบราว์เซอร์จดจำธีมที่ผู้ใช้เลือกไว้ แม้จะปิดแล้วเปิดใหม่",
      "ใส่ Animation นุ่มนวลเพื่อความสมูทในการเปลี่ยนสีพื้นหลังและตัวอักษร"
    ]
  }
};

const modal = document.getElementById("project-modal");
const modalCloseBtn = modal.querySelector(".modal-close-btn");
const modalBackdrop = modal.querySelector(".modal-backdrop");

const modalPreview = document.getElementById("modal-preview");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalHighlights = document.getElementById("modal-highlights");

// ฟังก์ชันเปิด Modal
function openModal(projectId) {
  const data = projectDetails[projectId];
  if (!data) return;

  modalPreview.innerHTML = `
    <div style="font-size: 48px; margin-bottom: 6px;">${data.previewEmoji}</div>
    <div style="font-size: 18px; font-weight: bold;">${data.previewTitle}</div>
  `;
  modalCategory.textContent = data.category;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  // รายการเทคโนโลยี
  modalTech.innerHTML = data.techStack
    .map((tech) => `<span class="tech-tag">${tech}</span>`)
    .join("");

  // รายการไฮไลต์
  modalHighlights.innerHTML = data.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // ล็อกไม่ให้เลื่อนหน้าจอหลักขณะเปิด modal
}

// ฟังก์ชันปิด Modal
function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // ปลดล็อกการเลื่อนหน้าจอ
}

// ผูก Event การคลิกที่รูปภาพ/กล่องพรีวิวของแต่ละผลงาน
document.querySelectorAll(".project-thumb").forEach((thumb, index) => {
  const projectId = index + 1; // อ้างอิง id 1, 2, 3
  thumb.addEventListener("click", () => openModal(projectId));
  thumb.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(projectId);
    }
  });
});

// ปิด Modal เมื่อคลิกปุ่มปิด หรือคลิกพื้นหลัง หรือกด Escape
modalCloseBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});
