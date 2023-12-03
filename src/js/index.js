// import response from './data.json';

const response = [
  {
    location_name: 'Central Hub',
    location_id: 1,
    main_statistics: {
      qty_new_users: 15,
      qty_used_chips: 120,
      qty_created_chips: 140,
    },
    worker_statistics: [
      {
        worker_name: 'Alice Johnson',
        qty_added_worker: 5,
        worker_username: 'alice_j',
        qty_used_chips: 60,
        qty_created_chips: 70,
      },
      {
        worker_name: 'Bob Smith',
        qty_added_worker: 10,
        worker_username: 'bob_smith88',
        qty_used_chips: 60,
        qty_created_chips: 70,
      },
    ],
  },
  {
    location_name: 'East Wing',
    location_id: 2,
    main_statistics: {
      qty_new_users: 10,
      qty_used_chips: 100,
      qty_created_chips: 110,
    },
    worker_statistics: [
      {
        worker_name: 'Carol White',
        qty_added_worker: 6,
        worker_username: 'cwhite',
        qty_used_chips: 50,
        qty_created_chips: 55,
      },
      {
        worker_name: 'Dave Brown',
        qty_added_worker: 4,
        worker_username: 'daveb2023',
        qty_used_chips: 50,
        qty_created_chips: 55,
      },
    ],
  },
];

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
        label: 'Нових користувачів',
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
        label: 'Використаних фішок',
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
        label: 'Створених фішок',
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
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stat-icons">
              <mask id="mask0_2996_16661" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.164917" y="0.0319824" width="23.9362" height="23.9362" fill="#D9D9D9"/>
              </mask>
              g mask="url(#mask0_2996_16661)">
              <path d="M12.6317 11.9503C13.1137 11.4184 13.4836 10.8117 13.7412 10.1302C13.9989 9.44868 14.1277 8.74223 14.1277 8.01085C14.1277 7.27946 13.9989 6.57301 13.7412 5.8915C13.4836 5.20998 13.1137 4.60327 12.6317 4.07135C13.629 4.20433 14.4601 4.64482 15.125 5.39283C15.7899 6.14083 16.1224 7.01351 16.1224 8.01085C16.1224 9.00819 15.7899 9.88086 15.125 10.6289C14.4601 11.3769 13.629 11.8174 12.6317 11.9503ZM18.117 19.9789V16.9869C18.117 16.3885 17.9841 15.8192 17.7181 15.279C17.4522 14.7387 17.1031 14.2608 16.6709 13.8453C17.5186 14.1445 18.304 14.531 19.0271 15.0047C19.7502 15.4784 20.1117 16.1392 20.1117 16.9869V19.9789H18.117ZM20.1117 12.9975V11.0029H18.117V9.00819H20.1117V7.01351H22.1064V9.00819H24.1011V11.0029H22.1064V12.9975H20.1117ZM8.14364 12.0002C7.04657 12.0002 6.1074 11.6096 5.32615 10.8283C4.5449 10.0471 4.15428 9.10792 4.15428 8.01085C4.15428 6.91377 4.5449 5.97461 5.32615 5.19336C6.1074 4.41211 7.04657 4.02148 8.14364 4.02148C9.24072 4.02148 10.1799 4.41211 10.9611 5.19336C11.7424 5.97461 12.133 6.91377 12.133 8.01085C12.133 9.10792 11.7424 10.0471 10.9611 10.8283C10.1799 11.6096 9.24072 12.0002 8.14364 12.0002ZM0.164917 19.9789V17.1864C0.164917 16.6212 0.310362 16.1018 0.601253 15.628C0.892144 15.1543 1.27861 14.7928 1.76066 14.5434C2.79125 14.0281 3.83845 13.6417 4.90228 13.384C5.96611 13.1264 7.04657 12.9975 8.14364 12.9975C9.24072 12.9975 10.3212 13.1264 11.385 13.384C12.4488 13.6417 13.496 14.0281 14.5266 14.5434C15.0087 14.7928 15.3951 15.1543 15.686 15.628C15.9769 16.1018 16.1224 16.6212 16.1224 17.1864V19.9789H0.164917ZM8.14364 10.0055C8.69218 10.0055 9.16176 9.81021 9.55238 9.41959C9.94301 9.02896 10.1383 8.55938 10.1383 8.01085C10.1383 7.46231 9.94301 6.99273 9.55238 6.6021C9.16176 6.21148 8.69218 6.01617 8.14364 6.01617C7.5951 6.01617 7.12552 6.21148 6.7349 6.6021C6.34427 6.99273 6.14896 7.46231 6.14896 8.01085C6.14896 8.55938 6.34427 9.02896 6.7349 9.41959C7.12552 9.81021 7.5951 10.0055 8.14364 10.0055ZM2.1596 17.9843H14.1277V17.1864C14.1277 17.0035 14.082 16.8373 13.9905 16.6877C13.8991 16.5381 13.7786 16.4218 13.629 16.3386C12.7314 15.8898 11.8255 15.5532 10.9113 15.3288C9.99703 15.1044 9.07449 14.9922 8.14364 14.9922C7.21279 14.9922 6.29025 15.1044 5.37602 15.3288C4.46179 15.5532 3.55587 15.8898 2.65827 16.3386C2.50867 16.4218 2.38816 16.5381 2.29673 16.6877C2.20531 16.8373 2.1596 17.0035 2.1596 17.1864V17.9843Z" fill="#1A202C"/>
              </g>
            </svg>
          </div>
          <p class="subscription">Нові користувачі</p>
        </div>
        <div class="table-stat-container">
          <div class="table-stat-item-container">
            <p class="table-stat-info">${
              data.main_statistics.qty_used_chips
            }</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="stat-icons">
            <path d="M9.00268 14.9867H10.9974V10.9974H14.9867V9.00268H10.9974V5.01331H9.00268V9.00268H5.01331V10.9974H9.00268V14.9867ZM10 19.9734C8.62036 19.9734 7.32382 19.7116 6.11039 19.188C4.89696 18.6644 3.84144 17.9538 2.94383 17.0562C2.04623 16.1586 1.33562 15.1031 0.812017 13.8896C0.288413 12.6762 0.0266113 11.3797 0.0266113 10C0.0266113 8.62036 0.288413 7.32382 0.812017 6.11039C1.33562 4.89696 2.04623 3.84144 2.94383 2.94383C3.84144 2.04623 4.89696 1.33562 6.11039 0.812017C7.32382 0.288413 8.62036 0.0266113 10 0.0266113C11.3797 0.0266113 12.6762 0.288413 13.8896 0.812017C15.1031 1.33562 16.1586 2.04623 17.0562 2.94383C17.9538 3.84144 18.6644 4.89696 19.188 6.11039C19.7116 7.32382 19.9734 8.62036 19.9734 10C19.9734 11.3797 19.7116 12.6762 19.188 13.8896C18.6644 15.1031 17.9538 16.1586 17.0562 17.0562C16.1586 17.9538 15.1031 18.6644 13.8896 19.188C12.6762 19.7116 11.3797 19.9734 10 19.9734ZM10 17.9787C12.2274 17.9787 14.114 17.2058 15.6599 15.6599C17.2058 14.114 17.9787 12.2274 17.9787 10C17.9787 7.77262 17.2058 5.88599 15.6599 4.34011C14.114 2.79423 12.2274 2.02129 10 2.02129C7.77262 2.02129 5.88599 2.79423 4.34011 4.34011C2.79423 5.88599 2.02129 7.77262 2.02129 10C2.02129 12.2274 2.79423 14.114 4.34011 15.6599C5.88599 17.2058 7.77262 17.9787 10 17.9787Z" fill="#4A5568"/>
            </svg>
          </div>
          <p class="subscription">Використані фішки</p>
        </div>
        <div class="table-stat-container">
          <div class="table-stat-item-container">
            <p class="table-stat-info">${data.main_statistics.qty_new_users}</p>
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="stat-icons">
              <path d="M5.88026 10.9974H15.8537V9.00268H5.88026V10.9974ZM10.867 19.9734C9.4873 19.9734 8.19076 19.7116 6.97733 19.188C5.7639 18.6644 4.70838 17.9538 3.81078 17.0562C2.91317 16.1586 2.20256 15.1031 1.67896 13.8896C1.15536 12.6762 0.893555 11.3797 0.893555 10C0.893555 8.62036 1.15536 7.32382 1.67896 6.11039C2.20256 4.89696 2.91317 3.84144 3.81078 2.94383C4.70838 2.04623 5.7639 1.33562 6.97733 0.812017C8.19076 0.288413 9.4873 0.0266113 10.867 0.0266113C12.2466 0.0266113 13.5432 0.288413 14.7566 0.812017C15.97 1.33562 17.0255 2.04623 17.9231 2.94383C18.8207 3.84144 19.5314 4.89696 20.055 6.11039C20.5786 7.32382 20.8404 8.62036 20.8404 10C20.8404 11.3797 20.5786 12.6762 20.055 13.8896C19.5314 15.1031 18.8207 16.1586 17.9231 17.0562C17.0255 17.9538 15.97 18.6644 14.7566 19.188C13.5432 19.7116 12.2466 19.9734 10.867 19.9734ZM10.867 17.9787C13.0944 17.9787 14.981 17.2058 16.5269 15.6599C18.0727 14.114 18.8457 12.2274 18.8457 10C18.8457 7.77262 18.0727 5.88599 16.5269 4.34011C14.981 2.79423 13.0944 2.02129 10.867 2.02129C8.63956 2.02129 6.75293 2.79423 5.20705 4.34011C3.66117 5.88599 2.88824 7.77262 2.88824 10C2.88824 12.2274 3.66117 14.114 5.20705 15.6599C6.75293 17.2058 8.63956 17.9787 10.867 17.9787Z" fill="#4A5568"/>
            </svg>
          </div>
          <p class="subscription">Створені фішки</p>
        </div>
        </div>
      </div>
      <div class="stat-bar">
        <p class="stat-bar-text">Статистика за працівниками</p>
        <button type="button" class="stat">
      <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.09 0.589844L6.5 5.16984L1.91 0.589844L0.5 1.99984L6.5 7.99984L12.5 1.99984L11.09 0.589844Z" fill="black"/>
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
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="bar-icon">
              <mask id="mask0_2996_16661" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.164917" y="0.0319824" width="23.9362" height="23.9362" fill="#D9D9D9"/>
              </mask>
              g mask="url(#mask0_2996_16661)">
              <path d="M12.6317 11.9503C13.1137 11.4184 13.4836 10.8117 13.7412 10.1302C13.9989 9.44868 14.1277 8.74223 14.1277 8.01085C14.1277 7.27946 13.9989 6.57301 13.7412 5.8915C13.4836 5.20998 13.1137 4.60327 12.6317 4.07135C13.629 4.20433 14.4601 4.64482 15.125 5.39283C15.7899 6.14083 16.1224 7.01351 16.1224 8.01085C16.1224 9.00819 15.7899 9.88086 15.125 10.6289C14.4601 11.3769 13.629 11.8174 12.6317 11.9503ZM18.117 19.9789V16.9869C18.117 16.3885 17.9841 15.8192 17.7181 15.279C17.4522 14.7387 17.1031 14.2608 16.6709 13.8453C17.5186 14.1445 18.304 14.531 19.0271 15.0047C19.7502 15.4784 20.1117 16.1392 20.1117 16.9869V19.9789H18.117ZM20.1117 12.9975V11.0029H18.117V9.00819H20.1117V7.01351H22.1064V9.00819H24.1011V11.0029H22.1064V12.9975H20.1117ZM8.14364 12.0002C7.04657 12.0002 6.1074 11.6096 5.32615 10.8283C4.5449 10.0471 4.15428 9.10792 4.15428 8.01085C4.15428 6.91377 4.5449 5.97461 5.32615 5.19336C6.1074 4.41211 7.04657 4.02148 8.14364 4.02148C9.24072 4.02148 10.1799 4.41211 10.9611 5.19336C11.7424 5.97461 12.133 6.91377 12.133 8.01085C12.133 9.10792 11.7424 10.0471 10.9611 10.8283C10.1799 11.6096 9.24072 12.0002 8.14364 12.0002ZM0.164917 19.9789V17.1864C0.164917 16.6212 0.310362 16.1018 0.601253 15.628C0.892144 15.1543 1.27861 14.7928 1.76066 14.5434C2.79125 14.0281 3.83845 13.6417 4.90228 13.384C5.96611 13.1264 7.04657 12.9975 8.14364 12.9975C9.24072 12.9975 10.3212 13.1264 11.385 13.384C12.4488 13.6417 13.496 14.0281 14.5266 14.5434C15.0087 14.7928 15.3951 15.1543 15.686 15.628C15.9769 16.1018 16.1224 16.6212 16.1224 17.1864V19.9789H0.164917ZM8.14364 10.0055C8.69218 10.0055 9.16176 9.81021 9.55238 9.41959C9.94301 9.02896 10.1383 8.55938 10.1383 8.01085C10.1383 7.46231 9.94301 6.99273 9.55238 6.6021C9.16176 6.21148 8.69218 6.01617 8.14364 6.01617C7.5951 6.01617 7.12552 6.21148 6.7349 6.6021C6.34427 6.99273 6.14896 7.46231 6.14896 8.01085C6.14896 8.55938 6.34427 9.02896 6.7349 9.41959C7.12552 9.81021 7.5951 10.0055 8.14364 10.0055ZM2.1596 17.9843H14.1277V17.1864C14.1277 17.0035 14.082 16.8373 13.9905 16.6877C13.8991 16.5381 13.7786 16.4218 13.629 16.3386C12.7314 15.8898 11.8255 15.5532 10.9113 15.3288C9.99703 15.1044 9.07449 14.9922 8.14364 14.9922C7.21279 14.9922 6.29025 15.1044 5.37602 15.3288C4.46179 15.5532 3.55587 15.8898 2.65827 16.3386C2.50867 16.4218 2.38816 16.5381 2.29673 16.6877C2.20531 16.8373 2.1596 17.0035 2.1596 17.1864V17.9843Z" fill="#1A202C"/>
              </g>
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="bar-icon">
            <path d="M9.00268 14.9867H10.9974V10.9974H14.9867V9.00268H10.9974V5.01331H9.00268V9.00268H5.01331V10.9974H9.00268V14.9867ZM10 19.9734C8.62036 19.9734 7.32382 19.7116 6.11039 19.188C4.89696 18.6644 3.84144 17.9538 2.94383 17.0562C2.04623 16.1586 1.33562 15.1031 0.812017 13.8896C0.288413 12.6762 0.0266113 11.3797 0.0266113 10C0.0266113 8.62036 0.288413 7.32382 0.812017 6.11039C1.33562 4.89696 2.04623 3.84144 2.94383 2.94383C3.84144 2.04623 4.89696 1.33562 6.11039 0.812017C7.32382 0.288413 8.62036 0.0266113 10 0.0266113C11.3797 0.0266113 12.6762 0.288413 13.8896 0.812017C15.1031 1.33562 16.1586 2.04623 17.0562 2.94383C17.9538 3.84144 18.6644 4.89696 19.188 6.11039C19.7116 7.32382 19.9734 8.62036 19.9734 10C19.9734 11.3797 19.7116 12.6762 19.188 13.8896C18.6644 15.1031 17.9538 16.1586 17.0562 17.0562C16.1586 17.9538 15.1031 18.6644 13.8896 19.188C12.6762 19.7116 11.3797 19.9734 10 19.9734ZM10 17.9787C12.2274 17.9787 14.114 17.2058 15.6599 15.6599C17.2058 14.114 17.9787 12.2274 17.9787 10C17.9787 7.77262 17.2058 5.88599 15.6599 4.34011C14.114 2.79423 12.2274 2.02129 10 2.02129C7.77262 2.02129 5.88599 2.79423 4.34011 4.34011C2.79423 5.88599 2.02129 7.77262 2.02129 10C2.02129 12.2274 2.79423 14.114 4.34011 15.6599C5.88599 17.2058 7.77262 17.9787 10 17.9787Z" fill="#4A5568"/>
            </svg>
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="bar-icon">
              <path d="M5.88026 10.9974H15.8537V9.00268H5.88026V10.9974ZM10.867 19.9734C9.4873 19.9734 8.19076 19.7116 6.97733 19.188C5.7639 18.6644 4.70838 17.9538 3.81078 17.0562C2.91317 16.1586 2.20256 15.1031 1.67896 13.8896C1.15536 12.6762 0.893555 11.3797 0.893555 10C0.893555 8.62036 1.15536 7.32382 1.67896 6.11039C2.20256 4.89696 2.91317 3.84144 3.81078 2.94383C4.70838 2.04623 5.7639 1.33562 6.97733 0.812017C8.19076 0.288413 9.4873 0.0266113 10.867 0.0266113C12.2466 0.0266113 13.5432 0.288413 14.7566 0.812017C15.97 1.33562 17.0255 2.04623 17.9231 2.94383C18.8207 3.84144 19.5314 4.89696 20.055 6.11039C20.5786 7.32382 20.8404 8.62036 20.8404 10C20.8404 11.3797 20.5786 12.6762 20.055 13.8896C19.5314 15.1031 18.8207 16.1586 17.9231 17.0562C17.0255 17.9538 15.97 18.6644 14.7566 19.188C13.5432 19.7116 12.2466 19.9734 10.867 19.9734ZM10.867 17.9787C13.0944 17.9787 14.981 17.2058 16.5269 15.6599C18.0727 14.114 18.8457 12.2274 18.8457 10C18.8457 7.77262 18.0727 5.88599 16.5269 4.34011C14.981 2.79423 13.0944 2.02129 10.867 2.02129C8.63956 2.02129 6.75293 2.79423 5.20705 4.34011C3.66117 5.88599 2.88824 7.77262 2.88824 10C2.88824 12.2274 3.66117 14.114 5.20705 15.6599C6.75293 17.2058 8.63956 17.9787 10.867 17.9787Z" fill="#4A5568"/>
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
