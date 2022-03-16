
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import messageSplit from 'plugins/messageSplit';
import TelopBase from 'utils/telopBase';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const $pad = document.querySelector(".pad"),
		$padBody = $pad?.querySelector('.pad_body');
		if (!$pad || !$padBody) return;
		const messageArray = messageSplit(this.decryptedMessage);
		messageArray.forEach((v) => {
			const $span = document.createElement('span');
			$span.innerHTML = v;
			$span.className = 'pad_body_part'
			$padBody.appendChild($span);
		});
		const partsArray = Array.from($padBody.querySelectorAll('.pad_body_part'));
		const $pointer = document.createElement('span');
		$pointer.className='pad_body_pointer';
		$padBody.appendChild($pointer);
		await timer(500);
		$pad.classList.add("pad--visible");
		await partsArray.reduce(async (p: Promise<void>, e: Element) => {
			await p;
			e.classList.add("pad_body_part--visible");
			await timer(125);
			return p;
		  }, timer(1200));
		await timer(2000);
		this.finish();
	}
}

new App({telopId:"ueijpg4o"}).init();