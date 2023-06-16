document.addEventListener("DOMContentLoaded", function () {
    const includeDivs = document.querySelectorAll('[data-include]');
    Array.from(includeDivs).forEach(function (div) {
      const file = div.getAttribute('data-include');
      fetch(file)
        .then(function (response) {
          return response.text();
        })
        .then(function (html) {
          div.innerHTML = html;
        });
    });
  });
  