import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(100, 100);

// 用 MeshBasicMaterial 基础网格材质
const material = new THREE.MeshBasicMaterial(({
    color: new THREE.Color('orange'),
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    // wireframe: true
}));

const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

const color = mesh.material.color;
console.log('color', color)
console.log('color', color)
const hex = color.getHexString();
const style = color.getStyle();
console.log('hex', hex)
console.log('style', style)
color.setStyle('blue');

export default mesh;