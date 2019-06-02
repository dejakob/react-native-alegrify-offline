import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * NoteIcon
 * Based on SimpleLineIcons
 */
const NoteIcon = props => (
    <Svg
        viewBox="0 0 1056 1024"
        {...props}
    >
        <Path
            d="M815 960H79V160h450l65-62-2-2H79q-26 0-45 19t-19 45v800q0 27 19 45.5t45 18.5h736q27 0 45.5-18.5T879 960V492l-64 61v407zM990 41Q947 0 895 0q-57 0-102 45L354 483q-2 2-3.5 4t-2.5 4-1 4q-15 54-70 233-1 5-1 10t2 9.5 6 7.5q8 8 19 8 4 0 8-1 131-44 229-73 6-2 11-7 427-421 441-436 50-51 49-104-2-54-51-101zm-44 160q-27 28-414 410l-20 19q-20 6-62 19.5T359 679q36-118 47-158Q822 106 838 90q26-26 57-26 26 0 51 24 30 29 31 55 0 26-31 58z"
            fill={props.color}
        />
    </Svg>
)

export default NoteIcon;