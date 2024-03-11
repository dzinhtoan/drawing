<template>
    <div ref="threeContainer" id="threeContainer"></div>
    <el-button size="large" @click="handlePointLight">Click</el-button>
    <video id="videoEl" width="400" controls autoplay crossorigin="anonymous" style="display: none">
        <source src="https://minio-api.jenkins-x-viettel.iviet.com/olli-public-images/chatbot/videos/Wildlife%20Windows%207%20Sample%20Video.mp4" type="video/mp4">
        Your browser does not support HTML video.
    </video>
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
        scene.background = new THREE.Color( 0x000000 );

        const camera = new THREE.PerspectiveCamera( 70, initWidth.value / initHeight.value, 0.01, 1000 );
        camera.position.z = -0.007;
        camera.position.y = 0.4;
        camera.position.x = 1.4;


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
        let model = ref()
        const modelUrl = new URL('../assets/models/glb/living-room.glb', import.meta.url).href;
        console.log('meta url', modelUrl);
        
        loader.load( modelUrl, function ( gltf ) {
            gltf.scene.position.x = -2.5;
            gltf.scene.position.y = -0.5;
            gltf.scene.position.z = 0.6;
            scene.add( gltf.scene );

        }, undefined, function ( error ) {

            console.error( error );

        } );

        const pointLight = ref(new THREE.PointLight( 0xfafafa, 3, 5 ));
        pointLight.value.position.set( 0.1, 0.1, 0.11 );
        scene.add( pointLight.value );

        // // Alternatively, to parse a previously loaded JSON structure
        // // const object = loader.parse( '/model/low-poly-fox/low-poly-fox-by-pixelmannen.json' );
        // // scene.add( object );

        var grid = new THREE.GridHelper(50, 50);
        scene.add(grid);

        // The X axis is red. The Y axis is green. The Z axis is blue.
        const axesHelper = new THREE.AxesHelper(4);
        scene.add( axesHelper );
        const isLight = ref(true)
        const handlePointLight = () => {
            if (isLight.value) {
                pointLight.value.intensity = 0
            } else {
                pointLight.value.intensity = 3
            }
            isLight.value = !isLight.value
        }
       

        return {
            renderer,
            gameLoop,
            handlePointLight,
            scene
        }
    },
    mounted() {
        let that = this;

        //Get your video element:
        const video = document.getElementById('videoEl') as HTMLVideoElement;
        video.onloadeddata = function () {
            video.play();
        };

        //Create your video texture:
        const videoTexture = new THREE.VideoTexture(video);
        const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );
        //Create screen
        const screen = new THREE.PlaneGeometry(1, 0.5);
        // screen.rotateX(1);
        // screen.rotateY(0.5);
        // screen.rotateZ(0.5);
        const videoScreen = new THREE.Mesh(screen, videoMaterial);
        videoScreen.position.set(-0.9, 0.23, -1.301 )

        this.scene.add(videoScreen);
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
        that.gameLoop();
    },
})
</script>
