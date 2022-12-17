document.addEventListener("DOMContentLoaded", async () => {
  showCards(await getAllCards());
  showDecks(await getAllDecks());

  new Swiper(".swiper-cards", {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: "column",
    },
    spaceBetween: 15,
    pagination: {
      clickable: true,
    },
  });

  const sw = new Swiper(".swiper-decks", {
    effect: "cards",
    cardsEffect: {
      slideShadows: false,
      perSlideOffset: 10,
    },
    on: {
      slideChange: (evt) => {
        const { imagesToLoad, snapIndex, wrapperEl } = evt;

        const wrapper = document.querySelector(`#${wrapperEl.id}`);
        const cardInfo = wrapper.parentElement.parentElement.lastChild;
        const card = JSON.parse(imagesToLoad[snapIndex].name);

        const { cname, cost, power, ability } = card;
        cardInfo.innerHTML = `
          <h4 class="text-center">Card info</h4>
          <p>Name: <span>${cname}</span> </p>
          <br>
          <p>Cost: <span>${cost}</span> </p>
          <br>
          <p>Power: <span>${power}</span> </p>
          <br>
          <p>Ability: <span>${ability}</span> </p>
        `;
      },
    },
  });
});

async function getAllCards() {
  const res = await fetch(`${window.location.origin}/v1/cards`);
  return await res.json();
}

async function getAllDecks() {
  const res = await fetch(`${window.location.origin}/v1/decks`);
  return await res.json();
}

function showCards(cards) {
  const grid = document.querySelector(".swiper-cards .swiper-wrapper");

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
    <img src="${card.art}" alt="${card.cname}" width="150px">
    <div>
      <h3 class="text-center">${card.cname}</h3>
      <p class="text-center">Ability: <span>${
        card.ability ? card.ability : "None."
      }</span></p>
    </div>
    `;
    grid.appendChild(div);
  });
}

function showDecks(decks) {
  const grid = document.querySelector("#marvel-decks");

  decks.forEach((deck) => {
    const div = document.createElement("div");
    div.classList.add("col-gap-3", "pb-3", "grid-decks");

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("swiper-decks", "d-flex");
    containerDiv.classList.remove("swiper-cards");
    
    const cardsDiv = document.createElement("div");
    cardsDiv.classList.add("swiper-wrapper");

    const { cids } = deck;

    cids.forEach((card) => {
      cardsDiv.appendChild(createCard(card));
    });

    containerDiv.appendChild(cardsDiv);

    div.appendChild(containerDiv);
    div.appendChild(deckInfo(deck));
    div.appendChild(cardInfo(cids[0]));

    grid.appendChild(div);
  });
}

function createCard({ art, cname, ability, cost, power }) {
  const cardImg = document.createElement("div");
  cardImg.classList.add("swiper-slide");
  cardImg.innerHTML = `<img src="${art}" alt="${cname}" width="200px" name='${JSON.stringify(
    { cname: cname.replaceAll("'", "&#39;"), ability: ability.replaceAll("'", "&#39;"), cost, power }
  )}'>`;
  return cardImg;
}

function deckInfo({ name, avg_cost, avg_power }) {
  const deck = document.createElement("div");
  deck.classList.add("info");

  deck.innerHTML = `
    <h4 class="text-center">Deck info</h4>
    <p>Name: <span>${name}</span> </p>
    <br>
    <p>Average cost: <span>${avg_cost}</span> </p>
    <br>
    <p>Average power: <span>${avg_power}</span> </p>
  `;
  return deck;
}

function cardInfo({ cname, cost, power, ability }) {
  const card = document.createElement("div");
  card.classList.add("info");

  card.innerHTML = `
        <h4 class="text-center">Card info</h4>
        <p>Name: <span>${cname}</span> </p>
        <br>
        <p>Cost: <span>${cost}</span> </p>
        <br>
        <p>Power: <span>${power}</span> </p>
        <br>
        <p>Ability: <span>${ability}</span> </p>
      `;

  return card;
}
