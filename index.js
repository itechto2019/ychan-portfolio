var PARENT_CARD = document.querySelector('.cards')
var CARDS = document.querySelectorAll('.card')
var IMAGES = document.querySelectorAll('.cards img')
var SLIDERS = document.querySelectorAll('.slider')
var GALLERY = document.querySelector('.gallery')
var toggleTheme = document.querySelector('#theme')
var curr = document.querySelector('#curr-theme')
var navBar = document.querySelector('.navbar')
var link = document.querySelectorAll('.link a, svg')
var profilePhoto = document.querySelector('.profile-photo h1')
var close = document.querySelector('.close')
var gcash_open = document.querySelector('#gcash_btn')
var paypal_open = document.querySelector('#paypal_btn')
var about_open = document.querySelector('#about_btn')

var sources = []
var currentSlide = 1
var theme = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light'
var themeSvg = {
    dark: `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`,
    light: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`
}
var snaps = [
    'https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/323893652_1378240896044192_1859316744455411766_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeH6aX4a2sryZ3bxqdKo04OGzDaMQMzgpurMNoxAzOCm6qLMvfqmzCedE-9lPguJfBxMY_t2l4JunKBwMuUrVKMr&_nc_ohc=DVv0v44qStoAX__6Lg6&_nc_ht=scontent.fcrk1-1.fna&oh=00_AfCMj8ZewO1hrYG67gRY7u57AovpRPKxgm_gabs6YfyYoQ&oe=63BF62AD',
    'https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/323430974_893862281768182_6299349796054241197_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHxMW9BkvxTOvZXhpFBgcOVhXDRo6_CQaeFcNGjr8JBp64CBUMyyxoTDDDRYefW6TBvMcp788bcTocISaBCgQ3e&_nc_ohc=MIF_-2E426oAX9bgrXG&_nc_ht=scontent.fcrk1-5.fna&oh=00_AfBpr9_2K8lLEiMxS9n0NHi5pu2j2fm8B0z1Ljn-RaqiuQ&oe=63C018DF',
    'https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/321244673_859955941885526_7023640716100737002_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHRM6is0FCDgToOzdkhYln9mMmTLW7-q4-YyZMtbv6rj07kXOZFkFNrG-wdmrXdk43Va42iStCsTLJ0yE-52-go&_nc_ohc=XeXgNgK5ea0AX91nP6Z&_nc_oc=AQn3AfZvOEow8wR4ldeb1A5X9JB5HTJ7iCmx15ZUj8-8a6bQJYxwDglue339TbwiPUs&_nc_ht=scontent.fcrk1-1.fna&oh=00_AfBGZQphoyECBHGWNk7TnlKbTXNpMad4QCILAenuycY1pA&oe=63BFD235',
    'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/323099129_888864732144364_2228007871823160448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFCzuxV_xj4HYrvWJ7VIgLrmirULe-3DQuaKtQt77cNC7Jdp5PAR3K7V5U7EO5qcFFsYsHys2x732aoQLepUwmR&_nc_ohc=EQYH2_22XTQAX9FYsdN&tn=EMp05dgxIX3BRpHp&_nc_ht=scontent.fcrk1-4.fna&oh=00_AfArtuJusTnCxSelr8sgKvdsByi3jIIewWGZZZb42IfHXw&oe=63BE912E',
    'https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/321518010_849637082940951_7526492897075060117_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeErAsLyWD-HWxQPmLHJr54IaPdcBsxqnNFo91wGzGqc0YEREo8pYgJ2Y9Lgjeg10QP-P58tvmcLhMu1JnZuLy9H&_nc_ohc=coCIBmgBU5UAX_XCeNc&_nc_ht=scontent.fcrk1-1.fna&oh=00_AfDAAjfmB3l-8YUu3NdlsB41cjpqQBXUjO_3NTz2Lj29rQ&oe=63C06B69',
    'https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/323787383_619879363277665_7883144950976774578_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGX-zYAFWF9HKArAfioIM0M6Mil5dG_V1ToyKXl0b9XVAgGggBUl4bcMpuAWnNmeolhHf_E1gG-baQXca3U6gaX&_nc_ohc=Z5eW9kYJuk0AX9OghHI&_nc_ht=scontent.fcrk1-1.fna&oh=00_AfC8HNUFAr_JgmwOV6JrYut-T9_K1qp3QorEg07wtP1EBg&oe=63BF3B47',
    'https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/322599188_1204062930490290_4136368431668327638_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFCRWLgaJy8NoFsix9rFFIP24NOOUus3Obbg045S6zc5q3oo3SOy6W22VJLAfMZ2oENQJc_NE5-g0neqfhgdThz&_nc_ohc=cIJJ2rC3DrsAX_VUrAU&_nc_ht=scontent.fcrk1-5.fna&oh=00_AfA2BMGYN2MxyiRb6YDQSG9OcKrzpZ8KLh8gJZTyfZzB0Q&oe=63BEB02F',
    'https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/321311437_1182363746042484_6925050999149385955_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHiBXH4bvAa0AeYlxoRNwxNakp3jX5cuztqSneNfly7O5tKV9OZ9cawRJ8gvSO9cjvcerIRQWn84YUWyP8PVnUu&_nc_ohc=uYTfdRsIV84AX_EbOxx&_nc_ht=scontent.fcrk1-5.fna&oh=00_AfDxT18o1fboGZxUUnVnceThS7DpxDZv_TzyqPeVRbA1FA&oe=63BF0B98',
    'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/323340536_1992845034242047_5173336055011694520_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGQqc-YNrKlXvfLednlrc3VM7CNLIq9GpYzsI0sir0alg978xHLyUhCMw8hJ2z41zAdyJdyy_RSA6qGRQsp-QZ8&_nc_ohc=sQL-O-D2SggAX-yVbNv&_nc_oc=AQlyaAsRMhC2rvbkpthQAM6cjRyewr8A55brez8ktSmb8aVxL0W5sV3uNFSE3KsEQJM&_nc_ht=scontent.fcrk1-4.fna&oh=00_AfBdvpQyT320VotEt2b7utJPJ8RA8aSEQCOH2OZwzmnNGA&oe=63BE8367',
    'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/321458310_580365610089539_3413745945640833919_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFyl44deIXIKVxFcKa9_uRPpN1bidO80_mk3VuJ07zT-X2vGaUWwg_UQlTbwfk3Qq-iEzWUc3Pl61ey5Ow0Tmts&_nc_ohc=YWuJU4w7NM0AX-n4ram&tn=EMp05dgxIX3BRpHp&_nc_ht=scontent.fcrk1-3.fna&oh=00_AfCrJ9JFfNHvC1m_VNaAMQ9Gs9blnvgyk9D0-RZGQlFEqA&oe=63BF1956',
    'https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/324439593_1181469149163244_3122648961131308340_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEHTDKPHUNjfERj8en4eaO8xwOZBM8uT5vHA5kEzy5Pm5kJugM2n3iDMmTOhwyMJUIdbMIa9obj0Kv4Rlk7p56y&_nc_ohc=9nAcZVgi0jwAX86TkpS&tn=EMp05dgxIX3BRpHp&_nc_ht=scontent.fcrk1-5.fna&oh=00_AfDPj_-oJxgfn3AA0sAMQlhm0on9Qi0ETSKkz2_u2YcnRA&oe=63C021A3',
    'https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/322475607_1584902715283510_916464557288710218_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFNb5JogPwZS1ZbxklP77UqHRwruojNz4odHCu6iM3PinA0c2_cpYtbzJ3Adt_10NYZNJUPvwQarSCsb5PUr2vV&_nc_ohc=TdaWlNywSd8AX8IrnRi&tn=EMp05dgxIX3BRpHp&_nc_ht=scontent.fcrk1-1.fna&oh=00_AfASv1nWzOpYH1ZxbJYk5UB4IzpnkJqxLzhDv8qSYHoO7g&oe=63BF41EF',
    'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/321499524_2435569099928925_6789778967726037404_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGFuzIHGHFyktTzbLkeZ8Z6UczvqTnVZH1RzO-pOdVkfYaYSR4KtCOnHfgJZv0z3zgKic3krCa1DxEytwdzwstO&_nc_ohc=ekUsRuK0VAYAX_WNCvM&_nc_ht=scontent.fcrk1-3.fna&oh=00_AfB6PQtUJT5SgvcrDvhQ4V1FmDlABHP5LiJAFioZ2euXwQ&oe=63BFFE71',
]

CARDS.forEach(card => {
    sources.push(card)
});

const prevSlide = (index) => {
    let num = currentSlide < 0 ? currentSlide = IMAGES.length - 1 : index
    if (num >= 0) {
        for (let i = 0; i < IMAGES.length; i++) {
            if (num == i) {
                CARDS[1].after(CARDS[i])
            } else {
                CARDS[num].before(CARDS[i])
            }

        }
    }
}
const nextSlide = (index) => {
    let num = currentSlide >= 3 ? currentSlide = 0 : index
    if (index <= 3) {
        for (let i = 0; i < IMAGES.length; i++) {
            if (num == i) {
                CARDS[1].before(CARDS[num])
            }
            CARDS[num].after(CARDS[i])
        }
    }
}

loadGallery = () => {
    snaps.forEach((image, index) => {
        let card = `
            <div class="gallery-card">
                <div class="gallery-thumb">
                    <img src="${image}" alt="">
                </div>
                <div class="gallery-details">
                    <h3>snap_${index + 1}</h3>
                </div>
            </div>
        `
        GALLERY.innerHTML += card
    })
}
// loadGallery()

switchTheme = () => {
    let root = document.querySelector(':root')
    if (theme == "dark") {
        root.style.setProperty('--dark', '#FFFFFF');
        root.style.setProperty('--light', '#1A1A1A');
        document.body.style.animation = "animation: fade 2s forwards"
        document.body.style.transition = "0.6s"
        theme = "light"
        localStorage.setItem('theme', 'light')
        navBar.style.backgroundColor = "#1A222F"
        profilePhoto.style.color = "#FFFFFF"
        link.forEach((navLink ) => {
            navLink.style.color = "#FFFFFF"
        })
        curr.innerHTML = themeSvg.dark
    } else {
        curr.innerHTML = themeSvg.light
        root.style.setProperty('--dark', '#1A1A1A');
        root.style.setProperty('--light', '#FFFFFF');
        document.body.style.animation = "animation: fade 2s forwards"
        document.body.style.transition = "0.6s"
        navBar.style.backgroundColor = "var(--dark)"
        link.forEach((navLink ) => {
            navLink.style.color = "#FFFFFF"
        })
        theme = "dark"
        localStorage.setItem('theme', 'dark')
    }
}
onLoad = () => {
    let root = document.querySelector(':root')
    if (theme == "dark") {
        curr.innerHTML = themeSvg.light
        root.style.setProperty('--dark', '#1A1A1A');
        root.style.setProperty('--light', '#FFFFFF');
        document.body.style.animation = "animation: fade 2s forwards"
        document.body.style.transition = "0.6s"
        navBar.style.backgroundColor = "var(--dark)"
        link.forEach((navLink ) => {
            navLink.style.color = "#FFFFFF"
        })
        theme = "dark"
        localStorage.setItem('theme', 'dark')
    } else {
        root.style.setProperty('--dark', '#FFFFFF');
        root.style.setProperty('--light', '#1A1A1A');
        document.body.style.animation = "animation: fade 2s forwards"
        document.body.style.transition = "0.6s"
        theme = "light"
        localStorage.setItem('theme', 'light')
        navBar.style.backgroundColor = "#1A222F"
        profilePhoto.style.color = "#FFFFFF"
        link.forEach((navLink ) => {
            navLink.style.color = "#FFFFFF"
        })
        curr.innerHTML = themeSvg.dark
    }
}
onLoad()
close.addEventListener("click", () => {
    let modal = document.querySelector('.modal')
    modal.style.display = "none"
})
gcash_open.addEventListener('click', () => {
    let modal = document.querySelector('.modal')
    let gcash = document.querySelector('#gcash')
    let paypal = document.querySelector('#paypal')
    let about_page = document.querySelector('#about-page')
    modal.style.display = "block"
    gcash.style.display = "block"
    paypal.style.display = "none"
    about_page.style.display = "none"
})
paypal_open.addEventListener('click', () => {
    let modal = document.querySelector('.modal')
    let gcash = document.querySelector('#gcash')
    let paypal = document.querySelector('#paypal')
    let about_page = document.querySelector('#about-page')
    modal.style.display = "block"
    paypal.style.display = "block"
    gcash.style.display = "none"
    about_page.style.display = "none"
})
about_open.addEventListener('click', () => {
    let modal = document.querySelector('.modal')
    let gcash = document.querySelector('#gcash')
    let paypal = document.querySelector('#paypal')
    let about_page = document.querySelector('#about-page')
    modal.style.display = "block"
    paypal.style.display = "none"
    gcash.style.display = "none"
    about_page.style.display = "block"
})