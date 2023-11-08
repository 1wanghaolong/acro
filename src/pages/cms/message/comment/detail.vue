<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">

                    <a-form-item :label="$t('comment.detail.5ukff2ky88w0')">
                        <a-input disabled v-model="form.data.username">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('comment.detail.5ukff2ky9q00')">
                        <a-input disabled v-model="form.data.mobile">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="status" :label="$t('comment.detail.5ukff2ky9ww0')">
                        <a-select disabled allow-clear v-model="form.data.market" :placeholder="$t('comment.detail.5ukff2kya000')">
                            <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('comment.detail.5ukff2kyb680')">
                        <a-input disabled v-model="form.data.content">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="image.zh-CN" :label="$t('comment.detail.5ukff2kybgw0')"> 
                        <div v-if="form.data.image?.length">
                        <template v-for="item in form.data.image">
                            <a-image style="margin:2px"  height="100" :src="item">
                                <template #loader>
                                    <img  :src="item" style="filter: blur(5px)" />
                                </template>
                            </a-image>
                        </template>
                    </div>
                    <div v-else>{{ '--' }}</div>
                    </a-form-item>
                    <a-form-item field="status" :label="$t('comment.detail.5ukff2kybn00')">
                        <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('comment.detail.5ukff2kya000')">
                            <a-option v-for="item in useEnums('cms.message.comment.status')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="create_time" :label="$t('comment.detail.5ukff2kybqo0')">
                        <a-input disabled v-model="form.data.create_time">
                        </a-input>
                    </a-form-item>
                    
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        image: [],
        username: '',
        mobile: '',
        content: '',
        create_time: '',
        market: '',
        status: 1,
        id: ''
    },
    rules: {

    }
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsUserCommentDetail({
        commentId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    form.data['create_time'] = dayjs.unix(form.data['create_time']).format('YYYY-MM-DD HH:mm:ss')
    // form.data['market']  = useEnumsFormat('market.market', form.data['market'])
}
{
    getData()
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>