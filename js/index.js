async function bookData(query){
    const REST_API_KEY = "db3778f21af2e56296ef15d0efef699f";
    const params = new URLSearchParams({
        target: 'title',
        query: query,
        size: 1
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `KakaoAK ${REST_API_KEY}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }
        const data = await response.json();
        return data.documents[0] || null;
    } catch (error) {
        console.log('에러발생', error);
        return null;
    }
}

// 트렌드+ 
async function renderRecommendBooks(){
    const queries = [
        '기쁨에도 슬픔에도 아랑곳 없이','신경끄기의 기술(한교동 에디션)','도그 스타','오늘은 좀 돌아가 볼까',
        '존재의 세 가지 거짓말','초밥이 여행을 갔어요','지능 파산','생각을 외주화한 사람들',
        '사고외주','룩 백','이상한 지도','날마다 구름 한점',
        '마음의 어휘력','자유민주주의에 무슨 일이 일어났는가?','시작이 준비를 이긴다'
    ];

    const slideContents = document.querySelectorAll('.recommend_Slider .slide_content');

    const results = await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {
        const book = results[i];
        if (!book) return;
        el.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title}">
            <p>${book.title}</p>
        `;
    });
}

renderRecommendBooks();

//Book Performance
async function PerformanceBooks(){
    const queries = ['칵테일, 러브, 좀비 (리커버)', '치즈 이야기', '지구 끝의 온실','해파리 만개' ,'태양 아래 올리브', '구의 증명(리커버판)','단 한 사람'];
    const slideContents = document.querySelectorAll('#performance_slider .slide_content');
    const results = await Promise.all(queries.map(q => bookData(q)));
    slideContents.forEach((el, i) => {
        const book = results[i];
        if (!book) return;
        el.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title}">
            <p>${book.title}</p>
        `;
    });
}
PerformanceBooks();



//슬라이드 설정
var swiper = new Swiper('.s1Swiper', {
    slidesPerView: 1,
    grabCursor: true,
    threshold: 10,
    resistanceRatio: 0.85,
});

var recommendSwiper = new Swiper('.recommend_Slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '#recommend_slider .swiper-button-next',
        prevEl: '#recommend_slider .swiper-button-prev',
    },
    pagination: {
        el: '#recommend_slider .swiper-pagination',
        clickable: true,
    },
});

//Performance Swiper
var recommendSwiper = new Swiper('.recommend_Slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '#performance_slider .swiper-button-next',
        prevEl: '#performance_slider .swiper-button-prev',
    },
    pagination: {
        el: '#performance_slider .swiper-pagination',
        clickable: true,
    },
});