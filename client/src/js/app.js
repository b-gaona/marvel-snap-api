document.addEventListener("DOMContentLoaded", async ()=>{
  showCards(await getAllCards());
});

async function getAllCards() {
  const res = await fetch(`http://localhost:3000/v1/cards`);
  return await res.json();
}

function showCards(cards) {
  const grid = document.querySelector("#marvel-grid");

  cards.forEach(card => {
    const div = document.createElement("div");
    div.innerHTML = 
    `
      <h3 class="text-center">${card.cname}</h3>
      <img src="${card.art}" alt="${card.cname}" width="150px">
      <p class="text-center">Ability: <span>${card.ability}</span></p>
    `;
    console.log(card);
    grid.appendChild(div);
  });
}