import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import player from "./player.ts";
import analyser from "./analyser.ts";
import lyric, { lyricPositions } from "./lyric.ts";
import { Easing, Group, Tween } from "@tweenjs/tween.js";

import { chunk, map, sum } from "lodash-es";

const listener = new THREE.AudioListener();
const audio = new THREE.Audio(listener);

const loader = new THREE.AudioLoader();
// 加上 Audio 加载了音乐
loader.load("./superman.mp3", function (buffer) {
  audio.setBuffer(buffer);
  audio.autoplay = false;
});

const scene = new THREE.Scene();
lyric.position.y = 650;
player.position.x = 800;
player.position.z = 600;
scene.add(player);
scene.add(analyser);
scene.add(lyric);


const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 300, 10000);
// camera.position.set(500, 600, 800);
camera.position.set(0, 800, 1500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);

const audioAnalyser = new THREE.AudioAnalyser(audio);
function updateHeight() {
  const frequencyData = audioAnalyser.getFrequencyData();

  const sumArr = map(chunk(frequencyData, 50), (arr) => {
    return sum(arr);
  });

  for (let i = 0; i < analyser.children.length; i++) {
    const mesh = analyser.children[i];
    const height = sumArr[i] / 4000;
    mesh.scale.z = height;
  }
}

// 每次的 currentTime 就是已经度过的总时间 costTime + （当前时间减去点播放按钮时的时间）
let costTime = 0;
let startTime = 0;
// 创建一个 Group 来管理所有的 tween
const tweenGroup = new Group();
let i = 0;
function render() {
  if (lyricPositions.length && audio.isPlaying) {
    // 每次的 currentTime 就是已经度过的总时间 costTime + （当前时间减去点播放按钮时的时间）
    let currentTime = costTime + Date.now() - startTime;
    console.log(currentTime);

    const mSeconds = currentTime;

    // 每帧渲染的时候调用下 group.update()
    // const mSeconds = Math.floor(audio.context.currentTime * 1000);
    if (i >= lyricPositions.length - 1) {
      lyric.position.z = lyricPositions[lyricPositions.length - 1][1];
    } else if (
      mSeconds > lyricPositions[i][0] &&
      mSeconds < lyricPositions[i + 1][0]
    ) {
      // 把之前直接修改 position.z 改为用 tween 做缓动动画。
      const tween = new Tween(lyric.position)
        .to(
          {
            z: lyricPositions[i][1] + 300,
          },
          300
        )
        .easing(Easing.Quadratic.InOut)
        .repeat(0)
        .start()
        .onComplete(() => {
          // onComplete 的时候把这个 tween 删除凋。
          tweenGroup.remove(tween);
        });
      tweenGroup.add(tween);
      i++;
    }
  }

  tweenGroup.update();
  updateHeight();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const playerBtn = player.getObjectByName("playBtn");
const pauseBtn = player.getObjectByName("pauseBtn");
renderer.domElement.addEventListener("click", (e) => {
  const y = -((e.offsetY / height) * 2 - 1);
  const x = (e.offsetX / width) * 2 - 1;

  // 用 RayCaster 处理了点击事件
  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersections = rayCaster.intersectObjects(player.children);

  if (intersections.length) {
    const obj = intersections[0].object.target;
    if (obj) {
      if (obj.name === "playBtn") {
        // 点击按钮的时候让音乐播放暂停
        if (pauseBtn) {
          obj.scale.y = 0.6;
          obj.position.y = (-80 * 0.4) / 2;

          // 然后在点击按钮的时候记录下 startTime，更新下 costTime：
          startTime = Date.now();
          pauseBtn.scale.y = 1;
          pauseBtn.position.y = 0;
          audio.play();
        }
      } else if (obj.name === "pauseBtn") {
        if (playerBtn) {
          obj.scale.y = 0.6;
          obj.position.y = (-80 * 0.4) / 2;

          costTime += Date.now() - startTime;

          playerBtn.scale.y = 1;
          playerBtn.position.y = 0;
          audio.pause();
        }
      }
    }
  }
});
