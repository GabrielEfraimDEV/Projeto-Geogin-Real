function combinarVoos() {
    const voosTextArea = document.getElementById('voosTextArea').value;
    const aeronavesTextArea = document.getElementById('aeronavesTextArea').value;

    const voos = voosTextArea.split('\n');
    const aeronaves = aeronavesTextArea.split('\n');
    const combinacoes = [];
    const relatorio = {};

    // Função para gerar um número aleatório dentro de um intervalo
    function gerarNumeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Gerar combinações aleatórias de voos e aeronaves
    voos.forEach(voo => {
        const [rota, duracao] = voo.split(';');
        const aeronaveIndex = gerarNumeroAleatorio(0, aeronaves.length - 1);
        const [aeronaveCodigo, aeronaveNome] = aeronaves[aeronaveIndex].split('-');
        const combinacao = `${rota} - ${duracao} minutos - ${aeronaveCodigo}-${aeronaveNome}`;
        combinacoes.push(combinacao);

        if (!relatorio[aeronaveCodigo]) {
            relatorio[aeronaveCodigo] = { voos: 1, duracaoTotal: parseInt(duracao) };
        } else {
            relatorio[aeronaveCodigo].voos++;
            relatorio[aeronaveCodigo].duracaoTotal += parseInt(duracao);
        }
    });

    // Exibir combinações
    const combinacoesDiv = document.getElementById('combinacoes');
    combinacoesDiv.innerHTML = combinacoes.map(combinacao => `<div class="combinacao">${combinacao}</div>`).join('');

    // Exibir relatório
    const relatorioDiv = document.getElementById('relatorio');
    const relatorioTexto = Object.keys(relatorio).map(aeronaveCodigo => {
        const aeronave = relatorio[aeronaveCodigo];
        return `<div class="relatorio-entrada">${aeronaveCodigo} - ${aeronave.voos} voos - tempo total: ${aeronave.duracaoTotal} minutos</div>`;
    });
    relatorioDiv.innerHTML = relatorioTexto.join('');
}
