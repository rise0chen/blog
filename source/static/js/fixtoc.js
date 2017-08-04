var fixToc = function() {
  var scroll = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
  var winHeight;
  var fixedToc = document.getElementById("toc");
  var changeSize = document.getElementById("header").offsetHeight + document.getElementById("sidebar").offsetHeight;

  scroll >= changeSize ? addClass(fixedToc, "fixed") : removeClass(fixedToc, "fixed");
  /*
  if (hasClass(fixedToc, "fixed")){
    fixedToc.style.width= document.getElementById("sidebar").offsetWidth+ 'px';
  }
  */
  if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight;
  }
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
  }
  if(fixedToc.offsetHeight > winHeight ) {
    addClass(fixedToc, "scroll");
  }
};
addEvent(window, 'scroll', fixToc);
