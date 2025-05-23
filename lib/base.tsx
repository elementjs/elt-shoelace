import { css } from "elt"

css`
/*
 * https://github.com/jtrost/Complete-CSS-Reset
*/

/* Displays for HTML 5 */
article, aside, audio, command, datagrid, details, dialog, embed,
figcaption, figure, footer, header, hgroup, menu, nav, section, summary,
video, wbr {
	display: block;
}

bdi, figcaption, keygen, mark, meter, progress, rp, rt, ruby, time {
	display: inline;
}

/* Deprecated tags */
acronym, applet, big, center, dir, font, frame, frameset, noframes, s,
strike, tt, u, xmp {
	display: none;
}

/* Reset styles for all structural tags */
a, abbr, area, article, aside, audio, b, bdo, blockquote, body, button,
canvas, caption, cite, code, col, colgroup, command, datalist, dd, del,
details, dialog, dfn, div, dl, dt, em, embed, fieldset, figure, form,
h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, img,
input, ins, keygen, kbd, label, legend, li, map, mark, menu, meter, nav,
noscript, object, ol, optgroup, option, output, p, param, pre, progress,
q, rp, rt, ruby, samp, section, select, small, span, strong, sub, sup,
table, tbody, td, textarea, tfoot, th, thead, time, tr, ul, var, video {
	background: transparent;
	border: 0;
	font-size: 100%;
	font: inherit;
	margin: 0;
	outline: none;
  padding: 0;
  color: currentcolor;
	text-align: left;
	text-decoration: none;
	vertical-align: baseline;
	z-index: auto;
}

/* Miscellaneous resets */
body {
	line-height: normal;
}

ol, ul {
	list-style: none;
}

blockquote, q {
	quotes: none;

}

blockquote:before, blockquote:after, q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
  background-color: transparent;
  -webkit-appearance: none;
}
button,
input { /* 1 */
  overflow: visible;
}
button,
select { /* 1 */
  text-transform: none;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

progress {
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

details {
  display: block;
}

summary {
  display: list-item;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

html {
  -webkit-tap-highlight-color: transparent;
}
:focus {
  outline: none !important;
}

* {
  box-sizing: border-box;
}

/* */

body {
  margin: 0;
  font-family: var(--sl-font-sans);
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-normal);
  letter-spacing: var(--sl-letter-spacing-normal);
  background-color: var(--sl-color-neutral-0);
  color: var(--sl-color-neutral-900);
}

::-webkit-scrollbar {
  position: absolute;
  width: calc(1rem / 2);
  height: calc(1rem / 2);
}

::-webkit-scrollbar-track {
  background: var(--sl-color-primary-100);
}

::-webkit-scrollbar-thumb {
  background: var(--sl-color-primary-200);
  /* borderRadius: calc(1rem / 4) */
}

sl-details::part(header) {
  padding: 0 var(--sl-spacing-medium) !important;
  height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
  font-weight: 500;
}

:is(e-select, sl-select, sl-input, sl-textarea, sl-button)::part(form-control-label) {
  font-size: 0.8rem;
  font-weight: bolder;
}

sl-dialog::part(header) {
  font-weight: bolder;
}

::selection {
  background: var(--sl-color-primary-100);
}

::-webkit-selection {
  background-color: var(--sl-color-primary-100);
}

input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 1px solid var(--sl-input-border-color);
  border-radius: var(--sl-border-radius-small);
  transform: translateY(-0.075em);
  transition: var(--sl-transition-fast) background-color ease-in-out, var(--sl-transition-fast) border-color ease-in-out;

  /* ...existing styles */
  display: inline-grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: var(--sl-transition-fast) transform ease-in-out;
  box-shadow: inset 1em 1em var(--sl-color-neutral-0);

  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

}

input[type="checkbox"]:checked {
  border-color: var(--sl-color-primary-600);
  background-color: var(--sl-color-primary-600);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid var(--sl-color-primary-600);
  /* outline-offset: max(2px, 0.15em);*/
}

input[type="checkbox"]:disabled {
  --sl-color-primary-600: var(--sl-input-color-disabled);
}

label[for] {
  cursor: pointer;
  user-select: none;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid var(--sl-color-neutral-50);
}


`
