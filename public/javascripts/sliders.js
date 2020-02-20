if (document.querySelectorAll('.glide').length) {

  new Glide('.glide1', {
    type: 'slider',
    startAt: 0,
    perView: 3
  }).mount().setActive()
    ;

}

if (document.querySelectorAll('.glide1').length) {

  new Glide('.glide2', {
    type: 'slider',
    startAt: 0,
    perView: 3
  }).mount();

}

if (document.querySelectorAll('.glide1').length) {

  new Glide('.glide3', {
    type: 'carousel',
    startAt: 0,
    perView: 6
  }).mount()
}