
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import TelopBase from 'utils/telopBase';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const $pad = document.querySelector(".pad"),
		$padBody = $pad?.querySelector('.pad_body_content');
		if (!$pad || !$padBody) return;
		await timer(500);
		$padBody.innerHTML =this.decryptedMessage;
		$pad.classList.add("pad--visible");
		await timer(2500);
		this.finish();
	}
}

new App({telopId:"4kyqdk98"}).init();