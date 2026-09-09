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

function BookSwiper() {

    new Swiper(
        '#book_slider .book_Slider',
        {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            initialSlide: 0,
            navigation: {
                nextEl: '#book_slider .swiper-button-next',
                prevEl: '#book_slider .swiper-button-prev'
            },
            observer: true,
            observeParents: true
        }
    );
}
BookSwiper();

function RelationSwiper() {

    new Swiper(
        '#relation_slider .relation_Slider',
        {
            slidesPerView: 5,
            slidesPerGroup: 1,
            spaceBetween: 0,
            initialSlide: 0,
            navigation: {
                nextEl: '#relation_slider .swiper-button-next',
                prevEl: '#relation_slider .swiper-button-prev'
            },
            observer: true,
            observeParents: true
        }
    );
}
RelationSwiper();

function FindSwiper() {

    new Swiper(
        '#find_slider .find_Slider',
        {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            initialSlide: 0,
            navigation: {
                nextEl: '#find_slider .swiper-button-next',
                prevEl: '#find_slider .swiper-button-prev'
            },
            observer: true,
            observeParents: true
        }
    );
}
FindSwiper();

async function Bookinfo() {

    const queries = [
        '비전공자도 이해할 수 있는 LLM수업'
    ];

    const slideContents =
        document.querySelectorAll('.book_Slider .swiper-slide');

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
        `;
    });
}
Bookinfo();

// Relation Slider
async function Relationinfo() {

    const queries = [
        '모든 하루는 뇌에서 시작된다','히스토리아 비테이','뇌를 바꾸려는 사람들','비전공자도 이해할 수 있는 AI지식(10만부 기념 개정판)','수학의 역사',
        '의식의 탄생','비전공자도 이해할 수 있는 챗GPT','세상은 어떻게 작동하는가','수학의 유희','도파민 과잉 시대 당신의 뇌가 무너진다',
        '엔트로피','크로싱','과학적으로 옳다는 착각','극한 진화의 세계','초지능 시대 생존을 위한 AI 교양 수업'
    ];

    const slideContents =
        document.querySelectorAll('.relation_Slider .swiper-slide');

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

            <div class="book_info">
                <p class="book_category">${book.category}</p>
                <h3>${book.title}</h3>
                <p class="book_author">${book.authors.join(', ')}</p>
                <p class="book_price">${book.sale_price.toLocaleString()}원</p>
            </div>
        `;
    });
}
Relationinfo();