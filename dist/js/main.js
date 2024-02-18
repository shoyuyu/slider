"use strict";
class Show {
    constructor(interval) {
        this.interval = interval;
        this.currentIndex = 0;
    }
    start() {
        this.update();
        setInterval(() => {
            this.update();
        }, this.interval);
    }
}
// Thumbnail area slideshow
class SlideShow extends Show {
    constructor(thumbnails, listNum, interval) {
        super(interval);
        this.thumbnails = thumbnails;
        this.listNum = listNum < thumbnails.length ? listNum : thumbnails.length; // Limit max value thumbnails length
        this.tempArr = this.randomNum(this.thumbnails, this.listNum);
    }
    randomNum(array, num) {
        const arr = array;
        const t = [];
        const r = [];
        let l = array.length;
        let n = num < l ? num : l;
        while (n-- > 0) {
            const i = Math.floor(Math.random() * l);
            r[n] = t[i] ?? arr[i];
            --l;
            t[i] = t[l] ?? arr[l];
        }
        return r;
    }
    update() {
        const imageList = document.querySelector('.slider-list-images');
        if (imageList !== null) {
            while (imageList.firstChild !== null) {
                imageList.firstChild.classList.remove('show');
                imageList.removeChild(imageList.firstChild);
            }
            for (let i = 0; i < this.listNum; i++) {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = this.tempArr[i];
                li.appendChild(img);
                li.classList.add('fade-in');
                imageList.appendChild(li);
                setTimeout(() => {
                    li.classList.add('show');
                }, 0);
            }
            this.tempArr = this.randomNum(this.thumbnails, this.listNum);
        }
    }
}
// Main area slideshow
class MainShow extends Show {
    constructor(talents, interval) {
        super(interval);
        this.photos = talents;
    }
    update() {
        const mainImageDiv = document.querySelector('.slider-main-image');
        const photoTitle = document.querySelector('.photo-title');
        const photoDescription = document.querySelector('.photo-description');
        if (++this.currentIndex >= this.photos.length) {
            this.currentIndex = 0;
        }
        if (mainImageDiv !== null) {
            while (mainImageDiv.firstChild !== null) {
                mainImageDiv.firstChild.classList.remove('show');
                mainImageDiv.removeChild(mainImageDiv.firstChild);
            }
            const img = document.createElement('img');
            img.src = this.photos[this.currentIndex].file;
            img.classList.add('fade-in');
            mainImageDiv.appendChild(img);
            setTimeout(() => {
                img.classList.add('show');
            }, 0);
        }
        if (photoTitle !== null) {
            photoTitle.textContent = this.photos[this.currentIndex].title;
        }
        if (photoDescription !== null) {
            photoDescription.textContent = this.photos[this.currentIndex].description;
        }
    }
}
// Event listener
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = [
        'imgs/list/sub-photo_1.png',
        'imgs/list/sub-photo_2.png',
        'imgs/list/sub-photo_3.png',
        'imgs/list/sub-photo_4.png',
        'imgs/list/sub-photo_5.png',
        'imgs/list/sub-photo_6.png',
        'imgs/list/sub-photo_7.png',
        'imgs/list/sub-photo_8.png',
        'imgs/list/sub-photo_9.png',
        'imgs/list/sub-photo_10.png',
    ];
    const photos = [
        {
            file: 'imgs/main/main-photo_1.png',
            title: '夏の海辺',
            description: '岩井海岸で撮影した日帰りポトレ。',
        },
        {
            file: 'imgs/main/main-photo_2.png',
            title: 'トンネルを見上げて',
            description: '切通しトンネルは燈籠坂大師堂へと続く参道。',
        },
        {
            file: 'imgs/main/main-photo_3.png',
            title: '古いベンチ',
            description: '金網から覗くグラウンドとベンチ。',
        },
        // ...more
    ];
    const slideShow = new SlideShow(thumbnails, 8, 3000);
    slideShow.start();
    const mainShow = new MainShow(photos, 5000);
    mainShow.start();
});
