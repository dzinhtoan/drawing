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
        scene.background = new THREE.Color( 'skyblue' );

        const camera = new THREE.PerspectiveCamera( 70, initWidth.value / initHeight.value, 0.01, 1000 );
        camera.position.z = 2

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( initWidth.value, initHeight.value );


        // const geoSphere = new THREE.SphereGeometry(1, 8, 5); // size of box
        const geoCube = new THREE.BoxGeometry(1, 1, 1); // size of box
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: false} );
        // const material = new THREE.MeshNormalMaterial({wireframe: false});

        // const textureLoader = new THREE.TextureLoader();
        // const texture0 = textureLoader.load('/images/olli/olli-tabumi-next.jpg');
        // const texture1 = textureLoader.load('/images/olli/olli-tamibu-2.jpg');
        // const texture2 = textureLoader.load('/images/olli/olli-tabumi-1.jpg');
        // const texture3 = textureLoader.load('/images/olli/olli-tabumi-3.jpg');
        // const texture4 = textureLoader.load('/images/olli/olli-tabumi-4.jpg');
        // const texture5 = textureLoader.load('/images/olli/olli-tabumi-hand.jpg');
        // const material = [
        //     new THREE.MeshBasicMaterial({map: texture0, side: THREE.DoubleSide}), //right
        //     new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide}), //left
        //     new THREE.MeshBasicMaterial({map: texture2, side: THREE.DoubleSide}), //top
        //     new THREE.MeshBasicMaterial({map: texture3, side: THREE.DoubleSide}), //bottom
        //     new THREE.MeshBasicMaterial({map: texture4, side: THREE.DoubleSide}), //front
        //     new THREE.MeshBasicMaterial({map: texture5, side: THREE.DoubleSide}), //back
        // ];

        //wireframe = false -> will not show 

        const meshCube = new THREE.Mesh(geoCube, material);
        scene.add( meshCube );

        const ctrTrackball = new TrackballControls(camera, renderer.domElement)
        
        //game login
		const update = function() {
            // Just for fun
            // meshCube.rotation.x += 0.01;
            // meshCube.rotation.y += 0.005;
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
        // const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
        // scene.add( directionalLight );
        // directionalLight.target = meshCube;

        // const directionalLight = new THREE.DirectionalLight()
        // directionalLight.castShadow = true
        // directionalLight.shadow.mapSize.width = 512
        // directionalLight.shadow.mapSize.height = 512
        // directionalLight.shadow.camera.near = 0.5
        // directionalLight.shadow.camera.far = 100
        // scene.add(directionalLight)

        // <Màu của ánh sáng>, <cường độ sáng>, <khoảng cách>
        // const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
        // pointLight.position.set( 50, 50, 50 );
        // scene.add( pointLight );

        // <Màu của ánh sáng>, <cường độ sáng>, <khoảng cách>
        // const spotLight = new THREE.SpotLight(0xff0000, 1, 100 );
        // spotLight.position.set( 50, 50, 50 )

        const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
        scene.add(ambientLight);

        /**
         * Light - end
         */

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
