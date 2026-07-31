import type { Router } from 'vue-router'
import { adminAuthGuard } from '@/admin/router/adminRoutes'

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const result = await adminAuthGuard(to)
    if (result === true) {
      next()
    } else {
      next(result)
    }
  })
}