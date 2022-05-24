
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
		const $text =$catchMain.querySelector('text');
		const fontSize = $catchMain.clientWidth / this.decryptedMessage.length -1;    
		$catchMain.setAttribute(
			"style",
			"font-size:min(" + Math.floor(fontSize) + "px,50vh)"
		);
	 	if($text) $text.innerHTML =  this.decryptedMessage;
		await timer(500);
		$catchMain.classList.add('catch_main--visible');

		await timer(3000);
		this.finish();
	}
}

new App({ telopId: "9xm3vvih", isLogoBlack: true }).init();