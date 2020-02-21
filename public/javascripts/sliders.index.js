console.log("entra en el script Sliders");

if (document.querySelectorAll(".glide").length) {
  new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    perView: 6
  }).mount();
}

if (document.querySelectorAll(".glide2").length) {
  new Glide(".glide2", {
    type: "carousel",
    startAt: 7,
    perView: 6
  }).mount();
}

if (document.querySelectorAll(".glide3").length) {
  new Glide(".glide3", {
    type: "carousel",
    startAt: 0,
    perView: 6
  }).mount();
}

// if (document.querySelectorAll('.glide1').length) {

//   new Glide('.glide3', {
//     type: 'carousel',
//     startAt: 0,
//     perView: 6
//   }).mount()
// }
