import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

/*
 * idea from:
 * - https://gnn.gamer.com.tw/detail.php?sn=263134
 * - https://www.nintendo.tw/software/pamphlet/2024/winter/#page/n21/mode/2up
 */

const defaults = {
  pages: [] // should set at least 4 pages
};

const booleanAttrs = []; // booleanAttrs default should be false
const objectAttrs = ['pages'];
const custumEvents = {
  flip: 'msc-ez-catalog-flip'
};
const legalKey = [
  'ArrowLeft',
  'ArrowRight',
  'f',
  'F'
];
const blankImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host{position:relative;inline-size:100%;display:block;}

.main {
  --transition-duration: var(--msc-ez-cataloag-duration, 750ms);
  --border-radius: var(--msc-ez-cataloag-border-radius, 8px);

  /* loading */
  --loading-color: rgba(255 255 255);
  --loading-bgc: rgba(0 0 0/0.25);
  --loading-opacity-normal: 0;
  --loading-opacity-active: 1;
  --loading-opacity: var(--loading-opacity-normal);
  --loading-inset-inline-end: 4px;
  --loading-inset-block-end: 4px;

  position: relative;
  inline-size: 100%;
  min-block-size: 44px;
  outline: 0 none;
  user-select: none;

  &[data-process] {
    --loading-opacity: var(--loading-opacity-active);
  }

  .pages {
    inline-size: 100%;
    transform-style: preserve-3d;
    display: flex;

    &.pages--transition {
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: 0;
      
      /*
       * fix safari z-index fail when rotateY.
       * https://blog.csdn.net/weixin_44022064/article/details/103823377
       */
      inline-size: 100%;
      block-size: 100%;
      overflow: hidden;

      .pages__unit--start .pages__unit__img {
        position: absolute;
        inset: auto 0 auto auto;
      }

      .pages__unit--end .pages__unit__img {
        position: absolute;
        inset: auto auto auto 0;
      }
    }

    .pages__unit {
      position: relative;
      inline-size: 50%;
      transform-style: preserve-3d;
      will-change: transform;

      .pages__unit__img {
        inline-size: 100%;

        inline-size: auto;
        block-size: auto;
        max-inline-size: min(100%, 50dvi);
        max-block-size: 100dvb;

        display: block;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        overflow: hidden;
      }

      .pages__unit__img--back {
        transform: rotateY(180deg);
      }
    }

    .pages__unit--start {
      transform-origin: 100% 50%;

      .pages__unit__img {
        margin-inline: auto 0;

        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }

      .pages__unit__img--back {
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
      }
    }

    .pages__unit--end {
      transform-origin: 0% 50%;

      .pages__unit__img {
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
      }

      .pages__unit__img--back {
        border-radius: var(--border-radius) 0 0 var(--border-radius);;
      }
    }
  }

  .transitions {
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 0;
    inline-size: 100%;
    block-size: 100%;

    pointer-events: none;
    visibility: hidden;
  }

  &[data-transition]:not([data-transition=""]) {
    > .pages {
      visibility: hidden;
      pointer-events: none;
    }

    .transitions {
      visibility: visible;
      pointer-events: auto;
    }
  }

  &[data-transition="next"] {
    .pages--transition .pages__unit--end {
      will-change: transform;
      transform: rotateY(0deg);
      animation: msc-ez-catalog-next var(--transition-duration) ease forwards;
      z-index: 1;
    }
  }

  &[data-transition="prev"] {
    .pages--transition .pages__unit--start {
      will-change: transform;
      transform: rotateY(0deg);
      animation: msc-ez-catalog-prev var(--transition-duration) ease forwards;
      z-index: 1;
    }
  }

  /* loading: https://loading.io/css/ */
  .loading-sign {
    position: absolute;
    inset-inline-end: var(--loading-inset-inline-end);
    inset-block-end: var(--loading-inset-block-end);
    inline-size: 80px;
    block-size: 80px;
    border-radius: 80px;
    background-color: var(--loading-bgc);
    transform: scale(0.5);
    transform-origin: 100% 100%;
    pointer-events: none;
    z-index: 1;
    transition: opacity 200ms ease;
    will-change: opacity;
    opacity: var(--loading-opacity);
  }

  .lds-ripple {
    display: inline-block;
    position: relative;
    inline-size: 80px;
    block-size: 80px;
  }

  .lds-ripple div {
    position: absolute;
    border: 4px solid var(--loading-color);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
}

@keyframes msc-ez-catalog-next {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-180deg); }
}

@keyframes msc-ez-catalog-prev {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>

<div class="main" ontouchstart="" tabindex="0">
  <div class="pages pages-current">
    <div class="pages__unit pages__unit--start">
      <a href="#prev" data-action="prev">
        <img class="pages__unit__img" src="${blankImage}" loading="eager" />
      </a>
    </div>
    <div class="pages__unit pages__unit--end">
      <a href="#next" data-action="next">
        <img class="pages__unit__img" src="${blankImage}" loading="eager" />
      </a>
    </div>
  </div>

  <div class="transitions">
    <div class="pages pages-next">
      <div class="pages__unit pages__unit--start">
        <img class="pages__unit__img" src="${blankImage}" loading="eager" />
      </div>
      <div class="pages__unit pages__unit--end">
        <img class="pages__unit__img" src="${blankImage}" loading="eager" />
      </div>
    </div>

    <div class="pages pages--transition">
      <div class="pages__unit pages__unit--start">
        <img class="pages__unit__img" src="${blankImage}" />
        <img class="pages__unit__img pages__unit__img--back" src="${blankImage}" loading="eager" />
      </div>

      <div class="pages__unit pages__unit--end">
        <img class="pages__unit__img" src="${blankImage}" />
        <img class="pages__unit__img pages__unit__img--back" src="${blankImage}" loading="eager" />
      </div>
    </div>
  </div>

  <div class="loading-sign">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</div>
`;

// Houdini Props and Vals, https://web.dev/at-property/
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-ez-cataloag-duration',
      syntax: '<time>',
      inherits: true,
      initialValue: '750ms'
    });


    CSS.registerProperty({
      name: '--msc-ez-cataloag-border-radius',
      syntax: '<length>',
      inherits: true,
      initialValue: '8px'
    });
  } catch(err) {
    console.warn(`msc-ez-catalog: ${err.message}`);
  }
}

const loadImage = (url) => {
  return new Promise(
    (resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve(img);
      };

      img.onerror = (e) => {
        reject(e);
      };

      img.src = url;
    }
  );
};

export class MscEzCatalog extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      current: 0,
      pages: [],
      loaded: []
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      transitions: this.shadowRoot.querySelector('.transitions'),
      currentPages: this.shadowRoot.querySelector('.pages-current'),
      nextPages: this.shadowRoot.querySelector('.pages-next'),
      transitionPages: this.shadowRoot.querySelector('.pages--transition')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscEzCatalog(config)
    };

    // evts
    this._onClick = this._onClick.bind(this);
    this._onAnimationend = this._onAnimationend.bind(this);
    this._onKeydown = this._onKeydown.bind(this);
    this._onDblclick = this._onDblclick.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    this.#nodes.main.addEventListener('animationend', this._onAnimationend, { signal });
    this.#nodes.main.addEventListener('keydown', this._onKeydown, { signal, capture: true });
    this.#nodes.main.addEventListener('dblclick', this._onDblclick, { signal });
    this.#nodes.currentPages.addEventListener('click', this._onClick, { signal });
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'pages':
          try {
            const pages = JSON.parse(newValue);

            this.#config[attrName] = Array.isArray(pages) ? pages : defaults.pages;
          } catch(err) {
            console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
          }
          break;
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscEzCatalog.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'pages': {
        if (this.pages.length < 4) {
          console.warn(`${_wcl.classToTagName(this.constructor.name)}: should set at least 4 pages.`);
          return;
        }

        let pages = this.pages.slice(1, -1);
        if (pages.length % 2 !== 0) {
          pages.push(blankImage);
        }

        pages = [blankImage, this.pages.at(0)].concat(pages, [this.pages.at(-1), blankImage]);

        this.#data.loaded = [];
        this.#data.pages = pages;

        if (this.currentflip < 1) {
          this.#data.current = 0;
        } else if (this.currentflip > this.flipcount) {
          this.#data.current = this.flipcount - 1;
        }
        // this.#data.current = 0;

        this.#render();
        break;
      }
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscEzCatalog.observedAttributes
  }

  static get supportedKeyboardKeys() {
    return legalKey;
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscEzCatalog.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set pages(value) {
    if (value) {
      const newValue = [
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      ];
      this.setAttribute('pages', JSON.stringify(newValue));
    } else {
      this.removeAttribute('pages');
    }
  }

  get pages() {
    return [...this.#config.pages];
  }

  get flipcount() {
    return this.#data.pages.length / 2;
  }

  get currentflip() {
    return this.#data.current + 1;
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  #toggleFullscreen() {
    try {
      const { main } = this.#nodes;

      if (!document.fullscreenElement) {
        main.requestFullscreen();
        main.focus();
      } else {
        document.exitFullscreen();
      }
    } catch(err) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
    }
  }

  async #loader(paths) {
    const { loaded } = this.#data;
    const { main } = this.#nodes;

    const urls = paths
      .filter((I) => I !== undefined)
      .reduce(
        (acc, url) => {
          return !loaded.includes(url)
            ? acc.concat(url)
            : acc;
        }
      , []);

    if (urls.length) {
      main.dataset.process = 'on';

      await Promise.all(
        urls.map(
          (path) => {
            return loadImage(path).catch((E) => E);
          }
        )
      );

      this.#data.loaded = loaded.concat(urls);

      delete(main.dataset.process);
    }
  }

  async #render() {
    const { main, transitions, currentPages } = this.#nodes;
    const { current, pages } = this.#data;
    const from = current * 2;

    await this.#loader([
      pages[from],
      pages[from + 1]
    ]);

    // current
    const images = Array.from(currentPages.querySelectorAll('img'));
    images[0].src = pages[from];
    images[1].src = pages[from + 1];

    // clear transition
    main.dataset.transition = '';

    // clear all transition images
    Array.from(transitions.querySelectorAll('img')).forEach((img) => img.src = blankImage);

    this.#fireEvent(custumEvents.flip, {
      currentflip: this.currentflip,
      flipcount: this.flipcount,
      pages:[
        pages[from],
        pages[from + 1]
      ]
    });
  }

  async #flip(action) {
    const { current, pages } = this.#data;
    const { main, nextPages, transitionPages } = this.#nodes;

    if (!!main.dataset.transition || main.dataset.process === 'on') {
      return;
    }

    const index = current + (action === 'next' ? 1 : -1);
    if (index < 0 || index > (this.flipcount - 1)) {
      return;
    }

    await this.#loader([
      pages[index * 2],
      pages[index * 2 + 1],
      pages[current * 2],
      pages[current * 2 - 1],
      pages[current * 2 + 1],
      pages[current * 2 + 2]
    ]);

    // nextPages
    const nextImages = Array.from(nextPages.querySelectorAll('img'));
    nextImages[0].src = pages[current * 2] === blankImage ? blankImage : pages[index * 2];
    nextImages[1].src = pages[current * 2 + 1] === blankImage ? blankImage : pages[index * 2 + 1];

    // transitionPages
    const transitionStartImages = Array.from(transitionPages.querySelectorAll('.pages__unit--start img'));
    transitionStartImages[0].src = pages[current * 2] || blankImage;
    transitionStartImages[1].src = pages[current * 2 - 1] || blankImage;

    const transitionEndImages = Array.from(transitionPages.querySelectorAll('.pages__unit--end img'));
    transitionEndImages[0].src = pages[current * 2 + 1] || blankImage;
    transitionEndImages[1].src = pages[current * 2 + 2] || blankImage;

    // start transition
    main.dataset.transition = action;
    this.#data.current = index;
  }

  _onClick(evt) {
    evt.preventDefault();

    const trigger = evt.target.closest('a');
    
    if (!trigger) {
      return;
    }

    const action = trigger.dataset.action;
    this.#flip(action);
  }

  _onKeydown(evt) {
    const { key } = evt;

    if (!MscEzCatalog.supportedKeyboardKeys.includes(key)) {
      return;
    }

    evt.preventDefault();

    switch (key) {
      case 'ArrowLeft':
        this.prev();
        break;

      case 'ArrowRight':
        this.next();
        break;

      case 'f':
      case 'F': {
        this.#toggleFullscreen();
        break;
      }
    }
  }

  _onAnimationend() {
    this.#render();
    this.#nodes.main.focus();
  }

  _onDblclick(evt) {
    evt.preventDefault();

    this.#toggleFullscreen();
  }

  seekTo(index = 1) {
    // start from 1
    if (index < 1) {
      index = 1;
    } else if (index > this.flipcount) {
      index = this.flipcount;
    }

    this.#data.current = index - 1;
    this.#render();
  }

  prev() {
    this.#flip('prev');
  }

  next() {
    this.#flip('next');
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscEzCatalog');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscEzCatalog'), MscEzCatalog);
}