<template>
    <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane v-for="(tab, index) in productList" :key="index">
            <template #label>
                <span>{{tab.name}}</span>
            </template>
            <component :is="tab.component"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sample1CubeVue from './Sample1Cube.vue';
import Sample2LineVue from './Sample2Line.vue';
import Sample3Sphere from './Sample3Sphere.vue';
import Sample4SphereMove from './Sample4SphereMove.vue';
import Sample5TextureVue from './Sample5Texture.vue';


export default defineComponent({
    name: '',
    setup() {
        const productList = [
            { 
                name: 'Simple Cube',
                component: Sample1CubeVue,
            },
            { 
                name: 'Simple Line',
                component: Sample2LineVue,
            },
            { 
                name: 'Simple Sphere',
                component: Sample3Sphere,
            },
            { 
                name: 'Simple Controls',
                component: Sample4SphereMove
            },
            { 
                name: 'Simple Texture',
                component: Sample5TextureVue
            },
        ]

        return {
            productList
        }
    },
})
</script>
