import React from 'react';
import moment from 'moment';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Box, DateIndicator, Padding, Emoji, BackgroundImage } from 'react-native-alegrify-ui';
import { createStyledComponent } from 'react-native-component-styler';
import { translate } from '../../services/language';

const MOODS = {
    // Bang
    SCARED: '😱',

    // Boos
    ANGRY: '😠',

    // Blij
    HAPPY: '😆',

    // Bedroefd
    SAD: '😭'
}
const MOOD_ELEMENTS = Object
    .keys(MOODS)
    .map((mood, index) =>
        <Emoji key={index} mood={mood}>{MOODS[mood]}</Emoji>
    );

const style = {
    Header: {
        DEFAULT: {
            height: '100h4s',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    HeaderBackground: {
        DEFAULT: {
            height: '100h4s',
            width: '100%',
            borderTopLeftRadius: '2h4s',
            borderTopRightRadius: '2h4s',
            backgroundColor: 'theme:navActiveItem',
            opacity: 0.4
        }
    },
    HeaderContent: {
        DEFAULT: {
            flex: 1,
            fontSize: '12h4s',
            fontWeight: '600',
            opacity: 0.8
        }
    },
    HeaderDate: {
        DEFAULT: {
            width: '60w4s',
            position: 'absolute',
            right: '16h4s',
            bottom: '-16h4s',
            borderColor: 'theme:primary',
            borderWidth: 1,
            borderRadius: '2h4s'
        }
    },
    Container: {
        DEFAULT: {
            flex: 1
        },
        SPACE_L: {
            marginBottom: '16h4s'
        }
    },
    Content: {
        DEFAULT: {
            paddingTop: '24h4s',
            paddingLeft: '16h4s',
            paddingRight: '16h4s',
            paddingBottom: '24h4s',
        }
    },
    Content__Text: {
        DEFAULT: {
            fontSize: 'theme:m'
        }
    },
    Content__Badge: {
        DEFAULT: {
            backgroundColor: 'theme:nav',
            paddingLeft: '16h4s',
            paddingRight: '16h4s',
            paddingTop: '4h4s',
            paddingBottom: '4h4s',
            borderRadius: '20h4s',
            position: 'absolute',
            left: '16w4s',
            top: '-10h4s'
        }
    },
    Content__BadgeText: {
        DEFAULT: {
            color: 'theme:sheet',
            textAlign: 'center',
            fontSize: '12h4s'
        }
    },
    Content__Time: {
        DEFAULT: {
            fontSize: 'theme:s',
            opacity: 0.7,
            marginBottom: '8h4s',
            textAlign: 'right'
        }
    },
    Content__Cta: {
        DEFAULT: {
            borderTopWidth: 1,
            borderTopColor: 'theme:navInactiveItem',
            paddingTop: '16h4s',
            marginTop: '24h4s'
        }
    },
    Content__CtaText: {
        DEFAULT: {
            textAlign: 'center',
            fontSize: '12h4s',
            fontWeight: '600',
            opacity: 0.8
        }
    },
    Break: {
        DEFAULT: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    Break__Start: {
        DEFAULT: {
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'theme:nav',
            marginRight: '8h4s'
        }
    },
    Break__Text: {
        DEFAULT: {
            fontSize: '12h4s',
            fontWeight: '600',
            opacity: 0.8
        }
    },
    Break__End: {
        DEFAULT: {
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'theme:nav',
            marginLeft: '8h4s'
        }
    },
    Footer: {
        DEFAULT: {
            marginLeft: '-16h4s',
            marginRight: '-16h4s',
            marginBottom: '-16h4s',
            backgroundColor: 'theme:nav',
            padding: '16h4s',
            borderBottomLeftRadius: '2h4s',
            borderBottomRightRadius: '2h4s',
        },
        FULL: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }
    },
    Footer__Text: {
        DEFAULT: {
            color: 'theme:action',
            fontSize: 'theme:s',
            textAlign: 'center'
        }
    }
}

const AlegrifyThought = createStyledComponent(
    ['DEFAULT', 'SPACE_L', 'FULL'],
    style,
    AlegrifyThoughtView
);

/**
 * Thought
 * 
 * ```jsx
 * <AlegrifyThought
 *   thought={thought}
 * />
 * ```
 */
function AlegrifyThoughtView(props, s) {    
    if (!props.thought || !props.thought.my_mood) {
        return null;
    }

    const Content = (
        <Box
            spaceXS={props.spaceXS}
            spaceS={props.spaceS}
            spaceM={props.spaceM}
            spaceL={props.spaceL}
            spaceXL={props.spaceXL}
            full={props.full}
            bleed={props.bleed}
            
        >
            <BackgroundImage
                source={moodTypeToImage(props.thought.my_mood_type)}
                imageStyle={s('HeaderBackground')}
                style={{
                    backgroundColor: moodTypeToColor(props.thought.my_mood_type),
                    borderTopLeftRadius: s('HeaderBackground')[0].borderTopLeftRadius,
                    borderTopRightRadius: s('HeaderBackground')[0].borderTopRightRadius
                }}
            >
                <View
                    style={[s('Header')]}
                >
                    <Emoji l>{
                        MOODS[props.thought.my_mood_type] ||
                        // Legacy
                        (props.thought.my_mood < 5 ? '😠' : '😆')
                    }</Emoji>
                </View>
                <View
                    style={[s('HeaderDate')]}
                >
                    <DateIndicator date={props.thought.created_at} />
                </View>
            </BackgroundImage>
            <View
                style={s('Content')}
            >
                <View
                    style={s('Content__Badge')}
                >
                    <Text
                        style={s('Content__BadgeText')}
                    >
                        {props.thought.my_mood * 10}%
                    </Text>
                </View>
                <Text
                    style={s('Content__Time')}
                >
                    {moment(props.thought.created_at).format('H[h]mm')}
                </Text>
                <Text
                    style={s('Content__Text')}
                >
                    {props.thought.thought}
                </Text>
                <Padding s />
                <Text
                    style={[
                        s('Content__Text'),
                        {
                            fontSize: StyleSheet.flatten(s('Content__Text')).fontSize,
                            fontWeight: '100'
                        }
                    ]}
                >
                    {props.thought.thought_event}
                </Text>
                {props.full ? null : (
                    <View
                        style={s('Content__Cta')}
                    >
                        <Text
                            style={s('Content__CtaText')}
                        >
                            {translate('DASHBOARD.THOUGHT_CTA')}
                        </Text>
                    </View>
                )}
            </View>
        </Box>
    );

    if (typeof props.onPress === 'function') {
        return (
            <TouchableWithoutFeedback
                onPress={props.onPress}
            >
                <View>
                    {Content}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return Content;
}

function moodTypeToImage(moodType) {
    switch (moodType) {
        case 'SAD':
            return require('../../assets/sad.jpg');
        case 'HAPPY':
            return require('../../assets/happy.jpg');
        case 'SCARED':
            return require('../../assets/scared.jpg');
        case 'ANGRY':
            return require('../../assets/angry.jpg');
    }

    return null;
}

function moodTypeToColor(moodType) {
    switch (moodType) {
        case 'SAD':
            return '#3ed7ff';
        case 'HAPPY':
            return '#8ac78a';
        case 'SCARED':
            return '#fbb645';
        case 'ANGRY':
            return '#b50000';
    }

    return '#333333';
}

AlegrifyThought.propTypes = {
    thought: PropTypes.object,
    onPress: PropTypes.func,
};

export default AlegrifyThought;
export {
    MOODS,
    MOOD_ELEMENTS
};