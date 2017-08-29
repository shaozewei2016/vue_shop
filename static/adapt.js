export function adapt() {
//	let evt = "onorientationchange" in window ? "onorientationchange" : "resize";
	let isIPhone = window.navigator.appVersion.match(/iphone/gi);
	let dpr = window.devicePixelRatio;
	if(isIPhone) {
		if(dpr >= 3 && (!dpr || dpr >= 3)) {
			dpr = 3;
		}
		else if(dpr >= 2 && (!dpr || dpr >= 2)) {
			dpr = 2;
		}
		else {
			dpr = 1;
		}
	}
	else {
		dpr = 1;
	}

	let scale = 1 / dpr;
	let docEl = document.documentElement;
	let metaEl = document.querySelector("meta[name='viewport']");

	if(!metaEl) {
		metaEl = document.createElement("meta");
		metaEl.setAttribute("name", "viewport");
		document.querySelector("head").appendChild(metaEl);
	}
	let fn = () => {
		let docElWidth = docEl.getBoundingClientRect().width;
		let docElWid = (docElWidth > 720 ? 720 : docElWidth < 320 ? 320 : docElWidth) ;
		let fontSize = (docElWid * dpr)/ 640 * 100;
		metaEl.setAttribute("content", "initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");
		docEl.setAttribute("data-dpr", dpr);
		docEl.style.fontSize = fontSize + "px";
		console.log(fontSize);
	}
	fn();
	
//	document.addEventListener("DOMContentLoaded", fn, false)
}