
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
			$span.className = 'catch_main_part';
			const $front = document.createElement('span');
			$front.className = 'catch_main_part_front';
			$front.innerHTML = v;
			const $back = document.createElement('span');
			$back.className = 'catch_main_part_back';
			$span.appendChild($front);
			$span.appendChild($back);
			$catchMain.appendChild($span);
			if ($span.clientWidth > 0) $span.style.fontSize = $span.clientWidth / 2 + 'px';
		});
		if (messageArray.length > 10) {
			const blank = 10 - messageArray.length % 10;
			if (blank == 0) return;
			for (let index = 0; index < blank; index++) {
				const $blank = document.createElement('span');
				$blank.className = 'catch_main_part catch_main_part--blank';
				$catchMain.appendChild($blank);
			}
		}
		const $parts = $catchMain.querySelectorAll<HTMLElement>('.catch_main_part');
		const partsArray = Array.from($parts);
		$parts.forEach((e: HTMLElement, i: number) => e.style.zIndex = ($parts.length - i).toString());
		await timer(500);
		await partsArray.reduce(async (p: Promise<void>, e: Element, i: number) => {
			await p;
			e.classList.add("catch_main_part--visible");
			await timer(150);
			return p;
		}, timer(500));
		await timer(3000);
		this.finish();
	}
}

new App({ telopId: "8wegkjnd", isLogoBlack: true }).init();