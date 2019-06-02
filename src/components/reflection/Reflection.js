import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text } from 'react-native';
import { createStyledComponent } from 'react-native-component-styler';
import { Box, DateIndicator } from 'react-native-alegrify-ui';

const style = {
    Row: {
        DEFAULT: {
            flexDirection: 'row',
            alignItems: 'flex-start'
        }
    },
    Content: {
        DEFAULT: {
            flex: 1,
            backgroundColor: 'theme:action'
        }
    },
    MarginTop: {
        DEFAULT: {
            marginTop: '8h4s'
        }
    },
    Label: {
        DEFAULT: {
            fontSize: '12h4s',
            fontWeight: '600',
            opacity: 0.8
        }
    },
    Answer: {
        DEFAULT: {
            fontSize: '14h4s',
            fontWeight: '100',
            marginTop: '8h4s'
        }
    },
    Date: {
        DEFAULT: {
            width: '60w4s',
            borderColor: 'theme:primary',
            borderWidth: 1,
            borderRadius: '2h4s',
            marginRight: '16h4s'
        }
    },
    Date__Time: {
        DEFAULT: {
            fontSize: 'theme:s',
            opacity: 0.7,
            marginTop: '8h4s'
        }
    },
    Content__Badge: {
        DEFAULT: {
            backgroundColor: 'theme:nav',
            paddingLeft: '16h4s',
            paddingRight: '16h4s',
            paddingTop: '4h4s',
            paddingBottom: '4h4s',
            borderRadius: '20h4s'
        }
    },
    Content__BadgeText: {
        DEFAULT: {
            color: 'theme:sheet',
            textAlign: 'center',
            fontSize: '12h4s'
        }
    }
};

const AlegrifyReflection = createStyledComponent(
    ['DEFAULT'],
    style,
    AlegrifyReflectionView
);

/**
 * Reflection
 * 
 * ```jsx
 * <Reflection
 *   reflection={reflection}
 * />
 * ```
 */
function AlegrifyReflectionView(props, s) {
    const { reflection, reliability, created_at } = props.reflection;

    return (
        <Box
            spaceXS={props.spaceXS}
            spaceS={props.spaceS}
            spaceM={props.spaceM}
            spaceL={props.spaceL}
            spaceXL={props.spaceXL}
            full={props.full}
            bleed={props.bleed}
        >
            <View
                style={s('Row')}
            >
                <View>
                    <View
                        style={s('Date')}
                    >
                        <DateIndicator
                            date={created_at}
                        />
                    </View>

                    <Text
                        style={s('Date__Time')}
                    >
                        {moment(created_at).format('H[h]mm')}
                    </Text>
                </View>
                <View
                    style={s('Content')}
                >
                    <View
                        style={{ alignItems: 'flex-start' }}
                    >
                        <View
                            style={s('Content__Badge')}
                        >
                            <Text
                                style={s('Content__BadgeText')}
                            >
                                {reliability * 10}%
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={s('Answer')}
                    >
                        {reflection}
                    </Text>
                </View>
            </View>
        </Box>
    );
}

AlegrifyReflection.propTypes = {
    reflection: PropTypes.object,
};

export default AlegrifyReflection;
