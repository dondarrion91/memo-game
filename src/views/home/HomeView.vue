<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import router from "@/router/index.js";

// Components
import PanelComponent from "@/components/PanelComponent/PanelComponent.vue";
import InputComponent from "@/components/InputComponent/InputComponent.vue";

const name = ref("");
const cardHeader = ref("MEMO GAME");

const startGame = () => {
  const store = useUserStore();

  store.setUser(name);
  router.push({ name: "game" });
};

const changeName = (newName) => (name.value = newName);
</script>

<template>
  <div class="container d-flex justify-content-center full-height">
    <div class="row align-items-center">
      <PanelComponent :header="cardHeader">
        <template v-slot:card-content>
          <div class="d-flex flex-column align-items-center justify-content-center h-100">
            <div class="mb-5">
              <InputComponent
                :label="'BIENVENIDO!'"
                :placeholder="'INTRODUCE TU NOMBRE'"
                :value="name"
                :id="'name'"
                @change-value="changeName"
              />
            </div>
            <button
              id="start-button"
              :disabled="!name.length"
              @click="startGame"
              aria-label="Start Game Button"
              class="mx-auto button button--success"
            >
              JUGAR
            </button>
          </div>
        </template>
      </PanelComponent>
    </div>
  </div>
</template>
