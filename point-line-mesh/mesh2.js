import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 100, 2, 3);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("orange"),
  wireframe: true, // 线框
});

const mesh = new THREE.Mesh(geometry, material);

console.log("mesh", mesh);

export default mesh;
