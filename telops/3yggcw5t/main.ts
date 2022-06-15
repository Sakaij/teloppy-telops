
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import fontsizeAdjust from 'plugins/fontsizeAdjust';
import messageSplit from 'plugins/messageSplit';
import TelopBase from 'utils/telopBase';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const $catchMain = document.querySelector<HTMLElement>(".catch_main");
		if (!$catchMain) return;
		const messageArray = messageSplit(this.decryptedMessage);
		messageArray.forEach((v) => {
			const $span = document.createElement('span');
			$span.innerHTML = v;
			$span.className = 'catch_main_part'
			$catchMain.appendChild($span);
		});
		const $parts = $catchMain.querySelectorAll('.catch_main_part');
		const partsArray = Array.from($parts);
		fontsizeAdjust($catchMain, $parts, true);
		const $shadow = $catchMain.cloneNode(true) as HTMLElement;
		const $shadowParts =$shadow.querySelectorAll('.catch_main_part');
		$shadowParts.forEach(e=>e.classList.add('catch_main_part--shadow'));
		$parts.forEach(e=>e.classList.add('catch_main_part--main'));
		$catchMain.after($shadow);
		$catchMain.style.zIndex ="1";
		await timer(1500);
		$shadowParts.forEach(e=>e.classList.add('is-visible'));
		await timer(2500);
		this.finish();
	}
}

new App({ telopId: "3yggcw5t", isLogoBlack: false }).init();