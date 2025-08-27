fetch('https://用户名.serv00.net/receive_ip.php', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({})   // 空 JSON 即可，PHP 会自动用 REMOTE_ADDR
  })
  .then(r => r.json())
  .then(d => console.log('[Debug] IP recorded:', d.ip))
  .catch(e => console.error('[Debug] Error:', e));


document.addEventListener('click', function(e) {
    let effect = document.createElement('div');
    effect.className = 'effect';
    effect.style.left = (e.pageX - 9) + 'px';
    effect.style.top = (e.pageY) + 'px';
    document.getElementById('click-effect').appendChild(effect);
    setTimeout(() => {
        document.getElementById('click-effect').removeChild(effect);
    }, 500);
});

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
    { name: 'Living Mice - 就像你', src: 'Living_Mice.m4a' },
    { name: 'Clark', src: 'Clark.m4a' },
    { name: 'Key', src: 'Key.m4a' },
	{ name: 'Aria Math - 停止敲我家的铝盆！', src: 'Aria_Math.m4a' }
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

// 获取canvas元素和2D渲染上下文
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// 设置canvas大小
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// 粒子数组
const particles = [];

// 粒子类
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1; // 水平速度
        this.vy = Math.random() * 2 - 1; // 垂直速度
        this.radius = Math.random() * 6 + 1; // 粒子半径
        this.color = `rgba(30, 136, 229, ${Math.random() * 0.5 + 0.5})`; // 粒子颜色
    }

    // 更新粒子位置
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // 边界检测
        if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy = -this.vy;
        }
    }

    // 渲染粒子
    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 初始化粒子
for (let i = 0; i < 114; i++) {
    particles.push(new Particle());
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].render();
    }
}

animate();




