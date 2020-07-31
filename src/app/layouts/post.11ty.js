const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang, className = '', location }) => {
  const t = i18n(lang)

  const lazy = content => content.replace(
    /(<img src=)(\S+)/g,
    (_, __, url) =>
      `<noscript>
         <img src="${url}" alt="My cat" />
       </noscript>
       <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E"
        data-src=${url} `
  )

  return `
    <article class="${className}">
      <header>
        <h1 class="tracking-widest mt-0">${title}</h1>
        <time class="text-gray-600 font-mono text-sm">
          ${location ? location + ', ' : ''}
          ${dayjs(page.date).format(t('dateFormat'))}
        </time>
      </header>
      <div class="mt-6">
        ${lazy(content)}
      </div>
    </article>

    <div id="modal" class="hidden fixed inset-0 p-32" onclick="hideModal">
      <img id="modal-img" />
    </div>

    <script src="/lazyload.js"></script>

    <script>
      function hideModal() {
        var modal = document.getElementById('modal')
        modal.classList.add('hidden')

        var modalImg = document.getElementById('modal-img')
        modalImg.src = ''
      }
    </script>
  `
}
