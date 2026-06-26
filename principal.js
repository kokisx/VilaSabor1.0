let valorFinalGlobal = 0;
let pessoasGlobal = 0;
let telefoneGlobal = "";
let mensagemGlobal = "";

function calcularReserva() {

    let telefone = document.getElementById("telefone").value;
    let mensagem = document.getElementById("mensagem").value;

    let pessoas = Number(
        document.getElementById("pessoas").value
    );

    if(telefone.trim() === "") {
        alert("Digite o WhatsApp.");
        return;
    }

    if (isNaN(pessoas) || pessoas <= 0) {
        alert("Digite uma quantidade válida de pessoas.");
        return;
    }

    telefoneGlobal = telefone;
    mensagemGlobal = mensagem;

    const valorPessoa = 25;

    let total = pessoas * valorPessoa;

    let desconto = 0;

    if (pessoas >= 2) {
        desconto = 10;
    }

    let valorFinal = total - (total * desconto / 100);

    valorFinalGlobal = valorFinal;
    pessoasGlobal = pessoas;

    document.getElementById("resultado").innerHTML = `
        Pessoas: ${pessoas}<br>
        Valor Original: R$ ${total.toFixed(2)}<br>
        Desconto: ${desconto}%<br>
        <strong>Valor Final: R$ ${valorFinal.toFixed(2)}</strong>
    `;

    document.getElementById("btnEnviar").disabled = false;
}

async function enviarWhatsapp() {

    try {

        const mensagem = `
🍽️ NOVA RESERVA

WhatsApp: ${telefoneGlobal}

Quantidade de Pessoas: ${pessoasGlobal}

Valor da Reserva: R$ ${valorFinalGlobal.toFixed(2)}

Data e hora:
${mensagemGlobal}
`;

        const response = await fetch(
            "https://v2-api.gzappy.com/message/send-text",
            {
                method: "POST",

                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaW5zdGFuY2VfaWQiOiJKQ1NORioqKioqKioqKioqKioqRldFVFIiLCJleHBpcmVzX2F0IjoiMjAyNy0wNi0yMFQyMjoxOTozMi4wMDNaIiwiaWF0IjoxNzgxOTkzOTcyLCJleHAiOjIzODY3OTM5NzJ9.W4oejzIC4r-bpuHkX5u4Mb5JKl30iRjZV9hDeEPrSeA",
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    phone: telefoneGlobal,
                    message: mensagem
                })
            }
        );

        const data = await response.json();

        console.log(data);

        alert("Reserva enviada com sucesso!");

    } catch(error) {

        console.error(error);

        alert("Erro ao enviar reserva.");
    }
}

/*tentativa de galeria responsiva*/
const botao = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const conteudo = document.getElementById("conteudo");

botao.addEventListener("click", ()=>{

    sidebar.classList.toggle("ativo");
    conteudo.classList.toggle("mover");

});