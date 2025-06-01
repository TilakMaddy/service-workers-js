/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="ES2015" />
/// <reference lib="WebWorker" />

import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

/*
 * Runs once when there is a new version of service worker
 * waiting to be skipped.
 *
 * Typically in this stage you can cache latest files
 */
self.addEventListener('install', () => {
	console.debug('[sw]: self install event');
	console.debug(`[sw]: Build - ${build}`);
	console.debug(`[sw]: Files - ${files}`);
	console.debug(`[sw]: Version - ${version}`);
});

/*
 * Runs once when service worker is activated
 *
 * Typically in this stage you can delete old cache files
 */
self.addEventListener('activate', () => {
	console.debug('[sw]: self activate event');
});

/*
 * Runs every time a fetch call is intercepted
 *
 * Typically in this stage you can decide whether to serve responses from cache or to make a fresh network request.
 */
self.addEventListener('fetch', () => {
	console.debug('[sw]: self fetch intercept');
});

// TBD
self.addEventListener('message', () => {
	console.debug('[sw]: self message received');
});
// note - No DOM access in service worker
