
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
		fontsizeAdjust($catchMain, $parts, true);
		await partsArray.reduce(async (p: Promise<void>, e: Element, i: number) => {
			await p;
			e.classList.add("catch_main_part--visible");
			await timer(200);
			return p;
		}, timer(500));
		await timer(2000);
		this.finish();
	}
}

new App({ telopId: "u4wvse79",isLogoBlack:true }).init();