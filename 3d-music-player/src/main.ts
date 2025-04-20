import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import player from './player.js';

const listener = new THREE.AudioListener();
const audio = new THREE.Audio( listener );

const loader = new THREE.AudioLoader();
// 加上 Audio 加载了音乐
loader.load('./superman.mp3', function ( buffer ) {
  audio.setBuffer( buffer );
  audio.autoplay = false;
});

const scene = new THREE.Scene();
scene.add(player);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const playerBtn = player.getObjectByName('playBtn');
const pauseBtn = player.getObjectByName('pauseBtn');
renderer.domElement.addEventListener('click', (e) => {
  const y = -((e.offsetY / height) * 2 - 1);
  const x = (e.offsetX / width) * 2 - 1;

  // 用 RayCaster 处理了点击事件
  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersections = rayCaster.intersectObjects(player.children);

  if(intersections.length) {
    const obj = intersections[0].object.target;
    if(obj) {
      if(obj.name === 'playBtn') {
        // 点击按钮的时候让音乐播放暂停
        if (pauseBtn) {
          obj.scale.y = 0.6;
          obj.position.y = -80 * 0.4/2;
          
          pauseBtn.scale.y = 1;
          pauseBtn.position.y = 0;
          audio.play()
        }
      } else if(obj.name === 'pauseBtn') {
        if (playerBtn) {
          obj.scale.y = 0.6;
          obj.position.y = -80 * 0.4/2;
      
          playerBtn.scale.y = 1;
          playerBtn.position.y = 0;
          audio.pause()
        }
      }
    }
  }
});