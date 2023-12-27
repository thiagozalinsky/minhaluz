// Função para formatar a data no formato desejado
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

async function calcularEEnviar() {
    const eletrodomestico = document.getElementById('eletrodomestico').value;
    const kwhPorMes = parseFloat(document.getElementById('kwhPorMes').value);
    const hours = parseFloat(document.getElementById('hours').value);

    const tarifa = 0.55492; // Tarifa por kWh
    const valorGasto = kwhPorMes * tarifa * (hours / 720);  // 720 horas = aprox. 1 mês

    const dataAtual = new Date();
    const dataFormatada = formatDate(dataAtual);
    
    const data = {
        "Eletrodomestico": eletrodomestico,
        "Consumo (kWh)": kwhPorMes,
        "Valor Gasto (R$)": valorGasto.toFixed(2),
        "Data formatada": dataFormatada  // Certifique-se de que esteja correto
    };
    console.log("Data formatada:", dataFormatada);  // Verifique se a data está sendo corretamente formatada

    try {
        const response = await fetch('https://sheetdb.io/api/v1/p8pts7ofjnn11', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            document.getElementById('resultado').innerText = 'Dados enviados com sucesso para a planilha!';
        } else {
            console.error('Erro ao enviar dados para a planilha:', jsonResponse);
            document.getElementById('resultado').innerText = 'Erro ao enviar dados para a planilha.';
        }
    } catch (error) {
        console.error('Erro ao enviar dados para a planilha:', error);
        document.getElementById('resultado').innerText = 'Erro ao enviar dados para a planilha.';
    }
}
