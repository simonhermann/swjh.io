/* GDPR-Ready Google Analytics for nuxt.js (March 2019)
Sources:
https://www.datenschutzbeauftragter-info.de/fachbeitraege/google-analytics-datenschutzkonform-einsetzen/
https://nuxtjs.org/faq/google-analytics/
*/

export default ({ app }) => {
  /*
   ** Only run on client-side and only in production mode
   */
  if (process.env.NODE_ENV !== 'production') return

  var gaProperty = 'UA-154003341-1'

  /*
   ** Let users opt-out
   */
  var disableStr = 'ga-disable-' + gaProperty
  if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true
  }
  function gaOptout() {
    document.cookie =
      disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
    window[disableStr] = true
    alert('Das Tracking ist jetzt deaktiviert')
  }

  /*
   ** Include Google Analytics Script
   */
  ;(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function() {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )

  ga('create', gaProperty, 'auto')
  ga('set', 'anonymizeIp', true)
  app.router.afterEach((to, from) => {
    /*
     ** We tell Google Analytics to add a `pageview`
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
