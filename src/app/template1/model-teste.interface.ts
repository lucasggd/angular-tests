import { TemplateRef } from '@angular/core';

export default interface ModelTeste {
  nome: string;
  test: { template?: TemplateRef<any> };
}
