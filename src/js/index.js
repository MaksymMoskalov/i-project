import { createCards, clearMarkup, addMarkup } from '../markup/markup';
import response from './data.json';
import Chart from 'chart.js/auto';

const newUserEl = document.getElementById('newUsers').getContext('2d');
const usedTipsEl = document.getElementById('usedTips').getContext('2d');
const createdTipsEl = document.getElementById('createrdTips').getContext('2d');

const tableBtnEl = document.getElementById('tables');
const diagBtnEl = document.getElementById('diags');
const mainEl = document.getElementById('main');
const companyEl = document.getElementById('companyName');
const usedTipsInfoEl = document.getElementById('usedTipsInfo');
const createdTipsInfoEl = document.getElementById('createdTipsInfo');

newUserEl.canvas.parentNode.style.width = '350px';
const nweUserDou = new Chart(newUserEl, {
  type: 'doughnut',
  data: {
    labels: response.map(user => {
      return user.location_name;
    }),
    datasets: [
      {
        label: 'My First Dataset',
        data: response.map(user => {
          return user.main_statistics.qty_new_users;
        }),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
  },
});

usedTipsEl.canvas.parentNode.style.width = '350px';
const usedTipsDou = new Chart(usedTipsEl, {
  type: 'doughnut',
  data: {
    labels: response.map(user => {
      return user.location_name;
    }),
    datasets: [
      {
        label: 'My First Dataset',
        data: response.map(user => {
          return user.main_statistics.qty_used_chips;
        }),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
  },
});

createdTipsEl.canvas.parentNode.style.width = '350px';
createdTipsEl.canvas.parentNode.style.height = '240px';
const createdTipsDou = new Chart(createdTipsEl, {
  type: 'doughnut',
  data: {
    labels: response.map(user => {
      return user.location_name;
    }),
    datasets: [
      {
        label: 'My First Dataset',
        data: response.map(user => {
          return user.main_statistics.qty_created_chips;
        }),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
  },
});

const newUserMark = response
  .map(data => {
    return `
    <div class="company-stat-cover">
    <div class="company-stat">
          <p class="company-name">${data.location_name}</p>
           <p class="company-total">${data.main_statistics.qty_new_users}</p>
           </div>
           <ul class="workers-list">${data.worker_statistics
             .map(stat => {
               return `<li class="workers-item">
             <p class="company-text">${stat.worker_name}</p>
           <p class="company-text">${stat.qty_added_worker}</p>
           </li>`;
             })
             .join('')}</ul>
             </div>`;
  })
  .join('');

companyEl.insertAdjacentHTML('beforeend', newUserMark);

const usedTipsMark = response
  .map(data => {
    return `<div class="company-stat-cover"><div class="company-stat">
          <p class="company-name">${data.location_name}</p>
           <p class="company-total">${data.main_statistics.qty_used_chips}</p>
           </div>
           <ul class="workers-list">${data.worker_statistics
             .map(stat => {
               return `<li class="workers-item">
             <p class="company-text">${stat.worker_name}</p>
           <p class="company-text">${stat.qty_used_chips}</p>
           </li>`;
             })
             .join('')}</ul></div>`;
  })
  .join('');
usedTipsInfoEl.insertAdjacentHTML('beforeend', usedTipsMark);

const createdTipsMark = response
  .map(data => {
    return `<div class="company-stat-cover"><div class="company-stat">
          <p class="company-name">${data.location_name}</p>
           <p class="company-total">${
             data.main_statistics.qty_created_chips
           }</p>
           </div>
           <ul class="workers-list">${data.worker_statistics
             .map(stat => {
               return `<li class="workers-item">
             <p class="company-text">${stat.worker_name}</p>
           <p class="company-text">${stat.qty_created_chips}</p>
           </li>`;
             })
             .join('')}</ul></div>`;
  })
  .join('');
createdTipsInfoEl.insertAdjacentHTML('beforeend', createdTipsMark);

tableBtnEl.addEventListener('click', onTable);
diagBtnEl.addEventListener('click', omDiag);

function omDiag() {
  location.reload();
}

function onTable(e) {
  tableBtnEl.classList.add('active');
  diagBtnEl.classList.remove('active');
  mainEl.innerHTML = '';

  const tableMark = response
    .map(data => {
      return `
      <section class="table-section">
      <div class="table-item">
        <h2 class="table-company">${data.location_name}</h2>
        <div class="table-stat-thumb">
        <div class="table-stat-container">
          <div class="table-stat-item-container">
            <p class="table-stat-info">${data.main_statistics.qty_new_users}</p>
            <svg width="24" height="24" class="stat-icons">
              <use href="/group_add.c3bc265e.svg#people"></use>
            </svg>
          </div>
          <p class="subscription">Нові користувачі</p>
        </div>
        <div class="table-stat-container">
          <div class="table-stat-item-container">
            <p class="table-stat-info">${
              data.main_statistics.qty_used_chips
            }</p>
            <svg width="24" height="24" class="stat-icons">
              <use href="/add_circle.9c1a1a53.svg#plus"></use>
            </svg>
          </div>
          <p class="subscription">Використані фішки</p>
        </div>
        <div class="table-stat-container">
          <div class="table-stat-item-container">
            <p class="table-stat-info">${data.main_statistics.qty_new_users}</p>
            <svg width="24" height="24" class="stat-icons">
              <use href="/do_not_disturb_on.42d89f0f.svg#minus"></use>
            </svg>
          </div>
          <p class="subscription">Створені фішки</p>
        </div>
        </div>
      </div>
      <div class="stat-bar">
        <p class="stat-bar-text">Статистика за працівниками</p>
        <button type="button" class="stat">
        <svg width="12" height="8">
          <use href="/vector.4af5ac68.svg#updown"></use>
        </svg>
        </button>
      </div>

      <div class="stat-bar-container visually-hidden">
        <div class="stat-bar-header">
          <div class="worker-tablet-head">
            <p class="worker-tablet-head-item">Імʼя та</p>
            <p class="worker-tablet-head-item">нік в Telegram</p>
          </div>
          <div class="stat-bar-icons">
            <svg width="24" height="24" class="bar-icon">
              <use href="/group_add.c3bc265e.svg#people"></use>
            </svg>
            <svg width="24" height="24" class="bar-icon">
              <use href="/add_circle.9c1a1a53.svg#plus"></use>
            </svg>
            <svg width="24" height="24" class="bar-icon">
              <use href="/do_not_disturb_on.42d89f0f.svg#minus"></use>
            </svg>
          </div>
        </div>
        ${data.worker_statistics
          .map(stat => {
            return `
          <div class="worker-stat-item">
          <div class="worker-names-container">
            <p class="workers-stat-text">${stat.worker_name}</p>
            <p class="workers-nick">@${stat.worker_username}</p>
          </div>
          <div class="workers-stat-container">
            <p class="workers-stat-text">${stat.qty_added_worker}</p>
            <p class="workers-stat-text">${stat.qty_used_chips}</p>
            <p class="workers-stat-text">${stat.qty_created_chips}</p>
          </div>
        </div>`;
          })
          .join('')}</div>
    </section>
    `;
    })
    .join('');

  mainEl.insertAdjacentHTML('beforeend', tableMark);

  const workerBtns = document.querySelectorAll('.stat');

  const statContainers = document.querySelectorAll('.stat-bar-container');

  workerBtns.forEach((workerBtn, index) => {
    workerBtn.addEventListener('click', e => onWorker(e, index));
  });

  function onWorker(e, index) {
    // Перевіряємо, яку кнопку натиснуто і приховуємо відповідний .stat-bar-container
    statContainers[index].classList.toggle('visually-hidden');
    workerBtns[index].classList.toggle('rotate');
  }
}

const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Додати обробники подій
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закриття модального вікна при кліці поза ним
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Закриття модального вікна при кліці на клавішу Esc
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});
