<script setup>
import { ref, computed, watch } from "vue";
import { useUserStore } from "../../stores/user";
import { onMounted } from "vue";
import { getCards } from "@/api/cards.js";
import * as bootstrap from "bootstrap";
import router from "@/router/index.js";

// Components
import ModalComponent from "../../components/ModalComponent.vue";
import InputComponent from "../../components/InputComponent/InputComponent.vue";
import GameCards from "./components/GameCards.vue";
import ScoreComponent from "./components/ScoreComponent.vue";

const CARD_QUANTITY = 8;
const name = ref("");
const points = ref(0);
const misses = ref(0);
const cards = ref([]);
const modal = ref(null);

const title = computed(() => {
  return `FELICITACIONES ${name.value}!!!`;
});

const repeatAndRandomizeCards = async (entries) => {
  const cardsWithImageUrl = await entries.map((entry) => ({
    url: entry.fields.image.url,
    name: entry.meta.name,
  }));

  // Using destructuring to repeat each card
  // Sorting cards randomly
  return [...cardsWithImageUrl, ...cardsWithImageUrl].sort(() => 0.5 - Math.random());
};

const addPositionInGridToCard = async (cardsWithImageUrlAndRepetead) => {
  const rows = [...Array(4).keys()];
  const cols = [...Array(4).keys()];

  let index = 0;

  // Using two arrays with 1 to 4 numbers to generate
  // an 4x4 matrix and assign a postion to each card
  // to later render the card in css grid wrapper
  rows.forEach((row) => {
    cols.forEach((col) => {
      const card = cardsWithImageUrlAndRepetead[index];
      cards.value.push({ ...card, row: row + 1, col: col + 1, revelead: false, matched: false });
      index++;
    });
  });
};

const retry = () => {
  modal.value.hide();

  window.location.reload();
};

const changeName = () => {
  modal.value.hide();

  const store = useUserStore();

  store.setUser("");
  router.push({ name: "home" });
};

const startGame = async () => {
  const { entries } = await getCards(CARD_QUANTITY);

  const cardsWithImageUrlAndRepetead = await repeatAndRandomizeCards(entries);

  await addPositionInGridToCard(cardsWithImageUrlAndRepetead);
};

const updateData = ({ newCards, newPoints, newMisses }) => {
  cards.value = newCards;
  points.value = newPoints;
  misses.value = newMisses;
};

watch(
  cards,
  () => {
    const hasWon = cards.value.every((card) => card.matched);
    if (hasWon) modal.value.show();
  },
  { deep: true }
);

onMounted(async () => {
  const store = useUserStore();

  name.value = store.getUser();
  modal.value = new bootstrap.Modal(document.getElementById("modal"));

  await startGame();
});
</script>

<template>
  <div class="container block">
    <div class="row">
      <div class="col-12">
        <ScoreComponent :points="points" :misses="misses" />
      </div>
    </div>
    <div class="row h-100">
      <div class="offset-md-2 col-md-8 h-100">
        <div class="block__content h-100">
          <ModalComponent>
            <template v-slot:modal-content>
              <p class="my-5 text-center form-label header-title">{{ title }}</p>
              <div>
                <InputComponent
                  :id="'points'"
                  :label="'ACIERTOS'"
                  :value="points"
                  :disabled="true"
                />
                <InputComponent
                  class="mt-3"
                  :id="'misses'"
                  :label="'FALLADOS'"
                  :value="misses"
                  :disabled="true"
                />
              </div>
            </template>
            <template v-slot:modal-footer-content>
              <button
                class="mx-auto button button--primary"
                aria-label="Button to change the player's name"
                @click="changeName"
              >
                VOLVER
              </button>
              <button
                class="mx-auto button button--success"
                aria-label="Button to restart the game"
                @click="retry"
              >
                REPETIR
              </button>
            </template>
          </ModalComponent>
          <GameCards :cards="cards" :points="points" :misses="misses" @update="updateData" />
        </div>
      </div>
    </div>
  </div>
</template>
