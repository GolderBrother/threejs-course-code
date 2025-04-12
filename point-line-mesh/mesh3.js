import * as THREE from 'three';

// 默认圆的分段数是 32、高度的分段数是 1
const geometry = new THREE.CylinderGeometry(50, 50, 80, 5, 2);

const material = new THREE.MeshBasicMaterial(({
    color: new THREE.Color('orange'),
    wireframe: true,
}));

const mesh = new THREE.Mesh(geometry, material);

export default mesh;