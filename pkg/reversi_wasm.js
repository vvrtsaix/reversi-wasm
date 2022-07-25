import { useReact, createElement, useRustRef, useRustState } from './snippets/wasm-react-f89d6169022618b4/src/react_bindings/react-bindings.js';

let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0;
function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedFloat64Memory0;
function getFloat64Memory0() {
    if (cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedInt32Memory0;
function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_0.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_14(arg0, arg1, arg2) {
    const ret = wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9ba3cf6aa0eee719(arg0, arg1, addHeapObject(arg2));
    return __WasmReact_RefContainerValue.__wrap(ret);
}

function __wbg_adapter_17(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h20029fb2aee92be8(arg0, arg1, addHeapObject(arg2));
}

/**
* @param {any} props
* @returns {any}
*/
export function App(props) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.App(retptr, addHeapObject(props));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
function __wbg_adapter_24(arg0, arg1, arg2) {
    _assertClass(arg2, __WasmReact_RefContainerValue);
    wasm.wasm_bindgen__convert__closures__invoke1_mut_ref__h9c78b97c391b2beb(arg0, arg1, arg2.ptr);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
* Contains all functions exported to JS by `wasm-react`. These functions should
* be called from JS only.
*/
export class WasmReact {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmreact_free(ptr);
    }
    /**
    * Set the React runtime that `wasm-react` should use.
    *
    * Calling this function multiple times will result in no-ops.
    *
    * # Example
    *
    * ```js
    * import React from "react";
    * import init, { WasmReact } from "./path/to/pkg/project.js";
    *
    * async function main() {
    *   await init();
    *   WasmReact.useReact(React);
    * }
    *
    * main();
    * ```
    * @param {any} value
    */
    static useReact(value) {
        try {
            wasm.wasmreact_useReact(addBorrowedObject(value));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
export class __WasmReact_ComponentWrapper {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg___wasmreact_componentwrapper_free(ptr);
    }
    /**
    * @returns {any}
    */
    render() {
        const ret = wasm.__wasmreact_componentwrapper_render(this.ptr);
        return takeObject(ret);
    }
}
/**
*/
export class __WasmReact_MemoComponentWrapper {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg___wasmreact_memocomponentwrapper_free(ptr);
    }
    /**
    * @returns {any}
    */
    render() {
        const ret = wasm.__wasmreact_componentwrapper_render(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {__WasmReact_MemoComponentWrapper} other
    * @returns {boolean}
    */
    eq(other) {
        _assertClass(other, __WasmReact_MemoComponentWrapper);
        const ret = wasm.__wasmreact_memocomponentwrapper_eq(this.ptr, other.ptr);
        return ret !== 0;
    }
}
/**
*/
export class __WasmReact_RefContainerValue {

    static __wrap(ptr) {
        const obj = Object.create(__WasmReact_RefContainerValue.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg___wasmreact_refcontainervalue_free(ptr);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createElement_35b26f2643bee6d2 = function(arg0, arg1, arg2) {
        const ret = createElement(getObject(arg0), getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_useReact_95a9ed0ec5ff6aed = function(arg0) {
        useReact(getObject(arg0));
    };
    imports.wbg.__wbg_useRustRef_a178d1b1bb6adcac = function(arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_24(a, state0.b, arg0);
                } finally {
                    state0.a = a;
                }
            };
            useRustRef(getObject(arg0), cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_useRustState_a56030afffb61c4b = function() {
        const ret = useRustState();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_2ab697f1555e0dbc = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_89247d3aeaa38cc5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_306ce8d57919e6ae = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_811c8b08bf4ff9d5 = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_call_9855a4612eb496cb = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_b12cd0ab82903c2f = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_closure_wrapper27 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_14);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper151 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 71, __wbg_adapter_17);
        return addHeapObject(ret);
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);


    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('reversi_wasm_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
