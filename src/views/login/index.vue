<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                 label-position="left">
            <h3 class="title">{{$t('site.title')}}</h3>
            <el-form-item prop="account">
        <span class="icons">
            <icon-font type="user"></icon-font>
        </span>
                <el-input v-model="loginForm.account" name="account" type="text" auto-complete="on"
                          :placeholder="$t('placeholder.email_or_phone')"/>
            </el-form-item>
            <el-form-item prop="password">
        <span class="icons">
          <icon-font type="password"></icon-font>
        </span>
                <el-input
                        :type="pwdType"
                        v-model="loginForm.password"
                        name="password"
                        auto-complete="on"
                        :placeholder="$t('placeholder.password')"
                        @keyup.enter.native="handleLogin"/>
                <span class="show-pwd" @click="showPwd">
          <icon-svg icon-class="eye"/>
        </span>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                    {{$t('sign in')}}
                </el-button>
            </el-form-item>
        </el-form>
        <div class="copyright">
            <p>{{$t('site.copyright')}}</p>
        </div>
    </div>
</template>

<script>
    import {validateAccount} from '@/utils/validate'

    export default {
        name: 'Login',
        data() {
            const vAccount = (rule, value, callback) => {
                if (!validateAccount(value)) {
                    callback(new Error(this.$t('error.account')))
                } else {
                    callback()
                }
            }
            const vPass = (rule, value, callback) => {
                if (value.length < 5) {
                    callback(new Error(this.$t('error.password')))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    account: process.env.NODE_ENV === 'development' ? 'admin@cprap.com' : '',
                    password: process.env.NODE_ENV === 'development' ? 'admin' : ''
                },
                loginRules: {
                    account: [{required: true, trigger: 'blur', validator: vAccount}],
                    password: [{required: true, trigger: 'blur', validator: vPass}]
                },
                loading: false,
                pwdType: 'password',
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('Login', this.loginForm).then(() => {
                            this.loading = false
                            this.$router.push({path: this.redirect || '/'})
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.error('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 520px;
            max-width: 100%;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .icons {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
        .copyright {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            p {
                margin: 0;
                line-height: 20px;
                color: #c3c3c3;
            }
        }
    }
</style>
