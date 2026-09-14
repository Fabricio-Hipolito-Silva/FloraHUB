export interface LighterStatus{
    online: boolean;
    name: string;
    // Status of the lighter
    power: boolean;
    work_mode: string;
    bright_value_v2: number;
    temp_value_v2: number;
    // colour_data_v2: {
    //     h: number;
    //     s: number;
    //     v: number;
    // };
    
}
export interface TuyaDeviceStatus{
    code: string;
    value: unknown;
}