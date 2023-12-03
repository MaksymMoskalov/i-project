import { createCards, clearMarkup, addMarkup } from '../markup/markup';
import response from './data.json';
import Chart from 'chart.js/auto';

const newUserEl = document.getElementById('newUsers').getContext('2d');
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

const usedTipsEl = document.getElementById('usedTips').getContext('2d');
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

const createdTipsEl = document.getElementById('createrdTips').getContext('2d');
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

const companyEl = document.getElementById('companyName');

const newUserMark = response
  .map(data => {
    return `<div class="company-stat">
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
             .join('')}</ul>`;
  })
  .join('');

companyEl.insertAdjacentHTML('beforeend', newUserMark);

const usedTipsInfoEl = document.getElementById('usedTipsInfo');
const usedTipsMark = response
  .map(data => {
    return `<div class="company-stat">
          <p class="company-name">${data.location_name}</p>
           <p class="company-total">${data.main_statistics.qty_new_users}</p>
           </div>
           <ul class="workers-list">${data.worker_statistics
             .map(stat => {
               return `<li class="workers-item">
             <p class="company-text">${stat.worker_name}</p>
           <p class="company-text">${stat.qty_used_chips}</p>
           </li>`;
             })
             .join('')}</ul>`;
  })
  .join('');
usedTipsInfoEl.insertAdjacentHTML('beforeend', usedTipsMark);

const createdTipsInfoEl = document.getElementById('createdTipsInfo');
const createdTipsMark = response
  .map(data => {
    return `<div class="company-stat">
          <p class="company-name">${data.location_name}</p>
           <p class="company-total">${data.main_statistics.qty_new_users}</p>
           </div>
           <ul class="workers-list">${data.worker_statistics
             .map(stat => {
               return `<li class="workers-item">
             <p class="company-text">${stat.worker_name}</p>
           <p class="company-text">${stat.qty_created_chips}</p>
           </li>`;
             })
             .join('')}</ul>`;
  })
  .join('');
createdTipsInfoEl.insertAdjacentHTML('beforeend', createdTipsMark);

const tableBtnEl = document.getElementById('tables');
const diagBtnEl = document.getElementById('diags');
const mainEl = document.getElementById('main');

tableBtnEl.addEventListener('click', onTable);

function onTable(e) {
  tableBtnEl.classList.add('active');
  diagBtnEl.classList.remove('active');
  mainEl.innerHTML = '';
}

// function addMarkup(markup, el) {
//   el.insertAdjacentHTML('beforeend', markup);
// }

// const immageGalery = new ImmageGalery();

// formEl.addEventListener('submit', onSubmit);
// loadMoreBtn.addEventListener('click', onLoadMore);

// async function onSubmit(e) {
//   console.log(data);
//   loadMoreBtn.classList.add('is-hidden');
//   e.preventDefault();
//   immageGalery.tag = e.currentTarget.elements.searchQuery.value.trim();
//   if (!e.currentTarget.elements.searchQuery.value.trim()) {
//     return;
//   }
//   clearMarkup(cardsEl);
//   immageGalery.resetPage();

//   try {
//     const cardsData = await immageGalery.getData();
//     console.log(cardsData.total);
//     const markup = createCards(cardsData);
//     addMarkup(markup, cardsEl);
//     if (cardsData.total === 1) {
//       loadMoreBtn.classList.add('is-hidden');
//       return;
//     }
//     loadMoreBtn.classList.remove('is-hidden');
//   } catch (error) {
//     Notiflix.Notify.failure('Woops... something went wrong');
//     loadMoreBtn.classList.add('is-hidden');
//   }
// }

// async function onLoadMore() {
//   try {
//     const cardsData = await immageGalery.getData();
//     const markup = createCards(cardsData);
//     addMarkup(markup, cardsEl);
//   } catch (error) {
//     Notiflix.Notify.failure(
//       "We're sorry, but you've reached the end of search results."
//     );
//     loadMoreBtn.classList.add('is-hidden');
//   }
// }
