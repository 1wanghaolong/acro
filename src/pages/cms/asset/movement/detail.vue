<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">

                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp1mw0')">
                            <a-input disabled v-model="form.data.user_id" :placeholder="$t('movement.detail.5ukk0qbp4j80')">
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp4t40')">
                            <a-input disabled v-model="form.data.mobile" :placeholder="$t('movement.detail.5ukk0qbp4z80')">
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp54g0')">
                            <a-select disabled allow-clear v-model="form.data.direction" :placeholder="$t('movement.detail.5ukk0qbp5a80')">
                                <a-option v-for="item in useEnums('cms.asset.movement.direction')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp5g40')">
                            <a-input disabled v-model="form.data.account_id" :placeholder="$t('movement.detail.5ukk0qbp5po0')">
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp5vk0')">
                            <a-input disabled v-model="form.data.transferOut" :placeholder="$t('movement.detail.5ukk0qbp61g0')">
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp66o0')">
                            <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('movement.detail.5ukk0qbp5a80')">
                                <a-option v-for="item in useEnums('cms.asset.movement.status')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('movement.detail.5ukk0qbp6co0')">
                            <a-input disabled v-model="form.data.create_time" :placeholder="$t('movement.detail.5ukk0qbp6i80')">
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-form-item style="padding:0 8px" :label="$t('movement.detail.5ukk0qbp6nc0')" class="listItem">
                            <div v-for="item in form.data.position_list">
                                <div style="display: flex;">
                                    <a-form-item :label="$t('movement.detail.5ukk0qbp6t40')">
                                        <a-input disabled v-model="item.movement_num">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item style="margin-left:15px;" :label="$t('movement.detail.5ukk0qbp6y40')">
                                        <a-input disabled v-model="item.market">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item style="margin-left:15px;" :label="$t('movement.detail.5ukk0qbp73k0')">
                                        <a-input disabled v-model="item.symbol">
                                        </a-input>
                                    </a-form-item>
                                </div>
                            </div>
                        </a-form-item>
                    </a-row>
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
        reasons: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
    },
    rules: {

    }
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsOrderMovementDetail({
        movementId: route.params?.id
    })
    if (code != 1) return;
    form.data = { ...data }
    form.data['create_time'] = dayjs.unix(form.data['create_time']).format('YYYY-MM-DD HH:mm:ss')
    form.data.transferOut = data.another_broker_name + '(' + data.another_account_id + ')'

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
.listItem :deep(.arco-form-item-content-flex) {
    flex-wrap: nowrap !important;
    flex-direction: column-reverse;
    align-items: stretch !important;
}
</style>