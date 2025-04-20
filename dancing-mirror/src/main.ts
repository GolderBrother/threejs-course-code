import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import { Tween } from '@tweenjs/tween.js';
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';

// 创建场景并添加网格模型
const scene = new THREE.Scene();
scene.add(mesh);

// 添加灯光
// 平行光
const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(0, 500, 0);
scene.add(directionLight);
directionLight.castShadow = true;
directionLight.shadow.camera.left = -200;
directionLight.shadow.camera.right = 200;
directionLight.shadow.camera.top = 100;
directionLight.shadow.camera.bottom = -100;
directionLight.shadow.camera.near = 0.5;
directionLight.shadow.camera.far = 1000;

// 把平行光放在矩形平面光一样的位置。
// const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(cameraHelper);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

// 用一下平面光
const reactAreaLight = new THREE.RectAreaLight( 'white', 20,  300, 300 );
reactAreaLight.position.set(0, 500, 0);
reactAreaLight.rotateX(-Math.PI / 2);
reactAreaLight.lookAt(0, 0, 0);

const rectAreaLightHelper = new RectAreaLightHelper(reactAreaLight);
scene.add(rectAreaLightHelper);


// 设置场景尺寸和相机
const width = window.innerWidth;
const height = window.innerHeight;

// 坐标轴辅助对象
const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(300, 700, 300);
camera.lookAt(0, 0, 0);

// 创建渲染器并设置尺寸
const renderer = new THREE.WebGLRenderer({
  // 并启用抗锯齿功能
  antialias: true
});
renderer.setSize(width, height)
// 开启渲染器的阴影开关
renderer.shadowMap.enabled = true;


// 将渲染器的 DOM 元素添加到页面中
document.body.append(renderer.domElement);

// 创建轨道控制器并设置事件监听器
const controls = new OrbitControls(camera, renderer.domElement);

// 定义了一个窗口大小调整事件监听器，当窗口大小发生变化时，更新渲染器的尺寸和相机的宽高比，并重新计算投影矩阵。
window.onresize = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width,height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

// 让相机自己绕舞者旋转
const r = 400;
// 相机做圆周运动，半径 400，角度从 0 到 Math.PI * 2，每 20 秒转一圈，无限循环。
// x、z 根据 cos、sin 算出来，y 是固定的 500 看向 0,300,0 的位置。
const tween = new Tween({ angle: 0 })
  .to({ angle: Math.PI * 2 }, 20000)
  .onUpdate(function(obj){
    const x = r * Math.cos(obj.angle);
    const z = r * Math.sin(obj.angle);
    camera.position.set(x, 200, z);
  
    camera.lookAt(0, 200, 0);
  })
  .repeat(Infinity)
  .start();

// 定义渲染函数
function render(time?: number | undefined) {
    tween.update(time);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render()
