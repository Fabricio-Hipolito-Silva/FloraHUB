import { LighterStatus, TuyaDeviceStatus } from "../types/lighter.js";
import "dotenv/config"
import { TuyaContext } from '@tuya/tuya-connector-nodejs'
console.log('Starting Tuya Connector...')
const tuyaContext = new TuyaContext({
  baseUrl: 'https://openapi.tuyaus.com',
  accessKey: process.env.TUYA_CLIENT_ID!,
  secretKey: process.env.TUYA_CLIENT_SECRET!,
})
const deviceId = process.env.TUYA_DEVICE_ID!
export async function getLighterStatus(): Promise<LighterStatus> {
    const deviceDetail = await tuyaContext.device.detail({
        device_id: deviceId,
    });
    const deviceStatus = await tuyaContext.request({
        path: `/v1.0/iot-03/devices/${deviceId}/status`,
        method: 'GET',
    }) as { result: TuyaDeviceStatus[] };
    console.log('Device Detail:', deviceDetail);
    console.log('Device Status:', deviceStatus);
    const powerStatus = deviceStatus.result.find((status) => status.code === 'switch_led');
    const workModeStatus = deviceStatus.result.find((status) => status.code === 'work_mode');
    const BrightValueStatus = deviceStatus.result.find((status) => status.code ==='bright_value');
    const TempValueStatus = deviceStatus.result.find((status) => status.code ==='temp_value');

    return {
        online: deviceDetail.result.online,
        name: deviceDetail.result.name,
        power: powerStatus?.value === true,
        work_mode: workModeStatus?.value as string,
        bright_value_v2: BrightValueStatus?.value as number,
        temp_value_v2: TempValueStatus?.value as number,
    };
}

export async function turnLighterOn(): Promise<void> {
    await tuyaContext.request({
        path: `/v1.0/iot-03/devices/${deviceId}/commands`,
        method: 'POST',
        body: {
            commands: [
                {
                    code: 'switch_led',
                    value: true,
                }
            ],
        },
    })
}

export async function turnLighterOff(): Promise<void> {
    await tuyaContext.request({
        path: `/v1.0/iot-03/devices/${deviceId}/commands`,
        method: 'POST',
        body: {
            commands: [
                {
                    code: 'switch_led',
                    value: false,
                }
            ],
        },
    })
}