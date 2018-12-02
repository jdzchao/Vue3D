<template>
    <el-collapse-item name="uv">
        <template slot="title">
            <icon-font type="panel"></icon-font>
            <span style="margin: 0 0 0 5px">UV</span>
        </template>

        <div class="uv" v-if="loaded">
            <template v-for="item in uvs">
                <card-uv-info :item="item"></card-uv-info>
            </template>
        </div>
    </el-collapse-item>
</template>

<script>
    import {mapState} from 'vuex'
    import CardUvInfo from "./CardUvInfo";

    export default {
        name: "ItemUvSetter",
        components: {CardUvInfo},
        data() {
            return {}
        },
        computed: {
            ...mapState({
                uvs: state => state.sceneEditor.data.uvs,
            }),
            loaded() {
                return this.$store.getters.sceneRendered
            }
        }
    }
</script>
