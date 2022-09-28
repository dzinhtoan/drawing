<template>
    <el-tabs type="border-card" class="demo-tabs" v-model="tabName">
        <el-tab-pane v-for="(tab, index) in productList" :key="index" :name="tab.name">
                <template #label>
                    <span>{{tab.name}}</span>
                </template>
            <component :is="tab.component"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import Sample1CubeVue from './Sample1Cube.vue';
// import Sample2LineVue from './Sample2Line.vue';
// import Sample3Sphere from './Sample3Sphere.vue';
import Sample4SphereMove from './Sample4SphereMove.vue';
// import Sample5TextureVue from './Sample5Texture.vue';
// import Sample6ModelingVue from './Sample6Modeling.vue';
// // import Sample7EarthVue from './Sample7Earth.vue';
// import Sample8BlackOlliVue from './Sample8BlackOlli.vue';
// import Sample9GridOlli from './Sample9GridOlli.vue';


export default defineComponent({
    name: '',
    setup() {
        const productList = [
            // { 
            //     name: 'Simple Cube',
            //     component: Sample1CubeVue,
            // },
            // { 
            //     name: 'Simple Line',
            //     component: Sample2LineVue,
            // },
            // { 
            //     name: 'Simple Sphere',
            //     component: Sample3Sphere,
            // },
            { 
                name: 'Simple Controls',
                component: Sample4SphereMove
            },
            // { 
            //     name: 'Simple Texture',
            //     component: Sample5TextureVue
            // },
            // { 
            //     name: 'Simple Modeling',
            //     component: Sample6ModelingVue
            // },
            // { 
            //     name: 'Gray Olli',
            //     component: Sample8BlackOlliVue
            // },
            // { 
            //     name: 'Olli',
            //     component: Sample9GridOlli
            // },
        ]

        const tabName = ref('Simple Controls')

        return {
            productList,
            tabName
        }
    },
})
</script>
