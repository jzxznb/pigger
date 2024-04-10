export function mergeClass(modules: any[]) {
    const methodMap = {};
    modules.forEach(module => {
        Object.getOwnPropertyNames(module.prototype)
            .filter(i => i !== "constructor")
            .forEach(methodName => {
                methodMap[methodName] = module.prototype[methodName];
            });
    });
    return methodMap;
}
