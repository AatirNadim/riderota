/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserInvitePayload {
  /**
   * The type of user to invite.
   * @example "admin"
   */
  userType?: "admin" | "driver" | "employee";
  /**
   * @format email
   * @example "admin@example.com"
   */
  email: string;
}

export interface UserBase {
  /** @example "John Doe" */
  name: string;
  /** @example 30 */
  age?: number;
  /** @example "+11234567890" */
  phoneNo: string;
  /**
   * @format email
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * @format uri
   * @example "https://example.com/profile.jpg"
   */
  profileImgUrl?: string | null;
}

export type UserCreatePayload = UserBase & {
  /**
   * The user's hashed password.
   * @example "$2b$10$K2.09uI5GU.J4sF2uB5gIuJ0Z5jJ6X3Y2Z5jJ6X3Y2Z5jJ6X3Y2Z"
   */
  password_hash: string;
};

export interface LoginPayload {
  /** @format email */
  email: string;
  /** @format password */
  password: string;
}

export interface ApiResponse {
  message: string;
}

export interface TenantCreatePayload {
  /**
   * The name of the new organization.
   * @example "Innovate Inc."
   */
  organizationName: string;
}

export type SuperadminCreatePayload = UserCreatePayload & TenantCreatePayload;

export type AdminCreatePayload = UserCreatePayload;

export type EmployeeCreatePayload = UserCreatePayload & {
  /**
   * The employee's home address or pickup location.
   * @example "123 Main St, Anytown, USA"
   */
  location: string;
};

export type DriverCreatePayload = UserCreatePayload & {
  /** @example "Toyota" */
  carMake: string;
  /** @example "Camry" */
  carName: string;
  /** @example "Blue" */
  carColor: string;
  /** @example "RIDE-123" */
  carPlate: string;
  /** @example 4 */
  numberOfSeats: number;
  carDescription?: string | null;
};

export interface GenericSuccessResponse {
  /** @example "Authentication successful." */
  message?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title rideRota API
 * @version 1.0.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Creates a new superadmin user and their associated organization. On success, returns access and refresh tokens via HttpOnly Set-Cookie headers.
     *
     * @tags Authentication & Onboarding
     * @name AuthSignupSuperadminCreate
     * @summary Superadmin and Organization Signup
     * @request POST:/api/auth/signup/superadmin
     */
    authSignupSuperadminCreate: (
      data: SuperadminCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<GenericSuccessResponse, void>({
        path: `/api/auth/signup/superadmin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new admin user. On success, returns access and refresh tokens via HttpOnly Set-Cookie headers.
     *
     * @tags Authentication & Onboarding
     * @name AuthSignupAdminCreate
     * @summary Admin Signup
     * @request POST:/api/auth/signup/admin
     */
    authSignupAdminCreate: (
      data: AdminCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<GenericSuccessResponse, void>({
        path: `/api/auth/signup/admin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new driver user. On success, returns access and refresh tokens via HttpOnly Set-Cookie headers.
     *
     * @tags Authentication & Onboarding
     * @name AuthSignupDriverCreate
     * @summary Driver Signup
     * @request POST:/api/auth/signup/driver
     */
    authSignupDriverCreate: (
      data: DriverCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<GenericSuccessResponse, void>({
        path: `/api/auth/signup/driver`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new employee user. On success, returns access and refresh tokens via HttpOnly Set-Cookie headers.
     *
     * @tags Authentication & Onboarding
     * @name AuthSignupEmployeeCreate
     * @summary Employee Signup
     * @request POST:/api/auth/signup/employee
     */
    authSignupEmployeeCreate: (
      data: EmployeeCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<GenericSuccessResponse, void>({
        path: `/api/auth/signup/employee`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticates a user. On success, returns access and refresh tokens via HttpOnly Set-Cookie headers.
     *
     * @tags Authentication & Onboarding
     * @name AuthLoginCreate
     * @summary User Login
     * @request POST:/api/auth/login
     */
    authLoginCreate: (data: LoginPayload, params: RequestParams = {}) =>
      this.request<GenericSuccessResponse, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Management
     * @name InviteCreate
     * @summary Invite a new User
     * @request POST:/api/invite
     */
    inviteCreate: (data: UserInvitePayload, params: RequestParams = {}) =>
      this.request<GenericSuccessResponse, void>({
        path: `/api/invite`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
