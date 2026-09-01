async function bookData(){
    const REST_API_KEY = "db3778f21af2e56296ef15d0efef699f";
    //수정할 부분
    const params = new URLSearchParams({
        target : 'title',
        query : '미움받을 용기',
        size: 6
    });

    //params 조건에 만족하는 책 검색
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        // .books 요소 전체 선택
        const bookElements = document.querySelectorAll(".books");
        // documents 데이터를 각 books에 대응하여 렌더링
        bookElements.forEach((books, i) => {
            const doc = data.documents[i];
            if (!doc) return; // 데이터가 부족할 경우 생략
            // 요소 생성 및 추가
            books.innerHTML = `<img src="${data.documents[i].thumbnail}">
            <h3>${data.documents[i].title}</h3>
            `
        });
    } catch (error) {
        console.log('에러발생', error);
    }
}
bookData();

const swiperEl = document.querySelector('swiper-container');

//슬라이드 설정
function sliderData() {

        const swiper = new Swiper('#slider .mySwiper', {

        navigation: {
            nextEl: '#slider .swiper-button-next',
            prevEl: '#slider .swiper-button-prev',
        },

        pagination: {
            el: '#slider .swiper-pagination',
            clickable: true,
        },

    });

}

sliderData();