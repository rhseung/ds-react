type ExclusiveStore<TStore, TControlled extends object> =
  | ({ store: TStore } & { [K in keyof TControlled]?: never })
  | ({ store?: never } & TControlled);

export type StoreOrControlled<TStore, TControlled extends object, TBase = object> = TBase &
  ExclusiveStore<TStore, TControlled>;
