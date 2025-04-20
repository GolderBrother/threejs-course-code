import * as THREE from 'three';
import { GLTFLoader, Reflector } from 'three/examples/jsm/Addons.js';

const group = new THREE.Group();

function createGround() {
    const geometry = new THREE.PlaneGeometry(3000, 3000);
    const material = new THREE.MeshPhongMaterial({
        color: 'orange'
    })
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);
    // 在地面开启接收阴影
    mesh.receiveShadow = true;
    return mesh;
}

group.add(createGround());

// 创建四面镜子
function createMirrors() {
    const mirrors = new THREE.Group();
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const mirror = new Reflector(geometry);

        mirror.position.y = 500;
        mirror.position.x = 500 * Math.sin(i);
        mirror.position.z = 500 * Math.cos(i);
        mirror.rotateY(i);
        mirror.rotateX(-Math.PI);

        mirrors.add(mirror);
    }
    return mirrors;
}

group.add(createMirrors());

function loadDancer() {
    const dancer = new THREE.Group();
    const loader = new GLTFLoader();

    // 使用 loader.load 方法加载 Michelle.glb 文件。加载成功后，回调函数被执行。gltf 对象包含了从模型文件中解析出来的所有数据，包括场景（gltf.scene）、动画（gltf.animations）等信息。然后将模型的场景添加到 dancer 对象上，并对模型进行缩放。
    loader.load("./Michelle.glb", function (gltf) {
        console.log(gltf);
        dancer.add(gltf.scene);
        gltf.scene.scale.set(200, 200, 200);

        // 舞者开启投射阴影
        gltf.scene.traverse(obj => {
            obj.castShadow = true;
        })
        

        const mixer = new THREE.AnimationMixer(dancer);
        const clipAction = mixer.clipAction(gltf.animations[0]);
        clipAction.play();

        
        const clock = new THREE.Clock();
        function render() {
            const delta = clock.getDelta();
            mixer.update(delta);

            requestAnimationFrame(render);
        }

        render();
    })


    return dancer;
}

group.add(loadDancer());

export default group;