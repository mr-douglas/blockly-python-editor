import Sk from 'skulpt';

export interface RunSurface {
  container: HTMLElement;
  /** Optional dimmed backdrop shown behind the container while running. */
  excluder?: HTMLElement;
  console: HTMLTextAreaElement;
  canvas: HTMLElement;
}

const unsupportedMarkers = [
  'from pybricks',
  'import gpiozero',
  'import buildhat',
  "#You've added your own code",
];

export class SkulptRunner {
  private running = false;
  private readonly defaultExecLimit = Sk.execLimit;
  private readonly defaultTimeoutMessage = Sk.timeoutMsg;

  constructor(private readonly surface: RunSurface) {}

  async run(code: string): Promise<void> {
    if (this.running) {
      window.alert('The current Python program is still stopping.');
      return;
    }
    if (unsupportedMarkers.some((marker) => code.includes(marker))) {
      window.alert(
        "This program uses hardware or custom code, so it can't run in the browser. Copy or download the Python code instead.",
      );
      return;
    }
    const needsConsole = code.includes('#This program uses console I/O');
    const needsTurtle = code.includes('import turtle');
    if (!needsConsole && !needsTurtle) {
      window.alert("Your program won't produce any visible output.");
      return;
    }
    this.configureSurface(needsConsole, needsTurtle);
    this.restoreExecutionLimit();
    this.surface.console.value = '';
    this.setVisible(true);
    this.running = true;
    try {
      await Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody('<stdin>', false, code, true),
      );
    } catch (error) {
      this.write(String(error));
    } finally {
      this.restoreExecutionLimit();
      this.running = false;
    }
  }

  stop(): void {
    if (this.running) {
      Sk.execLimit = 1;
      Sk.timeoutMsg = () => {
        this.restoreExecutionLimit();
        return 'You stopped the Python program.';
      };
    }
    this.setVisible(false);
  }

  private setVisible(visible: boolean): void {
    for (const element of [this.surface.excluder, this.surface.container]) {
      element?.classList.toggle('hidden', !visible);
    }
  }

  private configureSurface(needsConsole: boolean, needsTurtle: boolean): void {
    const mode = needsConsole && needsTurtle
      ? 'both'
      : needsConsole
        ? 'console-only'
        : 'turtle-only';
    this.surface.console.className = mode;
    this.surface.canvas.className = mode;
    Sk.pre = this.surface.console.id;
    Sk.configure({
      output: (text: string) => this.write(text),
      read: (path: string) => {
        const files = Sk.builtinFiles?.files as Record<string, string> | undefined;
        if (!files?.[path]) throw new Error(`File not found: '${path}'`);
        return files[path];
      },
      __future__: Sk.python3,
    });
    (Sk.TurtleGraphics ??= {}).target = this.surface.canvas.id;
  }

  private write(text: string): void {
    this.surface.console.value += text;
  }

  private restoreExecutionLimit(): void {
    Sk.execLimit = this.defaultExecLimit;
    Sk.timeoutMsg = this.defaultTimeoutMessage;
  }
}
