import * as THREE from 'three';
import { createNoise2D } from "simplex-noise";

// 300 * 300的平面，分成 100 * 100 个小平面
const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

const noise2D = createNoise2D();
export function updatePosition() {
    const positions = geometry.attributes.position;
    
    for (let i = 0 ; i < positions.count; i ++) {
        // 可以通过 setX、setY、setZ 修改某个分组的 xyz 值
        // positions.setZ(i, Math.random() * 50);
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = noise2D(x / 300, y / 300) * 50;
        // 想让每个顶点都不一样，所以 sin 的参数还要传入一个 x 坐标，这样每个顶点变化的值不同，是符合正弦规律的变化
        const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10
        positions.setZ(i, z + sinNum);
    }
    
    // 这里要设置 positions.needUpdate 为 true，告诉 GPU 顶点变了，需要重新渲染，不然默认不会更新顶点
    positions.needsUpdate = true; // 告诉 Three.js 可以更新 positions 了
}

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
// 绕 x 轴旋转 90 度
mesh.rotateX(Math.PI / 2);
console.log(mesh);

export default mesh;