// Uncomment the lines below to log ports to the console
// p5.serial().list(function(data) {
//   console.log('serial list:');
//   data.ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

// variable for oscillator to be generated from light sensor...
var osc, fft;

// setting variable a for audio track a which is c of c minor 13
var a = new Audio('audio/a.mp3');

// Board setup — you may need to change the port
var b = p5.board('/dev/cu.usbmodemFA131', 'arduino');

// Test Read & Threshold
var pmeter;
var g_val = 0;

function setup() {
  createCanvas(300, 300);
  background(255);

  // OSCILLATOR SETUP
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(.5);
  fft = new p5.FFT();
  osc.start();
  // END OSCILLATOR SETUP


  // var innerStr = '<p style="font-family:Arial;font-size:12px">'
  // innerStr += 'Check out the console for readings &nbsp; | &nbsp;';
  // innerStr += 'Press any key to test threshold </p>';
  // createDiv(innerStr);

  pmeter = b.pin(0, 'VRES');
  pmeter.read(function(val) {
    console.log('pmeter read', val)
  });
  pmeter.range([10, 900]);
  pmeter.threshold(400);

}


function keyPressed() {
  console.log('is over?', pmeter.val, pmeter.overThreshold());
}

function draw() {
  var g_val = map(pmeter.val, 0, 1023, 0, 1023);
  if (g_val < 100) {
    noStroke();
    fill(0, 0, 200, 10);
    ellipse(200, 200, 100, 100);
    a.play();

    // background(200, 100, 0);
  } else {
    noStroke();
    fill(0, 200, 0, 10);
    rect(100, 100, 100, 100);
  }
  // var freq = map(pmeter.val, 0, 1023, 0, 1023);
  osc.freq(pmeter.val);

  var amp = map(mouseY, 0, height, 1, .01);
  osc.amp(amp);
}

function keyPressed() {
  if (key == 'A') {
    a.play();
    // background(200, 100, 0);

  }
}


// var b = p5.board('/dev/cu.usbmodemFA131', 'arduino');

// // Test analog read
// var p = b.pin(0, 'ANALOG', 'INPUT');
// p.read(function(val) {console.log(val); });

// function setup() {
//   background(0, 100, 0);
//   createCanvas(1000, 1000);

//   // var innerStr = '<p style="font-family:Arial;font-size:12px">'
//   // innerStr += 'Check out the console for readings</p>';

//   // createDiv(innerStr);
// }

// function draw() {
//     fill(200, 0, 0);
//     ellipse(200, 200, 100, 100);
//   }




// var b = p5.board('/dev/cu.usbmodemFA131', 'arduino');
// var led;

// function setup() {
//   led = b.pin(9, 'LED');
// }

// function keyPressed() {
//   if (keyCode === LEFT_ARROW){
//     led.on();
//   } else if (keyCode === RIGHT_ARROW) {
//     led.off();
//   } else if (keyCode === UP_ARROW){
//     led.blink();
//     console.log('Hello, World!');
//   } else if (keyCode === DOWN_ARROW) {
//     led.noBlink();
//   }
// }