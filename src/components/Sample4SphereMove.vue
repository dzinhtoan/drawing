<template>
    <div ref="threeContainer" id="threeContainer"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
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
        camera.position.z = 3

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( initWidth.value, initHeight.value );

        const geometry = new THREE.SphereGeometry(1, 8, 5); // size of box
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
        //wireframe = false -> will not show 

        const sphere = new THREE.Mesh(geometry, material);
        scene.add( sphere );
        
        const ctrTrackball = new TrackballControls(camera, renderer.domElement)
        
        //game login
		const update = function() {
            // Just for fun
            // sphere.rotation.x += 0.01;
            // sphere.rotation.y += 0.005;
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
        // How far you can orbit vertically, upper and lower limits.
        ctrOrbit.minPolarAngle = 0;
        ctrOrbit.maxPolarAngle = Math.PI;

        // How far you can dolly in and out ( PerspectiveCamera only )
        ctrOrbit.minDistance = 0;
        ctrOrbit.maxDistance = Infinity;

        // this.enableZoom = true; // Set to false to disable zooming
        // this.zoomSpeed = 1.0;
        ctrOrbit.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

        ctrOrbit.enableDamping = true; // Set to false to disable damping (ie inertia)
        ctrOrbit.dampingFactor = 0.25;

        // const ctrDrag = new DragControls([sphere], camera, renderer.domElement);
        // const ctrPointerLock = new PointerLockControls(camera, renderer.domElement)
        
        
        return {
            renderer,
            gameLoop,
            // ctrPointerLock
        }
    },
    mounted() {
        let that = this;
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
        // if (document.getElementById('threeContainer') != null) {
        //     (document.getElementById('threeContainer') as any).addEventListener( 'click', function () {
        //         that.ctrPointerLock.lock();
        //     }, false )
        // }
        that.gameLoop();
    },
})
</script>
