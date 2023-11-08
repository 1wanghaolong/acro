<template>
    <template v-for="item in props.data" :key="'menu-item-' + item.url">
        <a-menu-item v-if="!item?.children?.length" :key="item.url">
            <a-icon v-if="item.icon">
                <svg><use :href="`#${item.icon}`"></use></svg>
            </a-icon>
            <span>{{ item.title[local.lang] }}</span>
        </a-menu-item>
        <a-sub-menu :key="(item.url)" v-else>
            <template #title>
                <a-icon v-if="item.icon">
                    <svg><use :href="`#${item.icon}`"></use></svg>
                </a-icon>
                <span>{{ item.title[local.lang] }}</span>
            </template>
            <menu-tree :data="item.children" />
        </a-sub-menu>
    </template>
</template>

<script setup lang="ts">
// import { h, compile } from 'vue';
const local = useLocal()
// type Props = {
//     name: string | undefined;
// };
// const icon = (props: Props) => {
//     return (props.name ? h(compile(`<${props.name}/>`)) : null)
// }
interface PropType {
    data: Array<any>;
}
const props = defineProps<PropType>();
</script>