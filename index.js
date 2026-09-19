const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let skip, criminalX, criminalY;
let allTime = 68;
const playBtn = document.querySelector('button');
let playing = false;

canvas.height = innerHeight;
canvas.width = innerWidth;

class Criminal {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
  }
  
  draw() {
    const num = randomNumber(1, 7);
    skip = num;

    this.image.onload = () => ctx.drawImage(this.image, this.x, this.y);
    this.image.src = `img/player${num}.png`;
  }
}

class Wantedpic{
  constructor(){}

  draw() {
    ctx.beginPath();
    ctx.lineWidth=7;
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#DCDCDC';
    
    ctx.fillRect(30,30,210,270);
    ctx.strokeRect(30,30,210,270);
    
    ctx.fillStyle = '#FFF';
    
    ctx.fillRect(60,60,150,170);
    ctx.strokeRect(60,60,150,170);
    ctx.closePath();
  }
  
  text(){
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    
    ctx.fillText("Wanted", 84, 275);
    ctx.closePath();
  }
}
class People{
  constructor() {}

  draw() {
    for (let i = 0; i < (innerWidth - innerHeight) / (innerWidth >= 1700 ? 3 : innerWidth < 900 ? 20 : 6); i++){
      const x = randomNumber(250, innerWidth - 50),
        y = randomNumber(50, innerHeight - 50),
        image = new Image(),
        num = randomNumber(1, 7);
  
      if (num !== skip) {
        image.onload = () => ctx.drawImage(image, x, y, 31, 48);
        image.src = `img/player${num}.png`;
      } else {
        i -= 1;
      }
    }

    const image = new Image();

    criminalX = randomNumber(250, innerWidth - 50);
    criminalY = randomNumber(50, innerHeight - 50);
    
    image.onload = () => ctx.drawImage(image, criminalX, criminalY, 31, 48);
    image.src = `img/player${skip}.png`;
  }
}

function clickEv(e) {
  if (criminalX < e.clientX && criminalX + 30 > e.clientX && 
     criminalY < e.clientY && criminalY + 53 > e.clientY) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const pic = new Wantedpic(),
      criminal = new Criminal(85, 70, 0, 0),
      people = new People();

    score.score += 1;
    allTime >= 48 ? allTime = 68 : allTime += 20;
    score.text = `Score: ${score.score}`;

    timer.draw();
    score.draw();
    pic.draw();
    criminal.draw();
    pic.text();
    people.draw();
  }
}

class Score {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.text = "";
    this.score = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeRect(30, 350, 210, 60);
    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
  }
}
class Timer{
  constructor(){
    this.timeWidth = 200;
  }
  draw(){
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = "black";
    ctx.strokeRect(30, 440, 210, 60);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "#fff"
    ctx.fillRect(34, 444, 202, 51);
    ctx.fillStyle = '#7CFC00'
    ctx.fillRect(35, 443, this.timeWidth, 52);
    ctx.closePath();
  }
}
function clock(timer) {
  const cID = setInterval(function() {
    allTime--;
    timer.timeWidth = allTime * 3;
    timer.draw();

    if (allTime === 0) {
      clearInterval(cID);
      playing = false;
      allTime = 68;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      document.querySelector('.wrap').style.display = 'flex';
    }
  }, 250);
}

const pic = new Wantedpic(),
  criminal = new Criminal(85, 70, 0, 0),
  people = new People(),
  score = new Score(65, 390);
  timer = new Timer();
score.text = `Score: ${score.score}`;

function main() {
  if (playing) return;
  
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pic.draw(); 
  criminal.draw();
  pic.text();
  people.draw();
  score.draw();
  timer.draw();
  
  addEventListener('click', clickEv);
  clock(timer);
}

addEventListener('keydown', function idddd() {
  score.score = 0;
  document.querySelector('.wrap').style.display = 'none';
  main();
  playing = true;
});     