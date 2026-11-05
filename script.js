const weeks = [
  {title:"Неделя 1. Ищем возможности",days:["Оценить свои навыки и сильные стороны","Найти 10 способов заработка в интернете","Изучить фриланс и удалённую работу","Рассмотреть заработок с помощью AI","Изучить продажу товаров через интернет","Найти способы заработка без вложений","Составить ТОП-10 интересных вариантов"]},
  {title:"Неделя 2. Исследуем рынок",days:["Изучить заработок на создании сайтов","Изучить партнёрские программы","Рассмотреть продажу цифровых продуктов","Изучить заработок на YouTube","Изучить заработок на Instagram и TikTok","Найти востребованные услуги","Выбрать 3 перспективных направления"]},
  {title:"Неделя 3. Пробуем зарабатывать",days:["Выбрать первое направление","Изучить конкурентов","Определить потенциальных клиентов","Подготовить предложение своей услуги","Создать первую страницу или объявление","Разместить предложение","Найти первых потенциальных заказчиков"]},
  {title:"Неделя 4. Получаем результат",days:["Найти дополнительные площадки для продвижения","Отправить первые предложения клиентам","Проверить реакцию потенциальных клиентов","Улучшить своё предложение","Попробовать второй способ заработка","Оценить затраченное время и возможную прибыль","Выбрать самое перспективное направление","Составить план заработка на следующие 30 дней","Подвести итоги и поставить финансовую цель"]}
];

const STORAGE_KEY = "find-extra-money-progress-v1";
let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
const weeksRoot = document.querySelector("#weeks");

function render() {
  weeksRoot.innerHTML = "";
  let dayNumber = 1;
  weeks.forEach((week, weekIndex) => {
    const card = document.createElement("article");
    card.className = "week";
    const firstDay = dayNumber;
    const weekDays = week.days.map((task) => {
      const currentDay = dayNumber++;
      const checked = completed.has(currentDay);
      return `<label class="task ${checked ? "done" : ""}">
        <input type="checkbox" data-day="${currentDay}" ${checked ? "checked" : ""}>
        <span class="task-text"><small>ДЕНЬ ${String(currentDay).padStart(2,"0")}</small>${task}</span>
      </label>`;
    }).join("");
    const count = week.days.filter((_, i) => completed.has(firstDay + i)).length;
    card.innerHTML = `<div class="week-head"><h3>${week.title}</h3><span>${count}/${week.days.length}</span></div>
      <div class="week-progress"><div style="width:${count/week.days.length*100}%"></div></div>${weekDays}`;
    weeksRoot.appendChild(card);
  });
  weeksRoot.querySelectorAll("input[data-day]").forEach(input => {
    input.addEventListener("change", () => {
      const day = Number(input.dataset.day);
      input.checked ? completed.add(day) : completed.delete(day);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
      render();
      updateProgress();
    });
  });
  updateProgress();
}

function updateProgress() {
  const count = completed.size;
  document.querySelector("#progress-count").textContent = `${count} / 30`;
  document.querySelector("#progress-fill").style.width = `${count/30*100}%`;
  document.querySelector("#progress-caption").textContent =
    count === 30 ? "Отличная работа! Теперь закрепи результат и продолжай." :
    count === 0 ? "Начни с первого задания — всё получится." :
    `Выполнено ${count} из 30 заданий. Продолжай в своём темпе!`;
}

document.querySelector("#reset-button").addEventListener("click", () => {
  if (confirm("Сбросить все отметки? Это действие нельзя отменить.")) {
    completed.clear();
    localStorage.removeItem(STORAGE_KEY);
    render();
  }
});

render();
