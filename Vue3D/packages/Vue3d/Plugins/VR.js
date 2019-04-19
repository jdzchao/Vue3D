import * as WEBVR from "_v3d/utils/WebVR.js"

export default {
    created() {
        document.body.appendChild(WEBVR.createButton(renderer));
    }
}
