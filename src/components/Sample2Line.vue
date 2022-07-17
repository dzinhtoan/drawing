<template>
    <div ref="threeContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as THREE from 'three';

export default defineComponent({
    setup() {
        // init

        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        const scene = new THREE.Scene();

        // For lines we have to use LineBasicMaterial or LineDashedMaterial.
        //create a blue LineBasicMaterial
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


        const points:any = [];
        points.push( new THREE.Vector3( - 10, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 10, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        scene.add( line );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animation );
        // renderer.render( scene, camera );
        
        // document.body.appendChild( renderer.domElement );

        // animation

        function animation( time ) {

            // line.rotation.x = time / 2000;
            // line.rotation.y = time / 1000;

            renderer.render( scene, camera );

        }
        return {
            renderer
        }
    },
    mounted() {
        (this.$refs['threeContainer'] as any).appendChild(this.renderer.domElement);
    },
})
</script>
