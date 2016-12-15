// Copyright 2016 Google Inc.
//
//     Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
//     Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
//     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.


let _WebVRUI_css_injected = false;
const _logo_scale = 0.8;

/**
 * the css class prefix,
 * every element has a class pattern if "webvr-ui-${name}"
 * @type {string}
 */
export const cssPrefix = "webvr-ui";

/**
 * @private
 * generate the innerHTML for the button
 * @param {Number} height
 * @param {Number} fontSize
 */
const generateInnerHTML = (height, fontSize)=>{
    const svgString = generateVRIcon(height,fontSize);

    return `<button class="${cssPrefix}-button">
          <div class="${cssPrefix}-title"></div>
          <div class="${cssPrefix}-logo" >${svgString}</div>
        </button>`;
};

/**
 * inject the CSS string to the head of the document
 * @param {string} cssText the css to inject
 */
export const injectCSS = (cssText)=>{
    // Make sure its only injected once
    if(!_WebVRUI_css_injected) {
        _WebVRUI_css_injected = true;

        // Create the css
        const style = document.createElement("style");
        style.innerHTML = cssText;

        var head = document.getElementsByTagName("head")[0];
        head.insertBefore(style,head.firstChild);
    }
};

/**
 * generate DOM element view for button
 * @returns {HTMLElement}
 * @param options
 */
export const createDefaultView = (options)=>{
    const fontSize = options.height / 3;
    if(options.injectCSS){
        injectCSS(generateCSS(options, fontSize));
    }

    const el = document.createElement("div");
    el.innerHTML = generateInnerHTML(options.height, fontSize, options.theme);
    var domElement = el.firstChild;


    // let __animating = false;
    // domElement.addEventListener('click', (e)=>{
    //     if(!__animating) {
    //         __animating = true;
    //         e.stopPropagation();
    //         domElement.classList.add("animate");
    //         setTimeout(()=> {
    //             domElement.click();
    //         }, 800);
    //
    //         setTimeout(()=>{
    //             domElement.classList.remove("animate");
    //             __animating = false;
    //         },2000)
    //     }
    // }, true);

    return domElement;
};


/**
 * generate the VR Icons SVG
 * @param {Number} height
 * @param fontSize
 * @param cutout
 * @returns {string}
 */
export const generateVRIcon = (height, fontSize, cutout=false)=>{
    if(!cutout){
        fontSize *= _logo_scale;
            let aspect = 28/18;
            return `<svg class="${cssPrefix}-svg" version="1.1" x="0px" y="0px" width="${aspect*fontSize}px" height="${fontSize}px" viewBox="0 0 28 18" xml:space="preserve">
                <path d="M26.8,1.1C26.1,0.4,25.1,0,24.2,0H3.4c-1,0-1.7,0.4-2.4,1.1C0.3,1.7,0,2.7,0,3.6v10.7
                c0,1,0.3,1.9,0.9,2.6C1.6,17.6,2.4,18,3.4,18h5c0.7,0,1.3-0.2,1.8-0.5c0.6-0.3,1-0.8,1.3-1.4l1.5-2.6C13.2,13.1,13,13,14,13v0h-0.2
                h0c0.3,0,0.7,0.1,0.8,0.5l1.4,2.6c0.3,0.6,0.8,1.1,1.3,1.4c0.6,0.3,1.2,0.5,1.8,0.5h5c1,0,2-0.4,2.7-1.1c0.7-0.7,1.2-1.6,1.2-2.6
                V3.6C28,2.7,27.5,1.7,26.8,1.1z M7.4,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8c1.6,0,2.8,1.3,2.8,2.8
                C10.2,10.5,8.9,11.8,7.4,11.8z M20.1,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8C21.7,6.2,23,7.4,23,9
                C23,10.5,21.7,11.8,20.1,11.8z"/>
            </svg>
            <svg class="${cssPrefix}-svg-error" x="0px" y="0px" width="${aspect*fontSize}px" height="${aspect*fontSize}px" viewBox="0 0 28 28" xml:space="preserve">
                <path d="M17.6,13.4c0-0.2-0.1-0.4-0.1-0.6c0-1.6,1.3-2.8,2.8-2.8s2.8,1.3,2.8,2.8s-1.3,2.8-2.8,2.8
                c-0.2,0-0.4,0-0.6-0.1l5.9,5.9c0.5-0.2,0.9-0.4,1.3-0.8c0.7-0.7,1.1-1.6,1.1-2.5V7.4c0-1-0.4-1.9-1.1-2.5c-0.7-0.7-1.6-1-2.5-1H8.1
                L17.6,13.4z"/>
                <path d="M10.1,14.2c-0.5,0.9-1.4,1.4-2.4,1.4c-1.6,0-2.8-1.3-2.8-2.8c0-1.1,0.6-2,1.4-2.5L0.9,5.1
                C0.3,5.7,0,6.6,0,7.5v10.7c0,1,0.4,1.8,1.1,2.5c0.7,0.7,1.6,1,2.5,1h5c0.7,0,1.3-0.1,1.8-0.5c0.6-0.3,1-0.8,1.3-1.4l1.3-2.6
                L10.1,14.2z"/>
                <path d="M25.5,27.5l-25-25C-0.1,2-0.1,1,0.5,0.4l0,0C1-0.1,2-0.1,2.6,0.4l25,25c0.6,0.6,0.6,1.5,0,2.1l0,0
                C27,28.1,26,28.1,25.5,27.5z"/>
            </svg>`
        } else {
            // return `
            // <svg class="${cssPrefix}-svg" version="1.1" x="0px" y="0px" width="${height}px" height="${height}px" viewBox="0 0 28 28" xml:space="preserve">
            //     <path d="M10.1,12.7c-0.9,0-1.6,0.7-1.6,1.6c0,0.8,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6
            //         C11.6,13.4,10.9,12.7,10.1,12.7z"/>
            //     <path d="M17.2,12.7c-0.9,0-1.6,0.7-1.6,1.6c0,0.8,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6
            //         C18.8,13.4,18.1,12.7,17.2,12.7z"/>
            //     <path d="M14,0C6.3,0,0,6.3,0,14c0,7.7,6.3,14,14,14s14-6.3,14-14C28,6.3,21.7,0,14,0z M21.5,17.3
            //         c0,0.5-0.2,1-0.6,1.4c-0.4,0.4-0.9,0.6-1.4,0.6h-2.8c-0.4,0-0.7-0.1-1-0.3c-0.3-0.2-0.6-0.5-0.8-0.8l-0.8-1.5
            //         c-0.1-0.2-0.3-0.3-0.5-0.3l0,0l0,0l0,0c-0.2,0-0.4,0.1-0.5,0.3l-0.8,1.5c-0.2,0.3-0.4,0.6-0.8,0.8c-0.3,0.2-0.7,0.3-1,0.3H7.7
            //         c-0.5,0-1-0.2-1.4-0.6c-0.4-0.4-0.6-0.9-0.6-1.5v-6c0-0.5,0.2-1,0.6-1.4c0.4-0.4,0.9-0.6,1.4-0.6h11.6c0.5,0,1,0.2,1.4,0.6
            //         c0.4,0.4,0.6,0.9,0.6,1.4L21.5,17.3z"/>
            // </svg>
            //
            // <svg class="${cssPrefix}-svg-error" version="1.1" x="0px" y="0px" width="${height - 4}px" height="${height - 4}px" viewBox="0 0 28 28" xml:space="preserve">
            // <path d="M14,0C6.3,0,0,6.3,0,14s6.3,14,14,14s14-6.3,14-14S21.7,0,14,0z M19.4,9.5c0.5,0,1,0.1,1.4,0.5
            //     c0.4,0.4,0.6,0.8,0.6,1.4v6c0,0.5-0.2,1-0.6,1.4c-0.2,0.2-0.4,0.3-0.7,0.4l-3.4-3.4c0.1,0,0.2,0,0.3,0c0.9,0,1.6-0.7,1.6-1.6
            //     c0-0.9-0.7-1.6-1.6-1.6c-0.9,0-1.6,0.7-1.6,1.6c0,0.1,0,0.3,0,0.4l-5.3-5.1H19.4z M12.4,18.3c-0.2,0.3-0.4,0.5-0.8,0.7
            //     s-0.7,0.2-1,0.2H7.8c-0.5,0-1-0.2-1.4-0.5c-0.4-0.4-0.6-0.8-0.6-1.4v-6c0-0.5,0.2-1,0.5-1.3l3,3c-0.5,0.3-0.8,0.8-0.8,1.4
            //     c0,0.9,0.7,1.6,1.6,1.6c0.6,0,1.1-0.3,1.4-0.8l1.7,1.7L12.4,18.3z M21.3,22.5l-0.1,0.1c-0.3,0.3-0.8,0.3-1.1,0L6,8.5
            //     C5.7,8.2,5.7,7.7,6,7.4l0.1-0.1C6.4,7,6.8,7,7.1,7.3l14.2,14.2C21.6,21.7,21.6,22.2,21.3,22.5z"/>
            // </svg>`
        }
};


/**
 * generate the CSS string to inject
 * @param options
 * @param {Number} [fontSize=18]
 * @returns {string}
 */
export const generateCSS = (options, fontSize=18)=>{
    if(!options.color) options.color = 'rgb(80,168,252)';
    if(!options.background) options.background = false;
    if(!options.disabledOpacity) options.disabledOpacity = 0.5;

    const height = options.height;
    const borderWidth = 2;
    const borderColor = options.background ? options.background : options.color;

    let borderRadius;
    if(options.corners == 'round') borderRadius = options.height / 2;
    else if(options.corners == 'square') borderRadius = 2;
    else borderRadius = options.corners;


    return (`
        @font-face {
            font-family: 'Karla';
            font-style: normal;
            font-weight: 400;
            src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v5/31P4mP32i98D9CEnGyeX9Q.woff2) format('woff2');
            unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
            font-family: 'Karla';
            font-style: normal;
            font-weight: 400;
            src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v5/Zi_e6rBgGqv33BWF8WTq8g.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
        }
        
        button.${cssPrefix}-button {
            font-family: 'Karla', sans-serif;

            border: ${borderColor} ${borderWidth}px solid;
            border-radius: ${borderRadius}px;
            box-sizing: border-box;
            background: ${options.background ? options.background : 'none'};

            height: ${height}px;
            min-width: ${125}px;
            display: inline-block;
            position: relative;

            cursor: pointer;
        }   

        /*
        * Logo
        */

        .${cssPrefix}-logo {
            width: ${height}px;
            height: ${height}px;
            position: absolute;
            top:0px;
            left:0px;
            width: ${height-4}px;
            height: ${height-4}px;
        }
        .${cssPrefix}-svg {
            fill: ${options.color};
            margin-top: ${(height - fontSize * _logo_scale) / 2 - 2}px;
            margin-left: ${height / 3 }px;
        }
        .${cssPrefix}-svg-error {
            fill: ${options.color};
            display:none;            
            margin-top: ${(height - 28/18 * fontSize * _logo_scale) / 2 - 2}px;
            margin-left: ${height / 3 }px;
        }
        
        
        /*
        * Title
        */

        .${cssPrefix}-title {
            color: ${options.color};
            position: relative;
            font-size: ${fontSize}px;
            top: -${borderWidth}px;
            line-height: ${height - borderWidth * 2}px;
            text-align: left;
            padding-left: ${height * 1.05}px;
            padding-right: ${(borderRadius-10 < 5) ? height/3 : borderRadius-10}px;
        }
        
        /*
        * Animation
        */
        
        // @keyframes logo-transition-hide {
        //     0% {}
        //     100% {  }
        // }
        // @keyframes logo-transition-hide-short {
        //     0% {}
        //     100% {}
        // }
        //
        // @keyframes logo-transition-show {
        //     0% {}            
        //     100% {}
        // }
        //
        // @keyframes title-transition-hide {
        //     0% { -webkit-clip-path: inset(0px 0px 0px 20%); }
        //     100% {  -webkit-clip-path: inset(0px 0px 0px 120%); }
        // }
        // @keyframes title-transition-hide-short {
        //     0% { }
        //     100% {  }
        // }
        // @keyframes title-transition-show {
        //     0% {  -webkit-clip-path: inset(0px 100% 0px 0%); }
        //     100% {  -webkit-clip-path: inset(0px 0% 0px 0); }
        // }
        
        
        // button.${cssPrefix}-button.animate, button.${cssPrefix}-button.animate-out {
        //     overflow:hidden;
        // }
        //
        // button.${cssPrefix}-button.animate > .${cssPrefix}-title {
        //     animation: title-transition-hide ease 1s 1, title-transition-show ease 1s 1;
        //     animation-delay: 0s, 1s;                
        // }     
        //
        // button.${cssPrefix}-button.animate > .${cssPrefix}-logo {
        //     animation: logo-transition-hide ease 1s 1, logo-transition-show ease 1s 1;
        //     animation-delay: 0s, 1s;                
        // }
        //
        //
        // button.${cssPrefix}-button.animate-out > .${cssPrefix}-title {
        //     animation: title-transition-hide-short ease 0.2s 1, title-transition-show ease 1s 1;
        //     animation-delay: 0s, 0.2s;           
        // }     
        //
        // button.${cssPrefix}-button.animate-out > .${cssPrefix}-logo {
        //     animation: logo-transition-hide-short ease 0.2s 1, logo-transition-show ease 1s 1;
        //     animation-delay: 0s, 0.2s;                
        //
        // }

        /*
        * disabled
        */

        button.${cssPrefix}-button[disabled=true] {
            opacity: ${options.disabledOpacity};
        }
        
        button.${cssPrefix}-button[disabled=true] > .${cssPrefix}-logo > .${cssPrefix}-svg {
            display:none;
        }
        
        button.${cssPrefix}-button[disabled=true] > .${cssPrefix}-logo > .${cssPrefix}-svg-error {
            display:initial;
        }
        
        button.${cssPrefix}-button[disabled=true] > .${cssPrefix}-title {
        }

    `);
};


