
import './style.scss';
import fullHeight from 'plugins/fullHeight';
import fontsizeAdjust from 'plugins/fontsizeAdjust';
import messageSplit from 'plugins/messageSplit';
import TelopBase from 'utils/telopBase';
import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry, TextBufferGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Buffer } from 'buffer';
import notosans from './NotoSans';
import gsap from 'gsap';

const timer = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time));

class App extends TelopBase {
	async ready() {
		const container = document.querySelector<HTMLElement>('.full-height');
		if (container) fullHeight(container);
		const width = document.documentElement.clientWidth;
		const height = document.documentElement.clientHeight;
		const textDistance = 150;
		const renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#canvas') || undefined,
			antialias: true
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		const scene = new THREE.Scene();
		scene.background = new THREE.Color("#ffffff");


		const camera = new THREE.PerspectiveCamera(45, width / height);
		camera.position.set(15, 30, 40);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		const fontLoader = new FontLoader();
		const font = fontLoader.parse(notosans);

		const messageArray = messageSplit(this.decryptedMessage);
		messageArray.forEach((v, i) => {
			const textGeometry = new TextGeometry(v, {
				font: font, // フォントを指定 (FontLoaderで読み込んだjson形式のフォント)
				size: 10,   // 文字のサイズを指定
				height: 1,  // 文字の厚さを指定
			});
			const textMesh = new THREE.Mesh(textGeometry
				,
				new THREE.MeshPhongMaterial({
					color: "#ffffff"
				})
			);
			textMesh.castShadow = true;
			//textMesh.position.z = -i * 150;
			textMesh.position.z = -i * textDistance;
			textMesh.position.x = -5;
			scene.add(textMesh);
		});


		const firstPointLight = this._createPointLight(0, 40, 0)
		const secondPointLight = this._createPointLight(0, 40, -textDistance);
		scene.add(firstPointLight);
		scene.add(secondPointLight);

		const ambientLight = new THREE.AmbientLight("#fff", 0.8);
		scene.add(ambientLight);
		const meshFloor = new THREE.Mesh(
			//new THREE.BoxGeometry(500, 1, messageArray.length * textDistance + 300),
			new THREE.BoxGeometry(1500, 1, 11110 + 300),
			new THREE.MeshStandardMaterial({
				color: '#fff'
			}));
		// 影を受け付ける
		meshFloor.position.set(0, -1, -messageArray.length * textDistance / 2 + textDistance);
		meshFloor.receiveShadow = true;
		scene.add(meshFloor);

		//毎フレーム処理
		let isAnimationEnd = false;
		const tick = () => {
			if (isAnimationEnd) return;
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		}
		tick();

		await timer(500);
		await new Promise<void>((resolve) => {
			const tl = gsap.timeline({
				onComplete:()=>{
					resolve();
				}
			});
			messageArray.forEach((v, i) => {
				if (i == 0) return;
				tl.to(camera.position, {
					z: 40 - textDistance * i,
					duration: 1.5,
					ease: "easeOut",
					onComplete: () => {
						i % 2 !== 0 ? firstPointLight.position.z -= textDistance*2 : secondPointLight.position.z -= textDistance*2;
					}
				})
			});
			setTimeout(() => {
				resolve();//30秒以上かかる場合は強制終了
			}, 30000);
		});
		isAnimationEnd = true;
		await timer(1500);
		this.finish();






		isAnimationEnd = true;
	}

	_createPointLight(x: number, y: number, z: number): THREE.PointLight {
		const light = new THREE.PointLight('#fff', 2, 50, Math.PI / 4);
		light.position.set(x, y, z);
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		return light;
	}
}

new App({ telopId: "7focozp6", isLogoBlack: true }).init();