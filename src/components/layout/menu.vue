<template>
  <a-menu class="menu" :style="{ width: '200px' }" v-model:collapsed="local.isContract" :selected-keys="[local.menuActive]"
    showCollapseButton accordion @menu-item-click="changeRouter">
    <menuTree :data="local.menus"></menuTree>
  </a-menu>
</template>

<script lang="ts" setup>
const local = useLocal()
const router = useRouter()
// const filterMenuByPermissions = (menu: Menu[], permissions: any) => {
//   const filteredMenu = menu.filter(route => {
//     if (!route.meta?.show) return false
//     if (!permissions.includes(route.meta?.auth) && route.meta.auth != '*') return false
//     if (route?.children?.length) {
//       route.children = filterMenuByPermissions(route.children, permissions);
//     }
//     return true
//   })
//   return filteredMenu
// }
// const menuList = computed(() => {
//   return filterMenuByPermissions(menus, local.permissions)
// })
const changeRouter = (name: string) => {
  try {
    router.push({
      name
    })
  } catch (error) {
    Message.info('功能开发中')
  }
}
</script>

<style lang="less" scoped>
.menu {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);
}
</style>