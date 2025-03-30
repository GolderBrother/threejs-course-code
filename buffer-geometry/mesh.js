import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

// const vertices = new Float32Array([
//     0, 0, 0,
//     100, 0, 0,
//     0, 100, 0,
//     0, 0, 10,
//     0, 0, 100,
//     100, 0, 10
// ]);
const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,

    // 0, 100, 0,
    // 100, 0, 0,
    100, 100, 0
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

// 样存的话，如果是一个很大的几何体，那是不是就重复存储了很多数据？
// 所以，Three.js 提供了一种优化顶点存储的方案：
// 存储一份不重复的顶点数据，然后存储一份顶点索引的顺序就可以了。
// 比如上面一共 4 个顶点，然后存一份顶点索引：0、1、2、2、1、3 就可以了
const indexes = new Uint16Array([
    0, 1, 2,
    2, 1, 3
])
geometry.index = new THREE.BufferAttribute(indexes, 1);
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    // 开启 wireframe，展示线框
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
