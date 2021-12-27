import TelopBase from '@/utils/telopBase';
import flushPromises from 'flush-promises'

import axios from 'axios';
jest.mock('axios');

require('dotenv').config({});
class SampleTelop extends TelopBase {
	ready() {

	}
}




describe('TelopBaseを継承したSampleTelop', () => {
	process.env.API_URL = "https://sample.com/";
	beforeEach(() => {
		jest.restoreAllMocks();
		document.getElementsByTagName('html')[0].innerHTML = ''; 
	});
	test('initにて必要な処理が呼び出せているかどうか', async() => {
		const messageDecrypt = jest.spyOn(SampleTelop.prototype as any, '_messageDecrypt').mockResolvedValue('サンプルテスト');
		const domLoadPromise = jest.spyOn(SampleTelop.prototype as any, '_domLoadPromise').mockResolvedValue(null);
		const displayLogo = jest.spyOn(SampleTelop.prototype as any, '_displayLogo').mockResolvedValue(null);
		const ready =jest.spyOn(SampleTelop.prototype,'ready');
		const app = new SampleTelop({
			telopId: 'sample'
		});
		app.init();
		await flushPromises();

		/**
		 * initの処理1
		 * メッセージの復号化-> DOMの読み込み待ち -> ready呼び出し
		 */
		expect(messageDecrypt).toHaveBeenCalled();
		expect(domLoadPromise).toHaveBeenCalled();
		expect(ready).toHaveBeenCalled();

		/**
		 * initの処理2
		 * DOMの読み込み待ち -> ロゴ表示
		 */
		expect(displayLogo).toHaveBeenCalledTimes(0);
		window.dispatchEvent(new Event('DOMContentLoaded'));
		expect(displayLogo).toHaveBeenCalled();
	});
	test('トップページへのガイド処理', async() => {
		const app = new SampleTelop({
			telopId: 'sample'
		});
		/**
		 * windowがインラインフレームでない場合はガイドを表示させる
		 */
		(app as any)._isWindowIframe = false;
		(app as any).displayGuide();
		const $guide = document.querySelector('#guide');
		expect(!!$guide).toBe(true);
		document.getElementsByTagName('html')[0].innerHTML = ''; 
		/**
		 * windowがインラインフレームの場合、ガイドは表示させない
		 */
		(app as any)._isWindowIframe = true;
		(app as any).displayGuide();
		const $guide2 = document.querySelector('#guide');
		expect(!!$guide2).toBe(false);
	});
	test('メッセージの復号化処理', async() => {
		jest.spyOn(console,'warn').mockReturnValue();
		jest.spyOn(axios, 'get').mockResolvedValue({ data: "サンプルテキスト" });
		jest.spyOn(URLSearchParams.prototype,'get').mockReturnValue('sample');

		const app = new SampleTelop({
			telopId: 'sample'
		});
		
		/**
		 * パラメータにメッセージが存在してれば、復号化したメッセージを返す
		 */
		const result1 =await (app as any)._messageDecrypt();
		expect(result1).toBe('サンプルテキスト');
		/**
		 * 復号化された文字にエスケープすべき文字があればエスケープ
		 * 既にエスケープ済みであればそのまま
		 */
		 jest.spyOn(axios, 'get').mockResolvedValue({ data: `&<>"' &<>"' サンプル` });
		 const result2 = await (app as any)._messageDecrypt();
		 expect(result2).toBe('&amp;&lt;&gt;&quot;&#39;&ensp;&amp;&lt;&gt;&quot;&#39;&ensp;サンプル');
		 jest.spyOn(axios, 'get').mockResolvedValue({ data: "&amp;&lt;&gt;&quot;&#39;&ensp;&amp;&lt;&gt;&quot;&#39;&ensp;サンプル" });
		 const result3 = await (app as any)._messageDecrypt();
		 expect(result3).toBe('&amp;&lt;&gt;&quot;&#39;&ensp;&amp;&lt;&gt;&quot;&#39;&ensp;サンプル');

		/**
		 * パラメータにメッセージが存在しなければ、Promiseの空文字をresolveする
		 */
		 jest.spyOn(URLSearchParams.prototype,'get').mockReturnValue(null);
		 const result4 = await (app as any)._messageDecrypt();
		 expect(result4).toBe('');

	});
	test('ロゴの表示処理', async() => {
		const app = new SampleTelop({
			telopId: 'sample',
			isLogoBlack:false
		});
		const app2 = new SampleTelop({
			telopId: 'sample',
			isLogoBlack:true
		});
		/**
		 * windowがインラインフレームでない場合はロゴを表示させる 黒色でロゴ表示をする場合はクラスが付与されている
		 */
		(app as any)._isWindowIframe = false;
		(app as any)._displayLogo();
		const $logo = document.querySelector('#fix-logo');
		expect(!!$logo).toBe(true);
		expect($logo?.className).toBe('');
		document.getElementsByTagName('html')[0].innerHTML = ''; 
		(app2 as any)._isWindowIframe = false;
		(app2 as any)._displayLogo();
		const $logo2 = document.querySelector('#fix-logo');
		expect($logo2?.className).toBe('is-black');
		document.getElementsByTagName('html')[0].innerHTML = ''; 
		/**
		 * windowがインラインフレームの場合、ロゴは表示させない
		 */
		(app as any)._isWindowIframe = true;
		(app as any)._displayLogo();
		const $logo3 = document.querySelector('#fix-logo');
		expect(!!$logo3).toBe(false);
	});
});





