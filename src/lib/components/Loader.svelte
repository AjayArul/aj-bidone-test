<script lang="ts">
  export let fullScreen: boolean = false;
</script>

<span class={fullScreen ? 'full' : ''}>
  <span class="loader"></span>
</span>

<style lang="scss">
  .loader {
    width: 82px;
    height: 18px;
    position: relative;
    z-index: 100;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translate(-50%, 10%);
      top: 0;
      background: #ff3d00;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      animation: jump 0.5s ease-in infinite alternate;
    }

    &::after {
      background: #0000;
      color: #fff;
      top: 100%;
      box-shadow:
        32px -20px,
        -32px -20px;
      animation: split 0.5s ease-out infinite alternate;
    }

    @keyframes split {
      0% {
        box-shadow:
          8px -20px,
          -8px -20px;
      }
      100% {
        box-shadow:
          32px -20px,
          -32px -20px;
      }
    }
    @keyframes jump {
      0% {
        transform: translate(-50%, -150%);
      }
      100% {
        transform: translate(-50%, 10%);
      }
    }
  }
  .full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
  }
</style>
