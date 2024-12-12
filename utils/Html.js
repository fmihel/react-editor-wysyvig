/* eslint-disable array-callback-return */
import Parsing from '../jsx/js/Parsing.js';
import EditorTags from '../jsx/EditorTags.jsx';
import eq from '../jsx/js/eq.js';
import styleNameReactToCss from '../jsx/js/styleNameReactToCss.js';
import Style from './Style.js';

const SPACE_HTML = '&nbsp;';
const SPACE_CHAR = ' ';

const defaultTags = [
    { name: 'span' },
    { name: 'a' },
    { name: 'img' },
    { name: 'br', noslash: true },
];

const typeTag = {
    char: 'span',
    a: 'a',
    img: 'img',
    br: 'br',
    space: 'span',
};

class Html {
    toData(html, tags = defaultTags) {
        const out = [];
        const names = tags.map((it) => it.name);
        const pars = Parsing.html(html, { tags });

        const prepare = [];
        pars.map((it) => {
            const { name, value, attrs } = it;
            if (names.indexOf(name) > -1) {
                if (name === 'span') {
                    value.split('').map((char) => {
                        if (char === SPACE_CHAR) {
                            prepare.push(EditorTags.createData('space', { ...attrs }));
                        } else {
                            prepare.push(EditorTags.createData('char', { value: char, ...attrs }));
                        }
                    });
                } else {
                    prepare.push(EditorTags.createData(name, {
                        value,
                        ...attrs,
                    }));
                }
            }
        });

        return prepare;
    }

    fromData(data) {
        const com = [];
        // console.log(data);

        data.map((it) => {
            if (com.length === 0) {
                com.push({ ...it });
            } else if (this._eqByStyle('char', it, com[com.length - 1])) {
                com[com.length - 1].value += it.value;
            } else if (this._eqByStyle('space', it, com[com.length - 1])) {
                com[com.length - 1].value += it.value;
            } else {
                com.push({ ...it });
            }
        });

        return com.map((o) => {
            const {
                id, type, Com, ...attr
            } = o;

            return this.tag({
                ...attr,
                name: typeTag[o.type],
            });
        }).join('');
    }

    tag({ name, value, ...attrs }) {
        if (['br'].indexOf(name) > -1) {
            return `<${name}>`;
        }
        const _attrs = this.attrsAsString(attrs).trim();
        const strAttrs = (_attrs ? ` ${_attrs}` : _attrs);

        if (value) {
            return `<${name}${strAttrs}>${value}</${name}>`;
        }
        return `<${name}${strAttrs}/>`;
    }

    attrsAsString(attrs) {
        return Object.keys(attrs).map((attr) => {
            if (attr === 'style') {
                const style = `${Object.keys(attrs[attr]).map((p) => (Style.isNotEmptyProp(attrs[attr][p]) ? `${styleNameReactToCss(p)}:${attrs[attr][p]}` : '')).filter((s) => s).join(';')}`;
                return style ? `${attr}="${style}"` : '';
            }
            return `${attr}="${attrs[attr]}"`;
        }).join(' ');
    }

    _eqByStyle(type, current, last, exclude = ['id', 'value', 'Com']) {
        return (current.type === type && last.type === type)
        && eq.object(last, current, {
            exclude,
            custom: { style: (style1, style2) => Style.eq(style1, style2) },
        });
    }

    _spaceAsNbsp(str) {
        return str.replaceAll(' ', SPACE_HTML);
    }
}

export default new Html();