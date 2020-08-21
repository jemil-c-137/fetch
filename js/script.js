let btn = document.getElementById('btn');
let urlUserName = document.getElementById("user");

btn.addEventListener('click', () => {
  // Генерация URL с именем пользователя
  let myURL = `https://page.com&username=${urlUserName.value}`;

  // Поиск username в URL 
  let searchParameters = new URLSearchParams(myURL);
  let name = searchParameters.get('username');
  let gitUrl = `https://api.github.com/users/${name}`;

  // Взятие элементов из разметки
  const userAvatar = document.querySelector('.avatar');
  const userName = document.querySelector('.user__name');
  const userAbout = document.querySelector('.user__about');
  const userEmpty = document.querySelector('.user-card_empty');
  const preloader = document.querySelector('.loader-wrapper');
  const date = document.querySelector('.current-date');


  preloader.classList.add('active');
  setTimeout( () => {
    preloader.classList.remove('active');
  }, 2000)

  if (name !== "") {
    userEmpty.classList.add('deactive');

    const getDate = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(date.innerHTML = new Date());
      }, 2000)
    })

    const getUrl = fetch(gitUrl);

    Promise.all([getDate, getUrl])
      .then(([getDate, gitUrl]) => {
        return gitUrl
      })
      .then(response => response.json())
      .then(json => {
        if (json.message === "Not Found") {
          userEmpty.classList.remove('deactive');
          userEmpty.innerHTML = "Информация о пользователе не доступна";
        } else {
          userName.innerHTML = json.name;
          userName.href = `https://github.com/${json.login}`;

          userAvatar.src = json.avatar_url;

          if (json.bio === null) {
            userAbout.innerHTML = "Пользователь не оставил инфо о себе";
          } else {
            userAbout.innerHTML = json.bio;
          }
        }
      })
      .catch(err => {
        userEmpty.classList.remove('deactive');
        userEmpty.innerHTML = "Информация о пользователе не доступна";
        console.log(err);
      });
  } else if (name == "") {
    userEmpty.innerHTML = "Вы не ввели имя в адрес";
  }
})