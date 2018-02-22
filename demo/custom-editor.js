import CodeMirrorElement from '../codemirror-element.js';

// load modes
import ModeClike from '../mode/clike/clike.js';
import ModeCss from '../mode/css/css.js';
import ModeGfm from '../mode/gfm/gfm.js';
import ModeJavascript from '../mode/javascript/javascript.js';
import ModeJulia from '../mode/julia/julia.js';
import ModeMarkdown from '../mode/markdown/markdown.js';
import ModePython from '../mode/python/python.js';
import ModeR from '../mode/r/r.js';
import ModeRuby from '../mode/ruby/ruby.js';
import ModeShell from '../mode/shell/shell.js';
import ModeSql from '../mode/sql/sql.js';
import ModeYaml from '../mode/yaml/yaml.js';

// load addons
import AddonComment from '../addon/comment/comment.js';
import AddonDialog from '../addon/dialog/dialog.js';
import AddonEditCloseBrackets from '../addon/edit/closebrackets.js';
import AddonEditMatchBrackets from '../addon/edit/matchbrackets.js';
import AddonHintShowHint from '../addon/hint/show-hint.js';
import AddonHintAnywordHint from '../addon/hint/anyword-hint.js';
import AddonSearch from '../addon/search/search.js';
import AddonSearchCursor from '../addon/search/searchcursor.js';

export default class CustomEditorElement extends CodeMirrorElement {
  constructor() {
    super();
    const CodeMirror = this.api;
    // inject modes
    ModeClike(CodeMirror);
    ModeCss(CodeMirror);
    ModeGfm(CodeMirror);
    ModeJavascript(CodeMirror);
    ModeJulia(CodeMirror);
    ModeMarkdown(CodeMirror);
    ModePython(CodeMirror);
    ModeR(CodeMirror);
    ModeRuby(CodeMirror);
    ModeShell(CodeMirror);
    ModeSql(CodeMirror);
    ModeYaml(CodeMirror);

    // inject addons
    AddonComment(CodeMirror);
    AddonDialog(CodeMirror);
    AddonEditCloseBrackets(CodeMirror);
    AddonEditMatchBrackets(CodeMirror);
    AddonHintShowHint(CodeMirror);
    AddonHintAnywordHint(CodeMirror);
    AddonSearch(CodeMirror);
    AddonSearchCursor(CodeMirror);
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor.setOption('viewportMargin', Infinity);
    this.editor.refresh();
  }

  get stylesheet() {
    const codemirror = super.stylesheet;

    const dialog = `.CodeMirror-dialog {
      position: absolute;
      left: 0; right: 0;
      background: inherit;
      z-index: 15;
      padding: .1em .8em;
      overflow: hidden;
      color: inherit;
    }

    .CodeMirror-dialog-top {
      border-bottom: 1px solid #eee;
      top: 0;
    }

    .CodeMirror-dialog-bottom {
      border-top: 1px solid #eee;
      bottom: 0;
    }

    .CodeMirror-dialog input {
      border: none;
      outline: none;
      background: transparent;
      width: 20em;
      color: inherit;
      font-family: monospace;
    }

    .CodeMirror-dialog button {
      font-size: 70%;
    }`;

    const hints = `.CodeMirror-hints {
      position: absolute;
      z-index: 10;
      overflow: hidden;
      list-style: none;

      margin: 0;
      padding: 2px;

      -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
      -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
      box-shadow: 2px 3px 5px rgba(0,0,0,.2);
      border-radius: 3px;
      border: 1px solid silver;

      background: white;
      font-size: 90%;
      font-family: monospace;

      max-height: 20em;
      overflow-y: auto;
    }

    .CodeMirror-hint {
      margin: 0;
      padding: 0 4px;
      border-radius: 2px;
      white-space: pre;
      color: black;
      cursor: pointer;
    }

    li.CodeMirror-hint-active {
      background: #08f;
      color: white;
    }`;

    const searchmatch = `.CodeMirror-search-match {
      background: gold;
      border-top: 1px solid orange;
      border-bottom: 1px solid orange;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      opacity: .5;
    }`;

    const custom = `.CodeMirror { height: auto; }`;
    return [codemirror, dialog, hints, searchmatch, custom].join('\n');
  }
}

customElements.define('custom-editor', CustomEditorElement);
