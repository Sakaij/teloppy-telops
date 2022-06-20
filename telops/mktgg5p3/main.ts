
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
		const $catchMain = document.querySelector<HTMLElement>(".catch_main");
		if (!$catchMain) return;
		$catchMain.innerHTML = this.decryptedMessage;
		$catchMain.style.fontSize = $catchMain.clientHeight / 1.5 + 'px';
		const duration =(this.decryptedMessage.length * 400 + 3000);
		document.documentElement.style.setProperty('--animationDuration', duration/1000+ "s");
		await timer(duration+500);
		this.finish();
	}
}

new App({ telopId: "mktgg5p3", isLogoBlack: false }).init();