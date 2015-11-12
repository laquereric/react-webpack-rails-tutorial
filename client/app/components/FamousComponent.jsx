import Transform from 'famous/core/Transform';
import Easing from 'famous/transitions/Easing';

import Context from 'react-famous/src/core/Context';
import Modifier from 'react-famous/src/core/Modifier';
import Surface from 'react-famous/src/core/Surface';

import FamousScheduler from 'react-famous/src/lib/FamousScheduler';
import StateModifier from 'react-famous/src/modifiers/StateModifier';

import React from 'react';
import Immutable from 'immutable';
import request from 'axios';
import metaTagsManager from '../utils/metaTagsManager';
import _ from 'lodash';

class FamousComponent extends React.Component {
    render() {
        return (
            <div>
                FamousComponent text
            </div>
        );
    }
}

export default FamousComponent;
