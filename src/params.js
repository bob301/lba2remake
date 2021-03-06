// @flow
import {map, each} from 'lodash';

const paramsDefinitions = {
    vr: {
        type: 'boolean',
        default: false
    },
    mobile: {
        type: 'boolean',
        default: /Mobile|webOS|iPhone|iPod|iOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },
    scene: {
        type: 'int',
        default: -1
    },
    noscripts: {
        type: 'boolean',
        default: false
    },
    editor: {
        type: 'boolean',
        default: false
    },
    pauseOnLoad: {
        type: 'boolean',
        default: false
    }
};

export function loadParams() : Object {
    const query = window.location.hash.replace(/^#/, '');
    const src = {};
    const tgt = {};
    map(query.split("&"), part => {
        const [name, value] = part.split("=");
        if (name in paramsDefinitions) {
            src[name] = decodeURIComponent(value);
        } else {
            console.warn(`Unknown parameter: ${part}.`);
        }
    });
    each(paramsDefinitions, (param, name) => {
        if (name in src) {
            tgt[name] = parseParam(param, name, src[name]);
        } else {
            tgt[name] = param.default;
        }
    });
    return tgt;
}

function parseParam(param, name, src) {
    switch (param.type) {
        case 'boolean':
            if (src === 'true') {
                return true;
            } else if (src === 'false') {
                return false;
            } else {
                console.warn(`Invalid value for param ${name}, value: ${src}, type=boolean`);
                return param.default;
            }
        case 'int':
            try {
                const i = parseInt(src);
                if (Number.isNaN(i)) {
                    console.warn(`Invalid value for param ${name}, value: ${src}, type=int`);
                    return param.default;
                } else {
                    return i;
                }
            } catch (e) {
                console.warn(`Invalid value for param ${name}, value: ${src}, type=int`);
                return param.default;
            }
    }
    return param.default;
}
