(function() {
  const transitionSpeed = 0.5;
  const template = `
    <style>
      #scene {
        background-color: rgb(26, 26, 36);
        border-radius: clamp(5px, 0.5vw, 7px);
        box-shadow: rgb(26, 26, 36) 0 clamp(5px, 1vw, 10px);
        perspective: 400px;
        height: 100%;
        width: 100%;
      }

      .card {
        font-size: clamp(34px, 5.2vw, 75px);
        position: absolute;
        transition: transform ${transitionSpeed}s ease-in;
        transform-origin: bottom;
        transform-style: preserve-3d;
        height: 50%;
        width: 100%;
      }

      .card.flipped {
        transform: rotateX(-180deg);
        z-index: 1;
      }

      .card.flipped ~ .card.flipped {
        z-index: unset;
      }

      .card::before, .card::after {
        backface-visibility: hidden;
        display: flex;
        justify-content: center;
        line-height: 0;
        overflow: hidden;
        position: absolute;
        height: 100%;
        width: 100%;
      }

      .card::before {
        content: attr(data-front);
        align-items: end;
        background-color: rgb(44, 44, 68);
        background-image: radial-gradient(clamp(3px, 0.5vw, 6px) circle at 0 100%, rgb(26, 26, 36) 100%, transparent 100%),
                          radial-gradient(clamp(3px, 0.5vw, 6px) circle at 100% 100%, rgb(26, 26, 36) 100%, transparent 100%);
        border-radius: clamp(5px, 0.5vw, 7px) clamp(5px, 0.5vw, 7px) 0 0;
        color: rgb(212, 81, 115);
      }

      .card::after {
        content: attr(data-back);
        align-items: start;
        background-color: rgb(52, 54, 79);
        background-image: radial-gradient(clamp(3px, 0.5vw, 6px) circle at 0 0, rgb(26, 26, 36) 100%, transparent 100%),
                          radial-gradient(clamp(3px, 0.5vw, 6px) circle at 100% 0, rgb(26, 26, 36) 100%, transparent 100%);
        border-radius: 0 0 clamp(5px, 0.5vw, 7px) clamp(5px, 0.5vw, 7px);
        color: rgb(253, 92, 133);
        transform: rotateX(-180deg);
      }
    </style>

    <div id="scene">
      <div class="card" data-front="00" data-back="00"></div>
      <div class="card flipped" data-front="00" data-back="00"></div>
    </div>
  `;

  const formatNumber = (value) => value < 10 ? '0' + value : value;

  class VerticalFlipCard extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = template.trim();
    }

    init(value) {
      value = formatNumber(value);

      const top = this.shadowRoot.querySelector('.card');
      const bottom = this.shadowRoot.querySelector('.card.flipped');

      top.dataset.front = value;
      bottom.dataset.back = value;
    }

    flip(next) {
      next = formatNumber(next);

      const top = this.shadowRoot.querySelector('.card');
      top.dataset.back = next;
      top.classList.add('flipped');

      const scene = this.shadowRoot.querySelector('#scene');
      scene.insertAdjacentHTML('afterbegin', `<div class="card" data-front="${next}" data-back="00"></div>`);

      const last = scene.querySelector('.card.flipped:last-of-type');
      setTimeout(() => last.remove(), transitionSpeed * 1000 + 1);
    }
  }

  customElements.define('vertical-flip-card', VerticalFlipCard);
})();
