<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" @submit="submit" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">
                    <a-form-item :label="$t('comment.update.5ukfebcpbaw0')">
                        <a-input disabled v-model="form.data.username">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('comment.update.5ukfebcpcaw0')">
                        <a-input disabled v-model="form.data.mobile">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="status" :label="$t('comment.update.5ukfebcpcf40')">
                        <a-select disabled allow-clear v-model="form.data.market" :placeholder="$t('comment.update.5ukfebcpchk0')">
                            <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('comment.update.5ukfebcpck00')">
                        <a-input disabled v-model="form.data.symbol">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('comment.update.5ukfebcpcmg0')">
                        <a-input disabled v-model="form.data.content">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="image.zh-CN" :label="$t('comment.update.5ukfebcpcos0')"> 
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
                    <a-form-item field="status" :label="$t('comment.update.5ukfebcpcr40')">
                        <a-radio-group v-model="form.data.status" :options="useEnums('cms.message.comment.status1')">
                            <template #label="{ data }">
                                <p>{{ data.trans[local.lang] }}</p>
                            </template>
                        </a-radio-group>
                    </a-form-item>
                    <!-- <a-form-item field="create_time" :label="'评论时间'">
                        <a-input disabled v-model="form.data.create_time">
                        </a-input>
                    </a-form-item> -->
                    <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('comment.update.5ukfebcpcuo0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('comment.update.5ukfebcpcx80')}}
                            </a-button>
                        </a-space>
                    </div>
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
        id: '',
        symbol:''
    },
    rules: {

    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsUserCommentUpdate({
        commentId:route.params?.id,
        data: {
            status:form.data.status
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
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