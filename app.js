
const categories=[
["🛒","Supermercados","#e5f9ef"],
["🍽️","Restaurantes","#fff0e5"],
["🛵","Entregas","#e9f1ff"],
["🧹","Limpeza","#e4f8f5"],
["🔧","Reparos","#fff1dc"],
["💇","Beleza","#ffe9f3"],
["💻","Tecnologia","#eee8ff"],
["📚","Educação","#fff4ce"],
["📦","Logística","#e7f0ff"],
["🐾","Pets","#ffeedf"],
["🌿","Jardinagem","#e5f7df"],
["🎉","Eventos","#ffe7e4"],
["📷","Foto e vídeo","#e9e8ff"],
["🧾","Administração","#e8f6f2"],
["🚗","Motoristas","#e6efff"],
["🛍️","Vendas","#ffefdc"],
["🧑‍🍳","Alimentação","#fff0e6"],
["🏗️","Construção","#f5eddf"],
["🎨","Design","#f0e6ff"],
["🧵","Artesanato","#ffebf3"],
["👶","Cuidados infantis","#e5f8f1"],
["🏠","Imóveis","#e9f0ff"],
["🧺","Lavanderia","#e5f8ff"],
["🧠","Dados e IA","#eee8ff"],
["📝","Tradução","#fff5d9"],
["📣","Marketing","#ffe9df"],
["🚚","Mudanças","#e8f0ff"],
["💪","Esportes","#e2f8ee"],
["🌷","Flores","#ffeaf1"],
["🛡️","Segurança","#e9e8ff"],
["🧑‍💼","Recursos Humanos","#e7f7f3"],
["🎵","Música","#f0e8ff"],
["🖨️","Impressão","#e9f1ff"],
["🧽","Higienização","#e5f9f5"],
["🧑‍🔬","Engenharia","#e7edff"],
["🩺","Bem-estar","#ffe9f0"],
["🌾","Agricultura","#eaf5dd"],
["🎁","Presentes","#fff0dc"],
["🗂️","Organização","#e9e7ff"],
["⚡","Serviços rápidos","#fff1d9"]
];

const sampleJobs=[
{
title:"Auxiliar de loja",
category:"Supermercados",
place:"São Paulo • Exemplo demonstrativo",
pay:"Valor a combinar",
emoji:"🛒",
type:"Presencial"
},
{
title:"Ajudante de cozinha",
category:"Restaurantes",
place:"Sua região • Exemplo demonstrativo",
pay:"Diária a combinar",
emoji:"🍽️",
type:"Por diária"
},
{
title:"Entregador parceiro",
category:"Entregas",
place:"Região local • Exemplo demonstrativo",
pay:"Pagamento por entrega",
emoji:"🛵",
type:"Flexível"
}
];

const catEl=document.querySelector("#categories");
const jobsEl=document.querySelector("#jobs");
const search=document.querySelector("#search");
const modal=document.querySelector("#modal");

function normalize(text){
return String(text||"")
.toLocaleLowerCase("pt-BR")
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.trim();
}

// Sinônimos para ajudar a busca
const searchAliases={
"entregador":"entregador entregadores entrega entregas motoboy motofrete",
"motoboy":"motoboy entregador entregadores entregas",
"motorista":"motorista motoristas transporte",
"diarista":"diarista limpeza faxina",
"faxineira":"faxineira limpeza diarista",
"cozinheiro":"cozinheiro cozinha restaurante alimentacao",
"garcom":"garcom restaurante atendimento",
"pedreiro":"pedreiro construcao obras",
"jardineiro":"jardineiro jardinagem",
"cuidador":"cuidador cuidados infantis"
};

function getSearchText(value){
const q=normalize(value);
return searchAliases[q]||q;
}

// Categorias: selecionam a busca, sem criar ou abrir abas
if(catEl){
catEl.innerHTML="";

categories.forEach(([emoji,name,bg])=>{
const b=document.createElement("button");

b.className="category";
b.type="button";
b.style.setProperty("--catbg",bg);
b.innerHTML=`<span class="emoji">${emoji}</span><span>${name}</span>`;
b.setAttribute("aria-label",`Buscar em ${name}`);

b.onclick=()=>{
if(search){
search.value=name;
renderJobs();
}
const section=document.querySelector("#jobsSection");
if(section){
section.scrollIntoView({behavior:"smooth"});
}
};

catEl.appendChild(b);
});
}

function renderJobs(){
if(!jobsEl||!search)return;

const q=getSearchText(search.value);

const filtered=sampleJobs.filter(j=>{
const content=normalize(
j.title+" "+j.category+" "+j.place+" "+j.type
);

if(!q)return true;

return q.split(/\s+/).some(term=>content.includes(term));
});

jobsEl.innerHTML="";

if(!filtered.length){
jobsEl.innerHTML=`
<p class="empty">
Não encontramos exemplos para essa busca.
Experimente outra palavra ou categoria.
As oportunidades desta versão são demonstrativas,
não são vagas reais.
</p>`;
return;
}

filtered.forEach(j=>{
const d=document.createElement("article");
d.className="job";

d.innerHTML=`
<div class="job-top">
<div class="job-art">${j.emoji}</div>
<div class="job-heading">
<h3>${j.title}</h3>
<p>⌖ ${j.place}</p>
</div>
</div>
<div class="job-bottom">
<div>
<span class="tag">${j.category}</span>
<p class="job-pay">${j.pay}</p>
<span class="job-type">${j.type}</span>
</div>
<button class="job-open" type="button">Detalhes ↗</button>
</div>
`;

d.querySelector(".job-open").onclick=()=>{
showModal(j.title,`
<p><strong>${j.category}</strong></p>
<p>${j.place}</p>
<p>${j.pay}</p>
<p>Esta oportunidade é apenas um exemplo de demonstração,
não uma vaga real. A candidatura será adicionada
em uma próxima versão.</p>
`);
};

jobsEl.appendChild(d);
});
}

if(search){
search.addEventListener("input",renderJobs);
search.addEventListener("keydown",event=>{
if(event.key==="Enter"){
event.preventDefault();
renderJobs();
const section=document.querySelector("#jobsSection");
if(section) section.scrollIntoView({behavior:"smooth"});
}
});
}

const searchGo=document.querySelector("#searchGo");

if(searchGo){
searchGo.type="button";
searchGo.onclick=()=>{
renderJobs();
const section=document.querySelector("#jobsSection");
if(section) section.scrollIntoView({behavior:"smooth"});
};
}

renderJobs();

function showModal(title,html){
if(!modal)return;

const titleEl=document.querySelector("#modalTitle");
const bodyEl=document.querySelector("#modalBody");

if(titleEl)titleEl.textContent=title;
if(bodyEl)bodyEl.innerHTML=html;

if(!modal.open){
modal.showModal();
}
}

const findBtn=document.querySelector("#findBtn");

if(findBtn){
findBtn.onclick=()=>{
if(search)search.focus();
window.scrollTo({top:0,behavior:"smooth"});
};
}

const publishForm=`
<p>Esta tela é uma demonstração. Os dados ainda não são enviados a um servidor.</p>
<div class="field">
<label>Seu nome</label>
<input placeholder="Como podemos chamar você?">
</div>
<div class="field">
<label>Serviço que você oferece</label>
<input placeholder="Ex.: limpeza, entrega, design">
</div>
<div class="field">
<label>Cidade</label>
<input placeholder="Sua cidade">
</div>
<button class="primary" type="button"
onclick="alert('Demonstração: precisamos conectar o cadastro a um servidor para publicar de verdade.')">
Continuar ↗
</button>
`;

const publishBtn=document.querySelector("#publishBtn");
const publishBottom=document.querySelector("#publishBottom");

if(publishBtn){
publishBtn.onclick=()=>showModal("Divulgar serviço",publishForm);
}

if(publishBottom){
publishBottom.onclick=()=>showModal("Divulgar serviço",publishForm);
}

function assistantReply(message){
const m=normalize(message);

if(m.includes("curriculo")){
return "Vamos preparar seu currículo! Conte sua experiência, sua profissão, seus cursos e sua cidade. Posso ajudar a organizar tudo em um rascunho.";
}

if(m.includes("vaga")||m.includes("trabalho")||m.includes("emprego")){
return "Vamos organizar sua busca por trabalho. Me conte sua profissão, sua experiência, sua cidade e os horários disponíveis. As oportunidades desta versão ainda são exemplos, não vagas reais.";
}

if(m.includes("entregador")||m.includes("entrega")||m.includes("motoboy")){
return "Entendi que você procura trabalho como entregador. Você trabalha com moto, bicicleta ou carro? Em qual cidade ou região deseja trabalhar? Vou ajudar a organizar sua busca.";
}

if(m.includes("proposta")||m.includes("cliente")){
return "Vamos preparar uma proposta para seu cliente. Qual serviço você oferece, qual o prazo e quanto pretende cobrar?";
}

if(m.includes("preco")||m.includes("orcamento")){
return "Para calcular um orçamento, precisamos considerar materiais, deslocamento, tempo e dificuldade do serviço. Qual serviço você deseja oferecer?";
}

if(m.includes("golpe")||m.includes("seguranca")||m.includes("suspeita")){
return "Proteja seus dados: não pague para garantir uma vaga e nunca compartilhe senhas ou códigos de confirmação. Confira as propostas antes de responder.";
}

return "Estou aqui para ajudar. Podemos conversar sobre trabalho, currículo, oportunidades, divulgação de serviços, clientes e orçamentos. Conte o que você precisa.";
}

function openAssistant(initialMessage=""){
showModal("Assistente Freela Brasil",`
<div class="assistant-intro">
<span>✳</span>
<div>
<strong>Estou aqui para ajudar.</strong>
<p>Posso preparar ideias e rascunhos. Nada será enviado ou publicado sem sua confirmação.</p>
</div>
</div>

<div id="chatMessages" class="chat-messages">
<div class="chat-bubble bot">
Olá! 😊 Como posso ajudar você hoje?
<br><br>
Conte o que está procurando.
</div>
</div>

<div class="field">
<label for="assistantInput">Sua mensagem</label>
<textarea id="assistantInput" rows="3"
placeholder="Escreva aqui o que você precisa..."></textarea>
</div>

<button class="primary" id="assistantSend" type="button">
Conversar ↗
</button>

<p class="assistant-note">
Demonstração: as respostas são locais e limitadas.
A conexão com uma IA online será configurada depois.
</p>
`);

const input=document.querySelector("#assistantInput");
const messages=document.querySelector("#chatMessages");
const send=document.querySelector("#assistantSend");

if(!input||!messages||!send)return;

function sendMessage(){
const value=input.value.trim();
if(!value)return;

const user=document.createElement("div");
user.className="chat-bubble user";
user.textContent=value;
messages.appendChild(user);

const reply=document.createElement("div");
reply.className="chat-bubble bot";
reply.textContent=assistantReply(value);
messages.appendChild(reply);

input.value="";
messages.scrollTop=messages.scrollHeight;
}

send.onclick=sendMessage;

input.addEventListener("keydown",event=>{
if(event.key==="Enter"&&!event.shiftKey){
event.preventDefault();
sendMessage();
}
});

if(initialMessage){
input.value=initialMessage;
sendMessage();
}
}

// Navegação inferior: não cria abas inexistentes
document.querySelectorAll(".bottomnav button").forEach(b=>{
b.onclick=()=>{
document.querySelectorAll(".bottomnav button")
.forEach(x=>x.classList.remove("active"));

b.classList.add("active");

const tab=b.dataset.tab;

if(tab==="Buscar"){
if(search)search.focus();
window.scrollTo({top:0,behavior:"smooth"});
}
else if(tab==="Publicar"){
if(publishBtn)publishBtn.click();
}
else if(tab==="Assistente"){
openAssistant();
}
else if(tab==="Perfil"){
showModal("Meu perfil",`
<p>Seu perfil permitirá editar seus dados,
serviços, candidaturas e preferências.
O cadastro real será adicionado futuramente.</p>
`);
}
else{
window.scrollTo({top:0,behavior:"smooth"});
}
};
});

// Microfone: abre o assistente e envia a fala para a conversa
const voiceSearch=document.querySelector("#voiceSearch");

if(voiceSearch){
voiceSearch.type="button";

voiceSearch.onclick=event=>{
event.preventDefault();

const SpeechRecognition=
window.SpeechRecognition||
window.webkitSpeechRecognition;

openAssistant();

if(!SpeechRecognition){
alert("Este navegador não oferece reconhecimento de voz. Você pode conversar digitando.");
return;
}

const input=document.querySelector("#assistantInput");
const send=document.querySelector("#assistantSend");

if(!input||!send)return;

const recognition=new SpeechRecognition();

recognition.lang="pt-BR";
recognition.continuous=false;
recognition.interimResults=false;
recognition.maxAlternatives=1;

voiceSearch.textContent="🎙️";

recognition.onresult=event=>{
const frase=event.results[0][0].transcript;
input.value=frase;
send.click();
};

recognition.onerror=event=>{
if(event.error==="not-allowed"||event.error==="service-not-allowed"){
alert("O acesso ao microfone foi bloqueado. Autorize o microfone nas permissões do navegador.");
}
else if(event.error==="no-speech"){
alert("Não ouvi sua voz. Toque no microfone e tente novamente.");
}
else{
alert("Não foi possível reconhecer sua voz. Tente novamente.");
}
};

recognition.onend=()=>{
voiceSearch.textContent="🎤";
};

try{
recognition.start();
}
catch(error){
voiceSearch.textContent="🎤";
alert("Não foi possível iniciar o microfone. Verifique a permissão do navegador.");
}
};
}

// Informações sobre contratos
const contractsBtn=document.querySelector("#contractsBtn");

if(contractsBtn){
contractsBtn.onclick=()=>{
showModal("Informações sobre contratos",`
<h3>1. Contrato de trabalho (CLT)</h3>
<p>Exemplo de relação de emprego regida pela legislação trabalhista.</p>

<h3>2. Prestação de serviços autônomos</h3>
<p>Exemplo de contratação de profissional autônomo.</p>

<h3>3. Contrato por projeto</h3>
<p>Exemplo de contratação para realizar um serviço específico.</p>

<h3>4. Trabalho temporário</h3>
<p>Modalidade sujeita às regras legais próprias do trabalho temporário.</p>

<hr>

<p><strong>Importante:</strong> O Freela Brasil apenas apresenta informações e exemplos.
A negociação e a formalização são feitas diretamente entre as partes.
A modalidade adequada depende das condições reais da relação
e da legislação aplicável.</p>
`);
};
}
