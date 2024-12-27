/* eslint-disable no-undef */
import { expect } from 'chai';
import Parsing from '../../../jsx/js/Parsing';

describe('Parsing.html', () => {
    it('text', () => {
        const str = 'text';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'text' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>text</span>', () => {
        const str = '<span>text</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'text' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('left<span>text</span>right', () => {
        const str = 'left<span>text</span>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'left' },
            { name: 'span', value: 'text' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });
    it('<span name="mean" >text</span>right', () => {
        const str = '<span src="text">text</span>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'text', attrs: { src: 'text' } },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<br>text', () => {
        const str = '<br>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'br' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<br>text', () => {
        const str = '<br>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'br' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<br/>text', () => {
        const str = '<br>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'br' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>firts<span><img src="http://url.tu"/>', () => {
        const str = '<span>firts</span><img src="http://url.tu"/>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'firts' },
            { name: 'img', attrs: { src: 'http://url.tu' } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span style="color:red">firts<span>', () => {
        const str = '<span style="color:red">firts</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'firts', attrs: { style: { color: 'red' } } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span style="color:red;background-color:#ff00ff">firts<span>', () => {
        const str = '<span style="color:red;background-color:#ff00ff">firts</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'firts', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>A <span>', () => {
        const str = '<span>A &nbsp;</span>&nbsp;&nbsp;';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'A  ' },
            { name: 'span', value: '  ' },
            // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>a<</span><span>&nbsp;</span>', () => {
        const str = '<span>a<</span><span>&nbsp;</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'a<' },
            { name: 'span', value: ' ' },
            // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>a&lt;</span><span>&nbsp;</span>', () => {
        const str = '<span>a<</span><span>&nbsp;</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'a<' },
            { name: 'span', value: ' ' },
            // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
        ];
        expect(result).to.deep.equal(should);
    });
    // <a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0">fox</a>
    it('<span>first<span><a href="http://url.tu">text</a>', () => {
        const str = '<span>first</span><a href="http://url.tu">text</a>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'first' },
            { name: 'a', value: 'text', attrs: { href: 'http://url.tu' } },
        ];
        expect(result).to.deep.equal(should);
    });
    // it('<a href="http://url.tu">text</a>', () => {
    //     const str = '<a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0">text</a>';
    //     const result = Parsing.html(str);
    //     const should = [
    //         { name: 'a', value: 'text', attrs: { href: 'http://url.tu' } },
    //     ];
    //     expect(result).to.deep.equal(should);
    // });
});
