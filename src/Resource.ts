type ResourceState<T, E> =
  | {
      status: "idle";
      value: null;
      promise: null;
      error: null;
    }
  | {
      status: "loading";
      value: null;
      promise: Promise<void>;
      error: null;
    }
  | {
      status: "success";
      value: T;
      promise: unknown;
      error: null;
    }
  | {
      status: "failure";
      value: null;
      promise: unknown;
      error: E;
    };

export class Resource<
  T,
  E,
  Args extends any[],
  F extends (...args: Args) => Promise<T>
> {
  #lastArgs: Args | null = null;

  #argsChanged(...args: Args): boolean {
    if (!this.#lastArgs) return false;
    if (this.#lastArgs.length !== args.length) return true;
    for (let i = 0, l = args.length; i < l; ++i) {
      if (this.#lastArgs[i] !== args[i]) return true;
    }
    return false;
  }

  #state: ResourceState<T, E>;

  #fetcher: F;

  constructor(fetcher: F) {
    this.#state = {
      status: "idle",
      value: null,
      promise: null,
      error: null,
    };
    this.#fetcher = fetcher;
  }

  #run(...args: Args): Promise<void> {
    this.#lastArgs = args.slice() as Args;
    this.#state = {
      status: "loading",
      promise: this.#fetcher(...args).then(
        (x) => {
          this.#state = {
            status: "success",
            promise: this.#state.promise,
            value: x,
            error: null,
          };
        },
        (x) => {
          this.#state = {
            status: "failure",
            promise: this.#state.promise,
            value: null,
            error: x,
          };
          throw x;
        }
      ),
      error: null,
      value: null,
    };
    return this.#state.promise;
  }

  prefetch(...args: Args): void {
    this.#run(...args);
  }

  read(...args: Args): T {
    if (this.#argsChanged(...args)) {
      throw this.#run(...args);
    }
    switch (this.#state.status) {
      case "idle": {
        throw this.#run(...args);
      }
      case "loading": {
        throw this.#state.promise;
      }
      case "failure": {
        throw this.#state.error;
      }
      case "success": {
        return this.#state.value;
      }
    }
  }
}
