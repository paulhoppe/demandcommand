Matter.use(
  'matter-attractors'
);

var Engine = Matter.Engine,
//  Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

let img;
let img2;

let largeRect = 119;
let smallRect = 40;
let speed = 0.001;
var boundWidth = 27;


var mConstraint;


var engine;
var world;
var boxes = [];
var boundaries = [];
var attractors = [];

function setup() {
  var canvas = createCanvas(1000, 1000);



  engine = Engine.create();
  world = Engine.world;
  engine.world.gravity.y = 0;
  Engine.run(engine);

  img = loadImage("assets/Provocative_Percussion_Blank.png");
  img2 = loadImage("assets/Provocative_Percussion.png");

   boxes.push(new Box(276,292,largeRect,largeRect,.83));
   boxes.push(new Box(140,367,largeRect,largeRect,.08));
   boxes.push(new Box(685,342,largeRect,largeRect,.5));
   boxes.push(new Box(851,289,largeRect,largeRect,1.25));
   boxes.push(new Box(244,570,largeRect,largeRect,.64));
   boxes.push(new Box(154,679,largeRect,largeRect,.38));
   boxes.push(new Box(351,802,largeRect,largeRect,1.31));
   boxes.push(new Box(664,669,largeRect,largeRect,-.12));
   boxes.push(new Box(844,584,largeRect,largeRect,1.11));
   boxes.push(new Box(782,791,largeRect,largeRect,.275));

   boxes.push(new Box(479,281,smallRect,smallRect,-.218));
   boxes.push(new Box(80,470,smallRect,smallRect,.5));
   boxes.push(new Box(441,440,smallRect,smallRect,.28));
   boxes.push(new Box(547,484,smallRect,smallRect,.65));
   boxes.push(new Box(844,410,smallRect,smallRect,.274));
   boxes.push(new Box(400,598,smallRect,smallRect,.266));
   boxes.push(new Box(439,660,smallRect,smallRect,-.1));
   boxes.push(new Box(587,747,smallRect,smallRect,-.59));
   boxes.push(new Box(256,838,smallRect,smallRect,.26));

   boundaries.push(new Boundary(canvas.width/2, canvas.height, canvas.width, boundWidth, 0));
   boundaries.push(new Boundary(0, canvas.height/2, boundWidth, canvas.height, 0));
   boundaries.push(new Boundary(canvas.width, canvas.height/2, boundWidth, canvas.height, 0));
   boundaries.push(new Boundary(canvas.height/2, 0, canvas.width, boundWidth, 0));

//console.log(boxes[0]);

// var attractiveBody = Bodies.circle(
//     100,
//     100,
//     50,
//     {
//     isStatic: true,
//
//     // example of an attractor function that
//     // returns a force vector that applies to bodyB
//     plugin: {
//       attractors: [
//         function(bodyA, bodyB) {
//           return {
//             x: (bodyA.position.x - bodyB.position.x) * 1e-6,
//             y: (bodyA.position.y - bodyB.position.y) * 1e-6,
//           };
//         }
//       ]
//     }
//   });
//
//   World.add(engine.world, attractiveBody);

attractors.push(new Attractor(canvas.width/2, canvas.height/2, 10,10,0));




var canvasMouse = Mouse.create(canvas.elt);
canvasMouse.pixelRatio = pixelDensity();
var options = {
  mouse:canvasMouse,
  stiffness: .2,
};


mConstraint = MouseConstraint.create(engine, options);
World.add(engine.world, mConstraint);

}

function draw() {

image(img, 0, 0)

for(var i=0; i<boxes.length; i++){
  boxes[i].show();
}

if (mConstraint.body){
  var pos = mConstraint.body.position;
  var m = mConstraint.mouse.position;
  var offset = mConstraint.constraint.pointB;
  stroke(0,255,0);
  line(pos.x+offset.x, pos.y+offset.y, m.x, m.y);
}

for(var i=0; i<boundaries.length; i++){
//boundaries[i].show();
}



for(var i=0; i<attractors.length; i++){
attractors[0].show();
}


}



function mouseDragged(){
//boxes.push(new Box(mouseX,mouseY,smallRect,smallRect,0))
  //  boxes.push(new Box(mouseX,mouseY,largeRect,largeRect,0))
}

function windowResized(){
 resizeCanvas(windowWidth, windowHeight);
// console.log(windowWidth, windowHeight);

}
