function autobind<T extends Function>(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
    if (!descriptor || (typeof descriptor.value !== 'function')) {
        throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
    }

    return {
        configurable: true,
        get(this: T): T {
            const bound: T = descriptor.value!.bind(this);
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: true,
                writable: true
            });
            return bound;
        }
    };
}

export class Key {
    constructor(public label: string) { }

    static get Space(): Key {
        return new Key("SPACE");
    }
    static get D(): Key {
        return new Key("KEYD");
    }
    static get A(): Key {
        return new Key("KEYA");
    }
    static get W(): Key {
        return new Key("KEYW");
    }
}

export class Input {
    pressedKeyCodes: string[] = [];
    constructor() {
        addEventListener("keydown", this.onKeyDown);
        addEventListener("keyup", this.onKeyUp);
    }

    @autobind
    private onKeyDown(e: KeyboardEvent) {
        // add key if not present
        if (this.pressedKeyCodes.find((k) => k == e.code.toUpperCase()) == undefined) {
            this.pressedKeyCodes.push(e.code.toUpperCase());
        }
    }

    @autobind
    private onKeyUp(e: KeyboardEvent) {
        // remove key if present
        let index = this.pressedKeyCodes.findIndex((k) => k == e.code.toUpperCase());
        if (index == -1) return;
        this.pressedKeyCodes.splice(index, 1);
    }

    isPressed(key: Key): boolean {
        return this.pressedKeyCodes.find((k) => k == key.label) != undefined;
    }
}