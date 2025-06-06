import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps, PageProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('errors')),
    error: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('error')),
    success: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('success')),
    info: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('info')),
    warning: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('warning')),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig>, PageProps {}
}
