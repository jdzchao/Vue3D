<template>
    <div id="Vue3D">
        <span style="color:#41B883;">Vue</span>
        <span style="color:#ffffff;">3D</span>
    </div>
</template>

<script>
    export default {
        name: "Logo"
    }
</script>

<style scoped>
    #Vue3D {
        width: 150px;
        font-size: 40px;
        text-align: center;
        animation: rotate 2s ease-in-out alternate infinite;
    }

    #Vue3D:before {
        content: attr(data-shadow);
        color: transparent;
        text-shadow: 0 0 15px #111;
        position: absolute;
        z-index: -1;
        margin: -0.1em 0 0 0;
        animation: skew 2s ease-in-out alternate infinite;
        transform-origin: bottom;
    }

    @keyframes rotate {
        from {
            transform: rotateY(-10deg);
            text-shadow: 1px -1px #CCC,
            2px -1px #BBB,
            3px -2px #AAA,
            4px -2px #999,
            5px -3px #888,
            6px -3px #777;
        }
        to {
            transform: rotateY(10deg);
            text-shadow: -1px -1px #CCC,
            -2px -1px #BBB,
            -3px -2px #AAA,
            -4px -2px #999,
            -5px -3px #888,
            -6px -3px #777;
        }
    }

    @keyframes skew {
        from {
            transform: scaleY(0.3) skewX(-15deg);
        }
        to {
            transform: scaleY(0.3) skewX(-20deg);
        }
    }
</style>
