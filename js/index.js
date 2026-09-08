async function bookData(query) {
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
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
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


// ========================================
// 오늘의 선택
// ========================================

async function TC_Book() {

    const queries = [
        '기쁨에도 슬픔에도 아랑곳없이',
        '당신과 내가 대화할 수 있을까',
        '과수원을 지나며',
        '도파민 과잉 시대, 당신의 뇌가 무너진다',
        '궁극의 애니메이션 100',
        '우런니 샌드위치'
    ];

    const results = await Promise.all(
        queries.map(q => bookData(q))
    );

    const wrapper = document.querySelector(
        '#tc_slider .tc_Slider .swiper-wrapper'
    );

    if (!wrapper) {
        console.log('Swiper wrapper를 찾을 수 없습니다.');
        return;
    }

    wrapper.innerHTML = '';

    results.forEach((currentBook, i) => {

        if (!currentBook) return;

        const slide = document.createElement('div');

        slide.className = 'swiper-slide';

        let html = `
            <div class="tc_main_book">

                <!-- 현재 책 이미지 -->
                <img
                    class="tc_main_img"
                    src="${currentBook.thumbnail}"
                    alt="${currentBook.title}"
                >

                <!-- 현재 책 정보 -->
                <div class="tc_book_info">

                    <h3>
                        ${currentBook.title}
                    </h3>

                    <h4>
                        💬 ${currentBook.title}
                    </h4>

                    <p>
                        ${currentBook.contents || ''}
                    </p>

                </div>

                <!-- 다음 책 3개 -->
                <div class="tc_next_books">
        `;

        for (let j = 1; j <= 3; j++) {

            const nextIndex = (i + j) % results.length;

            const nextBook = results[nextIndex];

            if (!nextBook) continue;

            html += `
                    <div class="tc_next_book">

                        <img
                            src="${nextBook.thumbnail}"
                            alt="${nextBook.title}"
                        >

                        <p>
                            ${nextBook.title}
                        </p>

                    </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        slide.innerHTML = html;

        wrapper.appendChild(slide);
    });

    initTCSwiper();
}


function initTCSwiper() {

    new Swiper(
        '#tc_slider .tc_Slider',
        {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            initialSlide: 0,

            navigation: {
                nextEl: '#tc_slider .swiper-button-next',
                prevEl: '#tc_slider .swiper-button-prev'
            },

            observer: true,
            observeParents: true
        }
    );
}


TC_Book();


// ========================================
// MD들이 신중하게 골랐어요
// ========================================

async function MDBook() {

    const queries = [
        '호러는 아니지만 어쩐지',
        '빵,공원,농구하는 소녀',
        '쓰기는 나의 힘',
        '정신 나간 세상에서 아픈 사람들',
        '산산조각 난 아이는 어떻게 자라는가',
        '비전공자도 이해할 수 있는 LLM 수업',
        '어린이 가을말 사전',
        '고가마랑깨',
        '김진순의 인생 레시피 1',
        '트럼프 이후의 질서',
        '행동이 운명을 이긴다',
        '금강반야바라밀경 보탑 사경',
        '2027 해커스공무원 비비안 올인원 영문법 핵심이론+기출문제(9급 공무원)',
        '처음 시작하는 모눈뜨기',
        '설맞이 모의고사 시즌2 2회분 수학영역(2026)(2027 수능대비)(봉투)',
        '일상에서 바로 쓰는 일잘러의 바이브 코딩 활용법',
        '파고드 JLPT N1 VOCA',
        '김병곤의 평생 건강'
    ];

    const slideContents =
        document.querySelectorAll('.md_Slider .swiper-slide');

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


MDBook();


// ========================================
// 출판사에서 자신있게 추천해요
// ========================================

async function section3Book() {

    const queries = [
        '오디세이아(고대 그리스어 완역본)',
        '첫째 아이 마음 아프지 않게, 둘째 아이 마음 흔들리지 않게',
        '뚝딱 바로 써먹는 AI 실무 엑셀 : 챗GPT · 제미나이 · 코파일럿',
        '똑똑한 사람은 어떻게 말하는가',
        '머니 트렌드 2027',
        '인 더 메가처치'
    ];

    const slideContents =
        document.querySelectorAll('.section3_book');

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


section3Book();


// ========================================
// 트렌드+
// ========================================

async function renderRecommendBooks() {

    const queries = [
        '기쁨에도 슬픔에도 아랑곳 없이',
        '신경끄기의 기술(한교동 에디션)',
        '도그 스타',
        '오늘은 좀 돌아가 볼까',
        '존재의 세 가지 거짓말',
        '초밥이 여행을 갔어요',
        '지능 파산',
        '생각을 외주화한 사람들',
        '사고외주',
        '룩 백',
        '이상한 지도',
        '날마다 구름 한점',
        '마음의 어휘력',
        '자유민주주의에 무슨 일이 일어났는가?',
        '시작이 준비를 이긴다'
    ];

    const slideContents =
        document.querySelectorAll(
            '.recommend_Slider .swiper-slide'
        );

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


renderRecommendBooks();

//북 퍼포먼스 예능 읽는 사람들
async function PerformanceBooks(){
    const queries = ['칵테일, 러브, 좀비 (리커버)', '치즈 이야기', '지구 끝의 온실','해파리 만개' ,'태양 아래 올리브', '구의 증명(리커버판)','단 한 사람'];
    const slideContents = document.querySelectorAll('#performance_slider .swiper-slide');
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


// ========================================
// 교보문고가 만들었어요
// ========================================

async function kyoboBooks() {

    const queries = [
        '투명한 나선',
        '이효석문학상 수상작품집 2026',
        '감정을 읽는 사람은 다르게 말한다',
        '조선범죄실록',
        '연금술사',
        '웃는 숲',
        '열람 엄금',
        '머니쇼크',
        '이웃집의 탐스러움',
        '첫째 아이 마음 아프지 않게, 둘째 아이 마음 흔들리지 않게',
        '우리가 사랑한 도시',
        '근접한 세계'
    ];

    const slideContents =
        document.querySelectorAll(
            '#kyobo_slider .slide_content'
        );

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


kyoboBooks();


// ========================================
// 사람들이 많이 찾고 있어요
// ========================================

async function HighDemmandBook() {

    const queries = [
        '투명한 나선',
        '시대예보: 수고인류의 시간',
        '절창(화이트 에디션',
        '칵테일을 마시는 철학자들',
        '신경 끄기의 기술(한교동 에디션)',
        '오뒷세이아'
    ];

    const slideContents =
        document.querySelectorAll('.section4_book');

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


HighDemmandBook();


// ========================================
// AI추천 Picks
// ========================================

async function AIRecommendBook() {

    const queries = [
        '한 권으로 끝내는 오디세이아',
        '투명한 나선',
        '코스모스',
        '조용히 해내는사람'
    ];

    const slideContents =
        document.querySelectorAll('.section5_book');

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


AIRecommendBook();


// ========================================
// 베스트
// ========================================

async function BestBook() {

    const queries = [
        '머니 트렌드 2027',
        '세네카, 오늘을 빼앗기고 있는 당신에게',
        '마음의 어휘력',
        '수족관',
        '안녕,피터팬',
        '싯다르타',
        '똑똑한 사람은 어떻게 말하는가',
        '처음 읽는 그리스 로마 신화 15: 트로이의 마지막 불꽃',
        '그랬다고 적었다',
        '테오'
    ];

    const slideContents =
        document.querySelectorAll('.best_books');

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


BestBook();


// ========================================
// 바로출판 POD
// ========================================

async function PODBook() {

    const queries = [
        '1991 청춘연감',
        '자녀의 12년 수학을 설계한다',
        '바통터치 (제5판) - 영어 임용고시 서술형 답 쓰는 방법 (7개년)',
        '초등 6년을 이끄는 7세 자존감',
        '[개정증보판] 기업업무와 리스크 매니지먼트',
        '지금이라도 대비하라',
        '완벽한 몰입 설계'
    ];

    const slideContents =
        document.querySelectorAll(
            '.POD_Swiper .swiper-slide'
        );

    const results =
        await Promise.all(queries.map(q => bookData(q)));

    slideContents.forEach((el, i) => {

        const book = results[i];

        if (!book) return;

        el.innerHTML = `
            <img
                src="${book.thumbnail}"
                alt="${book.title}"
            >
            <p>${book.title}</p>
        `;
    });
}


PODBook();


// ========================================
// Swiper 설정
// ========================================

// 메인 미션 슬라이드
const s1Swiper = new Swiper('.s1Swiper', {

    slidesPerView: 1,

    grabCursor: true,

    threshold: 10,

    resistanceRatio: 0.85

});


// ========================================
// MD들이 신중하게 골랐어요
// ========================================

const mdSwiper = new Swiper(
    '#md_slider .md_Slider',
    {

        slidesPerView: 6,

        slidesPerGroup: 6,

        navigation: {
            nextEl: '#md_slider .swiper-button-next',
            prevEl: '#md_slider .swiper-button-prev'
        }

    }
);


// ========================================
// 트렌드+
// ========================================

const recommendSwiper = new Swiper(
    '#recommend_slider .recommend_Slider',
    {

        slidesPerView: 6,

        slidesPerGroup: 6,

        navigation: {
            nextEl: '#recommend_slider .swiper-button-next',
            prevEl: '#recommend_slider .swiper-button-prev'
        }

    }
);


//북 퍼포먼스 예능 읽는 사람들
const performanceSwiper = new Swiper('#performance_slider .performance_Slider', {
    slidesPerView: 6,

    navigation: {
        nextEl: '#performance_slider .swiper-button-next',
        prevEl: '#performance_slider .swiper-button-prev'
    }
});


// 나만의 취향으로 가득 채운 책상 풍경

const mychoiceSwiper = new Swiper(
    '#mychoice .mychoice_Slider',
    {
        slidesPerView: 1,
        navigation: {
            nextEl: '#mychoice .swiper-button-next',
            prevEl: '#mychoice .swiper-button-prev'
        }
    }
);


// ========================================
// 교보문고가 만들었어요
// ========================================

const kyoboSwiper = new Swiper(
    '#kyobo_slider .kyobo_Slider',
    {

        slidesPerView: 1,

        navigation: {
            nextEl: '#kyobo_slider .swiper-button-next',
            prevEl: '#kyobo_slider .swiper-button-prev'
        }

    }
);


// ========================================
// 바로출판 POD
// ========================================

const podSwiper = new Swiper(
    '.POD_Swiper',
    {

        slidesPerView: 6,

        navigation: {
            nextEl: '#POD .swiper-button-next',
            prevEl: '#POD .swiper-button-prev'
        }

    }
);


// ========================================
// CASTing
// ========================================

const castingSwiper = new Swiper(
    '.Casting_Swiper',
    {

        slidesPerView: 5,

        slidesPerGroup: 5,

        navigation: {
            nextEl: '#casting .swiper-button-next',
            prevEl: '#casting .swiper-button-prev'
        }

    }
);
