import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial(({
//     color: new THREE.Color('orange')
// }));
// 材质改为不受光照影响的 MeshBasicMaterial，然后显示线框
const material = new THREE.MeshBasicMaterial(({
    color: new THREE.Color('orange'),
    wireframe: true
}));
const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;