import { LighterStatus, TuyaDeviceStatus, HSV, LighterState } from "../types/lighter.js"; //Importa as interfaces
import "dotenv/config"
import { TuyaContext } from '@tuya/tuya-connector-nodejs' //Biblioteca para conectar com a API da Tuya
const tuyaContext = new TuyaContext({
  baseUrl: 'https://openapi.tuyaus.com',
  accessKey: process.env.TUYA_CLIENT_ID!,
  secretKey: process.env.TUYA_CLIENT_SECRET!,
})
const deviceId = process.env.TUYA_DEVICE_ID!

export async function getLighterStatus(): Promise<LighterStatus> { //Promete retornar um objeto da interface LighterStatus
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


function toHex4(value: number): string {
    return value.toString(16).padStart(4, "0"); //Converte em hexadecimal base 16, e preenche com zeros à esquerda para garantir que tenha 4 dígitos
}

function hsvToTuyaColor({h, s, v}: HSV): string{
    const hValue = h;
    const sValue = s * 10;
    const vValue = v * 10;
    return (
        toHex4(hValue) +
        toHex4(sValue) +
        toHex4(vValue)
    );
}// Converte tudo em uma string aceita pela tuya
export async function changeLighterState(state: LighterState){
    const commands = [
        {
            code: 'switch_led',
            value: state.power,
        },
        {
            code: 'work_mode',
            value: state.work_mode,
        },
        {
            code: 'bright_value',
            value: state.brightness_value_v2,
        },
        {
            code: 'temp_value',
            value: state.temperature_value_v2,
        },
        {
            code: 'colour_data',
            value: hsvToTuyaColor(state.color),
        }
    ];

    await tuyaContext.request({
        path: `/v1.0/iot-03/devices/${deviceId}/commands`,
        method: 'POST',
        body: {
            commands: commands
        }
    });
}
