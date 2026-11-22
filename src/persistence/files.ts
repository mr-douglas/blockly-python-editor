import * as Blockly from 'blockly';

export function downloadText(
  contents: string,
  extension: '.py' | '.blockly',
  suggestedName: string,
): void {
  const name = window.prompt(
    `Enter a file name for your ${extension === '.py' ? 'Python' : 'Blockly'} file`,
    suggestedName,
  );
  if (!name) return;
  const link = document.createElement('a');
  link.download = `${name}${extension}`;
  link.href = URL.createObjectURL(new Blob([contents], {type: 'text/plain'}));
  link.click();
  URL.revokeObjectURL(link.href);
}

/** Loads the XML format used by the original editor. */
export async function loadLegacyXml(
  workspace: Blockly.WorkspaceSvg,
  file: File,
): Promise<void> {
  const xml = Blockly.utils.xml.textToDom(await file.text());
  Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
}

export function saveLegacyXml(workspace: Blockly.WorkspaceSvg): string {
  return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));
}
