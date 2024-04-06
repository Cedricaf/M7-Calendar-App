
function createNewPost(data) {
  const randomIndex = Math.floor(Math.random() * data.length);

  const newItem = document.createElement('div');
  newItem.classList.add('container');
  
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img_container');
  
  const img = document.createElement('img');
  img.setAttribute('src', 'https://thispersondoesnotexist.com/');
  img.setAttribute('alt', '');
  img.classList.add('img');
  
  const username = document.createElement('h2');
  username.classList.add('username');
  username.innerText = data[randomIndex].username;
  
  const date = document.createElement('h3');
  date.classList.add('date');
  date.innerText = data[randomIndex].date;
  
  const text = document.createElement('p');
  text.classList.add('text');
  text.innerText = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum veniam facere iusto sapiente nisi odit repellat eum iste nostrum aperiam placeat, sequi a natus similique, tempora quis aliquam molestiae excepturi.';

  imgContainer.appendChild(img);
  newItem.appendChild(imgContainer);
  newItem.appendChild(username);
  newItem.appendChild(date);
  newItem.appendChild(text);
  
  document.body.insertBefore(newItem, document.querySelector('footer'));
}

fetch('MOCK_DATA.json')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      createNewPost(data);
  })
  .catch(error => {
      console.error('There was a problem fetching the data:', error);
  });


const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0 
};


function handleIntersection(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          fetch('MOCK_DATA.json')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response');
                  }
                  return response.json();
              })
              .then(data => {
                  createNewPost(data);
              })
              .catch(error => {
                  console.error('There was a problem fetching the data:', error);
              });
      }
  });
}

const observer = new IntersectionObserver(handleIntersection, options);
const targetElement = document.querySelector('footer');


if (targetElement) {
  observer.observe(targetElement);
} else {
  console.error('Target element not found.');
}
