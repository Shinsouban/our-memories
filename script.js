// 1. Автоматическая подгрузка часов из data.json
async function loadSteamData() {
  try {
    const response = await fetch('data.json');
    const steamData = await response.json();

    const gameName = "Schedule I";
    
    if (steamData[gameName]) {
      const hours = steamData[gameName].hours;
      const hoursElement = document.querySelector('.hours');
      if (hoursElement) {
        hoursElement.textContent = `⏱️ ${hours} ч. в Steam`;
      }
    }
  } catch (error) {
    console.log("Ожидание загрузки data.json...");
  }
}

// 2. Логика формы «Жалобы для склерозницы»
function addPromise() {
  const passInput = document.getElementById('kolyaPass');
  const promiseInput = document.getElementById('promiseInput');
  const container = document.getElementById('promisesContainer');

  if (passInput.value !== '1234') { 
    alert('Неверный пароль! Коля, ты ли это?');
    return;
  }

  if (promiseInput.value.trim() === '') {
    alert('Напиши хотя бы одно обещание!');
    return;
  }

  const newItem = document.createElement('div');
  newItem.className = 'promise-item';
  newItem.innerHTML = `
    <span class="promise-text">«${promiseInput.value}»</span>
    <span class="promise-status pending">Забыла 🤷‍♀️</span>
  `;

  container.appendChild(newItem);

  promiseInput.value = '';
  passInput.value = '';
}

document.addEventListener('DOMContentLoaded', loadSteamData);
// Данные персонажей
const characters = {
  player1: {
    name: "shinsouban",
    quote: '"ОБЕЩАЛА, НО ЗАБЫЛА..."',
    class: "Healer / Склерозница",
    steam: "shinsouban",
    weapon: "Геймпад & Чайник",
    skill: "Забывать обещания за 5 сек",
    img: "assets/Icons/shinsouban.JPG",
    tags: "#P1 #CoOp #GamerGirl"
  },
  player2: {
    name: "ишак яйца",
    quote: '"Я ВСЁ ЗАПИСАЛ В ЖАЛОБЫ!"',
    class: "Carry / Контролер",
    steam: "ишак яйца",
    weapon: "Геймпад & Наушники",
    skill: "Напоминать про косяки",
    img: "assets/Icons/kolya.jpg",
    tags: "#P2 #ProGamer #Victim"
  }
};

function openCharModal(playerKey) {
  const char = characters[playerKey];
  document.getElementById('modalQuote').textContent = char.quote;
  document.getElementById('modalClass').textContent = char.class;
  document.getElementById('modalSteam').textContent = char.steam;
  document.getElementById('modalWeapon').textContent = char.weapon;
  document.getElementById('modalSkill').textContent = char.skill;
  document.getElementById('modalImg').src = char.img;
  
  document.getElementById('charModal').style.display = 'flex';
}

function closeCharModal() {
  document.getElementById('charModal').style.display = 'none';
}