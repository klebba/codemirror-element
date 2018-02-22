import CodeMirror from '../../codemirror/src/codemirror.js';
import Stylesheet from './codemirror-styles.js';

export default class CodeMirrorElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.initialize();
  }

  render() {
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  initialize() {
    const textarea = this.shadowRoot.querySelector('textarea');
    const editor = CodeMirror.fromTextArea(textarea, this.config);

    Object.defineProperty(this, 'api', {
      get() {
        return CodeMirror;
      },
    });

    Object.defineProperty(this, 'editor', {
      get() {
        return editor;
      },
    });

    Object.defineProperty(this, 'source', {
      get() {
        return editor.getDoc().getValue();
      },
      set(value) {
        editor.getDoc().setValue(value);
      },
    });

    const mode = this.mode;

    Object.defineProperty(this, 'mode', {
      get() {
        return editor.getOption('mode');
      },
      set(value) {
        editor.setOption('mode', value);
      },
    });

    if (mode) {
      this.mode = mode;
    }
  }

  connectedCallback() {
    this.editor.refresh();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (this.mode !== newValue) {
      this.mode = newValue;
    }
  }

  // @TODO https://codemirror.net/doc/manual.html#config
  get config() {
    return {
      lineNumbers: true,
      indentUnit: 4,
      mode: 'python',
      autoCloseBrackets: true,
      matchBrackets: true,
    };
  }

  static get observedAttributes() {
    return ['mode'];
  }

  get template() {
    const template = document.createElement('template');
    const styles = this.stylesheet;
    template.innerHTML = `
      <style>${styles}</style>
      <textarea></textarea>
    `;
    return template;
  }

  get stylesheet() {
    return Stylesheet;
  }
}

customElements.define('codemirror-element', CodeMirrorElement);
