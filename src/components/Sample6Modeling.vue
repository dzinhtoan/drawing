<template>
    <div ref="threeContainer" id="threeContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default defineComponent({
    setup() {
        const initWidth = ref(window.innerWidth - 40);
        const initHeight = ref(window.innerHeight - 100);

        // init
        const scene = new THREE.Scene();
        // Just for fun
        scene.background = new THREE.Color( 0xCCCCCC );

        const camera = new THREE.PerspectiveCamera( 70, initWidth.value / initHeight.value, 0.01, 1000 );
        // camera.position.z = 2
        camera.position.z = 50;
        camera.position.y = 30;
        camera.position.x = -20;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( initWidth.value, initHeight.value );


        const ctrTrackball = new TrackballControls(camera, renderer.domElement)
        
        //game login
		const update = function() {
            // meshTorus.rotation.x += 0.01;
            // meshTorus.rotation.y += 0.005;
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
        
        /**
         * Light - <Màu của ánh sáng>, <cường độ sáng>, <khoảng cách> - start 
         */
        // const ambientLight = new THREE.AmbientLight(0xff0000, 1);
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
        directionalLight.position.set(5, 50, 10);
        scene.add(directionalLight);
        /**
         * Light - end
         */
        const loader = new GLTFLoader();
        // const modelUrl = new URL('../assets/models/glb/Totoro.glb', import.meta.url).href;
        const modelUrl = new URL('../assets/models/glb/PinkGLTB.glb', import.meta.url).href;
        console.log('meta url', modelUrl);
        
        loader.load( modelUrl, function ( gltf ) {

            scene.add( gltf.scene );

        }, undefined, function ( error ) {

            console.error( error );

        } );
        // Alternatively, to parse a previously loaded JSON structure
        // const object = loader.parse( '/model/low-poly-fox/low-poly-fox-by-pixelmannen.json' );
        // scene.add( object );

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
