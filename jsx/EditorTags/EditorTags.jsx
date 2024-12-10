import React from 'react';

import Br from './Br/Br.jsx';
import A from './A/A.jsx';
import Char from './Char/Char.jsx';
import End from './End/End.jsx';
import Img from './Img/Img.jsx';

function EditorTags({
    id, type, cursor, select, onClick, ...prop
}) {
    return EditorTags.get(type)({
        id,
        type,
        cursor,
        select,
        onClick,
        ...prop,
    });
}

EditorTags._tags = {
    a: A,
    br: Br,
    char: Char,
    img: Img,
    end: End,
};

EditorTags.add = (o) => {
    const tags = EditorTags._tags;
    Object.keys(o).map((type) => {
        if (!(type in tags)) {
            tags[type] = o[type];
        } else {
            console.error(`tag ${type} already exists`);
        }
    });
};

EditorTags.get = (type) => EditorTags._tags[type];

EditorTags.createData = (type, data) => EditorTags.get(type).createData(data);

export default EditorTags;
