<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userId" :label="$t('movement.movement.5ukjxtk4llk0')">
                                <a-input v-model="searchInfo.data.userId" :placeholder="$t('movement.movement.5ukjxtk4llk0')" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('movement.movement.5ukjxtk4mco0') : $t('movement.movement.5ukjxtk4mk00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('movement.movement.5ukjxtk4mr00')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('movement.movement.5ukjxtk4mwg0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="60"></a-table-column>
                        <a-table-column :title="$t('movement.movement.5ukjxtk4llk0')" data-index="user_id" :width="local.lang=='en'?100:60"></a-table-column>
                        <a-table-column :title="$t('movement.movement.5ukjxtk4n1o0')" data-index="type" :width="80">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.asset.movement.direction', record.direction) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('movement.movement.5ukjxtk4n700')" data-index="account_id"  :width="150" :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('movement.movement.5ukjxtk4nck0')"  :width="220" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{ record.another_broker_name }}({{ record.another_account_id }})
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('movement.movement.5ukjxtk4nhs0')" data-index="status" :width="120">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('cms.asset.movement.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('movement.movement.5ukjxtk4no00')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsOrderMovementUpdate','cmsAssetMovementDetail'])" fixed="right" :title="$t('movement.movement.5ukjxtk4nws0')" :width="100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsAssetMovementDetail'])"
                                            @click="router.push({ name: 'cmsAssetMovementDetail', params: { id: record.id } })">{{$t('movement.movement.5ukjxtk4o280')}}</a-link>
                                    <template v-if="record.status == 0">
                                        <a-link @click="upDateBtn(record)"
                                            v-if="$permission(['cmsOrderMovementUpdate'])">{{$t('movement.movement.5ukjxtk4o7c0')}}</a-link>
                                    </template>

                                </a-space>

                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisible" :on-before-ok="handleSubmit"
            @close="onClose">
            <template #title>
                {{ $t('movement.movement.5ukjxtk4o7c0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="formUpdate" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('movement.movement.5ukjxtk4llk0')">
                                <a-input disabled v-model="formUpdate.user_id">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('movement.movement.5ukjxtk4oc80')">
                                <a-input disabled v-model="formUpdate.mobile">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('movement.movement.5ukjxtk4n1o0')">
                                <a-select disabled allow-clear v-model="formUpdate.direction" :placeholder="$t('movement.movement.5ukjxtk4oi80')">
                                    <a-option v-for="item in useEnums('cms.asset.movement.direction')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('movement.movement.5ukjxtk4onw0')">
                                <a-input disabled v-model="formUpdate.account_id">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('movement.movement.5ukjxtk4nck0')">
                                <a-input disabled v-model="formUpdate.transferOut">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="status" :label="$t('movement.movement.5ukjxtk4nhs0')">
                                <a-select disabled allow-clear v-model="formUpdate.status" :placeholder="$t('movement.movement.5ukjxtk4oi80')">
                                    <a-option v-for="item in useEnums('cms.asset.movement.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('movement.movement.5ukjxtk4no00')">
                                <a-input disabled v-model="formUpdate.create_time">
                                </a-input>
                            </a-form-item>
                        </a-col>

                        <a-form-item style="padding:0 8px" :label="$t('movement.movement.5ukjxtk4ouc0')" class="listItem">
                            <div v-for="item in formUpdate.position_list">
                                <div style="display: flex;">
                                    <a-form-item :label="$t('movement.movement.5ukjxtk4p000')">
                                        <a-input disabled v-model="item.movement_num">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item style="margin-left:15px;" :label="$t('movement.movement.5ukjxtk4p900')">
                                        <a-input disabled v-model="item.market">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item style="margin-left:15px;" :label="$t('movement.movement.5ukjxtk4peo0')">
                                        <a-input disabled v-model="item.symbol">
                                        </a-input>
                                    </a-form-item>
                                </div>
                            </div>
                        </a-form-item>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :rules="[{ required: true, message: $t('movement.movement.5ukjxtk4pl40') }]" field="statusType" :label="$t('movement.movement.5ukjxtk4ppg0')">
                                <a-radio-group v-model="formUpdate.statusType"
                                    :options="useEnums('cms.asset.movement.statusType')">
                                    <template #label="{ data }">
                                        <p>{{ data.trans[local.lang] }}</p>
                                    </template>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>

                    </a-row>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        userId: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsOrderMovementList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const formUpdate: any = ref({
    statusType: ''
})
const formRef = ref()
const showVisible = ref(false)
const handleSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code, msg } = await apiCms.cmsOrderMovementUpdate({
        movementId: formUpdate.value.id,
        status: formUpdate.value.statusType,
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true
}
const upDateBtn = async (val: any) => {
    const obj = await getDetail(val.id)
    obj.transferOut = obj.another_broker_name + '(' + obj.another_account_id + ')'
    obj.create_time = dayjs.unix(obj.create_time).format('YYYY-MM-DD HH:mm:ss')
    formUpdate.value = obj
    formUpdate.value.direction = Number(formUpdate.value.direction)
    formUpdate.value.statusType = ''
    showVisible.value = true
}

const onClose = () => {
    formRef.value.resetFields()
}
// 详情
const getDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsOrderMovementDetail({
        movementId: id
    })
    if (code != 1) return;
    return data
}

{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}

.listItem :deep(.arco-form-item-content-flex) {
    flex-wrap: nowrap !important;
    flex-direction: column-reverse;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-select-view-disabled) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>