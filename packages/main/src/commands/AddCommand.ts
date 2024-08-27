import { inject, injectable } from 'inversify';
import { TYPES } from '../constants';
import { Printer } from '../printer/printer';
import { Command } from './Command';

@injectable()
export class AddCommand implements Command {
  constructor(@inject(TYPES.Printer) private printer: Printer) {}

  dispose(): void {
    //
  }

  get id() {
    return 'extension.add';
  }

  execute(...args: any[]) {
    this.printer.print('AddCommand');
  }
}
