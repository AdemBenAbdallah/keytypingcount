/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as billing from "../billing.js";
import type * as http from "../http.js";
import type * as settings from "../settings.js";
import type * as viewer from "../viewer.js";

import type {
	ApiFromModules,
	FilterApi,
	FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
	auth: typeof auth;
	billing: typeof billing;
	http: typeof http;
	settings: typeof settings;
	viewer: typeof viewer;
}>;

export declare const api: FilterApi<
	typeof fullApi,
	FunctionReference<any, "public">
>;

export declare const internal: FilterApi<
	typeof fullApi,
	FunctionReference<any, "internal">
>;

export declare const components: {};
