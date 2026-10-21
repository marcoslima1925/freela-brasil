const categories=[
["🛒","Supermercados","#e5f9ef"],["🍽️","Restaurantes","#fff0e5"],["🛵","Entregas","#e9f1ff"],["🧹","Limpeza","#e4f8f5"],["🔧","Reparos","#fff1dc"],["💇","Beleza","#ffe9f3"],["💻","Tecnologia","#eee8ff"],["📚","Educação","#fff4ce"],["📦","Logística","#e7f0ff"],["🐾","Pets","#ffeedf"],["🌿","Jardinagem","#e5f7df"],["🎉","Eventos","#ffe7e4"],["📷","Foto e vídeo","#e9e8ff"],["🧾","Administração","#e8f6f2"],["🚗","Motoristas","#e6efff"],["🛍️","Vendas","#ffefdc"],["🧑‍🍳","Alimentação","#fff0e6"],["🏗️","Construção","#f5eddf"],["🎨","Design","#f0e6ff"],["🧵","Artesanato","#ffebf3"],["👶","Cuidados infantis","#e5f8f1"],["🏠","Imóveis","#e9f0ff"],["🧺","Lavanderia","#e5f8ff"],["🧠","Dados e IA","#eee8ff"],["📝","Tradução","#fff5d9"],["📣","Marketing","#ffe9df"],["🚚","Mudanças","#e8f0ff"],["💪","Esportes","#e2f8ee"],["🌷","Flores","#ffeaf1"],["🛡️","Segurança","#e9e8ff"],["🧑‍💼","Recursos Humanos","#e7f7f3"],["🎵","Música","#f0e8ff"],["🖨️","Impressão","#e9f1ff"],["🧽","Higienização","#e5f9f5"],["🧑‍🔬","Engenharia","#e7edff"],["🩺","Bem-estar","#ffe9f0"],["🌾","Agricultura","#eaf5dd"],["🎁","Presentes","#fff0dc"],["🗂️","Organização","#e9e7ff"],["⚡","Serviços rápidos","#fff1d9"]
];
const sampleJobs=[
{title:"Auxiliar de loja",category:"Supermercados",place:"São Paulo • Exemplo demonstrativo",pay:"Valor a combinar",emoji:"🛒",type:"Presencial"},
{title:"Ajudante de cozinha",category:"Restaurantes",place:"Sua região • Exemplo demonstrativo",pay:"Diária a combinar",emoji:"🍽️",type:"Por diária"},
{title:"Entregador parceiro",category:"Entregas",place:"Região local • Exemplo demonstrativo",pay:"Pagamento por entrega",emoji:"🛵",type:"Flexível"}
];
const catEl=document.querySelector("#categories"),jobsEl=document.querySelector("#jobs"),search=document.querySelector("#search"),modal=document.querySelector("#modal");
categories.forEach(([emoji,name,bg])=>{const b=document.createElement("button");b.className="category";b.style.setProperty("--catbg",bg);b.innerHTML=`<span class="emoji">${emoji}</span><span>${name}</span>`;b.setAttribute("aria-label",`Buscar em ${name}`);b.onclick=()=>{search.value=name;renderJobs();document.querySelector("#jobsSection").scrollIntoView({behavior:"smooth"});};catEl.appendChild(b)});
function renderJobs(){const q=search.value.toLocaleLowerCase("pt-BR").trim();const filtered=sampleJobs.filter(j=>(j.title+" "+j.category+" "+j.place+" "+j.type).toLocaleLowerCase("pt-BR").includes(q));jobsEl.innerHTML="";if(!filtered.length){jobsEl.innerHTML='<p class="empty">Não encontramos exemplos para essa busca. Quando o app estiver conectado ao sistema de vagas, esta área poderá mostrar oportunidades reais.</p>';return}filtered.forEach(j=>{const d=document.createElement("article");d.className="job";d.innerHTML=`<div class="job-top"><div class="job-art">${j.emoji}</div><div class="job-heading"><h3>${j.title}</h3><p>⌖ ${j.place}</p></div></div><div class="job-bottom"><div><span class="tag">${j.category}</span><p class="job-pay">${j.pay}</p><span class="job-type">${j.type}</span></div><button class="job-open" type="button">Detalhes ↗</button></div>`;d.querySelector(".job-open").onclick=()=>showModal(j.title,`<p><strong>${j.category}</strong></p><p>${j.place}</p><p>${j.pay}</p><p>Esta oportunidade é apenas um exemplo de demonstração, não uma vaga real. O envio de candidaturas será adicionado em uma próxima versão.</p>`);jobsEl.appendChild(d)})}
search.addEventListener("input",renderJobs);document.querySelector("#searchGo").onclick=()=>{renderJobs();document.querySelector("#jobsSection").scrollIntoView({behavior:"smooth"})};renderJobs();
function showModal(title,html){document.querySelector("#modalTitle").textContent=title;document.querySelector("#modalBody").innerHTML=html;modal.showModal()}
document.querySelector("#findBtn").onclick=()=>{search.focus();document.querySelector("#jobsSection").scrollIntoView({behavior:"smooth"})};
const publishForm=`<p>Esta tela é uma demonstração. Os dados ainda não são enviados a um servidor.</p><div class="field"><label>Seu nome</label><input placeholder="Como podemos chamar você?"></div><div class="field"><label>Serviço que você oferece</label><input placeholder="Ex.: limpeza, entrega, design"></div><div class="field"><label>Cidade</label><input placeholder="Sua cidade"></div><button class="primary" type="button" onclick="alert('Demonstração: para publicar de verdade, precisamos conectar cadastro e banco de dados.')">Continuar ↗</button>`;
document.querySelector("#publishBtn").onclick=()=>showModal("Divulgar serviço",publishForm);document.querySelector("#publishBottom").onclick=()=>showModal("Divulgar serviço",publishForm);
function assistantReply(message){
 const m=message.toLocaleLowerCase("pt-BR");
 if(m.includes("currículo")||m.includes("curriculo")) return "Vamos preparar seu currículo! Sugestão: inclua seu nome, cidade, telefone (se quiser), experiências, habilidades e disponibilidade. Posso montar um rascunho se você me disser sua área e experiência. Ainda não enviarei nada a ninguém sem sua autorização.";
 if(m.includes("vaga")||m.includes("trabalho")||m.includes("emprego")) return "Posso ajudar a organizar sua busca. Procure por uma área, informe sua cidade e os horários disponíveis. Atenção: as oportunidades exibidas nesta versão são exemplos, não vagas reais. Para mostrar vagas verdadeiras, precisamos conectar um sistema de anúncios.";
 if(m.includes("proposta")||m.includes("cliente")) return "Vamos preparar uma proposta clara. Informe o serviço, o que está incluído, prazo e preço. Antes de enviar uma mensagem a qualquer cliente, você poderá revisar e confirmar o texto.";
 if(m.includes("preço")||m.includes("preco")||m.includes("orçamento")||m.includes("orcamento")) return "Para estimar um preço, considere materiais, deslocamento, tempo de trabalho e complexidade. Posso ajudar a montar um orçamento preliminar, mas você deve conferir os valores antes de apresentar ao cliente.";
 if(m.includes("segurança")||m.includes("golpe")||m.includes("suspeita")) return "Proteja seus dados: não pague para garantir uma vaga, não compartilhe senhas ou códigos de confirmação e desconfie de promessas de ganhos garantidos. Se houver uma proposta suspeita, pare e verifique antes de responder.";
 return "Vamos por partes. Posso ajudar com currículo, busca de trabalho, proposta para clientes, orçamento, divulgação do seu serviço ou organização da rotina. Conte um pouco mais sobre o que precisa. Esta é uma demonstração local; ainda não estou conectado a uma IA online.";
}
function openAssistant(){
 showModal("Assistente Freela Brasil",`<div class="assistant-intro"><span>✳</span><div><strong>Estou aqui para ajudar.</strong><p>Posso preparar ideias e rascunhos. Nada será enviado ou publicado sem sua confirmação.</p></div></div><div id="chatMessages" class="chat-messages"><div class="chat-bubble bot">Olá! 😊 Como posso ajudar você hoje?<br><br>Você pode pedir ajuda com currículo, oportunidades, propostas ou orçamento.</div></div><div class="field"><label for="assistantInput">Sua mensagem</label><textarea id="assistantInput" rows="3" placeholder="Escreva aqui o que você precisa..."></textarea></div><button class="primary" id="assistantSend" type="button">Conversar ↗</button><p class="assistant-note">Demonstração: as respostas são locais e limitadas. A conexão com uma IA real será configurada depois por um servidor seguro.</p>`);
 const input=document.querySelector("#assistantInput"), messages=document.querySelector("#chatMessages"), send=document.querySelector("#assistantSend");
 send.onclick=()=>{const value=input.value.trim();if(!value){input.focus();return;}const user=document.createElement("div");user.className="chat-bubble user";user.textContent=value;messages.appendChild(user);const reply=document.createElement("div");reply.className="chat-bubble bot";reply.textContent=assistantReply(value);messages.appendChild(reply);input.value="";messages.scrollTop=messages.scrollHeight;};
}
document.querySelector("#aiBtn").onclick=openAssistant;
document.querySelectorAll(".bottomnav button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".bottomnav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");const tab=b.dataset.tab;if(tab==="Buscar"){search.focus();window.scrollTo({top:0,behavior:"smooth"})}else if(tab==="Publicar"){document.querySelector("#publishBtn").click()}else if(tab==="Assistente"){openAssistant()}else if(tab==="Perfil"){showModal("Meu perfil",'<p>Seu perfil permitirá editar seus dados, serviços, candidaturas e preferências. O cadastro real será adicionado na próxima etapa.</p>')}else{window.scrollTo({top:0,behavior:"smooth"})}});

// Pesquisa por voz — Freela Brasil
const voiceSearch = document.querySelector("#voiceSearch");

voiceSearch.addEventListener("click", () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Seu navegador não oferece reconhecimento de voz. Tente abrir o aplicativo no Google Chrome.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceSearch.textContent = "🎙️";

  recognition.onresult = (event) => {
    search.value = event.results[0][0].transcript;
    renderJobs();
    document.querySelector("#jobsSection").scrollIntoView({
      behavior: "smooth"
    });
  };

  recognition.onerror = (event) => {
    if (event.error === "not-allowed") {
      alert("Permita o acesso ao microfone nas configurações do navegador.");
    } else if (event.error !== "no-speech") {
      alert("Não foi possível reconhecer sua voz. Tente novamente.");
    }
  };

  recognition.onend = () => {
    voiceSearch.textContent = "🎤";
  };

  try {
    recognition.start();
  } catch (error) {
    voiceSearch.textContent = "🎤";
    alert("Não foi possível iniciar o microfone. Tente novamente.");
  }
});
