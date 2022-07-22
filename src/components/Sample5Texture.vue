<template>
    <div ref="threeContainer" id="threeContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

export default defineComponent({
    setup() {
        const initWidth = ref(window.innerWidth - 40);
        const initHeight = ref(window.innerHeight - 100);

        // init
        const scene = new THREE.Scene();
        // Just for fun
        // scene.background = new THREE.Color( 'skyblue' );
        scene.background = new THREE.Color( 0xCCCCCC );

        const camera = new THREE.PerspectiveCamera( 70, initWidth.value / initHeight.value, 0.01, 1000 );
        // camera.position.z = 2
        camera.position.set(5, 5, 5);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( initWidth.value, initHeight.value );


        // const geoSphere = new THREE.SphereGeometry(1, 8, 5); // size of box
        const geoCube = new THREE.BoxGeometry(1, 1, 1); // size of box
        // const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: false} ); // Màu solid, không bị ảnh hưởng của nguồn sáng
        // const material = new THREE.MeshNormalMaterial({wireframe: false});

        // Load hình cho 6 mặt
        const textureLoader = new THREE.TextureLoader();
        const texture0 = textureLoader.load(new URL('../assets/images/olli/olli-tabumi-next.jpg', import.meta.url).href);
        const texture1 = textureLoader.load(new URL('../assets/images/olli/olli-tamibu-2.jpg', import.meta.url).href);
        const texture2 = textureLoader.load(new URL('../assets/images/olli/olli-tabumi-1.jpg', import.meta.url).href);
        const texture3 = textureLoader.load(new URL('../assets/images/olli/olli-tabumi-3.jpg', import.meta.url).href);
        const texture4 = textureLoader.load(new URL('../assets/images/olli/olli-tabumi-4.jpg', import.meta.url).href);
        const texture5 = textureLoader.load(new URL('../assets/images/olli/olli-tabumi-hand.jpg', import.meta.url).href);
        const material = [
            new THREE.MeshLambertMaterial({map: texture0, side: THREE.DoubleSide}), //right
            // new THREE.MeshLambertMaterial({color: '#271952'}), //right
            new THREE.MeshLambertMaterial({map: texture1, side: THREE.DoubleSide}), //left
            new THREE.MeshLambertMaterial({map: texture2, side: THREE.DoubleSide}), //top
            new THREE.MeshLambertMaterial({map: texture3, side: THREE.DoubleSide}), //bottom
            new THREE.MeshLambertMaterial({map: texture4, side: THREE.DoubleSide}), //front
            new THREE.MeshLambertMaterial({map: texture5, side: THREE.DoubleSide}), //back
        ];

        //wireframe = false -> will not show 

        const meshCube = new THREE.Mesh(geoCube, material);
        scene.add( meshCube );

        const ctrTrackball = new TrackballControls(camera, renderer.domElement)
        
        //game login
		const update = function() {
            // Just for fun
            // meshCube.rotation.x += 0.01;
            // meshCube.rotation.y += 0.005;
            meshTorus.rotation.x += 0.01;
            meshTorus.rotation.y += 0.005;
        };

        // draw scene
		const render = function() {
			renderer.render(scene, camera);
		};

        //run gameloop (update, render, repeat)
		const gameLoop = function() {
			requestAnimationFrame(gameLoop);
			update();
			render();
            ctrTrackball.update();
		};

        // gameLoop();

        let windowHeight = ref(window.innerHeight)
        let windowWidth = ref(window.innerWidth)
        const onHeightChange = () => {
            windowHeight.value = window.innerHeight - 100
            windowWidth.value = window.innerWidth - 40

            renderer.setSize(windowWidth.value, windowHeight.value);
            camera.aspect = windowWidth.value/windowHeight.value;
            camera.updateProjectionMatrix();
        }
        
        onMounted(() => window.addEventListener('resize', onHeightChange))
        onUnmounted(() => window.removeEventListener('resize', onHeightChange))

        const ctrOrbit = new OrbitControls(camera, renderer.domElement);

        // ctrOrbit.enableDamping = true; // Set to false to disable damping (ie inertia)
        // ctrOrbit.dampingFactor = 0.25;

        // const ctrDrag = new DragControls([meshCube], camera, renderer.domElement);
        
        /**
         * Light - start
         */
        // const ambientLight = new THREE.AmbientLight(0xff0000, 1);
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);
        // const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
        // scene.add( directionalLight );
        // directionalLight.target = meshCube;

        let directionalLight = new THREE.DirectionalLight(0xffffff);
        // directionalLight.castShadow = true
        // directionalLight.shadow.mapSize.width = 512
        // directionalLight.shadow.mapSize.height = 512
        // directionalLight.shadow.camera.near = 0.5
        // directionalLight.shadow.camera.far = 100
        directionalLight.position.set( 2, 2, 2 )
        scene.add(directionalLight);
        
        directionalLight = new THREE.DirectionalLight(0x002288);
        directionalLight.position.set( - 2, - 2, - 2 )
        scene.add(directionalLight);

        // <Màu của ánh sáng>, <cường độ sáng>, <khoảng cách>
        // const pointLight = new THREE.PointLight( 0xff0040, 4, 50 );
        // pointLight.position.set( 50, 50, 50 );
        // scene.add( pointLight );
        // const light1 = new THREE.PointLight( 0xff0040, 4, 50 ); // lắp thêm 1 bóng đèn đỏ cường độ sáng x4
        // scene.add( light1 );

        const light2 = new THREE.PointLight( 0x0040ff, 3, 50 ); // lắp thêm bóng nữa
        scene.add( light2 );

        // const light3 = new THREE.PointLight( 0x80ff80, 4, 50 );
        // scene.add( light3 );
        // <Màu của ánh sáng>, <cường độ sáng>, <khoảng cách>
        // const spotLight = new THREE.SpotLight(0xff0000, 1, 100 );
        // spotLight.position.set( 50, 50, 50 )

        /**
         * Light - end
         */

        // create the shape
        const geoTorus = new THREE.TorusGeometry( 2, 0.1, 30, 200 ); // size of box
        const materialTorus = new THREE.MeshLambertMaterial({
            color: 0xc9f6cb,
            side: THREE.DoubleSide
        });
        const meshTorus = new THREE.Mesh(geoTorus, materialTorus)
        scene.add(meshTorus)

        const axesHelper = new THREE.AxesHelper( 3 );
        scene.add( axesHelper );

        return {
            renderer,
            gameLoop,
        }
    },
    mounted() {
        let that = this;
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
        that.gameLoop();
    },
})
</script>
