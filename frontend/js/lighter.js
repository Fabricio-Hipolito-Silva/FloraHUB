        let lighterState = {
            power: true,
            work_mode: "white",
            brightness_value_v2: 1000,
            temperature_value_v2: 1000,
            color: {
                h: 0,
                s: 0,
                v: 500
            }
        };
        let stateTimeout;
        const brightnessInput = document.getElementById("brightness");
        const temperatureInput = document.getElementById("temperature");
        const whiteTab = document.getElementById("white-tab");
        const colorTab = document.getElementById("color-tab");
        const brightnessControl = document.getElementById("brightnessControl");
        const powerInput = document.getElementById("power");
           var colorPicker = new iro.ColorPicker("#picker", {
            width: 200, //Size
            color: "#f00" //Unitial Color
        });


        function stateChanged() {
            console.log("Estado alterado(FRONTEND):", lighterState);
            clearTimeout(stateTimeout);
            stateTimeout = setTimeout(async () => {
                await fetch("http://localhost:3000/api/lighter/state", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(lighterState)
                });
            }, 300);
        }
        powerInput.addEventListener("input", () => {
            lighterState.power = powerInput.checked;
            stateChanged();
        });
        whiteTab.addEventListener("shown.bs.tab", () => {
         lighterState.work_mode = "white";
         brightnessControl.style.display = "block";
         stateChanged();
        });
        colorTab.addEventListener("shown.bs.tab", () => {
         lighterState.work_mode = "colour";
         brightnessControl.style.display = "none";
         stateChanged();
        });
        brightnessInput.addEventListener("input", () => {
         lighterState.brightness_value_v2 =
            Number(brightnessInput.value);
            stateChanged();
        });
        temperatureInput.addEventListener("input", () => {
         lighterState.temperature_value_v2 =
        Number(temperatureInput.value);
        stateChanged();
        });
        colorPicker.on("color:change", (color) => {
         lighterState.color = {
        h: color.hsv.h,
        s: color.hsv.s,
        v: color.hsv.v
    };
    stateChanged();
});
