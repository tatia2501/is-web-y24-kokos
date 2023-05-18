const getFaq = async () => {
  return await fetch(`/faq/show_all`)
    .then(response => response.json());
}

const container = document.getElementById('faq_info');
const template_faq = document.getElementById("faq_temp");

const loadFaq = async () => {
  try {
    const data = (await getFaq()).slice();
    container.innerHTML = '';
    for (const item of data) {
      const faq = template_faq.content.cloneNode(true);
      let p = faq.querySelectorAll("p");
      p[0].textContent = item.question;
      p[1].textContent = item.answer;
      container.appendChild(faq);
    }
  } catch(e) {}
}

loadFaq();