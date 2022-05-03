<template>
  <div :class="backgourndModal" class="modal_confirmacao">
    <div class="modal_confirmacao-container">
      <div class="modal_confirmacao-area">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgourndModal: {
      type: String,
      required: true,
      default: 'background_success',
    },
  },
};
</script>

<style></style>
