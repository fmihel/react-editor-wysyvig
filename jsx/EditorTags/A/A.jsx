/* eslint-disable camelcase */
import React from 'react';
import get from '../../js/get.js';
import dialog from '../../EditorDialog.jsx';
import Prop from './Prop.jsx';
import getid from '../../js/getid.js';

function A({
    id,
    type,
    value,
    href,
    style,
    select,
    cursor,
    onClick,
    onChange,
}) {
    const doClick = (sender) => {
        if (onClick) {
            onClick({ id, type, sender });
        }
    };
    const change = (o) => {
        if (onChange) {
            onChange({
                id, type, href, value, ...o,
            });
        }
    };

    const doDoubleClick = (o) => {
        dialog.open({ Prop, data: { href, value } })
            .then(({ result, btn }) => {
                if (btn === 'ok') {
                    change(result);
                }
            });
        o.stopPropagation();
    };
    return (
        <span
            id={id}
            style={{ ...style }}
            className={`a-tag ${cursor ? 'cursor' : ''} ${select ? 'select' : ''}` }
            onMouseDown={doClick}
            onDoubleClick={doDoubleClick}
        >
            {value}
        </span>
    );
}

A.createData = (data = {}) => ({
    id: getid(),
    type: 'a',

    value: '',
    href: '',
    ...data,
    style: { ...get(data, ['style'], {}) },

});

A.asText = (item) => `[url:${item.href || ''}]`;

export default A;
