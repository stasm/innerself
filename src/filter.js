import striptags from 'striptags';

const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',  'img', 'br',
    'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta', 'button'];

export default function sanitize(string, options){
    // options.custom -> custom (a custom array of elements)
    // options.add -> adds an additional list to the pre-difined.

    options = typeof options === "object" ? options : {};

    let FILTER = Array.isArray(options.filter) ?
        options.filter :
        ALLOWED_TAGS.concat(
            Array.isArray(options.add) ?
                options.add :
                []);

    console.log(FILTER);

    return striptags(string, FILTER, '');
}