/** @jsx node */

import { EVENT} from 'zoid/src'
import { toCSS, destroyElement } from '@krakenjs/belter/src'
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { BUTTON_SIZE_STYLE } from './ui/config.js';

const CLASS = {
  VISIBLE: 'visible',
  INVISIBLE: 'invisible',
  COMPONENT_FRAME: 'component-frame',
  PRERENDER_FRAME: 'prerender-frame'
}

export function containerTemplate({ frame, context, prerenderFrame, container, props, event, uid, tag, doc }) {
  if (!frame || !prerenderFrame) {
    return
  }

  if (container && container.tagName.toLowerCase() === 'button') {
    throw new Error('Do not render the Safepay button into a button element')
  }

  frame.classList.add(CLASS.COMPONENT_FRAME)
  prerenderFrame.classList.add(CLASS.PRERENDER_FRAME)

  frame.classList.add(CLASS.INVISIBLE)
  prerenderFrame.classList.add(CLASS.VISIBLE)

  event.on(EVENT.RENDERED, () => {
    prerenderFrame.classList.remove(CLASS.VISIBLE)
    prerenderFrame.classList.add(CLASS.INVISIBLE)

    frame.classList.remove(CLASS.INVISIBLE)
    frame.classList.add(CLASS.VISIBLE)

    setTimeout(() => destroyElement(prerenderFrame), 1000)
  })

  const { style, nonce } = props
  const { size } = style

  const setupAutoResize = (el) => {
    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
      if (typeof newWidth === 'number') {
        el.style.width = toCSS(newWidth);
      }

      if (typeof newHeight === 'number') {
        el.style.height = toCSS(newHeight);
      }
    });
  };

  const element = (
    <div
      id={uid}
      class={`${ tag } ${ tag }-context-${ context } ${ tag }-label`}
      onRender={ setupAutoResize }>
      
      <style nonce={ nonce }>
        {`
          #${ uid } {
              position: relative;
              display: inline-block;
              width: 100%;
              min-height: ${ BUTTON_SIZE_STYLE[size].minHeight }px;
              min-width: ${ BUTTON_SIZE_STYLE[size].minWidth }px;
              max-width: ${ BUTTON_SIZE_STYLE[size].maxWidth }px;
              font-size: 0;
          }

          #${ uid } > iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
          }

          #${ uid } > iframe.${ CLASS.COMPONENT_FRAME } {
              z-index: 100;
          }

          #${ uid } > iframe.${ CLASS.PRERENDER_FRAME } {
              transition: opacity .2s linear;
              z-index: 200;
          }

          #${ uid } > iframe.${ CLASS.VISIBLE } {
              opacity: 1;
          }

          #${ uid } > iframe.${ CLASS.INVISIBLE } {
              opacity: 0;
              pointer-events: none;
          }
        `}
      </style>
        
      <node el={ frame } />
      <node el={ prerenderFrame } />
    </div>
  ).render(dom({ doc }));

  event.on(EVENT.RENDERED, () => {
    setTimeout(() => {
        element.style.transition = 'all 0.2s ease-in-out';
    }, 1000);
  });

  return element
}