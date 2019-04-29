/**
 * @author arodic / https://github.com/arodic
 * @author JDZChao
 */
import {
    DoubleSide, Vector3, Matrix4, Quaternion, Object3D, Mesh, Line, Euler, Raycaster, Color,
    PerspectiveCamera, OrthographicCamera, MeshBasicMaterial, LineBasicMaterial,
    PlaneBufferGeometry, CylinderBufferGeometry, BoxBufferGeometry, BufferGeometry,
    OctahedronBufferGeometry, TorusBufferGeometry, SphereBufferGeometry,
    Float32BufferAttribute,
} from 'three/build/three.module'

export let TransformControls = function (camera, domElement) {

    Object3D.call(this);

    domElement = (domElement !== undefined) ? domElement : document;

    this.visible = false;

    let _gizmo = new TransformControlsGizmo();
    this.add(_gizmo);

    let _plane = new TransformControlsPlane();
    this.add(_plane);

    let scope = this;

    // Define properties with getters/setter
    // Setting the defined property will automatically trigger change event
    // Defined properties are passed down to gizmo and plane

    defineProperty("camera", camera);
    defineProperty("object", undefined);
    defineProperty("enabled", true);
    defineProperty("axis", null);
    defineProperty("mode", "translate");
    defineProperty("translationSnap", null);
    defineProperty("rotationSnap", null);
    defineProperty("space", "world");
    defineProperty("size", 1);
    defineProperty("dragging", false);
    defineProperty("showX", true);
    defineProperty("showY", true);
    defineProperty("showZ", true);

    let changeEvent = {type: "change"};
    let mouseDownEvent = {type: "mouseDown"};
    let mouseUpEvent = {type: "mouseUp", mode: scope.mode};
    let objectChangeEvent = {type: "objectChange"};

    // Reusable utility variables

    let ray = new Raycaster();

    let _tempVector = new Vector3();
    let _tempVector2 = new Vector3();
    let _tempQuaternion = new Quaternion();
    let _unit = {
        X: new Vector3(1, 0, 0),
        Y: new Vector3(0, 1, 0),
        Z: new Vector3(0, 0, 1)
    };
    let _identityQuaternion = new Quaternion();
    let _alignVector = new Vector3();

    let pointStart = new Vector3();
    let pointEnd = new Vector3();
    let offset = new Vector3();
    let rotationAxis = new Vector3();
    let startNorm = new Vector3();
    let endNorm = new Vector3();
    let rotationAngle = 0;

    let cameraPosition = new Vector3();
    let cameraQuaternion = new Quaternion();
    let cameraScale = new Vector3();

    let parentPosition = new Vector3();
    let parentQuaternion = new Quaternion();
    let parentQuaternionInv = new Quaternion();
    let parentScale = new Vector3();

    let worldPositionStart = new Vector3();
    let worldQuaternionStart = new Quaternion();
    let worldScaleStart = new Vector3();

    let worldPosition = new Vector3();
    let worldQuaternion = new Quaternion();
    let worldQuaternionInv = new Quaternion();
    let worldScale = new Vector3();

    let eye = new Vector3();

    let positionStart = new Vector3();
    let quaternionStart = new Quaternion();
    let scaleStart = new Vector3();

    // TODO: remove properties unused in plane and gizmo

    defineProperty("worldPosition", worldPosition);
    defineProperty("worldPositionStart", worldPositionStart);
    defineProperty("worldQuaternion", worldQuaternion);
    defineProperty("worldQuaternionStart", worldQuaternionStart);
    defineProperty("cameraPosition", cameraPosition);
    defineProperty("cameraQuaternion", cameraQuaternion);
    defineProperty("pointStart", pointStart);
    defineProperty("pointEnd", pointEnd);
    defineProperty("rotationAxis", rotationAxis);
    defineProperty("rotationAngle", rotationAngle);
    defineProperty("eye", eye);

    {

        domElement.addEventListener("mousedown", onPointerDown, false);
        domElement.addEventListener("touchstart", onPointerDown, false);
        domElement.addEventListener("mousemove", onPointerHover, false);
        domElement.addEventListener("touchmove", onPointerHover, false);
        domElement.addEventListener("touchmove", onPointerMove, false);
        document.addEventListener("mouseup", onPointerUp, false);
        domElement.addEventListener("touchend", onPointerUp, false);
        domElement.addEventListener("touchcancel", onPointerUp, false);
        domElement.addEventListener("touchleave", onPointerUp, false);

    }

    this.dispose = function () {

        domElement.removeEventListener("mousedown", onPointerDown);
        domElement.removeEventListener("touchstart", onPointerDown);
        domElement.removeEventListener("mousemove", onPointerHover);
        domElement.removeEventListener("touchmove", onPointerHover);
        domElement.removeEventListener("touchmove", onPointerMove);
        document.removeEventListener("mouseup", onPointerUp);
        domElement.removeEventListener("touchend", onPointerUp);
        domElement.removeEventListener("touchcancel", onPointerUp);
        domElement.removeEventListener("touchleave", onPointerUp);

        this.traverse(function (child) {

            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();

        });

    };

    // Set current object
    this.attach = function (object) {

        this.object = object;
        this.visible = true;

    };

    // Detatch from object
    this.detach = function () {

        this.object = undefined;
        this.visible = false;
        this.axis = null;

    };

    // Defined getter, setter and store for a property
    function defineProperty(propName, defaultValue) {

        let propValue = defaultValue;

        Object.defineProperty(scope, propName, {

            get: function () {

                return propValue !== undefined ? propValue : defaultValue;

            },

            set: function (value) {

                if (propValue !== value) {

                    propValue = value;
                    _plane[propName] = value;
                    _gizmo[propName] = value;

                    scope.dispatchEvent({type: propName + "-changed", value: value});
                    scope.dispatchEvent(changeEvent);

                }

            }

        });

        scope[propName] = defaultValue;
        _plane[propName] = defaultValue;
        _gizmo[propName] = defaultValue;

    }

    // updateMatrixWorld  updates key transformation variables
    this.updateMatrixWorld = function () {

        if (this.object !== undefined) {

            this.object.updateMatrixWorld();
            this.object.parent.matrixWorld.decompose(parentPosition, parentQuaternion, parentScale);
            this.object.matrixWorld.decompose(worldPosition, worldQuaternion, worldScale);

            parentQuaternionInv.copy(parentQuaternion).inverse();
            worldQuaternionInv.copy(worldQuaternion).inverse();

        }

        this.camera.updateMatrixWorld();
        this.camera.matrixWorld.decompose(cameraPosition, cameraQuaternion, cameraScale);

        if (this.camera instanceof PerspectiveCamera) {

            eye.copy(cameraPosition).sub(worldPosition).normalize();

        } else if (this.camera instanceof OrthographicCamera) {

            eye.copy(cameraPosition).normalize();

        }

        Object3D.prototype.updateMatrixWorld.call(this);

    };

    this.pointerHover = function (pointer) {

        if (this.object === undefined || this.dragging === true || (pointer.button !== undefined && pointer.button !== 0)) return;

        ray.setFromCamera(pointer, this.camera);

        let intersect = ray.intersectObjects(_gizmo.picker[this.mode].children, true)[0] || false;

        if (intersect) {

            this.axis = intersect.object.name;

        } else {

            this.axis = null;

        }

    };

    this.pointerDown = function (pointer) {

        if (this.object === undefined || this.dragging === true || (pointer.button !== undefined && pointer.button !== 0)) return;

        if ((pointer.button === 0 || pointer.button === undefined) && this.axis !== null) {

            ray.setFromCamera(pointer, this.camera);

            let planeIntersect = ray.intersectObjects([_plane], true)[0] || false;

            if (planeIntersect) {

                let space = this.space;

                if (this.mode === 'scale') {

                    space = 'local';

                } else if (this.axis === 'E' || this.axis === 'XYZE' || this.axis === 'XYZ') {

                    space = 'world';

                }

                if (space === 'local' && this.mode === 'rotate') {

                    let snap = this.rotationSnap;

                    if (this.axis === 'X' && snap) this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
                    if (this.axis === 'Y' && snap) this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
                    if (this.axis === 'Z' && snap) this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;

                }

                this.object.updateMatrixWorld();
                this.object.parent.updateMatrixWorld();

                positionStart.copy(this.object.position);
                quaternionStart.copy(this.object.quaternion);
                scaleStart.copy(this.object.scale);

                this.object.matrixWorld.decompose(worldPositionStart, worldQuaternionStart, worldScaleStart);

                pointStart.copy(planeIntersect.point).sub(worldPositionStart);

            }

            this.dragging = true;
            mouseDownEvent.mode = this.mode;
            this.dispatchEvent(mouseDownEvent);

        }

    };

    this.pointerMove = function (pointer) {

        let axis = this.axis;
        let mode = this.mode;
        let object = this.object;
        let space = this.space;

        if (mode === 'scale') {

            space = 'local';

        } else if (axis === 'E' || axis === 'XYZE' || axis === 'XYZ') {

            space = 'world';

        }

        if (object === undefined || axis === null || this.dragging === false || (pointer.button !== undefined && pointer.button !== 0)) return;

        ray.setFromCamera(pointer, this.camera);

        let planeIntersect = ray.intersectObjects([_plane], true)[0] || false;

        if (planeIntersect === false) return;

        pointEnd.copy(planeIntersect.point).sub(worldPositionStart);

        if (mode === 'translate') {

            // Apply translate

            offset.copy(pointEnd).sub(pointStart);

            if (space === 'local' && axis !== 'XYZ') {
                offset.applyQuaternion(worldQuaternionInv);
            }

            if (axis.indexOf('X') === -1) offset.x = 0;
            if (axis.indexOf('Y') === -1) offset.y = 0;
            if (axis.indexOf('Z') === -1) offset.z = 0;

            if (space === 'local' && axis !== 'XYZ') {
                offset.applyQuaternion(quaternionStart).divide(parentScale);
            } else {
                offset.applyQuaternion(parentQuaternionInv).divide(parentScale);
            }

            object.position.copy(offset).add(positionStart);

            // Apply translation snap

            if (this.translationSnap) {

                if (space === 'local') {

                    object.position.applyQuaternion(_tempQuaternion.copy(quaternionStart).inverse());

                    if (axis.search('X') !== -1) {
                        object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search('Y') !== -1) {
                        object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search('Z') !== -1) {
                        object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                    }

                    object.position.applyQuaternion(quaternionStart);

                }

                if (space === 'world') {

                    if (object.parent) {
                        object.position.add(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                    }

                    if (axis.search('X') !== -1) {
                        object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search('Y') !== -1) {
                        object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search('Z') !== -1) {
                        object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                    }

                    if (object.parent) {
                        object.position.sub(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                    }

                }

            }

        } else if (mode === 'scale') {

            if (axis.search('XYZ') !== -1) {

                let d = pointEnd.length() / pointStart.length();

                if (pointEnd.dot(pointStart) < 0) d *= -1;

                _tempVector2.set(d, d, d);

            } else {

                _tempVector.copy(pointStart);
                _tempVector2.copy(pointEnd);

                _tempVector.applyQuaternion(worldQuaternionInv);
                _tempVector2.applyQuaternion(worldQuaternionInv);

                _tempVector2.divide(_tempVector);

                if (axis.search('X') === -1) {
                    _tempVector2.x = 1;
                }
                if (axis.search('Y') === -1) {
                    _tempVector2.y = 1;
                }
                if (axis.search('Z') === -1) {
                    _tempVector2.z = 1;
                }

            }

            // Apply scale

            object.scale.copy(scaleStart).multiply(_tempVector2);

        } else if (mode === 'rotate') {

            offset.copy(pointEnd).sub(pointStart);

            let ROTATION_SPEED = 20 / worldPosition.distanceTo(_tempVector.setFromMatrixPosition(this.camera.matrixWorld));

            if (axis === 'E') {

                rotationAxis.copy(eye);
                rotationAngle = pointEnd.angleTo(pointStart);

                startNorm.copy(pointStart).normalize();
                endNorm.copy(pointEnd).normalize();

                rotationAngle *= (endNorm.cross(startNorm).dot(eye) < 0 ? 1 : -1);

            } else if (axis === 'XYZE') {

                rotationAxis.copy(offset).cross(eye).normalize();
                rotationAngle = offset.dot(_tempVector.copy(rotationAxis).cross(this.eye)) * ROTATION_SPEED;

            } else if (axis === 'X' || axis === 'Y' || axis === 'Z') {

                rotationAxis.copy(_unit[axis]);

                _tempVector.copy(_unit[axis]);

                if (space === 'local') {
                    _tempVector.applyQuaternion(worldQuaternion);
                }

                rotationAngle = offset.dot(_tempVector.cross(eye).normalize()) * ROTATION_SPEED;

            }

            // Apply rotation snap

            if (this.rotationSnap) rotationAngle = Math.round(rotationAngle / this.rotationSnap) * this.rotationSnap;

            this.rotationAngle = rotationAngle;

            // Apply rotate
            if (space === 'local' && axis !== 'E' && axis !== 'XYZE') {

                object.quaternion.copy(quaternionStart);
                object.quaternion.multiply(_tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle)).normalize();

            } else {

                rotationAxis.applyQuaternion(parentQuaternionInv);
                object.quaternion.copy(_tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle));
                object.quaternion.multiply(quaternionStart).normalize();

            }

        }

        this.dispatchEvent(changeEvent);
        this.dispatchEvent(objectChangeEvent);

    };

    this.pointerUp = function (pointer) {

        if (pointer.button !== undefined && pointer.button !== 0) return;

        if (this.dragging && (this.axis !== null)) {

            mouseUpEvent.mode = this.mode;
            this.dispatchEvent(mouseUpEvent);

        }

        this.dragging = false;

        if (pointer.button === undefined) this.axis = null;

    };

    // normalize mouse / touch pointer and remap {x,y} to view space.

    function getPointer(event) {

        let pointer = event.changedTouches ? event.changedTouches[0] : event;

        let rect = domElement.getBoundingClientRect();

        return {
            x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
            y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
            button: event.button
        };

    }

    // mouse / touch event handlers

    function onPointerHover(event) {

        if (!scope.enabled) return;

        scope.pointerHover(getPointer(event));

    }

    function onPointerDown(event) {

        if (!scope.enabled) return;

        document.addEventListener("mousemove", onPointerMove, false);

        scope.pointerHover(getPointer(event));
        scope.pointerDown(getPointer(event));

    }

    function onPointerMove(event) {

        if (!scope.enabled) return;

        scope.pointerMove(getPointer(event));

    }

    function onPointerUp(event) {

        if (!scope.enabled) return;

        document.removeEventListener("mousemove", onPointerMove, false);

        scope.pointerUp(getPointer(event));

    }

    // TODO: depricate

    this.getMode = function () {

        return scope.mode;

    };

    this.setMode = function (mode) {

        scope.mode = mode;

    };

    this.setTranslationSnap = function (translationSnap) {

        scope.translationSnap = translationSnap;

    };

    this.setRotationSnap = function (rotationSnap) {

        scope.rotationSnap = rotationSnap;

    };

    this.setSize = function (size) {

        scope.size = size;

    };

    this.setSpace = function (space) {

        scope.space = space;

    };

    this.update = function () {

        console.warn('THREE.TransformControls: update function has been depricated.');

    };

};

TransformControls.prototype = Object.assign(Object.create(Object3D.prototype), {

    constructor: TransformControls,

    isTransformControls: true

});


let TransformControlsGizmo = function () {

    'use strict';

    Object3D.call(this);

    this.type = 'TransformControlsGizmo';

    // shared materials

    let gizmoMaterial = new MeshBasicMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        side: DoubleSide,
        fog: false
    });

    let gizmoLineMaterial = new LineBasicMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        linewidth: 1,
        fog: false
    });

    // Make unique material for each axis/color

    let matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0.15;

    let matHelper = gizmoMaterial.clone();
    matHelper.opacity = 0.33;

    let matRed = gizmoMaterial.clone();
    matRed.color.set(0xff0000);

    let matGreen = gizmoMaterial.clone();
    matGreen.color.set(0x00ff00);

    let matBlue = gizmoMaterial.clone();
    matBlue.color.set(0x0000ff);

    let matWhiteTransperent = gizmoMaterial.clone();
    matWhiteTransperent.opacity = 0.25;

    let matYellowTransparent = matWhiteTransperent.clone();
    matYellowTransparent.color.set(0xffff00);

    let matCyanTransparent = matWhiteTransperent.clone();
    matCyanTransparent.color.set(0x00ffff);

    let matMagentaTransparent = matWhiteTransperent.clone();
    matMagentaTransparent.color.set(0xff00ff);

    let matYellow = gizmoMaterial.clone();
    matYellow.color.set(0xffff00);

    let matLineRed = gizmoLineMaterial.clone();
    matLineRed.color.set(0xff0000);

    let matLineGreen = gizmoLineMaterial.clone();
    matLineGreen.color.set(0x00ff00);

    let matLineBlue = gizmoLineMaterial.clone();
    matLineBlue.color.set(0x0000ff);

    let matLineCyan = gizmoLineMaterial.clone();
    matLineCyan.color.set(0x00ffff);

    let matLineMagenta = gizmoLineMaterial.clone();
    matLineMagenta.color.set(0xff00ff);

    let matLineYellow = gizmoLineMaterial.clone();
    matLineYellow.color.set(0xffff00);

    let matLineGray = gizmoLineMaterial.clone();
    matLineGray.color.set(0x787878);

    let matLineYellowTransparent = matLineYellow.clone();
    matLineYellowTransparent.opacity = 0.25;

    // reusable geometry

    let arrowGeometry = new CylinderBufferGeometry(0, 0.05, 0.2, 12, 1, false);

    let scaleHandleGeometry = new BoxBufferGeometry(0.125, 0.125, 0.125);

    let lineGeometry = new BufferGeometry();
    lineGeometry.addAttribute('position', new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));

    let CircleGeometry = function (radius, arc) {

        let geometry = new BufferGeometry();
        let vertices = [];

        for (let i = 0; i <= 64 * arc; ++i) {

            vertices.push(0, Math.cos(i / 32 * Math.PI) * radius, Math.sin(i / 32 * Math.PI) * radius);

        }

        geometry.addAttribute('position', new Float32BufferAttribute(vertices, 3));

        return geometry;

    };

    // Special geometry for transform helper. If scaled with position vector it spans from [0,0,0] to position

    let TranslateHelperGeometry = function (radius, arc) {

        let geometry = new BufferGeometry()

        geometry.addAttribute('position', new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3));

        return geometry;

    };

    // Gizmo definitions - custom hierarchy definitions for setupGizmo() function

    let gizmoTranslate = {
        X: [
            [new Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, -Math.PI / 2], null, 'fwd'],
            [new Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, Math.PI / 2], null, 'bwd'],
            [new Line(lineGeometry, matLineRed)]
        ],
        Y: [
            [new Mesh(arrowGeometry, matGreen), [0, 1, 0], null, null, 'fwd'],
            [new Mesh(arrowGeometry, matGreen), [0, 1, 0], [Math.PI, 0, 0], null, 'bwd'],
            [new Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2]]
        ],
        Z: [
            [new Mesh(arrowGeometry, matBlue), [0, 0, 1], [Math.PI / 2, 0, 0], null, 'fwd'],
            [new Mesh(arrowGeometry, matBlue), [0, 0, 1], [-Math.PI / 2, 0, 0], null, 'bwd'],
            [new Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0]]
        ],
        XYZ: [
            [new Mesh(new OctahedronBufferGeometry(0.1, 0), matWhiteTransperent), [0, 0, 0], [0, 0, 0]]
        ],
        XY: [
            [new Mesh(new PlaneBufferGeometry(0.295, 0.295), matYellowTransparent), [0.15, 0.15, 0]],
            [new Line(lineGeometry, matLineYellow), [0.18, 0.3, 0], null, [0.125, 1, 1]],
            [new Line(lineGeometry, matLineYellow), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]
        ],
        YZ: [
            [new Mesh(new PlaneBufferGeometry(0.295, 0.295), matCyanTransparent), [0, 0.15, 0.15], [0, Math.PI / 2, 0]],
            [new Line(lineGeometry, matLineCyan), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]],
            [new Line(lineGeometry, matLineCyan), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ],
        XZ: [
            [new Mesh(new PlaneBufferGeometry(0.295, 0.295), matMagentaTransparent), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]],
            [new Line(lineGeometry, matLineMagenta), [0.18, 0, 0.3], null, [0.125, 1, 1]],
            [new Line(lineGeometry, matLineMagenta), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ]
    };

    let pickerTranslate = {
        X: [
            [new Mesh(new CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0.6, 0, 0], [0, 0, -Math.PI / 2]]
        ],
        Y: [
            [new Mesh(new CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0.6, 0]]
        ],
        Z: [
            [new Mesh(new CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0, 0.6], [Math.PI / 2, 0, 0]]
        ],
        XYZ: [
            [new Mesh(new OctahedronBufferGeometry(0.2, 0), matInvisible)]
        ],
        XY: [
            [new Mesh(new PlaneBufferGeometry(0.4, 0.4), matInvisible), [0.2, 0.2, 0]]
        ],
        YZ: [
            [new Mesh(new PlaneBufferGeometry(0.4, 0.4), matInvisible), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]
        ],
        XZ: [
            [new Mesh(new PlaneBufferGeometry(0.4, 0.4), matInvisible), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]
        ]
    };

    let helperTranslate = {
        START: [
            [new Mesh(new OctahedronBufferGeometry(0.01, 2), matHelper), null, null, null, 'helper']
        ],
        END: [
            [new Mesh(new OctahedronBufferGeometry(0.01, 2), matHelper), null, null, null, 'helper']
        ],
        DELTA: [
            [new Line(TranslateHelperGeometry(), matHelper), null, null, null, 'helper']
        ],
        X: [
            [new Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']
        ],
        Y: [
            [new Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], 'helper']
        ],
        Z: [
            [new Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], 'helper']
        ]
    };

    let gizmoRotate = {
        X: [
            [new Line(CircleGeometry(1, 0.5), matLineRed)],
            [new Mesh(new OctahedronBufferGeometry(0.04, 0), matRed), [0, 0, 0.99], null, [1, 3, 1]],
        ],
        Y: [
            [new Line(CircleGeometry(1, 0.5), matLineGreen), null, [0, 0, -Math.PI / 2]],
            [new Mesh(new OctahedronBufferGeometry(0.04, 0), matGreen), [0, 0, 0.99], null, [3, 1, 1]],
        ],
        Z: [
            [new Line(CircleGeometry(1, 0.5), matLineBlue), null, [0, Math.PI / 2, 0]],
            [new Mesh(new OctahedronBufferGeometry(0.04, 0), matBlue), [0.99, 0, 0], null, [1, 3, 1]],
        ],
        E: [
            [new Line(CircleGeometry(1.25, 1), matLineYellowTransparent), null, [0, Math.PI / 2, 0]],
            [new Mesh(new CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 0.001]],
            [new Mesh(new CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 0.001]],
            [new Mesh(new CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 0.001]],
            [new Mesh(new CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, 1.17, 0], [0, 0, 0], [1, 1, 0.001]],
        ],
        XYZE: [
            [new Line(CircleGeometry(1, 1), matLineGray), null, [0, Math.PI / 2, 0]]
        ]
    };

    let helperRotate = {
        AXIS: [
            [new Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']
        ]
    };

    let pickerRotate = {
        X: [
            [new Mesh(new TorusBufferGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]],
        ],
        Y: [
            [new Mesh(new TorusBufferGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [Math.PI / 2, 0, 0]],
        ],
        Z: [
            [new Mesh(new TorusBufferGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, 0, -Math.PI / 2]],
        ],
        E: [
            [new Mesh(new TorusBufferGeometry(1.25, 0.1, 2, 24), matInvisible)]
        ],
        XYZE: [
            [new Mesh(new SphereBufferGeometry(0.7, 10, 8), matInvisible)]
        ]
    };

    let gizmoScale = {
        X: [
            [new Mesh(scaleHandleGeometry, matRed), [0.8, 0, 0], [0, 0, -Math.PI / 2]],
            [new Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]]
        ],
        Y: [
            [new Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]],
            [new Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]
        ],
        Z: [
            [new Mesh(scaleHandleGeometry, matBlue), [0, 0, 0.8], [Math.PI / 2, 0, 0]],
            [new Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]
        ],
        XY: [
            [new Mesh(scaleHandleGeometry, matYellowTransparent), [0.85, 0.85, 0], null, [2, 2, 0.2]],
            [new Line(lineGeometry, matLineYellow), [0.855, 0.98, 0], null, [0.125, 1, 1]],
            [new Line(lineGeometry, matLineYellow), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]
        ],
        YZ: [
            [new Mesh(scaleHandleGeometry, matCyanTransparent), [0, 0.85, 0.85], null, [0.2, 2, 2]],
            [new Line(lineGeometry, matLineCyan), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]],
            [new Line(lineGeometry, matLineCyan), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ],
        XZ: [
            [new Mesh(scaleHandleGeometry, matMagentaTransparent), [0.85, 0, 0.85], null, [2, 0.2, 2]],
            [new Line(lineGeometry, matLineMagenta), [0.855, 0, 0.98], null, [0.125, 1, 1]],
            [new Line(lineGeometry, matLineMagenta), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ],
        XYZX: [
            [new Mesh(new BoxBufferGeometry(0.125, 0.125, 0.125), matWhiteTransperent), [1.1, 0, 0]],
        ],
        XYZY: [
            [new Mesh(new BoxBufferGeometry(0.125, 0.125, 0.125), matWhiteTransperent), [0, 1.1, 0]],
        ],
        XYZZ: [
            [new Mesh(new BoxBufferGeometry(0.125, 0.125, 0.125), matWhiteTransperent), [0, 0, 1.1]],
        ]
    };

    let pickerScale = {
        X: [
            [new Mesh(new CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0.5, 0, 0], [0, 0, -Math.PI / 2]]
        ],
        Y: [
            [new Mesh(new CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0.5, 0]]
        ],
        Z: [
            [new Mesh(new CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0, 0.5], [Math.PI / 2, 0, 0]]
        ],
        XY: [
            [new Mesh(scaleHandleGeometry, matInvisible), [0.85, 0.85, 0], null, [3, 3, 0.2]],
        ],
        YZ: [
            [new Mesh(scaleHandleGeometry, matInvisible), [0, 0.85, 0.85], null, [0.2, 3, 3]],
        ],
        XZ: [
            [new Mesh(scaleHandleGeometry, matInvisible), [0.85, 0, 0.85], null, [3, 0.2, 3]],
        ],
        XYZX: [
            [new Mesh(new BoxBufferGeometry(0.2, 0.2, 0.2), matInvisible), [1.1, 0, 0]],
        ],
        XYZY: [
            [new Mesh(new BoxBufferGeometry(0.2, 0.2, 0.2), matInvisible), [0, 1.1, 0]],
        ],
        XYZZ: [
            [new Mesh(new BoxBufferGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 1.1]],
        ]
    };

    let helperScale = {
        X: [
            [new Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']
        ],
        Y: [
            [new Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], 'helper']
        ],
        Z: [
            [new Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], 'helper']
        ]
    };

    // Creates an Object3D with gizmos described in custom hierarchy definition.

    let setupGizmo = function (gizmoMap) {

        let gizmo = new Object3D();

        for (let name in gizmoMap) {

            for (let i = gizmoMap[name].length; i--;) {

                let object = gizmoMap[name][i][0].clone();
                let position = gizmoMap[name][i][1];
                let rotation = gizmoMap[name][i][2];
                let scale = gizmoMap[name][i][3];
                let tag = gizmoMap[name][i][4];

                // name and tag properties are essential for picking and updating logic.
                object.name = name;
                object.tag = tag;

                if (position) {
                    object.position.set(position[0], position[1], position[2]);
                }
                if (rotation) {
                    object.rotation.set(rotation[0], rotation[1], rotation[2]);
                }
                if (scale) {
                    object.scale.set(scale[0], scale[1], scale[2]);
                }

                object.updateMatrix();

                let tempGeometry = object.geometry.clone();
                tempGeometry.applyMatrix(object.matrix);
                object.geometry = tempGeometry;
                object.renderOrder = Infinity;

                object.position.set(0, 0, 0);
                object.rotation.set(0, 0, 0);
                object.scale.set(1, 1, 1);

                gizmo.add(object);

            }

        }

        return gizmo;

    };

    // Reusable utility variables

    let tempVector = new Vector3(0, 0, 0);
    let tempEuler = new Euler();
    let alignVector = new Vector3(0, 1, 0);
    let zeroVector = new Vector3(0, 0, 0);
    let lookAtMatrix = new Matrix4();
    let tempQuaternion = new Quaternion();
    let tempQuaternion2 = new Quaternion();
    let identityQuaternion = new Quaternion();

    let unitX = new Vector3(1, 0, 0);
    let unitY = new Vector3(0, 1, 0);
    let unitZ = new Vector3(0, 0, 1);

    // Gizmo creation

    this.gizmo = {};
    this.picker = {};
    this.helper = {};

    this.add(this.gizmo["translate"] = setupGizmo(gizmoTranslate));
    this.add(this.gizmo["rotate"] = setupGizmo(gizmoRotate));
    this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
    this.add(this.picker["translate"] = setupGizmo(pickerTranslate));
    this.add(this.picker["rotate"] = setupGizmo(pickerRotate));
    this.add(this.picker["scale"] = setupGizmo(pickerScale));
    this.add(this.helper["translate"] = setupGizmo(helperTranslate));
    this.add(this.helper["rotate"] = setupGizmo(helperRotate));
    this.add(this.helper["scale"] = setupGizmo(helperScale));

    // Pickers should be hidden always

    this.picker["translate"].visible = false;
    this.picker["rotate"].visible = false;
    this.picker["scale"].visible = false;

    // updateMatrixWorld will update transformations and appearance of individual handles

    this.updateMatrixWorld = function () {

        let space = this.space;

        if (this.mode === 'scale') space = 'local'; // scale always oriented to local rotation

        let quaternion = space === "local" ? this.worldQuaternion : identityQuaternion;

        // Show only gizmos for current transform mode

        this.gizmo["translate"].visible = this.mode === "translate";
        this.gizmo["rotate"].visible = this.mode === "rotate";
        this.gizmo["scale"].visible = this.mode === "scale";

        this.helper["translate"].visible = this.mode === "translate";
        this.helper["rotate"].visible = this.mode === "rotate";
        this.helper["scale"].visible = this.mode === "scale";


        let handles = [];
        handles = handles.concat(this.picker[this.mode].children);
        handles = handles.concat(this.gizmo[this.mode].children);
        handles = handles.concat(this.helper[this.mode].children);

        for (let i = 0; i < handles.length; i++) {

            let handle = handles[i];

            // hide aligned to camera

            handle.visible = true;
            handle.rotation.set(0, 0, 0);
            handle.position.copy(this.worldPosition);

            let eyeDistance = this.worldPosition.distanceTo(this.cameraPosition);
            handle.scale.set(1, 1, 1).multiplyScalar(eyeDistance * this.size / 7);

            // TODO: simplify helpers and consider decoupling from gizmo

            if (handle.tag === 'helper') {

                handle.visible = false;

                if (handle.name === 'AXIS') {

                    handle.position.copy(this.worldPositionStart);
                    handle.visible = !!this.axis;

                    if (this.axis === 'X') {

                        tempQuaternion.setFromEuler(tempEuler.set(0, 0, 0));
                        handle.quaternion.copy(quaternion).multiply(tempQuaternion);

                        if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                            handle.visible = false;
                        }

                    }

                    if (this.axis === 'Y') {

                        tempQuaternion.setFromEuler(tempEuler.set(0, 0, Math.PI / 2));
                        handle.quaternion.copy(quaternion).multiply(tempQuaternion);

                        if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                            handle.visible = false;
                        }

                    }

                    if (this.axis === 'Z') {

                        tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0));
                        handle.quaternion.copy(quaternion).multiply(tempQuaternion);

                        if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                            handle.visible = false;
                        }

                    }

                    if (this.axis === 'XYZE') {

                        tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0));
                        alignVector.copy(this.rotationAxis);
                        handle.quaternion.setFromRotationMatrix(lookAtMatrix.lookAt(zeroVector, alignVector, unitY));
                        handle.quaternion.multiply(tempQuaternion);
                        handle.visible = this.dragging;

                    }

                    if (this.axis === 'E') {

                        handle.visible = false;

                    }


                } else if (handle.name === 'START') {

                    handle.position.copy(this.worldPositionStart);
                    handle.visible = this.dragging;

                } else if (handle.name === 'END') {

                    handle.position.copy(this.worldPosition);
                    handle.visible = this.dragging;

                } else if (handle.name === 'DELTA') {

                    handle.position.copy(this.worldPositionStart);
                    handle.quaternion.copy(this.worldQuaternionStart);
                    tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
                    tempVector.applyQuaternion(this.worldQuaternionStart.clone().inverse());
                    handle.scale.copy(tempVector);
                    handle.visible = this.dragging;

                } else {

                    handle.quaternion.copy(quaternion);

                    if (this.dragging) {

                        handle.position.copy(this.worldPositionStart);

                    } else {

                        handle.position.copy(this.worldPosition);

                    }

                    if (this.axis) {

                        handle.visible = this.axis.search(handle.name) !== -1;

                    }

                }

                // If updating helper, skip rest of the loop
                continue;

            }

            // Align handles to current local or world rotation

            handle.quaternion.copy(quaternion);

            if (this.mode === 'translate' || this.mode === 'scale') {

                // Hide translate and scale axis facing the camera

                let AXIS_HIDE_TRESHOLD = 0.99;
                let PLANE_HIDE_TRESHOLD = 0.2;
                let AXIS_FLIP_TRESHOLD = 0.0;


                if (handle.name === 'X' || handle.name === 'XYZX') {
                    if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                        handle.scale.set(1e-10, 1e-10, 1e-10);
                        handle.visible = false;
                    }
                }
                if (handle.name === 'Y' || handle.name === 'XYZY') {
                    if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                        handle.scale.set(1e-10, 1e-10, 1e-10);
                        handle.visible = false;
                    }
                }
                if (handle.name === 'Z' || handle.name === 'XYZZ') {
                    if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                        handle.scale.set(1e-10, 1e-10, 1e-10);
                        handle.visible = false;
                    }
                }
                if (handle.name === 'XY') {
                    if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                        handle.scale.set(1e-10, 1e-10, 1e-10);
                        handle.visible = false;
                    }
                }
                if (handle.name === 'YZ') {
                    if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                        handle.scale.set(1e-10, 1e-10, 1e-10);
                        handle.visible = false;
                    }
                }
                if (handle.name === 'XZ') {
                    if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                        handle.scale.set(1e-10, 1e-10, 1e-10);
                        handle.visible = false;
                    }
                }

                // Flip translate and scale axis ocluded behind another axis

                if (handle.name.search('X') !== -1) {
                    if (alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                        if (handle.tag === 'fwd') {
                            handle.visible = false;
                        } else {
                            handle.scale.x *= -1;
                        }
                    } else if (handle.tag === 'bwd') {
                        handle.visible = false;
                    }
                }

                if (handle.name.search('Y') !== -1) {
                    if (alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                        if (handle.tag === 'fwd') {
                            handle.visible = false;
                        } else {
                            handle.scale.y *= -1;
                        }
                    } else if (handle.tag === 'bwd') {
                        handle.visible = false;
                    }
                }

                if (handle.name.search('Z') !== -1) {
                    if (alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                        if (handle.tag === 'fwd') {
                            handle.visible = false;
                        } else {
                            handle.scale.z *= -1;
                        }
                    } else if (handle.tag === 'bwd') {
                        handle.visible = false;
                    }
                }

            } else if (this.mode === 'rotate') {

                // Align handles to current local or world rotation

                tempQuaternion2.copy(quaternion);
                alignVector.copy(this.eye).applyQuaternion(tempQuaternion.copy(quaternion).inverse());

                if (handle.name.search("E") !== -1) {

                    handle.quaternion.setFromRotationMatrix(lookAtMatrix.lookAt(this.eye, zeroVector, unitY));

                }

                if (handle.name === 'X') {

                    tempQuaternion.setFromAxisAngle(unitX, Math.atan2(-alignVector.y, alignVector.z));
                    tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
                    handle.quaternion.copy(tempQuaternion);

                }

                if (handle.name === 'Y') {

                    tempQuaternion.setFromAxisAngle(unitY, Math.atan2(alignVector.x, alignVector.z));
                    tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
                    handle.quaternion.copy(tempQuaternion);

                }

                if (handle.name === 'Z') {

                    tempQuaternion.setFromAxisAngle(unitZ, Math.atan2(alignVector.y, alignVector.x));
                    tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
                    handle.quaternion.copy(tempQuaternion);

                }

            }

            // Hide disabled axes
            handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
            handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
            handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
            handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || (this.showX && this.showY && this.showZ));

            // highlight selected axis

            handle.material._opacity = handle.material._opacity || handle.material.opacity;
            handle.material._color = handle.material._color || handle.material.color.clone();

            handle.material.color.copy(handle.material._color);
            handle.material.opacity = handle.material._opacity;

            if (!this.enabled) {

                handle.material.opacity *= 0.5;
                handle.material.color.lerp(new Color(1, 1, 1), 0.5);

            } else if (this.axis) {

                if (handle.name === this.axis) {

                    handle.material.opacity = 1.0;
                    handle.material.color.lerp(new Color(1, 1, 1), 0.5);

                } else if (this.axis.split('').some(function (a) {
                    return handle.name === a;
                })) {

                    handle.material.opacity = 1.0;
                    handle.material.color.lerp(new Color(1, 1, 1), 0.5);

                } else {

                    handle.material.opacity *= 0.25;
                    handle.material.color.lerp(new Color(1, 1, 1), 0.5);

                }

            }

        }

        Object3D.prototype.updateMatrixWorld.call(this);

    };

};

TransformControlsGizmo.prototype = Object.assign(Object.create(Object3D.prototype), {

    constructor: TransformControlsGizmo,

    isTransformControlsGizmo: true

});


let TransformControlsPlane = function () {

    'use strict';

    Mesh.call(this,
        new PlaneBufferGeometry(100000, 100000, 2, 2),
        new MeshBasicMaterial({
            visible: false,
            wireframe: true,
            side: DoubleSide,
            transparent: true,
            opacity: 0.1
        })
    );

    this.type = 'TransformControlsPlane';

    let unitX = new Vector3(1, 0, 0);
    let unitY = new Vector3(0, 1, 0);
    let unitZ = new Vector3(0, 0, 1);

    let tempVector = new Vector3();
    let dirVector = new Vector3();
    let alignVector = new Vector3();
    let tempMatrix = new Matrix4();
    let identityQuaternion = new Quaternion();

    this.updateMatrixWorld = function () {

        let space = this.space;

        this.position.copy(this.worldPosition);

        if (this.mode === 'scale') space = 'local'; // scale always oriented to local rotation

        unitX.set(1, 0, 0).applyQuaternion(space === "local" ? this.worldQuaternion : identityQuaternion);
        unitY.set(0, 1, 0).applyQuaternion(space === "local" ? this.worldQuaternion : identityQuaternion);
        unitZ.set(0, 0, 1).applyQuaternion(space === "local" ? this.worldQuaternion : identityQuaternion);

        // Align the plane for current transform mode, axis and space.

        alignVector.copy(unitY);

        switch (this.mode) {
            case 'translate':
            case 'scale':
                switch (this.axis) {
                    case 'X':
                        alignVector.copy(this.eye).cross(unitX);
                        dirVector.copy(unitX).cross(alignVector);
                        break;
                    case 'Y':
                        alignVector.copy(this.eye).cross(unitY);
                        dirVector.copy(unitY).cross(alignVector);
                        break;
                    case 'Z':
                        alignVector.copy(this.eye).cross(unitZ);
                        dirVector.copy(unitZ).cross(alignVector);
                        break;
                    case 'XY':
                        dirVector.copy(unitZ);
                        break;
                    case 'YZ':
                        dirVector.copy(unitX);
                        break;
                    case 'XZ':
                        alignVector.copy(unitZ);
                        dirVector.copy(unitY);
                        break;
                    case 'XYZ':
                    case 'E':
                        dirVector.set(0, 0, 0);
                        break;
                }
                break;
            case 'rotate':
            default:
                // special case for rotate
                dirVector.set(0, 0, 0);
        }

        if (dirVector.length() === 0) {

            // If in rotate mode, make the plane parallel to camera
            this.quaternion.copy(this.cameraQuaternion);

        } else {

            tempMatrix.lookAt(tempVector.set(0, 0, 0), dirVector, alignVector);

            this.quaternion.setFromRotationMatrix(tempMatrix);

        }

        Object3D.prototype.updateMatrixWorld.call(this);

    };

};

TransformControlsPlane.prototype = Object.assign(Object.create(Mesh.prototype), {

    constructor: TransformControlsPlane,

    isTransformControlsPlane: true

});
