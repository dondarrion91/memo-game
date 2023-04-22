<script setup>
defineProps({
  title: {
    type: String,
    default: "Title",
  },
  isStatic: {
    type: String,
    default: "static",
  }
});
</script>

<template>
  <div
    class="modal fade block"
    id="modal"
    tabindex="-1"
    :data-bs-backdrop="isStatic"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog block__content">
      <div class="modal-content">
        <div class="modal-body">
          <slot name="modal-content"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer-content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
