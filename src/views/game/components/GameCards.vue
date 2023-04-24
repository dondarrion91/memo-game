<script setup>
import { ref, watch } from "vue";

// Components
import LoaderComponent from "./LoaderComponent.vue";

const emit = defineEmits(["update"]);

const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
  points: {
    type: Number,
    default: 0,
  },
  misses: {
    type: Number,
    default: 0,
  },
});

const selected = ref([]);
const loading = ref(true);
const cards = ref(props.cards);
const points = ref(props.points);
const misses = ref(props.misses);
const waiting = ref(false);

const revealCardAndAddToSelection = (row, col) => {
  const cardIndex = cards.value.findIndex((c) => c.row === row && c.col === col);
  cards.value[cardIndex].revelead = true;

  selected.value.push(cards.value[cardIndex]);
};

const hideUnmatchedCards = (prev, curr, prevIndex, currIndex) => {
  waiting.value = true;
  if (selected.value.length === 2) {
    setTimeout(() => {
      cards.value[prevIndex].revelead = false;
      cards.value[currIndex].revelead = false;
      waiting.value = false;
    }, 800);
    if (prev && curr && prev.name !== curr.name) misses.value++;
  }
};

const matchCards = (prev, curr, prevIndex, currIndex) => {
  if (prev && curr && prev.name === curr.name) {
    points.value++;
    cards.value[prevIndex].matched = true;
    cards.value[currIndex].matched = true;
  }
};

const hideOrMatchCards = (prev, curr) => {
  const prevIndex = cards.value.findIndex((c) => c.row === prev.row && c.col === prev.col);
  const currIndex = cards.value.findIndex((c) => c.row === curr.row && c.col === curr.col);

  hideUnmatchedCards(prev, curr, prevIndex, currIndex);
  matchCards(prev, curr, prevIndex, currIndex);
};

const flipCard = (row, col, revelead, matched) => {
  if (revelead || matched || waiting.value) return;
  revealCardAndAddToSelection(row, col);

  const [prev, curr] = selected.value;

  if (!prev || !curr) {
    return;
  }

  hideOrMatchCards(prev, curr);

  selected.value = [];

  emit("update", { newCards: cards.value, newPoints: points.value, newMisses: misses.value });
};

const showOrRevealCard = (revelead, matched, url) => {
  return revelead || matched ? url : "/card.png";
};

watch(props.cards, () => {
  if (cards.value.length > 0) loading.value = false;
  if (cards.value.length === 0) loading.value = true;
});
</script>

<template>
  <LoaderComponent v-if="loading" />
  <div v-else class="wrapper p-3">
    <div
      v-for="{ revelead, matched, url, name, row, col } in cards"
      :key="`${row}-${col}`"
      :class="`m-2 grid-${row}-${col}`"
    >
      <img
        class="w-100 h-100 pointer"
        @click="flipCard(row, col, revelead, matched)"
        :src="showOrRevealCard(revelead, matched, url)"
        :alt="name"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 1000px;
  @media (max-width: 768px) {
    height: 500px;
  }
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 7px;
  grid-auto-rows: minmax(100px, auto);
}

@for $i from 1 through 4 {
  @for $j from 1 through 4 {
    .grid-#{$i}-#{$j} {
      grid-column: $i;
      grid-row: $j;

      img {
        border-radius: 5px;
      }
    }
  }
}
</style>
