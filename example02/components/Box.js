import html from '../../index'; // import innerself

export default function Box(state, index) {
    const { bg, top, left, scale } = state;

    return html`
        <div 
            class="floating-box" 
                onclick="dispatch('DESTROY_BOX', ${ index })"
                style="background:${ bg }; top:${ top }px; left:${ left }px; transform: scale(${ scale })"><span>This is box #${ index }</span></div>
    `;
}
