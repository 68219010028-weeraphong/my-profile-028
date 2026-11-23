let visitorName = prompt("กรุณากรอกชื่อของคุณครับ:");

if (visitorName === null || visitorName.trim() === "") {
  visitorName = "ผู้เข้าชม";
}

const welcomeElement = document.getElementById("welcome-message");
welcomeElement.textContent = "ยินดีต้อนรับคุณ " + visitorName + " เข้าสู่เว็บไซต์ Portfolio ของผมครับ";

function calculateWebsiteCost() {
  const pricePerPage = 500;
  let pageInput = prompt("กรุณากรอกจำนวนหน้าเว็บไซต์ที่ต้องการครับ (หน้าละ 500 บาท):", "1");
  let pageCount = Number(pageInput);

  if (isNaN(pageCount) || pageCount < 0) {
    pageCount = 0;
  }

  let totalCost = pageCount * pricePerPage;

  document.getElementById("display-pages").textContent = pageCount;
  document.getElementById("display-total").textContent = totalCost.toLocaleString();
}

calculateWebsiteCost();

const recalculateBtn = document.getElementById("recalculate-btn");
recalculateBtn.addEventListener("click", calculateWebsiteCost);