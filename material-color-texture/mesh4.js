import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('./zhuan.jpg');
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(3, 3);
texture.colorSpace = THREE.SRGBColorSpace;
// 创建了一个 PlaneGeometry，然后给 MeshBasicMaterial 设置了纹理贴图
const geometry = new THREE.PlaneGeometry(1000, 1000);
const material = new THREE.MeshBasicMaterial({
    map: texture,
    // 增加受环境光影响的凹凸感
    aoMap: texture,
})
const mesh = new THREE.Mesh(geometry, material);
export default mesh;