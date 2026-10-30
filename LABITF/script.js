// รายการอาหาร (อย่างน้อย 5 รายการ)
const foods = [
  {
    name: "กะเพราหมูสับไข่ดาว",
    desc: "เมนูสิ้นคิดอันดับหนึ่งของคนไทย ผัดหมูสับกับใบกะเพราและพริกสดจนหอมฉุย เสิร์ฟพร้อมข้าวสวยร้อนๆ และไข่ดาวกรอบๆ",
    price: 60,
    image: "images/kaprao.svg",
    tag: "จานเดียว"
  },
  {
    name: "ผัดไทยกุ้งสด",
    desc: "เส้นจันท์เหนียวนุ่มผัดกับซอสมะขามรสเปรี้ยวหวาน ใส่กุ้งสดตัวโต เต้าหู้ ถั่วงอก และโรยถั่วลิสงคั่ว",
    price: 80,
    image: "images/padthai.svg",
    tag: "เส้น"
  },
  {
    name: "ต้มยำกุ้งน้ำข้น",
    desc: "ซุปรสจัดจ้านเปรี้ยว เผ็ด เค็ม ครบรส หอมตะไคร้ ข่า ใบมะกรูด พร้อมกุ้งแม่น้ำและเห็ดฟาง",
    price: 150,
    image: "images/tomyum.svg",
    tag: "ต้ม/แกง"
  },
  {
    name: "ส้มตำไทย",
    desc: "มะละกอสับเส้นตำกับมะเขือเทศ ถั่วฝักยาว กุ้งแห้ง และถั่วลิสง รสเปรี้ยวหวานกลมกล่อม กินคู่ข้าวเหนียวยิ่งฟิน",
    price: 50,
    image: "images/somtam.svg",
    tag: "ยำ/ตำ"
  },
  {
    name: "ข้าวมันไก่",
    desc: "ข้าวหุงกับน้ำซุปไก่และกระเทียมจนหอมมัน เสิร์ฟพร้อมไก่ต้มเนื้อนุ่ม น้ำจิ้มเต้าเจี้ยวสูตรเด็ด และซุปฟัก",
    price: 55,
    image: "images/khaomankai.svg",
    tag: "จานเดียว"
  },
  {
    name: "ข้าวซอยไก่",
    desc: "อาหารเหนือขึ้นชื่อ น้ำแกงกะทิเครื่องแกงเข้มข้น เส้นบะหมี่ไข่นุ่มและกรอบ เสิร์ฟพร้อมหอมแดง ผักกาดดอง และมะนาว",
    price: 70,
    image: "images/khaosoi.svg",
    tag: "เส้น"
  },
  {
    name: "แกงเขียวหวานไก่",
    desc: "แกงกะทิสีเขียวหอมพริกแกง ใส่ไก่ มะเขือเปราะ และใบโหระพา รสหวานมันเผ็ดกำลังดี กินกับข้าวสวยหรือขนมจีน",
    price: 75,
    image: "images/greencurry.svg",
    tag: "ต้ม/แกง"
  },
  {
    name: "ข้าวเหนียวมะม่วง",
    desc: "ของหวานยอดฮิต มะม่วงน้ำดอกไม้สุกหวานฉ่ำ คู่กับข้าวเหนียวมูนกะทิหอมมัน ราดหัวกะทิและโรยถั่วทอง",
    price: 90,
    image: "images/mango.svg",
    tag: "ของหวาน"
  }
];

const card = document.getElementById("foodCard");
const imgEl = document.getElementById("foodImage");
const nameEl = document.getElementById("foodName");
const descEl = document.getElementById("foodDesc");
const priceEl = document.getElementById("foodPrice");
const tagEl = document.getElementById("foodTag");
const countEl = document.getElementById("rollCount");
const btn = document.getElementById("randomBtn");
const grid = document.getElementById("menuGrid");

let currentIndex = 0;
let rollCount = 0;

// แสดงข้อมูลอาหารในการ์ด
function showFood(index) {
  const food = foods[index];
  imgEl.src = food.image;
  imgEl.alt = food.name;
  nameEl.textContent = food.name;
  descEl.textContent = food.desc;
  priceEl.textContent = food.price;
  tagEl.textContent = food.tag;
  currentIndex = index;

  document.querySelectorAll(".menu-item").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
  });
}

// สุ่ม index ใหม่ที่ไม่ซ้ำกับเมนูปัจจุบัน
function randomIndex() {
  let i;
  do {
    i = Math.floor(Math.random() * foods.length);
  } while (i === currentIndex && foods.length > 1);
  return i;
}

// ปุ่มสุ่ม: วนสลับเมนูเร็วๆ ก่อนหยุดที่เมนูที่สุ่มได้
btn.addEventListener("click", () => {
  btn.disabled = true;
  card.classList.add("rolling");

  let ticks = 0;
  const timer = setInterval(() => {
    showFood(randomIndex());
    ticks++;
    if (ticks >= 10) {
      clearInterval(timer);
      showFood(randomIndex());
      card.classList.remove("rolling");
      card.classList.remove("pop");
      void card.offsetWidth; // restart animation
      card.classList.add("pop");
      rollCount++;
      countEl.textContent = rollCount;
      btn.disabled = false;
    }
  }, 90);
});

// สร้างการ์ดเมนูทั้งหมด
foods.forEach((food, i) => {
  const item = document.createElement("button");
  item.className = "menu-item";
  item.innerHTML = `
    <img src="${food.image}" alt="${food.name}">
    <div class="mi-body">
      <h3>${food.name}</h3>
      <span>${food.price} บาท</span>
    </div>`;
  item.addEventListener("click", () => {
    showFood(i);
    document.getElementById("picker").scrollIntoView({ behavior: "smooth" });
  });
  grid.appendChild(item);
});

showFood(0);
