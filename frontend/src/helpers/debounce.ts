export const debounce = <T extends (...args: any[]) => void>(cb: T, delay = 800) => {
	let timeoutId: NodeJS.Timeout;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			cb(...args);
		}, delay);
	};
};
