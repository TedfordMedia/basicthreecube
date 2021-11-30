import { TimelineMax } from "gsap";
import * as Three from "three";
let camera, scene, renderer;

function init() {
  scene = new Three.Scene();

  camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const light = new Three.PointLight(0xffffff, 1, 500);
  light.position.set(10, 0, 25);
  scene.add(light);

  renderer = new Three.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#e5e5e5");
  document.body.appendChild(renderer.domElement);
}

let cube;

function addCube() {
  let geometry = new Three.BoxGeometry(2, 2, 2);
  let texture = new Three.TextureLoader().load("src/waternormals.jpg");
  let material = new Three.MeshLambertMaterial({ map: texture });

  cube = new Three.Mesh(geometry, material);
  cube.rotation.set(0, 0.3, 0);
  scene.add(cube);

  camera.position.z = 5;
}

function render() {
  requestAnimationFrame(render);
  // for rotating the cube
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

init();
addCube();
render();

// add timeline
// function animate() {
cube.tl = new TimelineMax({ paused: true });
cube.tl.to(cube.scale, 1, { x: 2, ease: "Expo.easeOut" });
cube.tl.to(cube.scale, 0.5, { x: 0.5, ease: "Expo.easeOut" });
cube.tl.to(cube.position, 0.5, { x: 1, ease: "Expo.easeOut" });
cube.tl.to(cube.rotation, 0.5, { y: Math.PI * 0.6, ease: "Expo.easeOut" });
// }

document.body.addEventListener("click", () => cube.tl.play());
