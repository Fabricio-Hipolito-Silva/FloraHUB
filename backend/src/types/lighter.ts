export interface LighterStatus{
    online: boolean;
    name: string;
    power: boolean;
    work_mode: string;
    bright_value_v2: number;
    temp_value_v2: number;
}
export interface TuyaDeviceStatus{
    code: string;
    value: unknown;
}

export interface HSV{
    h: number;
    s: number;
    v: number;
}
export interface LighterState{
    power: boolean;
    work_mode: "white" | "colour";
    brightness_value_v2: number;
    temperature_value_v2: number;
    color: { h: number; s: number; v: number; };
}
