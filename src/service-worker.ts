/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="ES2015" />
/// <reference lib="WebWorker" />

import { build, files, version } from '$service-worker';
const CACHE = `cache-${version}`;

declare const self: ServiceWorkerGlobalScope;

// DO NOT include service-worker.js
// CAN include manifest file (when building PWA)
const ASSETS = [...build, ...files];

// Install new cache
self.addEventListener('install', (ev) => {
	ev.waitUntil(
		new Promise<void>(async (resolve) => {
			const cache = await caches.open(CACHE);
			await cache.addAll(ASSETS);
			resolve();
		})
	);
});

// Deletes old cache after activating new service worker with new cache installed
self.addEventListener('activate', (ev) => {
	ev.waitUntil(
		new Promise<void>(async (resolve) => {
			for (const key of await caches.keys()) {
				if (key !== CACHE) await caches.delete(key);
			}
			resolve();
		})
	);
});
