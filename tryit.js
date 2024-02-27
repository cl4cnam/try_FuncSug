$ = document.getElementById.bind(document)

//~ let state = 0 // 0 = loaded, 1 = executed, 2 = modified

const htmlElt = document.querySelector('#item_html > textarea')
const cssElt = document.querySelector('#item_css > textarea')
const javascriptElt = document.querySelector('#item_javascript > textarea')
const funcsugElt = document.querySelector('#item_funcsug > textarea')
const iframe = document.querySelector('#item_result > iframe')

async function loadFile(ps_url, pElt_textarea, pb_trim) {
	const content = (ps_url === '') ? '' : await (await fetch(ps_url)).text()
	if (pb_trim) {
	}
	pElt_textarea.value = content
}

function loadExample(ps_htmlUrl, ps_cssUrl, ps_javascriptUrl, ps_funcsugUrl) {
	loadFile(ps_htmlUrl, htmlElt, true)
	loadFile(ps_cssUrl, cssElt)
	loadFile(ps_javascriptUrl, javascriptElt)
	loadFile(ps_funcsugUrl, funcsugElt)
}

function loadTextExample(ps_htmlText, ps_cssText, ps_javascriptText, ps_funcsugText) {
	htmlElt.value = ps_htmlText
	cssElt.value = ps_cssText
	javascriptElt.value = ps_javascriptText
	funcsugElt.value = ps_funcsugText
}

window.onload = async function() {
	const tab_elts = document.querySelectorAll('#tabs > span')
	const tab_items = document.querySelectorAll('#scene > div')

	function reset_tabs() {
		for (const tab_elt of tab_elts) {
			tab_elt.removeAttribute('clicked')
		}
		for (const tab_item of tab_items) {
			tab_item.style.display = 'none'
		}
	}
	
	reset_tabs()
	
	for (const tab_elt of tab_elts) {
		tab_elt.addEventListener('click', evt=>{
			reset_tabs()
			tab_elt.setAttribute('clicked', '')
			$('item_' + tab_elt.id).style.display = 'flex'
		})
	}
	
	//~ for (const tab_item of tab_items) {
		//~ tab_item.addEventListener('input', evt=>{
			//~ state = 2
		//~ })
	//~ }
	
	//~ loadExample('https://cl4cnam.github.io/Memory2/memory.html', '', '', '')
	//~ loadExample('guessTheNumberPy.html', '', '', '')
	//~ loadTextExample(...examples.helloWorld.slice(1))
	
	$('html').dispatchEvent(new Event('click'))
	$('example').dispatchEvent(new Event('change'))
}

function adaptHtml(ps_htmlText, ps_cssText, ps_javascriptText, ps_funcsugText) {
	return ps_htmlText.replace('</head>', `		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/lib.css">
		<link rel="stylesheet" href="data:text/css;charset=utf-8,` + escape(ps_cssText) + `">
	</head>`).replace('</body>',`		<script src="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/libStd.fg" type="application/funcsug"></script>
		<script src="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/libDOM.fg" type="application/funcsug"></script>
		<script src="data:text/plain;charset=utf-8,` + encodeURIComponent(ps_funcsugText) + `" type="application/funcsug"></script>
		<script src="data:application/javascript;charset=utf-8,` + encodeURIComponent(ps_javascriptText) + `"></script>
		<script src="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/parser.js"></script>
		<script src="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/parserPy.js"></script>
		<script src="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/interpreter.js"></script>
		<script src="https://cdn.jsdelivr.net/gh/cl4cnam/funcSug/DOMloader.js"></script>
	</body>`)
}

$('example').addEventListener('change', function(evt){
	const item = examples[this.value]
	if (item[0] === 'text') {
		loadTextExample(...item.slice(1))
	} else {
		loadExample(...item.slice(1))
	}
	
	$('funcsug').dispatchEvent(new Event('click'))
})

$('run').addEventListener('click', evt=>{
	const ls_adaptedHtml = adaptHtml(htmlElt.value, cssElt.value, javascriptElt.value, funcsugElt.value)
	iframe.srcdoc = ls_adaptedHtml
	
	//~ state = 1
	$('result').dispatchEvent(new Event('click'))
})
