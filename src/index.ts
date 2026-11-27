import * as Blockly from 'blockly';
import type {PythonGenerator} from 'blockly/python';
import CodeMirror from 'codemirror';
import '@fontsource/varela-round/latin-400.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/theme/cobalt.css';
import {features} from './features';
import {pythonGenerator} from './generator/educational-python-generator';
import {educationalEnglish} from './i18n/educational-en';
import {downloadText, loadLegacyXml, saveLegacyXml} from './persistence/files';
import {SkulptRunner} from './runtime/skulpt-runner';
import {useOriginalBlockColours} from './theme/original-block-colours';
import {toolbox} from './toolbox/index';
import './index.css';

// Must happen before any blocks are created or the workspace is injected.
useOriginalBlockColours();

Blockly.setLocale(educationalEnglish);
features.forEach((feature) => {
  feature.registerBlocks();
  feature.registerPython(pythonGenerator as unknown as PythonGenerator);
});

const blocklyDiv = requiredElement<HTMLElement>('blocklyDiv');
const educationalTheme = Blockly.Theme.defineTheme('educational', {
  name: 'educational',
  base: Blockly.Themes.Classic,
  fontStyle: {family: "'Varela Round', Arial, sans-serif"},
});
const workspace = Blockly.inject(blocklyDiv, {
  toolbox,
  renderer: 'thrasos',
  theme: educationalTheme,
  media: './media/',
  sounds: false,
  trashcan: true,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.025,
  },
  grid: {spacing: 20, length: 3, colour: '#222', snap: false},
});
features.forEach((feature) => feature.registerWorkspace?.(workspace));

const codeEditor = CodeMirror.fromTextArea(
  requiredElement<HTMLTextAreaElement>('python-div'),
  {
    value: "print('Hello, World!')\n",
    mode: 'python',
    theme: 'cobalt',
    readOnly: true,
    lineNumbers: true,
  },
);

const runner = new SkulptRunner({
  container: requiredElement('skulpt-container'),
  excluder: requiredElement('excluder'),
  console: requiredElement<HTMLTextAreaElement>('skulpt-console'),
  canvas: requiredElement('skulpt-canvas'),
});

function generatedPython(): string {
  return pythonGenerator.workspaceToCode(workspace);
}

function updatePython(): void {
  codeEditor.setValue(generatedPython());
}

workspace.addChangeListener((event) => {
  if (event.isUiEvent || workspace.isDragging()) return;
  updatePython();
});
updatePython();

/**
 * The round buttons are <a role="button"> elements (as in the original
 * editor), so make them work from the keyboard as well as the mouse.
 */
function onActivate(id: string, action: () => void): void {
  const button = requiredElement(id);
  button.addEventListener('click', action);
  button.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    action();
  });
}

let copiedAlertTimer: number | undefined;
onActivate('copy-python-button', () => {
  void navigator.clipboard.writeText(generatedPython()).then(() => {
    // Same fade in/out animation as the original editor.
    const alert = requiredElement('copied-alert');
    window.clearTimeout(copiedAlertTimer);
    alert.className = 'hidden';
    void alert.offsetWidth; // Restart the animation if it is already running.
    alert.className = 'alert';
    copiedAlertTimer = window.setTimeout(() => {
      alert.className = 'hidden';
    }, 2000);
  });
});
onActivate('save-python-button', () =>
  downloadText(generatedPython(), '.py', 'my_python_program'),
);
onActivate('save-blocks-button', () =>
  downloadText(saveLegacyXml(workspace), '.blockly', 'my_blockly_program'),
);
onActivate('run-blocks-button', () => void runner.run(generatedPython()));
onActivate('skulpt-close-button', () => runner.stop());

const fileInput = requiredElement<HTMLInputElement>('inputfile');
onActivate('load-blocks-button', () => fileInput.click());
fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  await loadLegacyXml(workspace, file);
  updatePython();
  fileInput.value = '';
});

const sourceFile = new URLSearchParams(window.location.search).get('file');
if (sourceFile) {
  void fetch(sourceFile)
    .then((response) => response.text())
    .then((xml) => {
      Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
      updatePython();
    });
}

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = '';
});

function requiredElement<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element #${id} was not found`);
  return element as T;
}
