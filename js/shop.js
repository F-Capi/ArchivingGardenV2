var swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    speed: 1000,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        slideChange: function () {
            var activeSlide = this.slides[this.activeIndex];
            var productName = activeSlide.getAttribute('data-name');
            var productNumber = activeSlide.getAttribute('data-number');
            document.getElementById('product-name').textContent = productName;
            document.getElementById('n-product').textContent = productNumber;
        }
    }
});
