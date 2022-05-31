
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import TelopBase from 'utils/telopBase';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const $container = document.querySelector<HTMLElement>('.full-height');
		if ($container) fullHeight($container);
		const $pad = document.querySelector(".pad"),
			$padBody = $pad?.querySelector('.pad_body_content');
		if (!$pad || !$padBody) return;
		$padBody.innerHTML = this.decryptedMessage;
		const clone = (length: number, translateX: number, translateY: number) => {
			for (let index = 0; index < length; index++) {
				const $clone = $pad.cloneNode(true) as HTMLElement;
				$clone.style.left = (-(length - 1) / 2 + length - index) * 50 + translateX + 'px';
				$clone.style.top = (-(length - 1) / 2 + length - index) * 50 + translateY + 'px';
				$container?.append($clone);
			}
		}

		if (document.documentElement.clientWidth > 1080) {

			for (let index = 0; index < 5; index++) { clone(21, (-2 + index) * 500, (-2 + index) * 50); }
		} else {
			for (let index = 0; index < 3; index++) {clone(6, (-1 + index) * 250, (-1 + index) * document.documentElement.clientHeight/2);}
		}
		$pad.remove();
		await timer(500);
		const $pads = document.querySelectorAll<HTMLElement>(".pad");
		if (document.documentElement.clientWidth > 1080) {
			for (let index = 0; index < 21; index++) {
				$pads[index].classList.add("pad--visible");
				$pads[index + 21].classList.add("pad--visible");
				$pads[index + 21 * 2].classList.add("pad--visible");
				$pads[index + 21 * 3].classList.add("pad--visible");
				$pads[index + 21 * 4].classList.add("pad--visible");
				await timer(200);
			}
		} else {
			for (let index = 0; index < $pads.length; index++) {
				$pads[index].classList.add("pad--visible");
				await timer(200);
			}
		}


		await timer(2500);
		this.finish();
	}
}



new App({ telopId: "97ig97be" }).init();