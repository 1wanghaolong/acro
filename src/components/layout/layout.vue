<template>
    <div class="layout">
        <mainHead></mainHead>
        <main>
            <navMenu></navMenu>
            <main>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <!-- <keep-alive> -->
                            <component :is="Component"/>
                        <!-- </keep-alive> -->
                    </transition>
                </router-view>
            </main>
        </main>
    </div>
</template>

<script lang="ts" setup>
import navMenu from './menu.vue'
import mainHead from './head.vue'
const local = useLocal()
const temp = useTemp()
if(temp.token){
    if(local.isLogin == true){
        local.isLogin = false
    }else{
        apiAdmin.userInfo().then(({code,data})=>{
          if(code != 1) return;
          local.userInfo = data.user_info
          local.permissions = data.permission_list.map((item:any)=>item.url)
          local.menus = data.menu_list
        })
    }
  }
</script>

<style lang="less" scoped>
.layout{
    width:100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    >main{
        flex: 1;
        display: flex;
        overflow: auto;
        >main{
            flex: 1;
            min-height: 700px;
            overflow: auto;
            display: flex;
        }
    }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>