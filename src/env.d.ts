interface ProductiveEnv extends NodeJS.ProcessEnv {
  readonly PRODUCTIVE_API_TOKEN: string;
  readonly PRODUCTIVE_ORGANISATION_ID: string;
  readonly PRODUCTIVE_USER_ID: string;
  readonly PRODUCTIVE_SERVICE_ID: string;
  readonly PRODUCTIVE_ENTRY_DATE: string | undefined;
  readonly PRODUCTIVE_ENTRY_TIME: string | undefined;
  readonly PRODUCTIVE_ENTRY_NOTE: string | undefined;
}

export interface TypedProcess extends NodeJS.Process {
  readonly env: ProductiveEnv;
}
