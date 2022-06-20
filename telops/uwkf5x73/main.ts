
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import {fontsizeAdjustHorizontal} from 'plugins/fontsizeAdjust';
import messageSplit from 'plugins/messageSplit';
import TelopBase from 'utils/telopBase';


const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));
class App extends TelopBase {
	async ready() {
		window.alert(this.decryptedMessage);
		await timer(500);
		this.finish();
	}
}

new App({ telopId: "uwkf5x73", isLogoBlack: true }).init();