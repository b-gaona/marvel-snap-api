async function getAllCards(){const e=await fetch(window.location.origin+"/v1/cards");return await e.json()}async function getAllDecks(){const e=await fetch(window.location.origin+"/v1/decks");return await e.json()}function showCards(e){const n=document.querySelector(".swiper-cards .swiper-wrapper");e.forEach(e=>{const a=document.createElement("div");a.classList.add("swiper-slide"),a.innerHTML=`\n    <img src="${e.art}" alt="${e.cname}" width="150px">\n    <div>\n      <h3 class="text-center">${e.cname}</h3>\n      <p class="text-center">Ability: <span>${e.ability?e.ability:"None."}</span></p>\n    </div>\n    `,n.appendChild(a)})}function showDecks(e){const n=document.querySelector("#marvel-decks");e.forEach(e=>{const a=document.createElement("div");a.classList.add("col-gap-3","pb-3","grid-decks");const s=document.createElement("div");s.classList.add("swiper-decks","d-flex"),s.classList.remove("swiper-cards");const t=document.createElement("div");t.classList.add("swiper-wrapper");const{cids:c}=e;c.forEach(e=>{t.appendChild(createCard(e))}),s.appendChild(t),a.appendChild(s),a.appendChild(deckInfo(e)),a.appendChild(cardInfo(c[0])),n.appendChild(a)})}function createCard({art:e,cname:n,ability:a,cost:s,power:t}){const c=document.createElement("div");return c.classList.add("swiper-slide"),c.innerHTML=`<img src="${e}" alt="${n}" width="200px" name='${JSON.stringify({cname:n.replaceAll("'","&#39;"),ability:a.replaceAll("'","&#39;"),cost:s,power:t})}'>`,c}function deckInfo({name:e,avg_cost:n,avg_power:a}){const s=document.createElement("div");return s.classList.add("info"),s.innerHTML=`\n    <h4 class="text-center">Deck info</h4>\n    <p>Name: <span>${e}</span> </p>\n    <br>\n    <p>Average cost: <span>${n}</span> </p>\n    <br>\n    <p>Average power: <span>${a}</span> </p>\n  `,s}function cardInfo({cname:e,cost:n,power:a,ability:s}){const t=document.createElement("div");return t.classList.add("info"),t.innerHTML=`\n        <h4 class="text-center">Card info</h4>\n        <p>Name: <span>${e}</span> </p>\n        <br>\n        <p>Cost: <span>${n}</span> </p>\n        <br>\n        <p>Power: <span>${a}</span> </p>\n        <br>\n        <p>Ability: <span>${s}</span> </p>\n      `,t}document.addEventListener("DOMContentLoaded",async()=>{showCards(await getAllCards()),showDecks(await getAllDecks()),new Swiper(".swiper-cards",{slidesPerView:2,grid:{rows:2,fill:"column"},spaceBetween:15,pagination:{clickable:!0},breakpoints:{768:{slidesPerView:3}}});new Swiper(".swiper-decks",{effect:"cards",cardsEffect:{slideShadows:!1,perSlideOffset:10},on:{slideChange:e=>{const{imagesToLoad:n,snapIndex:a,wrapperEl:s}=e,t=document.querySelector("#"+s.id).parentElement.parentElement.lastChild,c=JSON.parse(n[a].name),{cname:i,cost:r,power:p,ability:d}=c;t.innerHTML=`\n          <h4 class="text-center">Card info</h4>\n          <p>Name: <span>${i}</span> </p>\n          <br>\n          <p>Cost: <span>${r}</span> </p>\n          <br>\n          <p>Power: <span>${p}</span> </p>\n          <br>\n          <p>Ability: <span>${d}</span> </p>\n        `}}})});
//# sourceMappingURL=app.js.map
