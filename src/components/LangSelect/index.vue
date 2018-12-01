<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <div>
            <icon-font type="language" :size="20"/>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language==='zh-CN'" command="zh-CN">简体中文</el-dropdown-item>
            <el-dropdown-item :disabled="language==='zh-TW'" command="zh-TW">繁体中文</el-dropdown-item>
            <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        methods: {
            handleSetLanguage(lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('setLanguage', lang).then()
                this.$message({
                    message: this.$t('switch language success'),
                    type: 'success'
                })
            }
        }
    }
</script>

