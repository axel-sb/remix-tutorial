/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: [/^@uidotdev.*/],
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'cjs',
}
