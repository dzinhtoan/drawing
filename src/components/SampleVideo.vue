<template>
    <div id="container" ref="threeContainer"></div>
    <div id="blocker"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default defineComponent({
    setup() {
        const initWidth = ref(window.innerWidth - 40);
        const initHeight = ref(window.innerHeight - 100);

        // init
        const scene = new THREE.Scene();
        // Just for fun
        // scene.background = new THREE.Color( 0x000000 );

        const camera = new THREE.PerspectiveCamera( 70, initWidth.value / initHeight.value, 0.01, 1000 );
        // camera.position.z = -0.007;
        // camera.position.y = 0.4;
        // camera.position.x = 1.4;

        camera.position.set( 500, 350, 750 );

        const renderer = new CSS3DRenderer();
        renderer.setSize( initWidth.value, initHeight.value );
        const ctrTrackball = new TrackballControls(camera, renderer.domElement)

        
        //run gameloop (update, render, repeat)
		const gameLoop = function() {
			requestAnimationFrame(gameLoop);
			renderer.render(scene, camera);
            ctrTrackball.update();
		};


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

        // const pointLight = ref(new THREE.PointLight( 0xfafafa, 3, 5 ));
        // pointLight.value.position.set( 0.1, 0.1, 0.11 );
        // scene.add( pointLight.value );

        var grid = new THREE.GridHelper(50, 50);
        scene.add(grid);

        // The X axis is red. The Y axis is green. The Z axis is blue.
        const axesHelper = new THREE.AxesHelper(4);
        scene.add( axesHelper );

        
        // /-----------------------------
        var oElement = function ( id, x, y, z, ry ) {
            var div = document.createElement( 'div' );
            div.style.width = '480px';
            div.style.height = '360px';
            div.style.backgroundColor = '#000';
            var iframe = document.createElement( 'iframe' );
            iframe.style.width = '480px';
            iframe.style.height = '360px';
            iframe.style.border = '0px';
            iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0&autoplay=1&mute=1' ].join( '' );
            div.appendChild( iframe );
            var object = new CSS3DObject( div );
            object.position.set( x, y, z );
            object.rotation.y = ry;
            return object;
        };

        var container = document.getElementById( 'container' );

        var group = new THREE.Group();
        group.add( oElement( 'TlLijkYQjlw', 0, 0, 240, 0 ) );
        // group.add( oElement( 'RbtgTFGDkxA', 240, 0, 0, Math.PI / 2 ) );
        // group.add( oElement( 'fuyZFMRtXGs', 0, 0, - 240, Math.PI ) );
        // group.add( oElement( 'uqj9j-qz4AE', - 240, 0, 0, - Math.PI / 2 ) );
        scene.add( group );

        // Block iframe events when dragging camera

        // var blocker = document.getElementById( 'blocker' );
        // blocker.style.display = 'none';

        // document.addEventListener( 'mousedown', function () {

        //     blocker.style.display = '';

        // } );
        // document.addEventListener( 'mouseup', function () {
        //     blocker.style.display = 'none';

        // } );

        return {
            renderer,
            gameLoop
        }
    },
    mounted() {
        let that = this;
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
        that.gameLoop();
    },
})
</script>
