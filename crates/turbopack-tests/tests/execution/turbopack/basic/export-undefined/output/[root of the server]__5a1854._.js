(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["[root of the server]__5a1854._.js", {

"[turbopack-node]/globals.ts [test] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

// @ts-ignore
process.turbopack = {};

}.call(this) }),
"[project]/crates/turbopack-tests/js/jest-runtime.ts [test] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

const jest = __turbopack_external_require__("jest-circus");
const expectMod = __turbopack_external_require__("expect");
global.describe;
globalThis.describe = jest.describe;
globalThis.it = jest.it;
globalThis.test = jest.test;
globalThis.expect = expectMod.expect;
// From https://github.com/webpack/webpack/blob/9fcaa243573005d6fdece9a3f8d89a0e8b399613/test/TestCases.template.js#L422
globalThis.nsObj = function nsObj(obj) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: "Module"
    });
    return obj;
};

}.call(this) }),
"[project]/crates/turbopack-tests/tests/execution/turbopack/basic/export-undefined/input/module.js [test] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

module.exports = undefined;

}.call(this) }),
"[project]/crates/turbopack-tests/tests/execution/turbopack/basic/export-undefined/input/index.js [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$crates$2f$turbopack$2d$tests$2f$tests$2f$execution$2f$turbopack$2f$basic$2f$export$2d$undefined$2f$input$2f$module$2e$js__$5b$test$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/crates/turbopack-tests/tests/execution/turbopack/basic/export-undefined/input/module.js [test] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
it("should allow to export undefined", ()=>{
    expect(__TURBOPACK__imported__module__$5b$project$5d2f$crates$2f$turbopack$2d$tests$2f$tests$2f$execution$2f$turbopack$2f$basic$2f$export$2d$undefined$2f$input$2f$module$2e$js__$5b$test$5d$__$28$ecmascript$29$__).toHaveProperty("default", undefined);
    expect(__TURBOPACK__imported__module__$5b$project$5d2f$crates$2f$turbopack$2d$tests$2f$tests$2f$execution$2f$turbopack$2f$basic$2f$export$2d$undefined$2f$input$2f$module$2e$js__$5b$test$5d$__$28$ecmascript$29$__["default"]).toBe(undefined);
});

})()),
"[turbopack-node]/compiled/stacktrace-parser/index.js [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "parse": ()=>parse
});
if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
var n = "<unknown>";
function parse(e) {
    var r = e.split("\n");
    return r.reduce(function(e, r) {
        var n = parseChrome(r) || parseWinjs(r) || parseGecko(r) || parseNode(r) || parseJSC(r);
        if (n) {
            e.push(n);
        }
        return e;
    }, []);
}
var a = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var l = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function parseChrome(e) {
    var r = a.exec(e);
    if (!r) {
        return null;
    }
    var u = r[2] && r[2].indexOf("native") === 0;
    var t = r[2] && r[2].indexOf("eval") === 0;
    var i = l.exec(r[2]);
    if (t && i != null) {
        r[2] = i[1];
        r[3] = i[2];
        r[4] = i[3];
    }
    return {
        file: !u ? r[2] : null,
        methodName: r[1] || n,
        arguments: u ? [
            r[2]
        ] : [],
        lineNumber: r[3] ? +r[3] : null,
        column: r[4] ? +r[4] : null
    };
}
var u = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseWinjs(e) {
    var r = u.exec(e);
    if (!r) {
        return null;
    }
    return {
        file: r[2],
        methodName: r[1] || n,
        arguments: [],
        lineNumber: +r[3],
        column: r[4] ? +r[4] : null
    };
}
var t = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
var i = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function parseGecko(e) {
    var r = t.exec(e);
    if (!r) {
        return null;
    }
    var a = r[3] && r[3].indexOf(" > eval") > -1;
    var l = i.exec(r[3]);
    if (a && l != null) {
        r[3] = l[1];
        r[4] = l[2];
        r[5] = null;
    }
    return {
        file: r[3],
        methodName: r[1] || n,
        arguments: r[2] ? r[2].split(",") : [],
        lineNumber: r[4] ? +r[4] : null,
        column: r[5] ? +r[5] : null
    };
}
var s = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function parseJSC(e) {
    var r = s.exec(e);
    if (!r) {
        return null;
    }
    return {
        file: r[3],
        methodName: r[1] || n,
        arguments: [],
        lineNumber: +r[4],
        column: r[5] ? +r[5] : null
    };
}
var o = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseNode(e) {
    var r = o.exec(e);
    if (!r) {
        return null;
    }
    return {
        file: r[2],
        methodName: r[1] || n,
        arguments: [],
        lineNumber: +r[3],
        column: r[4] ? +r[4] : null
    };
}

})()),
"[turbopack-node]/ipc/error.ts [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// merged from next.js
// https://github.com/vercel/next.js/blob/e657741b9908cf0044aaef959c0c4defb19ed6d8/packages/next/src/lib/is-error.ts
// https://github.com/vercel/next.js/blob/e657741b9908cf0044aaef959c0c4defb19ed6d8/packages/next/src/shared/lib/is-plain-object.ts
__turbopack_esm__({
    "default": ()=>isError,
    "getProperError": ()=>getProperError
});
function isError(err) {
    return typeof err === "object" && err !== null && "name" in err && "message" in err;
}
function getProperError(err) {
    if (isError(err)) {
        return err;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        // Provide a better error message for cases where `throw undefined`
        // is called in development
        if (typeof err === "undefined") {
            return new Error("`undefined` was thrown instead of a real error");
        }
        if (err === null) {
            return new Error("`null` was thrown instead of a real error");
        }
    }
    return new Error(isPlainObject(err) ? JSON.stringify(err) : err + "");
}
function getObjectClassLabel(value) {
    return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
    if (getObjectClassLabel(value) !== "[object Object]") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    /**
   * this used to be previously:
   *
   * `return prototype === null || prototype === Object.prototype`
   *
   * but Edge Runtime expose Object from vm, being that kind of type-checking wrongly fail.
   *
   * It was changed to the current implementation since it's resilient to serialization.
   */ return prototype === null || prototype.hasOwnProperty("isPrototypeOf");
}

})()),
"[turbopack-node]/ipc/index.ts [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "IPC": ()=>IPC,
    "structuredError": ()=>structuredError
});
var __TURBOPACK__url__external__node$3a$net__ = __turbopack_external_require__("node:net", true);
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$5b$test$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/compiled/stacktrace-parser/index.js [test] (ecmascript)");
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$error$2e$ts__$5b$test$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/error.ts [test] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function structuredError(e) {
    e = (0, __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$error$2e$ts__$5b$test$5d$__$28$ecmascript$29$__["getProperError"])(e);
    return {
        name: e.name,
        message: e.message,
        stack: typeof e.stack === "string" ? (0, __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$5b$test$5d$__$28$ecmascript$29$__["parse"])(e.stack) : []
    };
}
function createIpc(port) {
    const socket = (0, __TURBOPACK__url__external__node$3a$net__["createConnection"])(port, "127.0.0.1");
    const packetQueue = [];
    const recvPromiseResolveQueue = [];
    function pushPacket(packet) {
        const recvPromiseResolve = recvPromiseResolveQueue.shift();
        if (recvPromiseResolve != null) {
            recvPromiseResolve(JSON.parse(packet.toString("utf8")));
        } else {
            packetQueue.push(packet);
        }
    }
    let state = {
        type: "waiting"
    };
    let buffer = Buffer.alloc(0);
    socket.once("connect", ()=>{
        socket.on("data", (chunk)=>{
            buffer = Buffer.concat([
                buffer,
                chunk
            ]);
            loop: while(true){
                switch(state.type){
                    case "waiting":
                        {
                            if (buffer.length >= 4) {
                                const length = buffer.readUInt32BE(0);
                                buffer = buffer.subarray(4);
                                state = {
                                    type: "packet",
                                    length
                                };
                            } else {
                                break loop;
                            }
                            break;
                        }
                    case "packet":
                        {
                            if (buffer.length >= state.length) {
                                const packet = buffer.subarray(0, state.length);
                                buffer = buffer.subarray(state.length);
                                state = {
                                    type: "waiting"
                                };
                                pushPacket(packet);
                            } else {
                                break loop;
                            }
                            break;
                        }
                }
            }
        });
    });
    // When the socket is closed, this process is no longer needed.
    // This might happen e. g. when parent process is killed or
    // node.js pool is garbage collected.
    socket.once("close", ()=>{
        process.exit(0);
    });
    function send(message) {
        const packet = Buffer.from(JSON.stringify(message), "utf8");
        const length = Buffer.alloc(4);
        length.writeUInt32BE(packet.length);
        socket.write(length);
        return new Promise((resolve, reject)=>{
            socket.write(packet, (err)=>{
                process.stderr.write(`TURBOPACK_OUTPUT_D\n`);
                process.stdout.write(`TURBOPACK_OUTPUT_D\n`);
                if (err != null) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    function sendReady() {
        const length = Buffer.from([
            0,
            0,
            0,
            0
        ]);
        return new Promise((resolve, reject)=>{
            socket.write(length, (err)=>{
                process.stderr.write(`TURBOPACK_OUTPUT_D\n`);
                process.stdout.write(`TURBOPACK_OUTPUT_D\n`);
                if (err != null) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    return {
        async recv () {
            const packet = packetQueue.shift();
            if (packet != null) {
                return JSON.parse(packet.toString("utf8"));
            }
            const result = await new Promise((resolve)=>{
                recvPromiseResolveQueue.push((result)=>{
                    resolve(result);
                });
            });
            return result;
        },
        send (message) {
            return send(message);
        },
        sendReady,
        async sendError (error) {
            try {
                await send({
                    type: "error",
                    ...structuredError(error)
                });
            } catch (err) {
                console.error("failed to send error back to rust:", err);
                // ignore and exit anyway
                process.exit(1);
            }
            process.exit(0);
        }
    };
}
const PORT = process.argv[2];
const IPC = createIpc(parseInt(PORT, 10));
process.on("uncaughtException", (err)=>{
    IPC.sendError(err);
});
const improveConsole = (name, stream, addStack)=>{
    // @ts-ignore
    const original = console[name];
    // @ts-ignore
    const stdio = process[stream];
    // @ts-ignore
    console[name] = (...args)=>{
        stdio.write(`TURBOPACK_OUTPUT_B\n`);
        original(...args);
        if (addStack) {
            var _stack;
            const stack = ((_stack = new Error().stack) === null || _stack === void 0 ? void 0 : _stack.replace(/^.+\n.+\n/, "")) + "\n";
            stdio.write("TURBOPACK_OUTPUT_S\n");
            stdio.write(stack);
        }
        stdio.write("TURBOPACK_OUTPUT_E\n");
    };
};
improveConsole("error", "stderr", true);
improveConsole("warn", "stderr", true);
improveConsole("count", "stdout", true);
improveConsole("trace", "stderr", false);
improveConsole("log", "stdout", true);
improveConsole("group", "stdout", true);
improveConsole("groupCollapsed", "stdout", true);
improveConsole("table", "stdout", true);
improveConsole("debug", "stdout", true);
improveConsole("info", "stdout", true);
improveConsole("dir", "stdout", true);
improveConsole("dirxml", "stdout", true);
improveConsole("timeEnd", "stdout", true);
improveConsole("timeLog", "stdout", true);
improveConsole("timeStamp", "stdout", true);
improveConsole("assert", "stderr", true);

})()),
"[turbopack-node]/ipc/evaluate.ts [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "run": ()=>run
});
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$5b$test$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/index.ts [test] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const ipc = __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$5b$test$5d$__$28$ecmascript$29$__["IPC"];
const queue = [];
const run = async (moduleFactory)=>{
    let nextId = 1;
    const requests = new Map();
    const internalIpc = {
        sendInfo: (message)=>ipc.send({
                type: "info",
                data: message
            }),
        sendRequest: (message)=>{
            const id = nextId++;
            let resolve, reject;
            const promise = new Promise((res, rej)=>{
                resolve = res;
                reject = rej;
            });
            requests.set(id, {
                resolve,
                reject
            });
            return ipc.send({
                type: "request",
                id,
                data: message
            }).then(()=>promise);
        },
        sendError: (error)=>{
            return ipc.sendError(error);
        }
    };
    // Initialize module and send ready message
    let getValue;
    try {
        const module = await moduleFactory();
        if (typeof module.init === "function") {
            await module.init();
        }
        getValue = module.default;
        await ipc.sendReady();
    } catch (err) {
        await ipc.sendReady();
        await ipc.sendError(err);
    }
    // Queue handling
    let isRunning = false;
    const run = async ()=>{
        while(queue.length > 0){
            const args = queue.shift();
            try {
                const value = await getValue(internalIpc, ...args);
                await ipc.send({
                    type: "end",
                    data: value === undefined ? undefined : JSON.stringify(value, null, 2),
                    duration: 0
                });
            } catch (e) {
                await ipc.sendError(e);
            }
        }
        isRunning = false;
    };
    // Communication handling
    while(true){
        const msg = await ipc.recv();
        switch(msg.type){
            case "evaluate":
                {
                    queue.push(msg.args);
                    if (!isRunning) {
                        isRunning = true;
                        run();
                    }
                    break;
                }
            case "result":
                {
                    const request = requests.get(msg.id);
                    if (request) {
                        requests.delete(msg.id);
                        if (msg.error) {
                            request.reject(new Error(msg.error));
                        } else {
                            request.resolve(msg.data);
                        }
                    }
                    break;
                }
            default:
                {
                    console.error("unexpected message type", msg.type);
                    process.exit(1);
                }
        }
    }
};

})()),
"[turbopack-node]/ipc/evaluate.ts/evaluate.js { INNER => \"[project]/crates/turbopack-tests/js/jest-entry.ts [test] (ecmascript)\", RUNTIME => \"[turbopack-node]/ipc/evaluate.ts [test] (ecmascript)\" } [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$evaluate$2e$ts__$5b$test$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/evaluate.ts [test] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
(0, __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$evaluate$2e$ts__$5b$test$5d$__$28$ecmascript$29$__["run"])(()=>__turbopack_require__("[project]/crates/turbopack-tests/js/jest-entry.ts [test] (ecmascript, async loader)")(__turbopack_import__));

})()),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__5a1854._.js.map