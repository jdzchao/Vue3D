<template>
    <el-collapse-item name="uv-preview">
        <template slot="title">
            <icon-font type="panel"></icon-font>
            <span style="margin: 0 0 0 5px">UV-PREVIEW</span>
        </template>
        <div v-show="!disabled" class="canvas" ref="map"></div>
    </el-collapse-item>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ItemUvPreview",
        data() {
            return {
                map: null,
                disabled: true
            }
        },
        computed: {
            ...mapGetters({
                selectedMaterial: 'sceneSelectedMaterial'
            })
        },
        watch: {
            selectedMaterial(val) {
                if (val) {
                    this.map = val.map_canvas.dom;
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            map(val, oldVal) {
                if (!val || val === oldVal) return;
                this.map.style.width = '313px';
                this.map.style.height = '313px';
                this.$refs.map.innerHTML = '';
                this.$refs.map.appendChild(this.map);
            },
        },
    }
</script>

<style scoped>
    .canvas {
        width: 313px;
        height: 313px;
        border: 1px dashed #dddddd;
    }
</style>

<style>
    .input-with-select {
        margin-bottom: 5px;
    }

    .input-with-select .el-select .el-input {
        width: 100px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>
