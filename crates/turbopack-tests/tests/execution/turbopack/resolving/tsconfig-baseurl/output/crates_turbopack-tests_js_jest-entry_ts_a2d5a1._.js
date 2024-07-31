(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["crates_turbopack-tests_js_jest-entry_ts_a2d5a1._.js", {

"[project]/crates/turbopack-tests/js/jest-entry.ts [test] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>run
});
const jest = __turbopack_external_require__("jest-circus");
const uncaughtExceptions = [];
const unhandledRejections = [];
process.on("uncaughtException", (e)=>{
    uncaughtExceptions.push(String(e));
});
process.on("unhandledRejection", (e)=>{
    unhandledRejections.push(String(e));
});
async function run() {
    const jestResult = await jest.run();
    // Wait a full tick for unhandledRejection handlers to run -- a microtask is not sufficient.
    await new Promise((resolve)=>setTimeout(resolve, 0));
    return {
        jestResult,
        uncaughtExceptions,
        unhandledRejections
    };
}

})()),
}]);

//# sourceMappingURL=crates_turbopack-tests_js_jest-entry_ts_a2d5a1._.js.map