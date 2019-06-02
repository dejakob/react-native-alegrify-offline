import React from 'react';

const SceneContext = React.createContext({
    name: null,
    addAnimation: () => {}
});

export default SceneContext;
