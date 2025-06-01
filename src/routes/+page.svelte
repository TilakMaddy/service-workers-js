<script>
	function startCaching() {
		// Open a cache in order to work with it.
		caches.open('my-cache').then((cache) => {
			// When you add to a cache, it make a request (fetches) it, then adds it to the cache storage.
			// It doesn't matter which form the request is added - URL, string, Request object. Browser will figure out
			// that they all point to the same resource and it is stored as one entry.
			cache.add(new URL('http://localhost:5173/flat-earth.png'));
			cache.add('/flat-earth.png');
			cache.add(new Request('/flat-earth.png'));
		});
	}

	function startCachingAlt() {
		// Open a cache in order to work with it.
		caches.open('my-cache').then((cache) => {
			// Fetch manually and then insert in cache before returning response
			fetch('/flat-earth.png')
				.then((response) => {
					if (!response.ok) {
						throw response.statusText;
					}
					// note - clone the response before inserting in cache
					cache.put('/flat-earth.png', response.clone()).then(() => {
						// Read from cache
						cache
							.match('/flat-earth.png')
							.then((response) => {
								// note - returns a null response when not found in cache.
								if (!response) {
									throw new Error('resource not found in cache');
								}
								return response;
							})
							.then((response) => {
								console.log('cache response:');
								console.log(response);
							});
					});
					return response;
				})
				.then((response) => {
					console.log('fetch response:');
					console.log(response);
				});
		});
	}

	function listCaching() {
		caches.open('my-cache').then((cache) => {
			// Each item in the cache is ultimately stored as request-response key-value pairs.
			console.debug('my-cache cache dump');
			cache.keys().then((keys) => {
				keys.forEach((key, index) => {
					console.debug(index, key);
				});
			});
		});
	}

	function deleteCaching() {
		caches.open('my-cache').then((cache) => {
			cache.keys().then((keys) => {
				keys.forEach((key, index) => {
					cache.delete(key).then((isGone) => {
						console.log(`Deleting key ${key} ${isGone ? 'successfully' : 'failed'}`);
					});
				});
			});
		});
	}

	function deleteCachingAlt() {
		caches.delete('my-cache').then((isGone) => {
			console.log(`Deleting cache ${isGone ? 'successfully' : 'failed'}`);
		});
	}
</script>

<h1 class="m-4 text-2xl font-bold">Welcome to SvelteKit</h1>

<h2 class="m-4">Caching</h2>

<button
	class="m-4 cursor-pointer rounded bg-purple-900 px-2 py-1 text-white active:bg-teal-200 active:text-gray-800"
	on:click={startCaching}
>
	Cache
</button>

<button
	class="m-4 cursor-pointer rounded bg-purple-900 px-2 py-1 text-white active:bg-teal-200 active:text-gray-800"
	on:click={startCachingAlt}
>
	Cache Alt.
</button>

<h2 class="m-4">List caching</h2>

<button
	class="m-4 cursor-pointer rounded bg-purple-900 px-2 py-1 text-white active:bg-teal-200 active:text-gray-800"
	on:click={listCaching}
>
	List cache
</button>

<h2 class="m-4">Uncaching</h2>

<button
	class="m-4 cursor-pointer rounded bg-purple-900 px-2 py-1 text-white active:bg-teal-200 active:text-gray-800"
	on:click={deleteCaching}
>
	Uncache
</button>

<button
	class="m-4 cursor-pointer rounded bg-purple-900 px-2 py-1 text-white active:bg-teal-200 active:text-gray-800"
	on:click={deleteCachingAlt}
>
	Uncache Alt.
</button>
