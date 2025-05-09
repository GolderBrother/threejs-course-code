import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();

{
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color("orange"),
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  const gui = new GUI();

  // // 调解物体位置
  // gui.addColor(mesh.material, 'color');
  // gui.add(mesh.position, 'x').step(10);
  // gui.add(mesh.position, 'y').step(10);
  // gui.add(mesh.position, 'z').step(10);

  // const pointLight = new THREE.PointLight(0xffffff, 10000);
  // pointLight.position.set(80, 80, 80);
  // scene.add(pointLight);

  // // 调解灯光位置和强度
  // gui.add(pointLight.position, 'x').step(10);
  // gui.add(pointLight.position, 'y').step(10);
  // gui.add(pointLight.position, 'z').step(10);
  // gui.add(pointLight, 'intensity').step(1000);

  // 通过 gui.addFolder 创建两个分组，然后把控件添加到不同分组下
  const meshFolder = gui.addFolder("立方体");
  meshFolder.addColor(mesh.material, "color");
  meshFolder.add(mesh.position, "x").step(10);
  meshFolder.add(mesh.position, "y").step(10);
  meshFolder.add(mesh.position, "z").step(10);

  const pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(80, 80, 80);
  scene.add(pointLight);

  const lightFolder = gui.addFolder("灯光");
  lightFolder.add(pointLight.position, "x").step(10);
  lightFolder.add(pointLight.position, "y").step(10);
  lightFolder.add(pointLight.position, "z").step(10);
  lightFolder.add(pointLight, "intensity").step(1000);


  // 其他控件类型，不同的场景需要不同的控件
  // const gui = new GUI();
  const otherFolder = gui.addFolder("其他控件类型");
  const obj = {
    aaa: "天王盖地虎",
    bbb: false,
    ccc: 0,
    ddd: "111",
    fff: "Bbb",
    logic: function () {
      alert("执行一段逻辑!");
    },
  };

  // 其实用法都一样，都是 add，dat.gui 内部会自己根据属性的类型使用不同的控件。
  otherFolder.add(obj, "aaa").onChange((value) => {
    // 给它添加一个 onChange 事件，在里面拿到 value 来修改三维场景的参数
    console.log('value', value);
  });
  otherFolder.add(obj, "bbb");
  otherFolder.add(obj, "ccc").min(-10).max(10).step(0.5);
  otherFolder.add(obj, "ddd", ["111", "222", "333"]);
  otherFolder.add(obj, "fff", { Aaa: 0, Bbb: 0.1, Ccc: 5 }).onChange((value) => {
    // 给它添加一个 onChange 事件，在里面拿到 value 来修改三维场景的参数
    console.log('{ Aaa: 0, Bbb: 0.1, Ccc: 5 }', value);
  });;
  otherFolder.add(obj, "logic");
}

{
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
}

{
  const width = window.innerWidth;
  const height = window.innerHeight;

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  document.body.append(renderer.domElement);

  //   监听了 canvas 元素的 pointer、contextmenu、wheel 等鼠标事件，内部修改 camara 参数就可以
  const controls = new OrbitControls(camera, renderer.domElement);
}
