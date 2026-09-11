const prompts=[
{title:"Cinematic Portrait",category:"Cinematic",prompt:"Turn this photo into an ultra-realistic cinematic portrait. Preserve the person's identity, facial features, hairstyle, clothing and pose exactly. Add natural soft cinematic lighting, realistic skin texture, subtle depth of field, premium DSLR look, detailed background bokeh, balanced contrast and realistic colors. No face change, no plastic skin, no artificial AI look."},
{title:"Rainy Night",category:"Cinematic",prompt:"Create a realistic rainy-night cinematic atmosphere while keeping the subject unchanged. Add natural wet-road reflections, soft street lights, subtle mist, realistic shadows, cinematic depth of field and premium photography detail. Preserve identity, pose, clothes and composition. No extra people and no face alteration."},
{title:"Luxury Fashion",category:"Fashion",prompt:"Edit this image into a premium luxury fashion photograph. Keep the exact person, face, hairstyle, clothing and pose unchanged. Use refined studio lighting, realistic fabric texture, clean composition, subtle background blur, high-end editorial photography and natural skin tones. Avoid over-smoothing or an artificial AI appearance."},
{title:"8K DSLR Look",category:"Realistic",prompt:"Enhance this photo to an ultra-realistic high-detail DSLR photograph. Preserve the original subject, identity, pose and background. Improve sharpness, fine textures, natural lighting, dynamic range and realistic colors with subtle depth of field. Keep skin natural and avoid excessive retouching."},
{title:"Golden Hour",category:"Nature",prompt:"Give the photo a natural golden-hour cinematic look. Preserve the subject and composition exactly. Add warm sunlight, realistic soft shadows, subtle lens glow, natural depth of field and detailed textures. Keep colors realistic and avoid an over-processed or AI-generated look."},
{title:"Black & White",category:"Creative",prompt:"Convert this photo into a premium black-and-white portrait while preserving the exact face, identity, pose, clothing and composition. Use rich tonal range, natural skin texture, controlled highlights and shadows, subtle film grain and professional studio-style contrast."}
];

const cats=["All",...new Set(prompts.map(p=>p.category))];
let selected="All";
const catBox=document.getElementById("categories"), grid=document.getElementById("grid"), search=document.getElementById("search"), empty=document.getElementById("empty");

function renderCats(){catBox.innerHTML=cats.map(c=>`<button class="cat ${c===selected?"active":""}" onclick="setCat('${c}')">${c}</button>`).join("")}
function render(){
 const q=search.value.toLowerCase().trim();
 const list=prompts.filter(p=>(selected==="All"||p.category===selected)&&(!q||(p.title+" "+p.category+" "+p.prompt).toLowerCase().includes(q)));
 grid.innerHTML=list.map((p,i)=>`<article class="card"><div class="meta">${p.category}</div><h2>${p.title}</h2><div class="prompt">${escapeHtml(p.prompt)}</div><button class="copy" onclick="copyPrompt(${prompts.indexOf(p)},this)">Copy Prompt</button></article>`).join("");
 empty.hidden=list.length>0;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function setCat(c){selected=c;renderCats();render()}
async function copyPrompt(i,btn){try{await navigator.clipboard.writeText(prompts[i].prompt);const old=btn.textContent;btn.textContent="Copied ✓";setTimeout(()=>btn.textContent=old,1200)}catch(e){alert("Copy failed. Please copy the text manually.")}}
search.addEventListener("input",render);renderCats();render();
