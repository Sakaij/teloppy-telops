
/**
 * ページのロード後にresolveするPromiseを
 */
export default function loadPromise(): Promise<any> {
	return new Promise<void>((resolve) => {
		if (document.readyState === 'complete') {
			resolve();
		} else {
			window.onload = () => resolve();
		}
	});
}



