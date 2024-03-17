const mainKey = "c577e8a40049cf51879ff72c9dc1ae8e"; // 高德开发者 Key

const getHitokoto = () => {
    fetch('https://v1.hitokoto.cn/?max_length=24')
        .then(response => response.json())
        .then(data => {
            const hitokoto = data.hitokoto;
            const from = data.from;
            document.getElementById('hitokoto').innerHTML = `${hitokoto} - 《${from}》`;
        })
        .catch(console.error);
};

const getWeather = () => {
    fetch(`https://restapi.amap.com/v3/ip?key=${mainKey}`)
        .then(response => response.json())
        .then(res => {
            const adcode = res.adcode;
            document.getElementById('city_text').innerHTML = res.city;
            fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${mainKey}&city=${adcode}`)
                .then(response => response.json())
                .then(res => {
                    if (res.status) {
                        document.getElementById('wea_text').innerHTML = res.lives[0].weather;
                        document.getElementById('tem_text').innerHTML = res.lives[0].temperature + "°C&nbsp;";
                        document.getElementById('win_text').innerHTML = res.lives[0].winddirection + "风";
                        document.getElementById('win_speed').innerHTML = res.lives[0].windpower + "级";
                    } else {
                        console.error("天气信息获取失败");
                    }
                })
                .catch(console.error);
        })
        .catch(console.error);
};

const updateClock = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];
    
    document.getElementById('clock').innerHTML = `${year}-${month}-${day} ${weekday} ${hours}:${minutes}:${seconds}`;
};

document.addEventListener('click', function(e) {
    let effect = document.createElement('div');
    effect.className = 'effect';
    effect.style.left = e.clientX + 'px';
    effect.style.top = e.clientY + 'px';
    document.getElementById('click-effect').appendChild(effect);
    setTimeout(() => {
        document.getElementById('click-effect').removeChild(effect);
    }, 500);
});

getHitokoto();
getWeather();
updateClock();
setInterval(updateClock, 1000);

const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songName = document.getElementById('song-name');

const songs = [
    { name: 'Living Mice', src: 'Living_Mice.m4a' },
    { name: 'Clark', src: 'Clark.m4a' },
    { name: 'Key', src: 'Key.m4a' }
];

let currentSongIndex = 0;

function loadSong(song) {
    audioPlayer.src = song.src;
    songName.textContent = song.name;
}

function playSong() {
    audioPlayer.play();
    playButton.textContent = '暂停';
}

function pauseSong() {
    audioPlayer.pause();
    playButton.textContent = '播放';
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevButton.addEventListener('click', playPrevSong);
nextButton.addEventListener('click', playNextSong);

// 初始加载第一首歌曲
loadSong(songs[currentSongIndex]);

