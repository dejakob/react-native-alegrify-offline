import React from 'react';
import Svg, {
    G,
    LinearGradient,
    Stop,
    Path,
} from 'react-native-svg';

// Converted with https://www.smooth-code.com/open-source/svgr/playground/

function Logo(props) {
    return (
        <Svg viewBox="0 0 1000 1000" {...props}>
            <LinearGradient
              id="prefix__b"
              gradientUnits="userSpaceOnUse"
              x1={502}
              y1={145}
              x2={502}
              y2={846}
            >
              <Stop offset={0} stopColor="#4e4cc1" />
              <Stop offset={1} stopColor="#93278f" />
            </LinearGradient>
            <Path
              fill="url(#prefix__b)"
              stroke="#fff"
              strokeWidth={8}
              strokeMiterlimit={10}
              d="M248 846l252-109 256 109-256-701z"
            />
            <G fill="none" stroke="#fff" strokeWidth={8} strokeMiterlimit={10}>
              <Path d="M246 850c37-16 73-32 110-49 2-1 3 0 5-1 73-34 146-64 218.477-96.807M409.959 698.872C466 698 523 698 579.479 697.892M752 849L405 701" />
            </G>
            <G fill="none" stroke="#fff" strokeWidth={8} strokeMiterlimit={10}>
              <Path d="M307.191 681.34C335 606 361 531 388 455l18-48c10-28 19-56 29-84 4-11 9-22 13-34 16-47 33-93 50.07-140.136M296.327 711.638C290 728 284 745 278 761c-10 31-22 60-32 91M502.645 150.836C523 211 545 269 566 329c43 118 83 235 126.809 352.34M702.248 707.664C720 756 736 804 754 852M223 466h544" />
              <Path d="M223 466c40.656 7.01 81.121 15.064 121.698 22.506a2953.364 2953.364 0 0 0 33.922 6.036M767 466c-22.093-6.136-44.256-12.015-66.403-17.955-22.204-5.955-44.409-11.902-66.607-17.88-12.202-3.286-24.408-6.574-36.728-9.396M246 850l252-701M754 852L503 151M498 741l256 111M246 850l252-109" />
            </G>
        </Svg>
    )
}

export default Logo;
