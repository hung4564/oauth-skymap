/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
	extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	return extendStatics(d, b);
};

function __extends(d, b) {
	extendStatics(d, b);
	function __() { this.constructor = d; }
	d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
	__assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
	};
	return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
	return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
			function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
			function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
			step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}

function __generator(thisArg, body) {
	var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	function verb(n) { return function (v) { return step([n, v]); }; }
	function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_) try {
					if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
					if (y = 0, t) op = [op[0] & 2, t.value];
					switch (op[0]) {
							case 0: case 1: t = op; break;
							case 4: _.label++; return { value: op[1], done: false };
							case 5: _.label++; y = op[1]; op = [0]; continue;
							case 7: op = _.ops.pop(); _.trys.pop(); continue;
							default:
									if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
									if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
									if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
									if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
									if (t[2]) _.ops.pop();
									_.trys.pop(); continue;
					}
					op = body.call(thisArg, _);
			} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
			if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	}
}

var AuthDebug = /** @class */ (function () {
	function AuthDebug() {
	}
	AuthDebug.log = function (message, args) {
			if (AuthDebug.isDebug) {
					console.log(message, args);
			}
	};
	AuthDebug.isDebug = true;
	return AuthDebug;
}());
function createUrl(baseUrl, queryParams) {
	if (queryParams === void 0) { queryParams = {}; }
	var url = baseUrl;
	AuthDebug.log("utilt -> createUrl -> params", queryParams);
	Object.keys(queryParams).forEach(function (key) {
			var value = queryParams[key];
			if ([undefined, null, ""].indexOf(value) === -1) {
					url += "" + (url.indexOf("?") === -1 ? "?" : "&") + key + "=" + encodeURIComponent(value);
			}
	});
	AuthDebug.log("utilt -> createUrl", url);
	return url;
}
function getResponseFromURL(url) {
	if (url.indexOf("#") !== -1) {
			return parseQueryString(url.substring(url.indexOf("#") + 1));
	}
	else if (url.indexOf("?") !== -1) {
			return parseQueryString(url.substring(url.indexOf("?") + 1));
	}
	return {};
}
function parseQueryString(qs) {
	var e, a = /\+/g, // Regex for replacing addition symbol with a space
	r = /([^&;=]+)=?([^&;]*)/g, d = function (s) {
			return decodeURIComponent(s.replace(a, " "));
	}, q = qs, urlParams = {};
	/* jshint ignore:start */
	while ((e = r.exec(q))) {
			urlParams[d(e[1])] = d(e[2]);
	}
	/* jshint ignore:end */
	return urlParams;
}
var epoch = function () {
	return Math.round(new Date().getTime() / 1000.0).toString();
};
//# sourceMappingURL=utils.js.map

var AuthProfile = /** @class */ (function () {
	function AuthProfile(_option, _store) {
			this._option = _option;
			this._store = _store;
			AuthDebug.log("Set auth Option", _option);
	}
	AuthProfile.prototype.setConfig = function (_option) {
			AuthDebug.log("Set auth Option", _option);
			this._option = _option;
	};
	AuthProfile.prototype.setStore = function (_store) {
			this._store = _store;
	};
	AuthProfile.prototype.getToken = function () {
			var access_token = this._store.accessToken;
			if (!access_token) {
					throw new Error("missing [access_token]");
			}
			return access_token;
	};
	AuthProfile.prototype.profile = function () {
			return __awaiter(this, void 0, void 0, function () {
					var access_token, url, res;
					return __generator(this, function (_a) {
							switch (_a.label) {
									case 0:
											access_token = this.getToken();
											AuthDebug.log("profile access_token", access_token);
											url = this._option.profileUrl || this._option.providerUrl + "/api/me";
											return [4 /*yield*/, fetch(url, {
															method: "get",
															headers: {
																	Authorization: "Bearer " + access_token
															}
													})];
									case 1:
											res = _a.sent();
											return [4 /*yield*/, res.json()];
									case 2: return [2 /*return*/, _a.sent()];
							}
					});
			});
	};
	AuthProfile.prototype.logOut = function () {
			return __awaiter(this, void 0, void 0, function () {
					var access_token, url, res;
					return __generator(this, function (_a) {
							switch (_a.label) {
									case 0:
											access_token = this.getToken();
											AuthDebug.log("logout access_token", access_token);
											url = this._option.logOutUrl || this._option.providerUrl + "/api/logout";
											return [4 /*yield*/, fetch(url, {
															method: "post",
															headers: {
																	Authorization: "Bearer " + access_token
															}
													})];
									case 1:
											res = _a.sent();
											return [4 /*yield*/, res.json()];
									case 2: return [2 /*return*/, _a.sent()];
							}
					});
			});
	};
	AuthProfile.prototype.vaildToken = function () {
			return __awaiter(this, void 0, void 0, function () {
					var access_token, url, res;
					return __generator(this, function (_a) {
							switch (_a.label) {
									case 0:
											access_token = this.getToken();
											AuthDebug.log("profile access_token", access_token);
											url = this._option.vaildUrl || this._option.providerUrl + "/api/validate-token";
											return [4 /*yield*/, fetch(url, {
															method: "get",
															headers: {
																	Authorization: "Bearer " + access_token
															}
													})];
									case 1:
											res = _a.sent();
											return [4 /*yield*/, res.json()];
									case 2: return [2 /*return*/, _a.sent()];
							}
					});
			});
	};
	return AuthProfile;
}());

/**
* A JavaScript implementation of the SHA family of hashes, as defined in FIPS PUB 180-4 and FIPS PUB 202, as
* well as the corresponding HMAC implementation as defined in FIPS PUB 198a
*
* Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
* Distributed under the BSD License
* See http://caligatio.github.com/jsSHA/ for more information
*/
const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function n(t,n,e,r){let i,s,o;const h=n||[0],u=(e=e||0)>>>3,w=-1===r?3:0;for(i=0;i<t.length;i+=1)o=i+u,s=o>>>2,h.length<=s&&h.push(0),h[s]|=t[i]<<8*(w+r*(o%4));return {value:h,binLen:8*t.length+e}}function e(e,r,i){switch(r){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(e){case"HEX":return function(t,n,e){return function(t,n,e,r){let i,s,o,h;if(0!=t.length%2)throw new Error("String of HEX type must be in byte increments");const u=n||[0],w=(e=e||0)>>>3,c=-1===r?3:0;for(i=0;i<t.length;i+=2){if(s=parseInt(t.substr(i,2),16),isNaN(s))throw new Error("String of HEX type contains invalid characters");for(h=(i>>>1)+w,o=h>>>2;u.length<=o;)u.push(0);u[o]|=s<<8*(c+r*(h%4));}return {value:u,binLen:4*t.length+e}}(t,n,e,i)};case"TEXT":return function(t,n,e){return function(t,n,e,r,i){let s,o,h,u,w,c,f,a,l=0;const A=e||[0],E=(r=r||0)>>>3;if("UTF8"===n)for(f=-1===i?3:0,h=0;h<t.length;h+=1)for(s=t.charCodeAt(h),o=[],128>s?o.push(s):2048>s?(o.push(192|s>>>6),o.push(128|63&s)):55296>s||57344<=s?o.push(224|s>>>12,128|s>>>6&63,128|63&s):(h+=1,s=65536+((1023&s)<<10|1023&t.charCodeAt(h)),o.push(240|s>>>18,128|s>>>12&63,128|s>>>6&63,128|63&s)),u=0;u<o.length;u+=1){for(c=l+E,w=c>>>2;A.length<=w;)A.push(0);A[w]|=o[u]<<8*(f+i*(c%4)),l+=1;}else for(f=-1===i?2:0,a="UTF16LE"===n&&1!==i||"UTF16LE"!==n&&1===i,h=0;h<t.length;h+=1){for(s=t.charCodeAt(h),!0===a&&(u=255&s,s=u<<8|s>>>8),c=l+E,w=c>>>2;A.length<=w;)A.push(0);A[w]|=s<<8*(f+i*(c%4)),l+=2;}return {value:A,binLen:8*l+r}}(t,r,n,e,i)};case"B64":return function(n,e,r){return function(n,e,r,i){let s,o,h,u,w,c,f,a=0;const l=e||[0],A=(r=r||0)>>>3,E=-1===i?3:0,H=n.indexOf("=");if(-1===n.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(n=n.replace(/=/g,""),-1!==H&&H<n.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<n.length;o+=4){for(w=n.substr(o,4),u=0,h=0;h<w.length;h+=1)s=t.indexOf(w.charAt(h)),u|=s<<18-6*h;for(h=0;h<w.length-1;h+=1){for(f=a+A,c=f>>>2;l.length<=c;)l.push(0);l[c]|=(u>>>16-8*h&255)<<8*(E+i*(f%4)),a+=1;}}return {value:l,binLen:8*a+r}}(n,e,r,i)};case"BYTES":return function(t,n,e){return function(t,n,e,r){let i,s,o,h;const u=n||[0],w=(e=e||0)>>>3,c=-1===r?3:0;for(s=0;s<t.length;s+=1)i=t.charCodeAt(s),h=s+w,o=h>>>2,u.length<=o&&u.push(0),u[o]|=i<<8*(c+r*(h%4));return {value:u,binLen:8*t.length+e}}(t,n,e,i)};case"ARRAYBUFFER":try{}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t,e,r){return function(t,e,r,i){return n(new Uint8Array(t),e,r,i)}(t,e,r,i)};case"UINT8ARRAY":try{}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t,e,r){return n(t,e,r,i)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function r(n,e,r,i){switch(n){case"HEX":return function(t){return function(t,n,e,r){let i,s,o="";const h=n/8,u=-1===e?3:0;for(i=0;i<h;i+=1)s=t[i>>>2]>>>8*(u+e*(i%4)),o+="0123456789abcdef".charAt(s>>>4&15)+"0123456789abcdef".charAt(15&s);return r.outputUpper?o.toUpperCase():o}(t,e,r,i)};case"B64":return function(n){return function(n,e,r,i){let s,o,h,u,w,c="";const f=e/8,a=-1===r?3:0;for(s=0;s<f;s+=3)for(u=s+1<f?n[s+1>>>2]:0,w=s+2<f?n[s+2>>>2]:0,h=(n[s>>>2]>>>8*(a+r*(s%4))&255)<<16|(u>>>8*(a+r*((s+1)%4))&255)<<8|w>>>8*(a+r*((s+2)%4))&255,o=0;o<4;o+=1)c+=8*s+6*o<=e?t.charAt(h>>>6*(3-o)&63):i.b64Pad;return c}(n,e,r,i)};case"BYTES":return function(t){return function(t,n,e){let r,i,s="";const o=n/8,h=-1===e?3:0;for(r=0;r<o;r+=1)i=t[r>>>2]>>>8*(h+e*(r%4))&255,s+=String.fromCharCode(i);return s}(t,e,r)};case"ARRAYBUFFER":try{}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t){return function(t,n,e){let r;const i=n/8,s=new ArrayBuffer(i),o=new Uint8Array(s),h=-1===e?3:0;for(r=0;r<i;r+=1)o[r]=t[r>>>2]>>>8*(h+e*(r%4))&255;return s}(t,e,r)};case"UINT8ARRAY":try{}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t){return function(t,n,e){let r;const i=n/8,s=-1===e?3:0,o=new Uint8Array(i);for(r=0;r<i;r+=1)o[r]=t[r>>>2]>>>8*(s+e*(r%4))&255;return o}(t,e,r)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}const i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],s=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],o=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],h="Chosen SHA variant is not supported";function u(t,n){let e,r;const i=t.binLen>>>3,s=n.binLen>>>3,o=i<<3,h=4-i<<3;if(i%4!=0){for(e=0;e<s;e+=4)r=i+e>>>2,t.value[r]|=n.value[e>>>2]<<o,t.value.push(0),t.value[r+1]|=n.value[e>>>2]>>>h;return (t.value.length<<2)-4>=s+i&&t.value.pop(),{value:t.value,binLen:t.binLen+n.binLen}}return {value:t.value.concat(n.value),binLen:t.binLen+n.binLen}}function w(t){const n={outputUpper:!1,b64Pad:"=",outputLen:-1},e=t||{},r="Output length must be a multiple of 8";if(n.outputUpper=e.outputUpper||!1,e.b64Pad&&(n.b64Pad=e.b64Pad),e.outputLen){if(e.outputLen%8!=0)throw new Error(r);n.outputLen=e.outputLen;}else if(e.shakeLen){if(e.shakeLen%8!=0)throw new Error(r);n.outputLen=e.shakeLen;}if("boolean"!=typeof n.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof n.b64Pad)throw new Error("Invalid b64Pad formatting option");return n}function c(t,n,r,i){const s=t+" must include a value and format";if(!n){if(!i)throw new Error(s);return i}if(void 0===n.value||!n.format)throw new Error(s);return e(n.format,n.encoding||"UTF8",r)(n.value)}class f{constructor(t,n,e){const r=e||{};if(this.t=n,this.i=r.encoding||"UTF8",this.numRounds=r.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.s=t,this.o=[],this.h=0,this.u=!1,this.l=0,this.A=!1,this.H=[],this.S=[];}update(t){let n,e=0;const r=this.p>>>5,i=this.m(t,this.o,this.h),s=i.binLen,o=i.value,h=s>>>5;for(n=0;n<h;n+=r)e+this.p<=s&&(this.C=this.R(o.slice(n,n+r),this.C),e+=this.p);this.l+=e,this.o=o.slice(e>>>5),this.h=s%this.p,this.u=!0;}getHash(t,n){let e,i,s=this.U;const o=w(n);if(!0===this.v){if(-1===o.outputLen)throw new Error("Output length must be specified in options");s=o.outputLen;}const h=r(t,s,this.K,o);if(!0===this.A&&this.T)return h(this.T(o));for(i=this.F(this.o.slice(),this.h,this.l,this.g(this.C),s),e=1;e<this.numRounds;e+=1)!0===this.v&&s%32!=0&&(i[i.length-1]&=16777215>>>24-s%32),i=this.F(i,s,0,this.B(this.s),s);return h(i)}setHMACKey(t,n,r){if(!0!==this.L)throw new Error("Variant does not support HMAC");if(!0===this.u)throw new Error("Cannot set MAC key after calling update");const i=e(n,(r||{}).encoding||"UTF8",this.K);this.M(i(t));}M(t){const n=this.p>>>3,e=n/4-1;let r;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(!0===this.A)throw new Error("MAC key already set");for(n<t.binLen/8&&(t.value=this.F(t.value,t.binLen,0,this.B(this.s),this.U));t.value.length<=e;)t.value.push(0);for(r=0;r<=e;r+=1)this.H[r]=909522486^t.value[r],this.S[r]=1549556828^t.value[r];this.C=this.R(this.H,this.C),this.l=this.p,this.A=!0;}getHMAC(t,n){const e=w(n);return r(t,this.U,this.K,e)(this.k())}k(){let t;if(!1===this.A)throw new Error("Cannot call getHMAC without first setting MAC key");const n=this.F(this.o.slice(),this.h,this.l,this.g(this.C),this.U);return t=this.R(this.S,this.B(this.s)),t=this.F(n,this.U,this.p,t,this.U),t}}function a(t,n){return t<<n|t>>>32-n}function l(t,n){return t>>>n|t<<32-n}function A(t,n){return t>>>n}function E(t,n,e){return t^n^e}function H(t,n,e){return t&n^~t&e}function S(t,n,e){return t&n^t&e^n&e}function b(t){return l(t,2)^l(t,13)^l(t,22)}function p(t,n){const e=(65535&t)+(65535&n);return (65535&(t>>>16)+(n>>>16)+(e>>>16))<<16|65535&e}function d(t,n,e,r){const i=(65535&t)+(65535&n)+(65535&e)+(65535&r);return (65535&(t>>>16)+(n>>>16)+(e>>>16)+(r>>>16)+(i>>>16))<<16|65535&i}function m(t,n,e,r,i){const s=(65535&t)+(65535&n)+(65535&e)+(65535&r)+(65535&i);return (65535&(t>>>16)+(n>>>16)+(e>>>16)+(r>>>16)+(i>>>16)+(s>>>16))<<16|65535&s}function C(t){return l(t,7)^l(t,18)^A(t,3)}function y(t){return l(t,6)^l(t,11)^l(t,25)}function R(t){return [1732584193,4023233417,2562383102,271733878,3285377520]}function U(t,n){let e,r,i,s,o,h,u;const w=[];for(e=n[0],r=n[1],i=n[2],s=n[3],o=n[4],u=0;u<80;u+=1)w[u]=u<16?t[u]:a(w[u-3]^w[u-8]^w[u-14]^w[u-16],1),h=u<20?m(a(e,5),H(r,i,s),o,1518500249,w[u]):u<40?m(a(e,5),E(r,i,s),o,1859775393,w[u]):u<60?m(a(e,5),S(r,i,s),o,2400959708,w[u]):m(a(e,5),E(r,i,s),o,3395469782,w[u]),o=s,s=i,i=a(r,30),r=e,e=h;return n[0]=p(e,n[0]),n[1]=p(r,n[1]),n[2]=p(i,n[2]),n[3]=p(s,n[3]),n[4]=p(o,n[4]),n}function v(t,n,e,r){let i;const s=15+(n+65>>>9<<4),o=n+e;for(;t.length<=s;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[s]=4294967295&o,t[s-1]=o/4294967296|0,i=0;i<t.length;i+=16)r=U(t.slice(i,i+16),r);return r}class K extends f{constructor(t,n,r){if("SHA-1"!==t)throw new Error(h);super(t,n,r);const i=r||{};this.L=!0,this.T=this.k,this.K=-1,this.m=e(this.t,this.i,this.K),this.R=U,this.g=function(t){return t.slice()},this.B=R,this.F=v,this.C=[1732584193,4023233417,2562383102,271733878,3285377520],this.p=512,this.U=160,this.v=!1,i.hmacKey&&this.M(c("hmacKey",i.hmacKey,this.K));}}function T(t){let n;return n="SHA-224"==t?s.slice():o.slice(),n}function F(t,n){let e,r,s,o,h,u,w,c,f,a,E;const R=[];for(e=n[0],r=n[1],s=n[2],o=n[3],h=n[4],u=n[5],w=n[6],c=n[7],E=0;E<64;E+=1)R[E]=E<16?t[E]:d(l(U=R[E-2],17)^l(U,19)^A(U,10),R[E-7],C(R[E-15]),R[E-16]),f=m(c,y(h),H(h,u,w),i[E],R[E]),a=p(b(e),S(e,r,s)),c=w,w=u,u=h,h=p(o,f),o=s,s=r,r=e,e=p(f,a);var U;return n[0]=p(e,n[0]),n[1]=p(r,n[1]),n[2]=p(s,n[2]),n[3]=p(o,n[3]),n[4]=p(h,n[4]),n[5]=p(u,n[5]),n[6]=p(w,n[6]),n[7]=p(c,n[7]),n}class g extends f{constructor(t,n,r){if(!1==("SHA-224"===t||"SHA-256"===t))throw new Error(h);super(t,n,r);const i=r||{};this.T=this.k,this.L=!0,this.K=-1,this.m=e(this.t,this.i,this.K),this.R=F,this.g=function(t){return t.slice()},this.B=T,this.F=function(n,e,r,i){return function(t,n,e,r,i){let s,o;const h=15+(n+65>>>9<<4),u=n+e;for(;t.length<=h;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[h]=4294967295&u,t[h-1]=u/4294967296|0,s=0;s<t.length;s+=16)r=F(t.slice(s,s+16),r);return o="SHA-224"===i?[r[0],r[1],r[2],r[3],r[4],r[5],r[6]]:r,o}(n,e,r,i,t)},this.C=T(t),this.p=512,this.U="SHA-224"===t?224:256,this.v=!1,i.hmacKey&&this.M(c("hmacKey",i.hmacKey,this.K));}}class B{constructor(t,n){this.Y=t,this.N=n;}}function L(t,n){let e;return n>32?(e=64-n,new B(t.N<<n|t.Y>>>e,t.Y<<n|t.N>>>e)):0!==n?(e=32-n,new B(t.Y<<n|t.N>>>e,t.N<<n|t.Y>>>e)):t}function M(t,n){let e;return n<32?(e=32-n,new B(t.Y>>>n|t.N<<e,t.N>>>n|t.Y<<e)):(e=64-n,new B(t.N>>>n|t.Y<<e,t.Y>>>n|t.N<<e))}function k(t,n){return new B(t.Y>>>n,t.N>>>n|t.Y<<32-n)}function Y(t,n,e){return new B(t.Y&n.Y^t.Y&e.Y^n.Y&e.Y,t.N&n.N^t.N&e.N^n.N&e.N)}function N(t){const n=M(t,28),e=M(t,34),r=M(t,39);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}function I(t,n){let e,r;e=(65535&t.N)+(65535&n.N),r=(t.N>>>16)+(n.N>>>16)+(e>>>16);const i=(65535&r)<<16|65535&e;return e=(65535&t.Y)+(65535&n.Y)+(r>>>16),r=(t.Y>>>16)+(n.Y>>>16)+(e>>>16),new B((65535&r)<<16|65535&e,i)}function X(t,n,e,r){let i,s;i=(65535&t.N)+(65535&n.N)+(65535&e.N)+(65535&r.N),s=(t.N>>>16)+(n.N>>>16)+(e.N>>>16)+(r.N>>>16)+(i>>>16);const o=(65535&s)<<16|65535&i;return i=(65535&t.Y)+(65535&n.Y)+(65535&e.Y)+(65535&r.Y)+(s>>>16),s=(t.Y>>>16)+(n.Y>>>16)+(e.Y>>>16)+(r.Y>>>16)+(i>>>16),new B((65535&s)<<16|65535&i,o)}function z(t,n,e,r,i){let s,o;s=(65535&t.N)+(65535&n.N)+(65535&e.N)+(65535&r.N)+(65535&i.N),o=(t.N>>>16)+(n.N>>>16)+(e.N>>>16)+(r.N>>>16)+(i.N>>>16)+(s>>>16);const h=(65535&o)<<16|65535&s;return s=(65535&t.Y)+(65535&n.Y)+(65535&e.Y)+(65535&r.Y)+(65535&i.Y)+(o>>>16),o=(t.Y>>>16)+(n.Y>>>16)+(e.Y>>>16)+(r.Y>>>16)+(i.Y>>>16)+(s>>>16),new B((65535&o)<<16|65535&s,h)}function x(t,n){return new B(t.Y^n.Y,t.N^n.N)}function _(t){const n=M(t,19),e=M(t,61),r=k(t,6);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}function O(t){const n=M(t,1),e=M(t,8),r=k(t,7);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}function P(t){const n=M(t,14),e=M(t,18),r=M(t,41);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}const V=[new B(i[0],3609767458),new B(i[1],602891725),new B(i[2],3964484399),new B(i[3],2173295548),new B(i[4],4081628472),new B(i[5],3053834265),new B(i[6],2937671579),new B(i[7],3664609560),new B(i[8],2734883394),new B(i[9],1164996542),new B(i[10],1323610764),new B(i[11],3590304994),new B(i[12],4068182383),new B(i[13],991336113),new B(i[14],633803317),new B(i[15],3479774868),new B(i[16],2666613458),new B(i[17],944711139),new B(i[18],2341262773),new B(i[19],2007800933),new B(i[20],1495990901),new B(i[21],1856431235),new B(i[22],3175218132),new B(i[23],2198950837),new B(i[24],3999719339),new B(i[25],766784016),new B(i[26],2566594879),new B(i[27],3203337956),new B(i[28],1034457026),new B(i[29],2466948901),new B(i[30],3758326383),new B(i[31],168717936),new B(i[32],1188179964),new B(i[33],1546045734),new B(i[34],1522805485),new B(i[35],2643833823),new B(i[36],2343527390),new B(i[37],1014477480),new B(i[38],1206759142),new B(i[39],344077627),new B(i[40],1290863460),new B(i[41],3158454273),new B(i[42],3505952657),new B(i[43],106217008),new B(i[44],3606008344),new B(i[45],1432725776),new B(i[46],1467031594),new B(i[47],851169720),new B(i[48],3100823752),new B(i[49],1363258195),new B(i[50],3750685593),new B(i[51],3785050280),new B(i[52],3318307427),new B(i[53],3812723403),new B(i[54],2003034995),new B(i[55],3602036899),new B(i[56],1575990012),new B(i[57],1125592928),new B(i[58],2716904306),new B(i[59],442776044),new B(i[60],593698344),new B(i[61],3733110249),new B(i[62],2999351573),new B(i[63],3815920427),new B(3391569614,3928383900),new B(3515267271,566280711),new B(3940187606,3454069534),new B(4118630271,4000239992),new B(116418474,1914138554),new B(174292421,2731055270),new B(289380356,3203993006),new B(460393269,320620315),new B(685471733,587496836),new B(852142971,1086792851),new B(1017036298,365543100),new B(1126000580,2618297676),new B(1288033470,3409855158),new B(1501505948,4234509866),new B(1607167915,987167468),new B(1816402316,1246189591)];function Z(t){let n;return n="SHA-384"===t?[new B(3418070365,s[0]),new B(1654270250,s[1]),new B(2438529370,s[2]),new B(355462360,s[3]),new B(1731405415,s[4]),new B(41048885895,s[5]),new B(3675008525,s[6]),new B(1203062813,s[7])]:[new B(o[0],4089235720),new B(o[1],2227873595),new B(o[2],4271175723),new B(o[3],1595750129),new B(o[4],2917565137),new B(o[5],725511199),new B(o[6],4215389547),new B(o[7],327033209)],n}function j(t,n){let e,r,i,s,o,h,u,w,c,f,a,l;const A=[];for(e=n[0],r=n[1],i=n[2],s=n[3],o=n[4],h=n[5],u=n[6],w=n[7],a=0;a<80;a+=1)a<16?(l=2*a,A[a]=new B(t[l],t[l+1])):A[a]=X(_(A[a-2]),A[a-7],O(A[a-15]),A[a-16]),c=z(w,P(o),(H=h,S=u,new B((E=o).Y&H.Y^~E.Y&S.Y,E.N&H.N^~E.N&S.N)),V[a],A[a]),f=I(N(e),Y(e,r,i)),w=u,u=h,h=o,o=I(s,c),s=i,i=r,r=e,e=I(c,f);var E,H,S;return n[0]=I(e,n[0]),n[1]=I(r,n[1]),n[2]=I(i,n[2]),n[3]=I(s,n[3]),n[4]=I(o,n[4]),n[5]=I(h,n[5]),n[6]=I(u,n[6]),n[7]=I(w,n[7]),n}class q extends f{constructor(t,n,r){if(!1==("SHA-384"===t||"SHA-512"===t))throw new Error(h);super(t,n,r);const i=r||{};this.T=this.k,this.L=!0,this.K=-1,this.m=e(this.t,this.i,this.K),this.R=j,this.g=function(t){return t.slice()},this.B=Z,this.F=function(n,e,r,i){return function(t,n,e,r,i){let s,o;const h=31+(n+129>>>10<<5),u=n+e;for(;t.length<=h;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[h]=4294967295&u,t[h-1]=u/4294967296|0,s=0;s<t.length;s+=32)r=j(t.slice(s,s+32),r);return o="SHA-384"===i?[(r=r)[0].Y,r[0].N,r[1].Y,r[1].N,r[2].Y,r[2].N,r[3].Y,r[3].N,r[4].Y,r[4].N,r[5].Y,r[5].N]:[r[0].Y,r[0].N,r[1].Y,r[1].N,r[2].Y,r[2].N,r[3].Y,r[3].N,r[4].Y,r[4].N,r[5].Y,r[5].N,r[6].Y,r[6].N,r[7].Y,r[7].N],o}(n,e,r,i,t)},this.C=Z(t),this.p=1024,this.U="SHA-384"===t?384:512,this.v=!1,i.hmacKey&&this.M(c("hmacKey",i.hmacKey,this.K));}}const D=[new B(0,1),new B(0,32898),new B(2147483648,32906),new B(2147483648,2147516416),new B(0,32907),new B(0,2147483649),new B(2147483648,2147516545),new B(2147483648,32777),new B(0,138),new B(0,136),new B(0,2147516425),new B(0,2147483658),new B(0,2147516555),new B(2147483648,139),new B(2147483648,32905),new B(2147483648,32771),new B(2147483648,32770),new B(2147483648,128),new B(0,32778),new B(2147483648,2147483658),new B(2147483648,2147516545),new B(2147483648,32896),new B(0,2147483649),new B(2147483648,2147516424)],G=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];function J(t){let n;const e=[];for(n=0;n<5;n+=1)e[n]=[new B(0,0),new B(0,0),new B(0,0),new B(0,0),new B(0,0)];return e}function Q(t){let n;const e=[];for(n=0;n<5;n+=1)e[n]=t[n].slice();return e}function W(t,n){let e,r,i,s;const o=[],h=[];if(null!==t)for(r=0;r<t.length;r+=2)n[(r>>>1)%5][(r>>>1)/5|0]=x(n[(r>>>1)%5][(r>>>1)/5|0],new B(t[r+1],t[r]));for(e=0;e<24;e+=1){for(s=J(),r=0;r<5;r+=1)o[r]=(u=n[r][0],w=n[r][1],c=n[r][2],f=n[r][3],a=n[r][4],new B(u.Y^w.Y^c.Y^f.Y^a.Y,u.N^w.N^c.N^f.N^a.N));for(r=0;r<5;r+=1)h[r]=x(o[(r+4)%5],L(o[(r+1)%5],1));for(r=0;r<5;r+=1)for(i=0;i<5;i+=1)n[r][i]=x(n[r][i],h[r]);for(r=0;r<5;r+=1)for(i=0;i<5;i+=1)s[i][(2*r+3*i)%5]=L(n[r][i],G[r][i]);for(r=0;r<5;r+=1)for(i=0;i<5;i+=1)n[r][i]=x(s[r][i],new B(~s[(r+1)%5][i].Y&s[(r+2)%5][i].Y,~s[(r+1)%5][i].N&s[(r+2)%5][i].N));n[0][0]=x(n[0][0],D[e]);}var u,w,c,f,a;return n}function $(t){let n,e,r=0;const i=[0,0],s=[4294967295&t,t/4294967296&2097151];for(n=6;n>=0;n--)e=s[n>>2]>>>8*n&255,0===e&&0===r||(i[r+1>>2]|=e<<8*(r+1),r+=1);return r=0!==r?r:1,i[0]|=r,{value:r+1>4?i:[i[0]],binLen:8+8*r}}function tt(t){return u($(t.binLen),t)}function nt(t,n){let e,r=$(n);r=u(r,t);const i=n>>>2,s=(i-r.value.length%i)%i;for(e=0;e<s;e++)r.value.push(0);return r.value}class et extends f{constructor(t,n,r){let i=6,s=0;super(t,n,r);const o=r||{};if(1!==this.numRounds){if(o.kmacKey||o.hmacKey)throw new Error("Cannot set numRounds with MAC");if("CSHAKE128"===this.s||"CSHAKE256"===this.s)throw new Error("Cannot set numRounds for CSHAKE variants")}switch(this.K=1,this.m=e(this.t,this.i,this.K),this.R=W,this.g=Q,this.B=J,this.C=J(),this.v=!1,t){case"SHA3-224":this.p=s=1152,this.U=224,this.L=!0,this.T=this.k;break;case"SHA3-256":this.p=s=1088,this.U=256,this.L=!0,this.T=this.k;break;case"SHA3-384":this.p=s=832,this.U=384,this.L=!0,this.T=this.k;break;case"SHA3-512":this.p=s=576,this.U=512,this.L=!0,this.T=this.k;break;case"SHAKE128":i=31,this.p=s=1344,this.U=-1,this.v=!0,this.L=!1,this.T=null;break;case"SHAKE256":i=31,this.p=s=1088,this.U=-1,this.v=!0,this.L=!1,this.T=null;break;case"KMAC128":i=4,this.p=s=1344,this.I(r),this.U=-1,this.v=!0,this.L=!1,this.T=this.X;break;case"KMAC256":i=4,this.p=s=1088,this.I(r),this.U=-1,this.v=!0,this.L=!1,this.T=this.X;break;case"CSHAKE128":this.p=s=1344,i=this._(r),this.U=-1,this.v=!0,this.L=!1,this.T=null;break;case"CSHAKE256":this.p=s=1088,i=this._(r),this.U=-1,this.v=!0,this.L=!1,this.T=null;break;default:throw new Error(h)}this.F=function(t,n,e,r,o){return function(t,n,e,r,i,s,o){let h,u,w=0;const c=[],f=i>>>5,a=n>>>5;for(h=0;h<a&&n>=i;h+=f)r=W(t.slice(h,h+f),r),n-=i;for(t=t.slice(h),n%=i;t.length<f;)t.push(0);for(h=n>>>3,t[h>>2]^=s<<h%4*8,t[f-1]^=2147483648,r=W(t,r);32*c.length<o&&(u=r[w%5][w/5|0],c.push(u.N),!(32*c.length>=o));)c.push(u.Y),w+=1,0==64*w%i&&(W(null,r),w=0);return c}(t,n,0,r,s,i,o)},o.hmacKey&&this.M(c("hmacKey",o.hmacKey,this.K));}_(t,n){const e=function(t){const n=t||{};return {funcName:c("funcName",n.funcName,1,{value:[],binLen:0}),customization:c("Customization",n.customization,1,{value:[],binLen:0})}}(t||{});n&&(e.funcName=n);const r=u(tt(e.funcName),tt(e.customization));if(0!==e.customization.binLen||0!==e.funcName.binLen){const t=nt(r,this.p>>>3);for(let n=0;n<t.length;n+=this.p>>>5)this.C=this.R(t.slice(n,n+(this.p>>>5)),this.C),this.l+=this.p;return 4}return 31}I(t){const n=function(t){const n=t||{};return {kmacKey:c("kmacKey",n.kmacKey,1),funcName:{value:[1128353099],binLen:32},customization:c("Customization",n.customization,1,{value:[],binLen:0})}}(t||{});this._(t,n.funcName);const e=nt(tt(n.kmacKey),this.p>>>3);for(let t=0;t<e.length;t+=this.p>>>5)this.C=this.R(e.slice(t,t+(this.p>>>5)),this.C),this.l+=this.p;this.A=!0;}X(t){const n=u({value:this.o.slice(),binLen:this.h},function(t){let n,e,r=0;const i=[0,0],s=[4294967295&t,t/4294967296&2097151];for(n=6;n>=0;n--)e=s[n>>2]>>>8*n&255,0===e&&0===r||(i[r>>2]|=e<<8*r,r+=1);return r=0!==r?r:1,i[r>>2]|=r<<8*r,{value:r+1>4?i:[i[0]],binLen:8+8*r}}(t.outputLen));return this.F(n.value,n.binLen,this.l,this.g(this.C),t.outputLen)}}class jsSHA{constructor(t,n,e){if("SHA-1"==t)this.O=new K(t,n,e);else if("SHA-224"==t||"SHA-256"==t)this.O=new g(t,n,e);else if("SHA-384"==t||"SHA-512"==t)this.O=new q(t,n,e);else{if("SHA3-224"!=t&&"SHA3-256"!=t&&"SHA3-384"!=t&&"SHA3-512"!=t&&"SHAKE128"!=t&&"SHAKE256"!=t&&"CSHAKE128"!=t&&"CSHAKE256"!=t&&"KMAC128"!=t&&"KMAC256"!=t)throw new Error(h);this.O=new et(t,n,e);}}update(t){this.O.update(t);}getHash(t,n){return this.O.getHash(t,n)}setHMACKey(t,n,e){this.O.setHMACKey(t,n,e);}getHMAC(t,n){return this.O.getHMAC(t,n)}}
//# sourceMappingURL=sha.mjs.map

var AGrant = /** @class */ (function () {
	function AGrant(_store, providerUrl) {
			this._store = _store;
			this.providerUrl = providerUrl;
	}
	AGrant.prototype.setConfig = function (config) {
			this.vaildConfig(config);
			this.config = config;
	};
	AGrant.prototype.setStore = function (_store) {
			this._store = _store;
	};
	AGrant.prototype.vaildConfig = function (config) {
			if (!config.client_id) {
					throw new Error("Configuration missing [client_id]");
			}
			if (!config.response_type) {
					throw new Error("Configuration missing [response_type]");
			}
			if (!config.redirect_url) {
					throw new Error("Configuration missing [redirect_url]");
			}
	};
	AGrant.prototype.setProviderUrl = function (url) {
			this.providerUrl = url;
	};
	return AGrant;
}());
//# sourceMappingURL=IGrant.js.map

var AuthorizationCodeGrant = /** @class */ (function (_super) {
	__extends(AuthorizationCodeGrant, _super);
	function AuthorizationCodeGrant() {
			return _super !== null && _super.apply(this, arguments) || this;
	}
	AuthorizationCodeGrant.prototype.handleResponse = function (response) {
			var tokenRequest = {
					grant_type: "authorization_code",
					code: response.code,
					redirect_uri: this.config.redirect_url,
					client_id: this.config.client_id
			};
			if (!this.config.client_secret) {
					var verifier = this._store.verifier;
					tokenRequest = __assign(__assign({}, tokenRequest), { code_verifier: Base64EncodeUrl(verifier || "") });
			}
			else {
					tokenRequest = __assign(__assign({}, tokenRequest), { client_secret: this.config.client_secret });
			}
			AuthDebug.log("Receving tokenRequest in callback", tokenRequest);
			return fetch(this.providerUrl + "/oauth/token", {
					method: "post",
					headers: { "content-type": "application/x-www-form-urlencoded", Accept: "application/json" },
					body: encodeQS(tokenRequest)
			}).then(function (res) {
					return res.json();
			});
	};
	AuthorizationCodeGrant.prototype.canHandleResponse = function (response) {
			return response.hasOwnProperty("code");
	};
	AuthorizationCodeGrant.prototype.getloginUrl = function () {
			this._store.localState = epoch();
			var tokenRequest = {
					state: this._store.localState,
					response_type: this.config.response_type,
					redirect_uri: this.config.redirect_url,
					client_id: this.config.client_id,
					scope: this.config.scope
			};
			if (!this.config.client_secret) {
					var verifier = generateCodeVerifier();
					if (!["S256", "plain"].includes(this.config.code_challenge_method)) {
							throw new ReferenceError("Not support code challenge method " + this.config.code_challenge_method);
					}
					if (this.config.code_challenge_method == "S256") {
							var shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
							shaObj.update(verifier);
							var challenge = shaObj.getHash("B64", { b64Pad: "=" });
							this._store.verifier = verifier;
							this._store.challenge = challenge;
					}
					else {
							this._store.verifier = verifier;
							this._store.challenge = verifier;
					}
					tokenRequest = __assign(__assign({}, tokenRequest), { code_challenge: Base64EncodeUrl(this._store.challenge), code_challenge_method: this.config.code_challenge_method });
			}
			var authorizeEndpoint = this.providerUrl + "/oauth/authorize";
			return createUrl(authorizeEndpoint, tokenRequest);
	};
	AuthorizationCodeGrant.prototype.canHandleRequest = function (config) {
			return config.response_type == "code";
	};
	return AuthorizationCodeGrant;
}(AGrant));
var encodeQS = function (params) {
	var res = "";
	var k, i = 0;
	for (k in params) {
			res += (i++ === 0 ? "" : "&") + encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
	}
	return res;
};
function generateCodeVerifier() {
	return generateRandomString(128);
}
function generateRandomString(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
	for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
function Base64EncodeUrl(str) {
	return str
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/\=+$/, "");
}
//# sourceMappingURL=AuthorizationCodeGrant.js.map

//# sourceMappingURL=index.js.map

var ALoader = /** @class */ (function () {
	function ALoader(url, config, option) {
			if (option === void 0) { option = defaultOption; }
			this._url = "";
			this._option = defaultOption;
			this._url = url;
			this._config = config;
			this._option = option;
	}
	ALoader.prototype.setConfig = function (config) {
			this._config = config;
	};
	Object.defineProperty(ALoader.prototype, "config", {
			get: function () {
					return this._config;
			},
			enumerable: true,
			configurable: true
	});
	ALoader.prototype.setUrl = function (url) {
			this._url = url;
	};
	Object.defineProperty(ALoader.prototype, "url", {
			get: function () {
					return this._url;
			},
			enumerable: true,
			configurable: true
	});
	ALoader.prototype.setOption = function (option) {
			this._option = option;
	};
	Object.defineProperty(ALoader.prototype, "option", {
			get: function () {
					return this._option;
			},
			enumerable: true,
			configurable: true
	});
	return ALoader;
}());
var defaultOption = {
	name: "oauth"
};
//# sourceMappingURL=ALoader.js.map

var HTTPRedirectLoader = /** @class */ (function (_super) {
	__extends(HTTPRedirectLoader, _super);
	function HTTPRedirectLoader() {
			return _super !== null && _super.apply(this, arguments) || this;
	}
	HTTPRedirectLoader.prototype.execute = function () {
			var _this = this;
			return new Promise(function (resolve, reject) {
					window.location.href = _this.url;
			});
	};
	return HTTPRedirectLoader;
}(ALoader));
//# sourceMappingURL=HTTPRedirectLoader.js.map

var NewWindownLoader = /** @class */ (function (_super) {
	__extends(NewWindownLoader, _super);
	function NewWindownLoader() {
			return _super !== null && _super.apply(this, arguments) || this;
	}
	NewWindownLoader.prototype.execute = function () {
			var _this = this;
			var tabWindow = window.open(this.url, "_blank");
			if (!tabWindow) {
					return Promise.reject(new ReferenceError("We were unable to open the new tab, its likely that the request was blocked."));
			}
			tabWindow.name = this.option.name;
			tabWindow.focus();
			return new Promise(function (resolve) {
					var checker = setInterval(function () {
							try {
									if (!tabWindow.closed) {
											var redirectUrl = _this.config.redirect_url;
											if (tabWindow.location.href.indexOf(redirectUrl) !== 0)
													return;
											var returnurl = tabWindow.location.href;
											tabWindow.close();
											resolve(returnurl);
									}
									clearInterval(checker);
									setTimeout(resolve);
							}
							catch (e) { }
					}, 100);
			});
	};
	return NewWindownLoader;
}(ALoader));
//# sourceMappingURL=NewWindownLoader.js.map

var PopupLoader = /** @class */ (function (_super) {
	__extends(PopupLoader, _super);
	function PopupLoader() {
			return _super !== null && _super.apply(this, arguments) || this;
	}
	PopupLoader.prototype.setOption = function (option) {
			this._option = Object.assign(defaultOption$1, option);
	};
	PopupLoader.prototype._getSetting = function () {
			var _a = this.option, height = _a.height, width = _a.width;
			var top = window.innerHeight / 2 - height / 2 + window.screenTop;
			var left = window.innerWidth / 2 - width / 2 + window.screenLeft;
			return "height=" + height + ", width=" + width + ", status=yes, toolbar=no, menubar=no, location=no, top=" + top + ", left=" + left;
	};
	PopupLoader.prototype.execute = function () {
			var _this = this;
			var popupWindow = window.open(this.url, name, this._getSetting());
			if (!popupWindow) {
					return Promise.reject(new ReferenceError("We were unable to open the popup window, its likely that the request was blocked."));
			}
			popupWindow.focus();
			return new Promise(function (resolve) {
					var checker = setInterval(function () {
							try {
									if (!popupWindow.closed) {
											var redirectUrl = _this.config.redirect_url;
											AuthDebug.log("redirectUrl popup", popupWindow.location);
											if (popupWindow.location.href.indexOf(redirectUrl) !== 0)
													return;
											var returnurl = popupWindow.location.href;
											AuthDebug.log("returnurl popup", returnurl);
											popupWindow.close();
											resolve(returnurl);
									}
									clearInterval(checker);
									setTimeout(resolve);
							}
							catch (e) { }
					}, 100);
			});
	};
	return PopupLoader;
}(ALoader));
var defaultOption$1 = {
	name: "oauth",
	height: 600,
	width: 400
};
//# sourceMappingURL=PopupLoader.js.map

var LoaderFactory = /** @class */ (function () {
	function LoaderFactory() {
	}
	LoaderFactory.getLoader = function (type) {
			if (type === void 0) { type = "popup"; }
			var loader = LoaderFactory.defautFactory[type];
			if (!loader) {
					throw ReferenceError("Unknown " + type);
			}
			return loader;
	};
	LoaderFactory.defautFactory = {
			popup: function (url, config) { return new PopupLoader(url, config); },
			newwindown: function (url, config) { return new NewWindownLoader(url, config); },
			httpredirect: function (url, config) { return new HTTPRedirectLoader(url, config); }
	};
	return LoaderFactory;
}());
//# sourceMappingURL=LoaderFactory.js.map

//# sourceMappingURL=index.js.map

var AuthStore = /** @class */ (function () {
	function AuthStore(config) {
			this.config = config;
			this.store = {};
	}
	Object.defineProperty(AuthStore.prototype, "authOption", {
			get: function () {
					if (this.store.authOption) {
							return this.store.authOption;
					}
					return JSON.parse(this.getItem("auth.config.oauthoption") || "{}");
			},
			set: function (config) {
					if (Object.keys(config).length > 0) {
							this.store.authOption = JSON.parse(JSON.stringify(config));
							this.saveItem("auth.config.oauthoption", JSON.stringify(config));
					}
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "authConfig", {
			get: function () {
					if (this.store.authConfig) {
							return this.store.authConfig;
					}
					return JSON.parse(this.getItem("auth.config.authconfig") || "{}");
			},
			set: function (config) {
					if (Object.keys(config).length > 0) {
							this.store.authConfig = JSON.parse(JSON.stringify(config));
							this.saveItem("auth.config.authconfig", JSON.stringify(config));
					}
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "tokenType", {
			get: function () {
					if (this.store.tokenType) {
							return this.store.tokenType;
					}
					return this.getItem("auth.token.token-type");
			},
			set: function (tokenType) {
					this.store.tokenType = tokenType;
					this.saveItem("auth.token.token-type", tokenType);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "expiration", {
			get: function () {
					if (this.store.expiration) {
							return this.store.expiration;
					}
					var expiration = this.getItem("auth.token.expiration");
					return expiration ? Number(expiration) : null;
			},
			set: function (expiration) {
					this.store.expiration = expiration;
					this.saveItem("auth.token.expiration", expiration + "");
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "accessToken", {
			get: function () {
					if (this.store.accessToken) {
							return this.store.accessToken;
					}
					return this.getItem("auth.token.access-token");
			},
			set: function (accessToken) {
					this.store.accessToken = accessToken;
					this.saveItem("auth.token.access-token", accessToken);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "refreshToken", {
			get: function () {
					if (this.store.refreshToken) {
							return this.store.refreshToken;
					}
					return this.getItem("auth.token.refresh-token");
			},
			set: function (refreshToken) {
					this.store.refreshToken = refreshToken;
					this.saveItem("auth.token.refresh-token", refreshToken);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "idToken", {
			get: function () {
					if (this.store.idToken) {
							return this.store.idToken;
					}
					return this.getItem("auth.id-token");
			},
			set: function (idToken) {
					this.store.idToken = idToken;
					this.saveItem("auth.id-token", idToken);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "verifier", {
			get: function () {
					if (this.store.verifier) {
							return this.store.verifier;
					}
					return this.getItem("auth.token.verifier");
			},
			set: function (verifier) {
					this.store.verifier = verifier;
					this.saveItem("auth.token.verifier", verifier);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "challenge", {
			get: function () {
					if (this.store.challenge) {
							return this.store.challenge;
					}
					return this.getItem("auth.token.challenge");
			},
			set: function (challenge) {
					this.store.challenge = challenge;
					this.saveItem("auth.token.challenge", challenge);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "code", {
			get: function () {
					if (this.store.code) {
							return this.store.code;
					}
					return this.getItem("auth.code");
			},
			set: function (code) {
					this.store.code = code;
					this.saveItem("auth.code", code);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "localState", {
			get: function () {
					if (this.store.localState) {
							return this.store.localState;
					}
					return this.getItem("auth.local-state");
			},
			set: function (localState) {
					this.store.localState = localState;
					this.saveItem("auth.local-state", localState);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "error", {
			get: function () {
					if (this.store.error) {
							return this.store.error;
					}
					return this.getItem("auth.error");
			},
			set: function (error) {
					this.store.error = error;
					this.saveItem("auth.error", error);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "state", {
			get: function () {
					if (this.store.state) {
							return this.store.state;
					}
					return this.getItem("auth.state");
			},
			set: function (state) {
					this.store.state = state;
					this.saveItem("auth.state", state);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "redirectUrl", {
			get: function () {
					if (this.store.redirectUrl) {
							return this.store.redirectUrl;
					}
					return this.getItem("auth.redirect-url");
			},
			set: function (redirectUrl) {
					this.store.redirectUrl = redirectUrl;
					this.saveItem("auth.redirect-url", redirectUrl);
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "storageType", {
			get: function () {
					if (this.store.storageType) {
							return this.store.storageType;
					}
					return this.config.storageType;
			},
			enumerable: true,
			configurable: true
	});
	Object.defineProperty(AuthStore.prototype, "storage", {
			get: function () {
					return this.getStorage(this.config.storageType);
			},
			enumerable: true,
			configurable: true
	});
	AuthStore.prototype.getItem = function (key, overrideStorageType) {
			var value;
			var storage = overrideStorageType ? this.getStorage(overrideStorageType) : this.storage;
			value = storage.getItem(key) || "";
			return value || null;
	};
	AuthStore.prototype.saveItem = function (key, value, overrideStorageType) {
			var storage = overrideStorageType ? this.getStorage(overrideStorageType) : this.storage;
			if (value == null || value == undefined) {
					storage.removeItem(key);
			}
			else {
					storage.setItem(key, value);
			}
	};
	AuthStore.prototype.getStorage = function (storageType) {
			switch (storageType) {
					case "local":
							return localStorage;
					case "session":
							return sessionStorage;
					case "cookie":
							return {
									getItem: function (key) {
											return getCookie(key);
									},
									setItem: function (key, value) {
											return setCookie(key, value, 60 * 60);
									},
									removeItem: function (key) {
											return setCookie(key, "", 1);
									}
							};
					default:
							throw new ReferenceError("Unknown Storage Type ({storageType})");
			}
	};
	AuthStore.prototype.clear = function () {
			var regex = this.authOption.rememberme
					? new RegExp(/^auth(?!.token)\./)
					: new RegExp(/^auth\./);
			for (var key in localStorage) {
					if (key.match(regex)) {
							localStorage.removeItem(key);
					}
			}
			for (var key in sessionStorage) {
					if (key.match(regex)) {
							sessionStorage.removeItem(key);
					}
			}
	};
	AuthStore.prototype.parseParams = function (callbackUrl) {
			if (callbackUrl) {
					var params = getResponseFromURL(callbackUrl);
					AuthDebug.log("Hash detected, parsing...", params);
					for (var property in params) {
							this.parse(property, params[property]);
					}
					AuthDebug.log("Removing hash...");
					history.pushState("", document.title, location.href.replace(location.search, "").replace(location.hash, ""));
					return params;
			}
	};
	AuthStore.prototype.passObject = function (data) {
			var _this = this;
			Object.keys(data).forEach(function (key) {
					_this.parse(key, data[key]);
			});
	};
	AuthStore.prototype.parse = function (key, value) {
			switch (key) {
					case "token_type":
							this.tokenType = value;
							break;
					case "expires_in":
							this.expiration = Date.now() + Number(value) * 1000;
							break;
					case "access_token":
							this.accessToken = value;
							break;
					case "refresh_token":
							this.refreshToken = value;
							break;
					case "id_token":
							this.idToken = value;
							break;
					case "code":
							this.code = value;
							break;
					case "state":
							this.state = value;
							break;
					case "error":
							this.error = value;
							break;
			}
	};
	return AuthStore;
}());
function setCookie(cname, cvalue, exsecond) {
	var d = new Date();
	d.setTime(d.getTime() + exsecond);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
					c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
			}
	}
	return "";
}
//# sourceMappingURL=store.js.map

var defaultOauthOption = {
	providerUrl: "http://localhost:8000",
	debug: true,
	storageType: "local",
	rememberme: true
};
var Oauth = /** @class */ (function () {
	function Oauth(config, option) {
			this.grants = [];
			this.providerUrl = "";
			this.promises = {};
			this.setStore(option && option.storageType);
			this.setOption(option || this.store.authOption);
			this.setDefaultGrant();
			this.setConfig(config || this.store.authConfig);
			if (!this.store.authConfig) {
					throw new ReferenceError("A config must be provided.");
			}
	}
	Oauth.prototype.setDefaultGrant = function () {
			this.grants.push(new AuthorizationCodeGrant(this.store, this.providerUrl));
	};
	Oauth.prototype.setGrant = function (grant) {
			grant.setProviderUrl(this.providerUrl);
			this.grants.push(grant);
	};
	Oauth.prototype.setOption = function (option) {
			var _this = this;
			option = Object.assign(defaultOauthOption, option);
			AuthDebug.log("Set Oauth Option", option);
			this.providerUrl = option.providerUrl;
			this.grants.forEach(function (grant) { return grant.setProviderUrl(_this.providerUrl); });
			AuthDebug.isDebug = !!option.debug;
			this.setStore(option.storageType);
			this.store.authOption = option;
			this.setAuth(option);
	};
	Oauth.prototype.setStore = function (storageType) {
			var _this = this;
			if (storageType === void 0) { storageType = "local"; }
			if (!this.store || this.store.storageType != storageType) {
					this.store = new AuthStore({ storageType: storageType });
					this.grants.forEach(function (grant) { return grant.setStore(_this.store); });
					if (this.auth)
							this.auth.setStore(this.store);
			}
	};
	Oauth.prototype.setAuth = function (option) {
			if (this.auth) {
					this.auth.setConfig({ providerUrl: option.providerUrl });
			}
			else {
					this.auth = new AuthProfile({ providerUrl: option.providerUrl }, this.store);
			}
	};
	Oauth.prototype.setConfig = function (config) {
			AuthDebug.log("Set Oauth config", config);
			this.store.authConfig = Object.assign({}, config);
			this._grant = this.getGrantHandle();
	};
	Oauth.prototype.getloginUrl = function () {
			this.store.localState = epoch();
			var authorizeEndpoint = this.providerUrl + "/oauth/authorize";
			return createUrl(authorizeEndpoint, {
					state: this.store.localState,
					response_type: this.store.authConfig.response_type,
					redirect_uri: this.store.authConfig.redirect_url,
					client_id: this.store.authConfig.client_id,
					scope: this.store.authConfig.scope
			});
	};
	Oauth.prototype.getGrantHandle = function () {
			var _this = this;
			AuthDebug.log("Config when get grant", this.store.authConfig);
			var grant = this.grants.find(function (x) { return x.canHandleRequest(_this.store.authConfig); });
			if (!grant) {
					throw new ReferenceError("Invaild response_type");
			}
			grant.setConfig(this.store.authConfig);
			return grant;
	};
	Oauth.prototype.getLoaderHandle = function (type) {
			if (type === void 0) { type = "httpredirect"; }
			return LoaderFactory.getLoader(type);
	};
	Oauth.prototype.login = function (type) {
			var _this = this;
			if (this.promises.login) {
					return this.promises.login;
			}
			var loader = this.getLoaderHandle(type);
			this.promises.login = loader(this._grant.getloginUrl(), this.store.authConfig)
					.execute()
					.then(function (callbackUrl) {
					_this.promises.login = null;
					AuthDebug.log("callbackUrl", callbackUrl);
					return _this.callback(callbackUrl);
			})
					.catch(function (e) {
					_this.promises.login = null;
					throw e;
			});
			return this.promises.login;
	};
	Oauth.prototype.callback = function (data) {
			return __awaiter(this, void 0, void 0, function () {
					var response, handle, result;
					return __generator(this, function (_a) {
							switch (_a.label) {
									case 0:
											response = null;
											if (!this.store.authConfig) {
													this.setConfig(this.store.authConfig);
											}
											handle = handleCallback[typeof data];
											if (!handle) {
													throw new ReferenceError("Invaild data callback");
											}
											response = handle.handle(data, this.store);
											if (this.store.state != this.store.localState) {
													this.store.clear();
													throw new ReferenceError("Invaild request");
											}
											AuthDebug.log("Receving response in callback", response);
											return [4 /*yield*/, this._grant.handleResponse(response)];
									case 1:
											result = _a.sent();
											this.setToken(result);
											this.store.clear();
											return [2 /*return*/, result];
							}
					});
			});
	};
	Oauth.prototype.setToken = function (result) {
			this.store.passObject(result);
	};
	return Oauth;
}());
var handleCallback = {
	string: { handle: function (data, store) { return store.parseParams(data); } },
	undefined: { handle: function (data, store) { return store.parseParams(window.location.href); } },
	object: { handle: function (data, store) { return data; } }
};

export default Oauth;
export { defaultOauthOption, AuthorizationCodeGrant, AGrant };
//# sourceMappingURL=oauth-skymap.es5.js.map
