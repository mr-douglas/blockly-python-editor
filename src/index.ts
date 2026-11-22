import * as Blockly from 'blockly';
import * as En from 'blockly/msg/en';
import type {PythonGenerator} from 'blockly/python';
import CodeMirror from 'codemirror';
import '@fontsource/varela-round/latin-400.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/theme/cobalt.css';
import {features} from './features';
import {pythonGenerator} from './generator/educational-python-generator';
import {downloadText, loadLegacyXml, saveLegacyXml} from './persistence/files';
import {SkulptRunner} from './runtime/skulpt-runner';
import {toolbox} from './toolbox/index';
import './index.css';

Blockly.setLocale(En as unknown as Record<string, string>);
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
  requiredElement<HTMLTextAreaElement>('python-code'),
  {
    value: "print('Hello, World!')\n",
    mode: 'python',
    theme: 'cobalt',
    readOnly: true,
    lineNumbers: true,
  },
);

const runner = new SkulptRunner({
  container: requiredElement('run-overlay'),
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

requiredElement<HTMLButtonElement>('copy-python').addEventListener('click', async () => {
  await navigator.clipboard.writeText(generatedPython());
  const alert = requiredElement('copied-alert');
  alert.classList.remove('hidden');
  window.setTimeout(() => alert.classList.add('hidden'), 2000);
});
requiredElement<HTMLButtonElement>('save-python').addEventListener('click', () =>
  downloadText(generatedPython(), '.py', 'my_python_program'),
);
requiredElement<HTMLButtonElement>('save-blocks').addEventListener('click', () =>
  downloadText(saveLegacyXml(workspace), '.blockly', 'my_blockly_program'),
);
requiredElement<HTMLButtonElement>('run-program').addEventListener('click', () =>
  void runner.run(generatedPython()),
);
requiredElement<HTMLButtonElement>('close-runner').addEventListener('click', () =>
  runner.stop(),
);

const fileInput = requiredElement<HTMLInputElement>('block-file');
requiredElement<HTMLButtonElement>('load-blocks').addEventListener('click', () =>
  fileInput.click(),
);
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
