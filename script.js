const categories = [
  { name: 'All', count: 17 },
  { name: 'Marketing', count: 4 },
  { name: 'Management', count: 3 },
  { name: 'HR & Recruting', count: 5 },
  { name: 'Design', count: 2 },
  { name: 'Development', count: 3 },
];

const data = [
  {
    img: 'img/c63086c15719088561c8ec14b31455901e6aced2.jpg',
    tag: 'Marketing',
    info: 'The Ultimate Google Ads Training Course',
    price: 100,
    name: 'Jerome Bell',
  },
  {
    img: 'img/4dc0c01cdada93a61e7f51ac6388e22a998e52c3.jpg',
    tag: 'Management',
    info: 'Product Management Fundamentals', // опечатка в макете - поправила
    price: 480,
    name: 'Marvin McKinney',
  },
  {
    img: 'img/1c5469059ec3475582a6f6129b6ad3aed940c4d0.jpg',
    tag: 'HR & Recruting',
    info: 'HR Management and Analytics', // в макете лишний пробел после HR
    price: 200,
    name: 'Leslie Alexander Li',
  },
  {
    img: 'img/e6c7967bad5827ead11861fa456bdb395058c281.jpg',
    tag: 'Marketing',
    info: 'Brand Management & PR Communications',
    price: 530,
    name: 'Kristin Watson',
  },
  {
    img: 'img/1adcaf7957590e8cdfee47506b5afbb5f1d3d251.jpg',
    tag: 'Design',
    info: 'Graphic Design Basic',
    price: 500,
    name: 'Guy Hawkins',
  },
  {
    img: 'img/1959b06e7f5d4163ea9599946af07d3d52f61d21.jpg',
    tag: 'Management',
    info: 'Business Development Management',
    price: 400,
    name: 'Dianne Russell',
  },
  {
    img: 'img/26b7504f2f3ca140714e87c67d19cee808f942e3.jpg',
    tag: 'Development',
    info: 'Highload Software Architecture',
    price: 600,
    name: 'Brooklyn Simmons',
  },
  {
    img: 'img/56e453da1f9df64680ce9ae8deb70c4fd6494a76.jpg',
    tag: 'HR & Recruting',
    info: 'Human Resources – Selection and Recruitment',
    price: 150,
    name: 'Kathryn Murphy',
  },
  {
    img: 'img/39a7972cf1e363e8eb007225e0b26ec15b87aa9b.jpg',
    tag: 'Design',
    info: 'User Experience. Human-centered Design',
    price: 240,
    name: 'Cody Fisher',
  },
];

const categoriesCont = document.querySelector('#coursesCategories');
const searchInput = document.getElementById('searchCourse');
const coursesList = document.getElementById('coursesList');
const loadMoreNode = document.getElementById('loadMoreButton');

let activeCategory = categories[0].name;
let searchFilter = '';

function renderFilterCategories() {
  categories.forEach((category) => {
    const label = document.createElement('div');
    label.innerHTML = `
    <p>${category.name}</p>
    <sup class="courses-info__category-sup">${category.count}</sup>
    `;
    label.className =
      category.name === activeCategory
        ? 'courses-info__category courses-info__category--active'
        : 'courses-info__category';
    categoriesCont.appendChild(label);
  });
}

function renderCards(data) {
  if (coursesList.children) coursesList.innerHTML = '';
  data.forEach((card) => {
    const item = document.createElement('div');
    item.innerHTML = ` 
    <div class="card__image">
      <img 
      src="${card.img}"
      alt='course image' />
    </div>
    <div class="card_info">
      <p class="card_tag card_tag--${detectTagColor(card.tag)}">${card.tag}</p>
       <p class="card_description">${card.info}</p>
      <div class="card_add-info">
        <p class="card__price">$${card.price}</p>
        <div class="vertical-divider"></div>
        <p class="card__name-info">by ${card.name}</p>
      </div>
    </div>
    `;
    item.className = 'card';
    coursesList.appendChild(item);
  });
}

function detectTagColor(tag) {
  let tagTail = '';
  switch (tag) {
    case categories[1].name:
      tagTail = 'marketing';
      break;
    case categories[2].name:
      tagTail = 'management';
      break;
    case categories[3].name:
      tagTail = 'hr';
      break;
    case categories[4].name:
      tagTail = 'design';
      break;
    case categories[5].name:
      tagTail = 'development';
      break;
  }
  return tagTail;
}

function setFilter(name, className = 'courses-info__category--active') {
  const activeLabel = document.querySelector(`.${className}`);
  if (name !== activeCategory) {
    if (activeLabel) activeLabel.classList.remove(className);
    activeCategory = name;
    let newActiveLabel;
    for (let i = 0; i < categoriesCont.children.length; i++) {
      const pForFilter =
        categoriesCont.children[i].querySelector('p').textContent;
      if (pForFilter === activeCategory) {
        newActiveLabel = categoriesCont.children[i];
        break;
      }
    }
    if (newActiveLabel) newActiveLabel.classList.add(className);
  }
  renderCards(filterData());
}

function filterData() {
  let filteredData =
    activeCategory === categories[0].name
      ? data
      : data.filter((i) => i.tag === activeCategory);
  if (searchFilter) {
    const searchToLowerCase = searchFilter.toLowerCase();
    filteredData = filteredData.filter(
      (i) =>
        i.info.toLowerCase().includes(searchToLowerCase) ||
        i.name.toLowerCase().includes(searchToLowerCase) ||
        i.price.toString().includes(searchToLowerCase)
    );
  }

  return filteredData;
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function inputHandler(e) {
  searchFilter = e.target.value;
  renderCards(filterData());
}
const debouncedInputHandler = debounce(inputHandler, 300);

renderFilterCategories();
renderCards(data);
loadMoreNode.className = 'courses-info__load-more';

categoriesCont.addEventListener('click', (e) => {
  const filter = e.target.closest('.courses-info__category');
  if (filter) {
    const filterName = filter.querySelector('p').textContent;
    setFilter(filterName);
  }
});

searchInput.addEventListener('input', (e) => debouncedInputHandler(e));
