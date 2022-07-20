<template>
    <div ref="threeContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as THREE from 'three';

export default defineComponent({
    setup() {
        const initWidth = window.innerWidth - 40;
        const initHeight = window.innerHeight - 100;
        // init
        const scene = new THREE.Scene();
        // Just for fun
        scene.background = new THREE.Color( 'skyblue' );

        const camera = new THREE.PerspectiveCamera( 70, initWidth / initHeight, 0.01, 1000 );
        camera.position.z = 3

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( initWidth, initHeight );

        const geometry = new THREE.SphereGeometry(1, 8, 5); // size of box
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
        //wireframe = false -> will not show 

        const sphere = new THREE.Mesh(geometry, material);
        scene.add( sphere );
        
        //game login
		const update = function() {
            // Just for fun
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.005;
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
		};

        // gameLoop();

        return {
            renderer,
            gameLoop
        }
    },
    mounted() {
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
        this.gameLoop();
    },
})
</script>
