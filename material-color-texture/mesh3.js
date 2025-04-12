import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('./earth.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
const geometry = new THREE.SphereGeometry(100);

const material = new THREE.MeshBasicMaterial({
    // color: new THREE.Color('blue'),
    // map 叫颜色贴图，因为它是可以和 color 混合的
    map: texture
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;