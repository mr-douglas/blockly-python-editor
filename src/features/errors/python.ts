import type {Block} from 'blockly';
import type {PythonGenerator} from 'blockly/python';

export function registerPython(generator: PythonGenerator): void {
  generator.forBlock.controls_try_except_finally = (block: Block, python) => {
    const tryBranch = python.statementToCode(block, 'TRY') || python.PASS;
    const exceptBranch = python.statementToCode(block, 'EXCEPT') || python.PASS;
    const finallyBranch =
      python.statementToCode(block, 'FINALLY') || python.PASS;
    return `try:\n${tryBranch}except Exception:\n${exceptBranch}finally:\n${finallyBranch}`;
  };
}
