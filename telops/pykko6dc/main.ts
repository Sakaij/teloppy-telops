
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
		const $catchMain = document.querySelector(".catch_main"),
			$catchSub = document.querySelector<HTMLElement>('.catch_sub');
		if (!$catchMain || !$catchSub) return;
		const messageArray = messageSplit(this.decryptedMessage);
		messageArray.forEach((v) => {
			const $mainSpan = document.createElement('span'),
				$subSpan = document.createElement('span');
			$mainSpan.innerHTML = v;
			$subSpan.innerHTML = v;
			$mainSpan.className = 'catch_main_part'
			$subSpan.className = 'catch_sub_part'
			$catchMain.appendChild($mainSpan);
			$catchSub.appendChild($subSpan);
		});
		console.log($catchSub.clientWidth);
		fontsizeAdjust($catchSub, $catchSub.querySelectorAll('span'), true);
		const partsArray = Array.from($catchMain.querySelectorAll('span'));
		await partsArray.reduce(async (p: Promise<void>, e: Element, i: number) => {
			await p;
			e.classList.add("catch_main_part--visible");
			await timer(80);
			e.classList.remove("catch_main_part--visible");
			await timer(10);
			return p;
		}, timer(500));
		await timer(500);
		$catchSub.classList.add("catch_sub--fade");
		await timer(2000);
		this.displayGuide();

	}
}

new App({ telopId: "pykko6dc"}).init();