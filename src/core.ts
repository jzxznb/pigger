export function Module(options): any {
    return function (target) {
        target.controls = options.controls;
        target.injects = options.injects;
    };
}

export function Control(path: string): any {}

export function Inject(target: any): void {}

export function Post(path: string): any {}

export function Get(path: string): any {}

export function Put(path: string): any {}

export function Delete(path: string): any {}
