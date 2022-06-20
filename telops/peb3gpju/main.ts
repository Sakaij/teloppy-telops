
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import {fontsizeAdjustHorizontal} from 'plugins/fontsizeAdjust';
import messageSplit from 'plugins/messageSplit';
import TelopBase from 'utils/telopBase';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const $catchMain = document.querySelector(".catch_main");
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
		fontsizeAdjustHorizontal($catchMain, $parts, true);
		await timer(500);
		partsArray.forEach((e: Element) => e.classList.add("catch_main_part--blink"));
		await timer(1500);
		partsArray.forEach((e: Element) => e.classList.remove("catch_main_part--blink"));
		partsArray.forEach((e: Element) => e.classList.add("catch_main_part--active"));
		await timer(3000);
		this.finish();
	}
}

new App({ telopId: "peb3gpju", isLogoBlack: true }).init();