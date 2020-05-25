
let btn = document.getElementById('btn');
let urlUserName = document.getElementById("user");

btn.addEventListener('click', () => {
  // Генерация URL с именем пользователя
  let myURL = `https://page.com&username=${urlUserName.value}`

  // Взятие элементов из разметки
  const userAvatar = document.querySelector('.avatar')
  const userName = document.querySelector('.user__name')
  const userAbout = document.querySelector('.user__about')
  const userCard = document.querySelector('.user-card')

  // Поиск username в URL 
  let searchParameters = new URLSearchParams(myURL);
  let name = searchParameters.get('username');
  let gitURL = `https://api.github.com/users/${name}`;

  if (name == "") {
    userCard.innerHTML = "Введите имя пользователя в адресную строку";
  } else {
    fetch(gitURL)
      .then(response => response.json())
      .then(json => {
        console.log(gitURL);
        console.log(json)
        console.log("json avatar_url", json.avatar_url)
        userAvatar.src = json.avatar_url;
        userName.innerHTML = json.name;
        userName.href = `https://github.com/${json.login}`;
        
        if (json.bio === null) {
          userAbout.innerHTML = "Пользователь не оставил инфо о себе"
        } else {
          userAbout.innerHTML = json.bio;
        }
      })
      .catch(err => {
        console.log(err)
        userCard.innerHTML = "Не удалось";
      })
  }
})
