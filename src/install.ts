import { dev } from '$app/environment';
import { Table } from 'console-table-printer';

type WorkerState = {
	serviceWorker: {
		worker: ServiceWorker | null;
		installing: boolean;
		waiting: boolean;
		active: boolean;
	};
};

// Preinitialized state
let SW: WorkerState = {
	serviceWorker: { worker: null, waiting: false, installing: false, active: false }
};

function registerSW() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/service-worker.js', {
				type: dev ? 'module' : 'classic', // esbuild uses no-bundle dev server, hence module is reqd. in dev mode
				scope: '/'
			})
			.then((registration) => {
				const { installing, waiting, active } = registration;
				SW = {
					serviceWorker: {
						worker: installing || waiting || active,
						installing: !!installing,
						waiting: !!waiting,
						active: !!active
					}
				};
			});
	}
}

function unregisterSW() {
	navigator.serviceWorker.getRegistrations().then((regs) => {
		for (let reg of regs) {
			reg.unregister().then((isUnreg) => console.log(isUnreg));
		}
	});
}

function printDebugTools() {
	const debugTools = new Table({ title: 'JAVASCRIPT CONSOLE DEBUGGING TOOLS' });
	debugTools.addRow({
		Description: 'Interact with the service worker',
		Object: 'document.SW'
	});
	debugTools.addRow(
		{
			Description: 'Install service worker',
			Method: 'document.registerSW()'
		},
		{ color: 'green' }
	);
	debugTools.addRow(
		{
			Description: 'Unregister all service workers',
			Method: 'document.unregisterSW()'
		},
		{ color: 'red' }
	);
	debugTools.printTable();
}

document.addEventListener('DOMContentLoaded', () => {
	printDebugTools();
	registerSW();
	if (navigator.serviceWorker.controller) {
		console.debug('[sw] service worker found.');
	}
	navigator.serviceWorker.addEventListener('controllerchange', () => {
		console.debug('[sw] service worker controller has changed.');
	});
});

/*
 *  DEBUG TOOLS
 */

// @ts-expect-error
document.unregisterSW = unregisterSW;

// @ts-expect-error
document.registerSW = registerSW;

// @ts-expect-error
document.SW = SW;
