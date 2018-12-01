<template>
    <el-form :model="form" :rules="rules" ref="password" label-width="100px">
        <el-form-item :label="$t('label.password_old')" prop="old_password">
            <el-input v-model="form.old_password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.password_new')" prop="new_password">
            <el-input v-model="form.new_password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.password_re')" prop="re_password" required>
            <el-input v-model="form.re_password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{$t("save")}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {modifyPassword} from "@/api/mine";

    export default {
        name: "MinePasswordForm",
        data() {
            const validateRePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('error.input_not_empty', {label: this.$t('label.password_re')})));
                } else if (value !== this.form.new_password) {
                    callback(new Error(this.$t('error.input_inconsistent', {time: 2, label: this.$t('label.password')})));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    old_password: '',
                    new_password: '',
                    re_password: '',
                },
                rules: {
                    old_password: [
                        {required: true, message: this.$t('error.input_not_empty', {label: this.$t('label.password_old')}), trigger: 'blur'},
                    ],
                    new_password: [
                        {required: true, message: this.$t('error.input_not_empty', {label: this.$t('label.password_new')}), trigger: 'blur'},
                        {min: 6, max: 20, message: this.$t('error.length_between', {min: 6, max: 20}), trigger: 'blur'}
                    ],
                    re_password: [
                        {validator: validateRePassword, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            onSubmit() {
                this.$refs.password.validate((valid) => {
                    if (valid) {
                        this.submit();
                    } else {
                        console.error('error submit!!');
                        return false;
                    }
                });
            },
            submit() {
                modifyPassword(this.form.old_password, this.form.new_password, this.form.re_password).then(res => {
                    this.$message({
                        message: res.message,
                        type: 'success',
                        duration: 5 * 1000
                    });
                }).catch(err => {
                    this.$message({
                        message: err.message ? err.message : err,
                        type: 'error',
                        duration: 5 * 1000
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>