
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
		const $circle = document.querySelector<HTMLElement>('.catch_circle');
		if ($circle) {
		
			$circle.animate(
				[{
					top: 0,
					left: 0
				}
				, {
					top: `-${Math.floor(Math.random() * 26) + 75}%`,
					left:'-100%',
				},
				{
					top: `-${Math.floor(Math.random() * 26) + 75}%`,
					left: 0
				}, {
					top: `-${Math.floor(Math.random() * 25)}%`,
					left: '-100%'
				},
				{
					top: `-${Math.floor(Math.random() * 25)}%`,
					left: 0
				}, {
					top: `-${Math.floor(Math.random() * 26) + 75}%`,
					left:'-100%',
				},
				{
					top: `-${Math.floor(Math.random() * 26) + 75}%`,
					left: '0'
				}
				]
				, {
					duration: 5000
				});
			await timer(4500);
			$circle.style.backgroundColor = "#000";
			await timer(1500);
			$circle.style.opacity = "0";
		}

		await timer(3000);
		this.finish();
	}
}

new App({ telopId: "hp6hnsbj", isLogoBlack: true }).init();