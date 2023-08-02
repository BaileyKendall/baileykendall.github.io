const changePage = (pagename) => {
  window.location.hash = `#/GBR.${pagename}`;
  checkPage();
};

const checkPage = () => {
  const { hash } = window.location;
  if (hash) {
    const pagename = hash.split(/\/gbr\./gi)[1];
    if (pagename) {
      $.get(`/assets/html/pages/${pagename.toLowerCase()}.html`)
      .fail((err) => {
        $('.page-content').html('This page could not be found. Please click one of the buttons at the top of the page to go back to safety.');
      })
      .done((res) => {
        let content = res.split('\n'),
            title = content.shift();
        content = content.join('\n');
        $('.title').text(`GBRadio &bullet; ${title}`);
        $('.page-content').html(content);
        $('.nav-link').removeClass('active');
        $(`.nav-link[href="${hash}"]`).addClass('active');
      });
    } else {
      changePage('Home');
    };
  } else {
    changePage('Home');
  };
};

window.onhashchange = checkPage;
checkPage();
