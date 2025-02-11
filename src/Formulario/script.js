let tempoRestante = 1800; // 30 minutos em segundos
const timerEl = document.getElementById("timer");
let intervaloTimer;

document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quizForm");
    const btnEnviar = document.getElementById("btnenviar");
    const acertoDiv = document.getElementById("acerto");

    // Respostas corretas
    const corretaRepostas = {
        q1: "O(log n)",
        q2: "REST usa endpoints fixos, enquanto GraphQL permite consultas dinâmicas",
        q3: "Um modelo de desenvolvimento baseado em pequenos serviços independentes",
        q4: "Uma unidade de software que inclui código e dependências",
        q5: "Um sistema que distribui tráfego entre servidores",
        q6: "Uma estrutura que repete um bloco de código várias vezes",
        q7: "Um conjunto de ferramentas e bibliotecas que facilitam o desenvolvimento",
        q8: "Um registro de alterações no repositório",
        q9: "Um banco de dados que não usa tabelas relacionais",
        q10: "Integração entre desenvolvimento e operações"
    };

    // Função para formatar o tempo
    function formatarTempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segRestantes = segundos % 60;
        const minFormatado = String(minutos).padStart(2, '0');
        const segFormatado = String(segRestantes).padStart(2, '0');
        return `${minFormatado}:${segFormatado}`;
    }

    // Função para iniciar o timer
    function iniciarTimer() {
        intervaloTimer = setInterval(() => {
            tempoRestante--;
            timerEl.textContent = formatarTempo(tempoRestante);

            if (tempoRestante <= 0) {
                clearInterval(intervaloTimer);
                timerEl.textContent = 'Tempo esgotado';
                finalizarQuiz();
            }
        }, 1000);
    }

    iniciarTimer();

    // Evento de clique no botão "Enviar"
    btnEnviar.addEventListener("click", function () {
        let todasRespondidas = true;

        // Verifica se todas as questões foram respondidas
        for (const question of Object.keys(corretaRepostas)) {
            const userResposta = quizForm[question]?.value;

            if (!userResposta) {
                todasRespondidas = false;
                acertoDiv.textContent = "Por favor, responda todas as perguntas antes de enviar.";
                return;
            }
        }

        // Calcula a pontuação
        let score = 0;
        for (const [question, corretaReposta] of Object.entries(corretaRepostas)) {
            const userResposta = quizForm[question]?.value;
            const fieldset = quizForm[question]?.[0]?.closest("fieldset");

            fieldset?.classList.remove("correct", "incorrect");

            if (userResposta === corretaReposta) {
                score++;
                fieldset?.classList.add("correct");
            } else {
                fieldset?.classList.add("incorrect");
            }
        }

        // Atualiza o número de acertos
        acertoDiv.textContent = `ACERTOS: ${score}`;
        clearInterval(intervaloTimer);
        finalizarQuiz();
    });

    // Função para finalizar o quiz
    function finalizarQuiz() {
        btnEnviar.disabled = true;
        const inputs = quizForm.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => input.disabled = true);
    }
});
