
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import TelopBase from 'utils/telopBase';
import messageSplit from 'plugins/messageSplit';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const $pad = document.querySelector(".pad"),
			$padBody = $pad?.querySelector('.pad_body');
		if (!$pad || !$padBody) return;
		await timer(500);
		$pad.classList.add("pad--visible");
		await timer(1500);
		const messageArray = messageSplit(this.decryptedMessage);

		const textAppend = async (duration: number) => {
			for (let index = 0; index < messageArray.length; index++) {
				$padBody.innerHTML = $padBody.textContent + messageArray[index];
				if (duration > 0) await timer(duration);
			}
		}

		const maxText = document.documentElement.clientWidth > 1010 ? 1100 : 700;
		await textAppend(150);
		await textAppend(75);
		await textAppend(50);
		await textAppend(50);
		await textAppend(50);
		await textAppend(50);
		for (let index = 0; index < 1000; index++) {
			if (($padBody.textContent?.length || 2000) > maxText) {
				break;
			}
			await textAppend(0);
			await timer(5);
		}

		await timer(500);
		$padBody.innerHTML = "";
		await timer(1500);
		$pad.classList.add("pad--full");
		$padBody.classList.add("pad_body--face");


		await timer(2000);
		this.finish();
	}
}

new App({ telopId: "75zbo6y8" }).init();