
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
		const $catchCircle = document.querySelector(".catch_circle");
		if (!$catchMain || !$catchCircle) return;
		const messageArray = messageSplit(this.decryptedMessage);
		messageArray.forEach((v) => {
			const $span = document.createElement('span');
			$span.innerHTML = v;
			$span.className = 'catch_main_part'
			$catchMain.appendChild($span);
		});
		const $parts = $catchMain.querySelectorAll('.catch_main_part');
		const partsArray = Array.from($parts);
		const fontSize = fontsizeAdjust($catchMain, $parts, true);
		document.documentElement.style.setProperty('--catchFontSize',fontSize+"px" );
		document.documentElement.style.setProperty('--circleHeight',$catchCircle.clientHeight+"px" );
		const $circle = document.querySelector<HTMLElement>('.catch_circle');
		console.log($circle?.clientHeight);
		await timer(500);
		$circle?.classList.add('catch_circle--open');
		await timer(2000);
		$circle?.classList.add('catch_circle--lit');
		$catchMain?.classList.add('catch_main--visible');
		await timer(500);
		$circle?.classList.remove('catch_circle--lit');
		await timer(3000);
		this.finish();
	}
}

new App({ telopId: "us8d9rd2", isLogoBlack: false }).init();