var displayWidth;
var displayHeight;
var w = 50;
var h = 10;
var currentDate;

function setup() {
  currentDate = new Date();
  displayWidth = document.documentElement.clientWidth*0.9;
  displayHeight = document.documentElement.clientHeight*0.9;
  w = parseInt(displayWidth/13);
  h = w/5;
  createCanvas(displayWidth, displayHeight);
  frameRate(10);
}

function chooseColor(num){
  switch(num){
    case 0:
      fill(0);
      break;
    case 1:
      fill(100);
      break;
    case 2:
      fill(200);
      break;
    case 3:
      fill(255, 127, 127);
      break;
    case 4:
      fill(255, 127, 191);
      break;
    case 5:
      fill(255, 127, 255);
      break;
    case 6:
      fill(191, 127, 255);
      break;
    case 7:
      fill(127, 127, 255);
      break;
    case 8:
      fill(127, 191, 255);
      break;
    case 9:
      fill(127, 255, 255);
      break;
    case 10:
      fill(127, 255, 191);
      break;
    case 11:
      fill(127, 255, 127);
      break;
    case 12:
      fill(191, 255, 127);
      break;
    case 13:
      fill(255, 255, 127);
      break;
    case 14:
      fill(255, 191, 127);
      break;
    case 15:
      fill(0, 173, 169);
      break;
    case 16:
      fill(215, 196, 71); //有楽町線ゴールド
      break;
    }
}

function showNumber(num, x){
  var y = displayHeight/2;
  rectMode(CENTER);
  noStroke();
  switch(num){
    case "0":
      rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      // rect(x, y, w, h);
      rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
    case "1":
      // rect(x, y-w, w, h);
      // rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      // rect(x, y, w, h);
      // rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      // rect(x, y+w, w, h);
      break;
    case "2":
      rect(x, y-w, w, h);
      // rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      rect(x-w/2, y+w/2, h, w);
      // rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
    case "3":
      rect(x, y-w, w, h);
      // rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      // rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
    case "4":
      // rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      // rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      // rect(x, y+w, w, h);
      break;
    case "5":
      rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      // rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      // rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
    case "6":
      rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      // rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
    case "7":
      rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      // rect(x, y, w, h);
      // rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      // rect(x, y+w, w, h);
      break;
    case "8":
      rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
    case "9":
      rect(x, y-w, w, h);
      rect(x-w/2, y-w/2, h, w);
      rect(x+w/2, y-w/2, h, w);
      rect(x, y, w, h);
      //rect(x-w/2, y+w/2, h, w);
      rect(x+w/2, y+w/2, h, w);
      rect(x, y+w, w, h);
      break;
  }
}

function showCoron(x){
    fill(0);
    var y = displayHeight/2;
    ellipse(x, y+w/2, h, h);
    ellipse(x, y-w/2, h, h);
}

function draw() {
  clear();
  var date = new Date();
  if(date.getTime() != currentDate.getTime()){
    var hour = ("0"+date.getHours()).slice(-2);
    var minute = ("0"+date.getMinutes()).slice(-2);
    var second = ("0"+date.getSeconds()).slice(-2);
    var dateText = hour+minute+second;
    var distance = w+w/2;
    var numColors = [0, 0, 0, 0, 0, 0];
    for(var i=16; i>0; i--){ //2^16 = 65536
      var cmpNumText = String(Math.pow(2, i));
      var cnt = 0;
      while(dateText.length > cnt){
        var search = dateText.indexOf(cmpNumText, cnt);
      //   console.log(cmpNumText+":"+search+":"+dateText);
        if(search >= 0){
          for(var j=0; j<cmpNumText.length; j++){
            if(numColors[j+search] == 0){
              numColors[j+search] = i;
            }
          }
        }
        cnt += cmpNumText.length;
      }
    }

    for(var i=0; i<dateText.length; i++){
      chooseColor(numColors[i]);
      showNumber(dateText[i], distance);
      distance += w+w/2;
      if((i+1)%2==0 && i != 5){
        showCoron(distance);
        distance += w+w/2;
      }
    }
    currentDate = date;
  }
}

window.onresize = function() {
  setup();
};
