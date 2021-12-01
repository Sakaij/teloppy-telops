
/**対象のdomをwindowサイズ１００％にする(リサイズ対応) */
export default function fullHeight(elm: HTMLElement) {
	//スマホサイズのときのみ適応
	if (window.innerWidth >= 1080) return;
	const exe = () => {
		elm.style.height = window.innerHeight + 'px';
	}
	exe();
	window.addEventListener('resize', () => exe());
}



