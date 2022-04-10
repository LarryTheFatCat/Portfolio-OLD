const fallRate = 3;
const maxRaindropHeight = 6;
const maxRaindropWidth = 1;
const maxRaindropZDepth = 5;
const momentumGain = 0.05;
const zdepthMomentumModifier = 0.45;

let canvas = document.getElementsByTagName('canvas')[0];
let canvasHeight = canvas.offsetHeight;
let canvasWidth = canvas.offsetWidth;
let container = document.getElementsByClassName('container')[0];
let ctx = canvas.getContext('2d');
let raindrops = [];
let windSpeed = 0;

function resize () {
  canvasHeight = container.offsetHeight;
  canvasWidth = container.offsetWidth;
  
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
}

function update () {
  windSpeed = Math.sin((new Date / 1000)) + 1;
  
  for (var i = 0; i < raindrops.length; i++) {
    raindrops[i].update();
  }
  
  draw();
  setTimeout(update, 16);
};

function draw () {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  for (var i = 0; i < raindrops.length; i++) {
    raindrops[i].render();
  }
};

class Raindrop {
  constructor () {
    this.x = Math.random() * (canvasWidth + (canvasWidth * 2)) - (canvasWidth * 2);
    this.y = Math.random() * -canvasHeight;
    this.z = Math.floor(Math.random() * maxRaindropZDepth);
    
    this.color = 'rgb(186,85,211)';
    this.height = (Math.random() * maxRaindropHeight + 2) * (this.z / maxRaindropZDepth);
    this.momentum = fallRate * (this.z * zdepthMomentumModifier);
    this.width = (Math.random() * maxRaindropWidth + 1) * (this.z / maxRaindropZDepth);
  }
  
  render () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  update () {
    this.momentum += momentumGain;
    
    this.y += this.momentum;
    this.x += windSpeed;
    
    if (this.y >= canvasHeight) {
      this.x = Math.random() * (canvasWidth + (canvasWidth * 2)) - (canvasWidth * 2);
      this.y = Math.random() * -canvasHeight;
      
      this.momentum = fallRate * (this.z * zdepthMomentumModifier);
    }
  }
}

(function () {
  document.addEventListener('resize', resize);
  resize();
  
  for (let i = 0; i < 5000; i++) {
    raindrops.push(new Raindrop());
  }
  
  // prewarm
  for (let i = 0; i < 5000; i++) {
    raindrops.forEach((raindrop) => {
      raindrop.update();
    });
  }
  
  update();
})();