$(function() {

  $('.menu__btn').on('click', function(event){
    $('.menu__btn').toggleClass('menu__btn--active');
    $('.header__menu-list').toggleClass('menu__list--active');
    $('body').toggleClass('lock');
  });

  $('.toggle__show-btn').on('click', function(){
    $('.show').slideToggle('200').toggleClass('active');
    $('.open').slideToggle('200').toggleClass('active');
  });

  $('input, select').styler()

  //Подписка 
  $('.getCancel').magnificPopup();
  
  $('.RefreshData').magnificPopup();
  
}); 