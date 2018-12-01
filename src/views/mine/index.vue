<template>
    <div class="mine">
        <div class="info">
            <el-card shadow="hover">
                <div slot="header">
                    <span>{{$t("navbar.mine")}}</span>
                </div>
                <mine-info-form></mine-info-form>
            </el-card>
        </div>
        <div class="security">
            <el-card shadow="hover">
                <div slot="header">
                    <span>{{$t("navbar.security")}}</span>
                </div>
                <mine-password-form></mine-password-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import MineInfoForm from "@/modules/Mine/InfoForm";
    import MinePasswordForm from "@/modules/Mine/PasswordForm";

    export default {
        name: "mine",
        components: {MinePasswordForm, MineInfoForm}
    }
</script>

<style scoped>
    .info {
        float: left;
        width: 60%;
    }

    .security {
        float: left;
        margin: 0 0 0 10px;
        width: calc(40% - 10px);
    }
</style>