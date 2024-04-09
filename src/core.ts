import { ModuleParams } from "../types/core.type.ts";

export function Module(options: ModuleParams): any {
    return function (target) {
        target.modules = options.modules || [];
        target.controls = options.controls || [];
        target.injects = options.injects || [];
    };
}

export function Control(path: string): any {
    return function (target) {
        target.prefix = path;
    };
}

export function Inject(target: any): void {}

export function Post(path: string): any {}

export function Get(path: string): any {
    return function (target, b, c) {
        console.log(target, b, c);
    };
}

export function Put(path: string): any {}

export function Delete(path: string): any {}
