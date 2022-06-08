
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
			$span.className = 'catch_main_part';
			const $char = document.createElement('span');
			$char.className = 'catch_main_part_char';
			$char.innerHTML = v;
			if (this.decryptedMessage.length > 1) {
				const marginTotal = document.documentElement.clientWidth > 1080 ? 100 : 50;
				$span.style.margin = `0 ${marginTotal / this.decryptedMessage.length}px`;
			}
			$span.appendChild($char);
			$catchMain.appendChild($span);
		});
		const $parts = $catchMain.querySelectorAll<HTMLElement>('.catch_main_part');
		const partsArray = Array.from($parts);
		$parts.forEach((v, i) => {
			v.style.height = v.clientWidth * 1.41 + "px";
			v.style.fontSize = v.clientWidth / 1.5 + "px";
		});
		//スマホ時に文字が多いと小さすぎになるので、最低30にしておいてそれよりも小さい場合はスクロールアニメーションをかける
		if($parts[0].clientWidth == 30 && document.documentElement.clientWidth < 1080){
			$catchMain.style.justifyContent = "flex-start";
			const scrollX = this.decryptedMessage.length * 30 + 100;
			$catchMain.animate(
				[{
					transform:"translateX(0)"
				}
				, {
					transform:`translateX(-${scrollX}px)`
				}
				]
				, {
					fill:"forwards",
					duration: 15000,
					delay:8000
				});
		}
		await partsArray.reduce(async (p: Promise<void>, e: Element, i: number) => {
			await p;
			e.classList.add("catch_main_part--visible");
			await timer(500);
			return p;
		}, timer(200));
		await timer(7000);
		this.finish();
	}
}

new App({ telopId: "mdwjkk5i", isLogoBlack: true }).init();