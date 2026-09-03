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

//출판사에서 자신있게 추천해요
async function section3Book(){
    const queries = ['오디세이아(고대 그리스어 완역본)','첫째 아이 마음 아프지 않게, 둘째 아이 마음 흔들리지 않게','뚝딱 바로 써먹는 AI 실무 엑셀 : 챗GPT · 제미나이 · 코파일럿','똑똑한 사람은 어떻게 말하는가','머니 트렌드 2027','인 더 메가처치']

    const slideContents = document.querySelectorAll('.section3_book')
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
section3Book();

// 트렌드+ 
async function renderRecommendBooks(){
    const queries = [
        '기쁨에도 슬픔에도 아랑곳 없이','신경끄기의 기술(한교동 에디션)','도그 스타','오늘은 좀 돌아가 볼까',
        '존재의 세 가지 거짓말','초밥이 여행을 갔어요','지능 파산','생각을 외주화한 사람들',
        '사고외주','룩 백','이상한 지도','날마다 구름 한점',
        '마음의 어휘력','자유민주주의에 무슨 일이 일어났는가?','시작이 준비를 이긴다'
    ];

    const slideContents = document.querySelectorAll('.recommend_Slider .swiper-slide');

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

//교보문고가 만들었어요
async function kyoboBooks(){
    const queries = ['투명한 나선','이효석문학상 수상작품집 2026','감정을 읽는 사람은 다르게 말한다','조선범죄실록','연금술사','웃는 숲','열람 엄금','머니쇼크','이웃집의 탐스러움','첫째 아이 마음 아프지 않게, 둘째 아이 마음 흔들리지 않게','우리가 사랑한 도시','근접한 세계'];
    const slideContents = document.querySelectorAll('#kyobo_slider .slide_content');
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
kyoboBooks();


// 사람들이 많이 찾고있어요
async function HighDemmandBook(){
    const queries = ['투명한 나선','시대예보: 수고인류의 시간','절창(화이트 에디션','칵테일을 마시는 철학자들','신경 끄기의 기술(한교동 에디션)','오뒷세이아']

    const slideContents = document.querySelectorAll('.section4_book')
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
HighDemmandBook();

//AI추천 Picks
async function AIRecommendBook(){
    const queries = ['한 권으로 끝내는 오디세이아','투명한 나선','코스모스','조용히 해내는사람']

    const slideContents = document.querySelectorAll('.section5_book')
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
AIRecommendBook();

//바로출판 POD
async function PODBook(){
    const queries = ['1991 청춘연감','자녀의 12년 수학을 설계한다','바통터치 (제5판) - 영어 임용고시 서술형 답 쓰는 방법 (7개년)','초등 6년을 이끄는 7세 자존감','[개정증보판] 기업업무와 리스크 매니지먼트','지금이라도 대비하라','완벽한 몰입 설계']

    const slideContents = document.querySelectorAll('.POD_Swiper .swiper-slide')
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
PODBook();

// 슬라이드 설정
const s1Swiper = new Swiper('.s1Swiper', {
    slidesPerView: 1,
    grabCursor: true,
    threshold: 10,
    resistanceRatio: 0.85
});


// 트렌드+
const recommendSwiper = new Swiper('#recommend_slider .recommend_Slider', {
    slidesPerView: 6,
    slidesPerGroup: 6,
    navigation: {
        nextEl: '#recommend_slider .swiper-button-next',
        prevEl: '#recommend_slider .swiper-button-prev'
    }
});


// Book Performance
const performanceSwiper = new Swiper('#performance_slider .performance_Slider', {
    slidesPerView: 1,

    navigation: {
        nextEl: '#performance_slider .swiper-button-next',
        prevEl: '#performance_slider .swiper-button-prev'
    }
});


// 나만의 취향으로 가득 채운 책상 풍경
const mychoiceSwiper = new Swiper('#mychoice .mychoice_Slider', {
    slidesPerView: 1,

    navigation: {
        nextEl: '#mychoice .swiper-button-next',
        prevEl: '#mychoice .swiper-button-prev'
    }
});

// 교보문고가 만들었어요
const kyoboSwiper = new Swiper('#kyobo_slider .kyobo_Slider', {
    slidesPerView: 1,

    navigation: {
        nextEl: '#kyobo_slider .swiper-button-next',
        prevEl: '#kyobo_slider .swiper-button-prev'
    }
});

//바로출판 POD
var swiper = new Swiper('.POD_Swiper', {
    slidesPerView: 6,
    navigation: {
      nextEl: '#POD .swiper-button-next',
      prevEl: '#POD .swiper-button-prev',
    },
});

var swiper = new Swiper('.Casting_Swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    navigation: {
      nextEl: '#casting .swiper-button-next',
      prevEl: '#casting .swiper-button-prev',
    },
});