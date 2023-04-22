<script setup>
import "./scss/main.scss";
const emit = defineEmits(["change-value"]);

defineProps({
  label: {
    type: String,
    default: "Title",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const changeValue = (event) => emit("change-value", event.target.value);
</script>

<template>
  <div class="cinput">
    <p class="mb-3 text-center form-label cinput__title" role="label">{{ label }}</p>
    <input
      class="form-control cinput__box"
      type="text"
      autocomplete="off"
      aria-label="input-component-label"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="changeValue"
    />
  </div>
</template>
