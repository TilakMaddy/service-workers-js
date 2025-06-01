/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="ES2015" />
/// <reference lib="WebWorker" />

import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;
declare const clients: Clients;

const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/*
 * Post installation hook
 */
self.addEventListener('install', (ev) => {
	// directly calling `waitFor(100)` reserves the right to schedule the promise even after activation
	ev.waitUntil(waitFor(1000));

	/*
	 * Normally, when there is a new service worker, the user has to click on `skipWaiting` after
	 * navigating to dev tools > application > service workers.
	 *
	 * Or wait until all the tabs opened on that origin are closed to in order to activate
	 *
	 * With skipWaiting(), activation already happens. Meaning, new open tabs will be able to access the newly installed service
	 * worker however the existing open tabs won't be able to switch their service worker to the new one. To do that, it is required
	 * in the Service worker activate hook, for clients (tabs) to call `clients.claim()`.
	 *
	 */
	self.skipWaiting(); // directly activate
});

self.addEventListener('activate', (ev) => {
	clients.claim();
});

// From what I gather, in general it's best to stay away from skipWaiting and claim because there can be breaking changes
// which will become difficult to handle.
