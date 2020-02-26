export default ({ router }) => {
  router.afterEach((to) => {
    if (window.gtag) {
      gtag('config', 'UA-159040523-1', { page_title : to.name, page_path: to.path });
    }
  })
}
