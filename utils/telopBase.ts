import axios from 'axios';
import '/assets/scss/common.scss';

export default abstract class TelopBase {
	private _telopId: string;
	private _decryptApiUrl: string;
	private _decryptedMessage: string;//復号化済みのメッセージ
	private _isWindowIframe: boolean;//埋め込みされている側かどうか
	private _isLogoBlack: boolean;

	constructor(options: {
		telopId: string,
		isLogoBlack?: boolean
	}) {
		this._telopId = options.telopId;
		this._decryptApiUrl = process.env.API_URL ? process.env.API_URL + 'decrypt' : "";
		this._decryptedMessage = "";
		this._isWindowIframe = window != window.parent;
		this._isLogoBlack = options?.isLogoBlack || false;
	}

	public get decryptedMessage() {
		return this._decryptedMessage;
	}

	/**これを呼び出すことで、メッセージの解析などの処理を行う */
	public init() {
		//メッセージの復号化から、DOM待ちまでの処理
		this._messageDecrypt().then((r) => {
			this._decryptedMessage = r;
			return this._domLoadPromise();
		}).then(() => {
			this.ready();
		});

		//DOMの読み込みが終わり次第、ロゴを表示させる
		window.addEventListener('DOMContentLoaded', () => {
			this._displayLogo();
		})
	}
	/**DOM読み込みかつAPI接続が終わった時点で呼び出される */
	protected abstract ready(): any;

	/**テロップアニメーションが終わり次第、呼び出すことでトップページへのガイドを表示させる(自身が、インラインフレームで呼び出されていれば何もしない)*/
	protected displayGuide(): void {
		if (this._isWindowIframe) return;
		const $guide = document.createElement('p');
		$guide.setAttribute('id', 'guide');
		$guide.className = 'is-hidden';
		$guide.innerHTML = `<a href="https://teloppy.com/?reference_telopid=${this._telopId}">Teloppyでリッチなメッセージを送ろう!</a>`
		document.body.prepend($guide);
		setTimeout(() => $guide.className = "" , 50);
	}


	/**URLパラメータに指定されているメッセージを復号化する */
	private async _messageDecrypt(): Promise<string> {
		try {
			const param = new URLSearchParams(location.search).get('message');
			if (param == null) throw Error('パラメータにメッセージが存在しません');
			if (!this._decryptApiUrl) throw Error('APIのURLが存在しません');
			const message = (await axios.get<string>(`${this._decryptApiUrl}/?encrypted=${encodeURIComponent(param)}`)).data;
			//サーバー側で、既にサニタイズも行っているが、フロントでもバックでも一応行った方がよさそうなので、一旦復号して、再度サニタイズを行っている
			const unsanitizing = message.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, `"`).replace(/&#39;/g, `'`).replace(/&ensp;/g, ' ');
			const resanitizing = unsanitizing.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\s/g, "&ensp;");
			//念のため、scriptタグが埋め込まれていないかチェックしておく
			if (resanitizing.match(/<.*script/)) throw Error('危険な文字列が含まれています');
			return resanitizing;
		} catch (e) {
			console.warn(e);
			return "";
		}
	}
	/**自身が、インラインフレームで呼び出しされていなければロゴを表示する*/
	private _displayLogo(): void {
		if (this._isWindowIframe) return;
		const $guide = document.createElement('h3');
		$guide.setAttribute('id', 'fix-logo');
		$guide.innerHTML = `<a href="https://teloppy.com/?reference_telopid=${this._telopId}">Teloppy</a>`;
		if (this._isLogoBlack) $guide.className = 'is-black';
		document.body.prepend($guide);
	}

	/**DOMのロードをPromiseで返す*/
	private async _domLoadPromise(): Promise<void> {
		if (document.readyState == "loading") {
			await new Promise<void>((resolve: () => void, reject: () => void) => {
				window.addEventListener('DOMContentLoaded', () => {
					resolve();
				})
			});
		}
	}
}

