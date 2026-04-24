type IDSErrorContextMap = {
  'context/missing': { component: string; parent: string };
  'children/required': { component: string; expected: string };
  'slot/invalid-child': { received: string };
  'lib/unsupported': { key: string; value: string };
  'icon/empty-variant-map': { displayName: string };
};

export type IDSErrorCode = keyof IDSErrorContextMap;
export type IDSErrorContext<C extends IDSErrorCode> = IDSErrorContextMap[C];

const messages: { [C in IDSErrorCode]: (ctx: IDSErrorContextMap[C]) => string } = {
  'context/missing': (ctx) => `${ctx.component} must be used inside ${ctx.parent}.`,
  'children/required': (ctx) => `${ctx.component} children must include ${ctx.expected}.`,
  'slot/invalid-child': (ctx) =>
    `Slot's first child must be a valid React element, but got: ${ctx.received}.`,
  'lib/unsupported': (ctx) => `Unsupported ${ctx.key}: "${ctx.value}".`,
  'icon/empty-variant-map': (ctx) =>
    `${ctx.displayName} must have at least one variant registered.`,
};

function format<C extends IDSErrorCode>(code: C, ctx: IDSErrorContextMap[C]): string {
  return `[IDS] ${code}\n  ${messages[code](ctx)}`;
}

export class IDSError extends Error {
  readonly code: IDSErrorCode;

  private constructor(code: IDSErrorCode, message: string) {
    super(message);
    this.name = 'IDSError';
    this.code = code;
  }

  static throw<C extends IDSErrorCode>(code: C, ctx: IDSErrorContextMap[C]): never {
    throw new IDSError(code, format(code, ctx));
  }

  static warn<C extends IDSErrorCode>(code: C, ctx: IDSErrorContextMap[C]): void {
    console.warn(new IDSError(code, format(code, ctx)));
  }
}
