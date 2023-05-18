const getSpecials = async () => {
  return await fetch(`/special-offer`).then((response) => response.json());
};

const container = document.getElementById('specials_info');
const template_specials = document.getElementById('specials_temp');

const loadSpecials = async () => {
  try {
    const data = (await getSpecials()).slice();
    container.innerHTML = '';
    for (const item of data) {
      const specialOffer = template_specials.content.cloneNode(true);
      let pic = specialOffer.getElementById('specials_img');
      pic.src = item.picture;
      let h1 = specialOffer.getElementById('specials_h1');
      h1.textContent = item.name;
      let h2 = specialOffer.getElementById('specials_h2');
      h2.textContent = item.description;
      container.appendChild(specialOffer);
    }
  } catch (e) {}
};

loadSpecials();
