      const getStatusButton = document.getElementById('getStatus');
        const turnOnButton = document.getElementById('turnOn');
        const turnOffButton = document.getElementById('turnOff');
        const getColorButton = document.getElementById('setColor');

     
        getStatusButton.addEventListener("click", async()=>{
            const response = await fetch("http://localhost:3000/api/lighter");
            const data = await response.json();
            console.log(data);
            document.getElementById('status').innerText = `
            Conectado: ${data.online ? 'Sim' : 'Não'} \n
            Nome: ${data.name} \n
            Modo de Trabalho: ${data.work_mode} \n
            Brilho: ${data.bright_value_v2} \n
            Temperatura: ${data.temp_value_v2} \n
            Ligado: ${data.power ? 'Sim' : 'Não'} \n 
             `;
            
        })

        turnOnButton.addEventListener("click", async()=>{
            await fetch("http://localhost:3000/api/lighter/on",{
                method: "POST"
            })
        })
        turnOffButton.addEventListener("click", async()=>{
            await fetch("http://localhost:3000/api/lighter/off",{
                method: "POST"
            })
        })
           var colorPicker = new iro.ColorPicker("#picker", {
            width: 200, //Size
            color: "#f00" //Unitial Color
        });
        getColorButton.addEventListener("click", async()=>{
            const color = colorPicker.color.hsv;
            console.log(color);
            await fetch("http://localhost:3000/api/lighter/color",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(color),
            })
        })
