<template>
    <div ref="threeContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as THREE from 'three';

export default defineComponent({
    setup() {
        // init
        const initWidth = window.innerWidth - 40;
        const initHeight = window.innerHeight - 100;
        const camera = new THREE.PerspectiveCamera( 70, initWidth / initHeight, 0.01, 10 );
        // field of view FOW = 70 degree( range là 1 tới 179 deg )
        // aspect ratio = initWidth / initHeight
        // near 0.01 (default là 0.1)
        // far 10 (default là 2000)

        camera.position.z = 1;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        const material = new THREE.MeshNormalMaterial();

        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        const renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( initWidth, initHeight );
        renderer.setAnimationLoop( animation );
        
        // document.body.appendChild( renderer.domElement );

        // animation

        function animation( time ) {

            cube.rotation.x = time / 2000;
            cube.rotation.y = time / 1000;

            renderer.render( scene, camera );

        }

        // The X axis is red. The Y axis is green. The Z axis is blue.
        const axesHelper = new THREE.AxesHelper( 1 );
        scene.add( axesHelper );

        return {
            renderer
        }
    },
    mounted() {
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
    },
})
</script>
