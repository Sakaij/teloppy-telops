
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import { fontsizeAdjustVertical } from 'plugins/fontsizeAdjust';
import messageSplit from 'plugins/messageSplit';
import TelopBase from 'utils/telopBase';
import loadPromise from 'plugins/loadPromise';


const timer = (time: number) => new Promise<void>((r) => setTimeout(r, time));


class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const $catchSub = document.querySelector<HTMLElement>(".catch_sub");
		const $catchMain = document.querySelector<HTMLElement>(".catch_main");
		if (!$catchSub || !$catchMain) return;
		await loadPromise();
		for (let index = 0; index < 20; index++) {
			const $sub = document.createElement('div');
			console.log(Math.ceil(50 / this.decryptedMessage.length));
			let context = "";
			for (let index = 0; index < Math.ceil(50 / this.decryptedMessage.length); index++) context += this.decryptedMessage + " ";
			$sub.innerHTML = context;
			$sub.className = 'catch_line'
			$catchSub.append($sub);
		}
		const messageArray = messageSplit(this.decryptedMessage);
		messageArray.forEach((v) => {
			const $mainSpan = document.createElement('span'),
				$subSpan = document.createElement('span');
			$mainSpan.innerHTML = v;
			$subSpan.innerHTML = v;
			$mainSpan.className = 'catch_main_part'
			$subSpan.className = 'catch_sub_part'
			$catchMain.appendChild($mainSpan);
		});

		const partsArray = Array.from($catchMain.querySelectorAll('span'));
		await partsArray.reduce(async (p: Promise<void>, e: Element, i: number) => {
			await p;
			e.classList.add("catch_main_part--visible");
			$catchSub.style.opacity = "0";
			await timer(700);
			$catchSub.style.opacity = "1";
			e.classList.remove("catch_main_part--visible");
			await timer(500);
		}, timer(1000));
		await timer(500);
		this.finish();

	}
}

new App({ telopId: "o44g75mh" }).init();