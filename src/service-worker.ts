/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="ES2015" />
/// <reference lib="WebWorker" />

import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;
