<template>
    <div id="error_page" class="error">
        <h1>{{code}}</h1>
        <h2>{{message}}</h2>
        <p><a href="javascript:void(0);" @click="backHome">Click here </a> to go home.</p>
        <p><a href="javascript:void(0);" @click="backPrev">Click here </a>({{ second }}s) to go back.</p>
    </div>
</template>

<script>
    export default {
        name: "error_page",
        props: {
            code: {type: Number, default: 404},
            message: {type: String, default: "Page Not Found"}
        },
        data() {
            return {
                second: 5,
                timer: null,
            }
        },
        methods: {
            backHome() {
                this.$router.replace({
                    name: 'home'
                })
            },
            backPrev() {
                this.$router.go(-1)
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                if (this.second === 0) this.backPrev()
                else this.second--
            }, 1000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>
    .error {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        text-align: center;
    }

    h1 {
        margin-top: 30vh;
        font-size: 30vh;
    }
</style>