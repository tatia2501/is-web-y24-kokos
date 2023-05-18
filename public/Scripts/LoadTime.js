(() => {
    let time = performance.timing;

    window.addEventListener('load', () => {
        const infoParagraph = document.querySelector('#timeinfo');
        infoParagraph.innerHTML += `${(time.loadEventStart - time.navigationStart)} ms (server)`;
    });
})();