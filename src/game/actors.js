// @flow

import THREE from 'three';

import type {Model} from '../model';
import {loadModel, updateModel} from '../model';
import {getRotation} from '../utils/lba';

type ActorProps = {
    pos: [number, number, number],
    life: number,
    staticFlags: number,
    entityIndex: number,
    bodyIndex: number,
    animIndex: number,
    angle: number
}

type ActorPhysics = {
    position: THREE.Vector3,
    orientation: THREE.Quaternion
}

type Actor = {
    props: ActorProps,
    threeObject: ?THREE.Object3D,
    model: ?Model,
    physics: ActorPhysics,
    isVisible: boolean,
    isSprite: boolean,
    update: ?Function
}

const ACTOR_STATIC_FLAG = {
    NONE             : 0,
    COLLIDE_WITH_OBJ : 1,
    // TODO
    HIDDEN           : 0x200,
    SPRITE           : 0x400
    // TODO
};

// TODO: move scetion offset to container THREE.Object3D
export function loadActor(props: ActorProps, callback: Function) {
    const pos = props.pos;
    const actor: Actor = {
        props: props,
        physics: {
            position: new THREE.Vector3(pos[0], pos[1], pos[2]),
            orientation: new THREE.Quaternion()
        },
        update: function(time) {
            updateModel(this.model, props.entityIndex, props.bodyIndex, props.animIndex, time);
        },
        isVisible: !(props.staticFlags & ACTOR_STATIC_FLAG.HIDDEN) && actor.props.life > 0,
        isSprite: (props.staticFlags & ACTOR_STATIC_FLAG.SPRITE) ? true : false,
        model: null,
        threeObject: null
    };

    const euler = new THREE.Euler(THREE.Math.degToRad(0),
                                  THREE.Math.degToRad(getRotation(props.angle, 0, 1) - 90),
                                  THREE.Math.degToRad(0), 'XZY');
    actor.physics.orientation.setFromEuler(euler);

    loadModel(props.entityIndex, props.bodyIndex, props.animIndex, (model) => {
        //model.mesh.visible = actor.isVisible;
        model.mesh.position.set(actor.physics.position.x, actor.physics.position.y, actor.physics.position.z);
        model.mesh.quaternion.copy(actor.physics.orientation);
        actor.model = model;
        actor.threeObject = model.mesh;
        callback(null, actor);
    });
}
