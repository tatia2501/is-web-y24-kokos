const getUserResr = async () => {
  return await fetch(`/user`);
};

const getUser = async () => {
  return await fetch(`/user`).then((response) => response.json());
};

const container = document.getElementById('user_info');
const template_users = document.getElementById('template');
const template_error = document.getElementById('error');

const loadUser = async () => {
  container.innerHTML =
    '<img src="../Pictures/Gif/LoadCat.gif" width=250 height=200 alt="mask">';

  try {
    const item_resp = await getUserResr();
    if (item_resp.status == 401) {
      window.location.href = '/login';
    } else {
      const item = await getUser();
      container.innerHTML = '';
      const user = template_users.content.cloneNode(true);
      let p = user.querySelectorAll('p');
      p[0].textContent = item.first_name + ' ' + item.second_name;
      p[1].textContent = 'Почта: ' + item.email;
      p[2].textContent = 'Телефон: ' + item.phone;
      container.appendChild(user);
    }
  } catch (e) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.innerHTML = `<img src="../Pictures/Gif/ErrorCat.gif" width=200 height=300 alt="mask">`;
    const error = template_error.content.cloneNode(true);
    container.appendChild(error);
  }
};

const logout = document.getElementById('logout');
logout.addEventListener('click', async () => {
  await supertokensEmailPassword.signOut();
  window.location.href = '/login';
});

loadUser();
