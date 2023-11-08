
import { number } from 'echarts/core';

<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userId" :label="$t('destroy.destroy.5uklagz10lk0')">
                                <a-input v-model="searchInfo.data.userId" :placeholder="$t('destroy.destroy.5uklagz11rw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('destroy.destroy.5uklagz12100')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('destroy.destroy.5uklagz11rw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="isOpen" :label="$t('destroy.destroy.5uklagz125k0')">
                                <a-select allow-clear v-model="searchInfo.data.isOpen" :placeholder="$t('destroy.destroy.5uklagz12ck0')">
                                    <a-option v-for="item in useEnums('cms.client.destroy.isOpen')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="createType" :label="$t('destroy.destroy.5uklagz12fk0')">
                                <a-select allow-clear v-model="searchInfo.data.createType" :placeholder="$t('destroy.destroy.5uklagz12ck0')">
                                    <a-option v-for="item in useEnums('cms.client.destroy.createType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('destroy.destroy.5uklagz12i80')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('destroy.destroy.5uklagz12ck0')">
                                    <a-option v-for="item in useEnums('cms.client.destroy.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
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
                        {{ searchInfo.show ? $t('destroy.destroy.5uklagz12kg0') : $t('destroy.destroy.5uklagz12r80') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('destroy.destroy.5uklagz12u40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('destroy.destroy.5uklagz130k0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsUserDestroySubmit']" @click="showVisibleLogOff = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('destroy.destroy.5uklagz133k0')}}
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
                        <a-table-column :title="$t('destroy.destroy.5uklagz10lk0')" data-index="user_id" :width="80"></a-table-column>
                        <a-table-column :title="$t('destroy.destroy.5uklagz135w0')" data-index="nickname" :width="140" ></a-table-column>
                        <a-table-column :title="$t('destroy.destroy.5uklagz12100')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                            <a-table-column :title="$t('client.client.5ukkjkrevf40')" :width="local.lang=='en'?150:100">
                            <template #cell="{ record }">
                                <a-tag v-if="record.is_open" size="small" :color="'#00b42a'">
                                    {{ $t('client.client.5ukkjkrevhg0') }}
                                </a-tag>
                                <a-tag v-else size="small" :color="'#ff7d00'">
                                    {{ $t('client.client.5ukkjkrevko0') }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('destroy.destroy.5uklagz12fk0')" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.client.destroy.createType', record.create_type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('destroy.destroy.5uklagz12i80')" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.client.destroy.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('destroy.destroy.5uklagz13hc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsClientDetailLogOff', 'cmsUserDestroyExecute', 'cmsUserDestroyCancel'])"
                            fixed="right" :title="$t('destroy.destroy.5uklagz13os0')" :width="statusShow ? (local.lang == 'en' ? 380 : 200) : (local.lang == 'en' ? 130 : 100)">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsClientDetailLogOff'])"
                                        @click="router.push({ name: 'cmsClientDetail', params: { id: record.user_id } })">{{$t('destroy.destroy.5uklagz13ro0')}}</a-link>
                                    <a-popconfirm v-if="record.status == 0" position="left" @ok="logOffBtn(record, 1)"
                                        :content="$t('destroy.destroy.5uns2ujisd80')">
                                        <a-link v-if="$permission(['cmsUserDestroyExecute'])" status="danger">{{$t('destroy.destroy.5uklagz13u80')}}</a-link>
                                    </a-popconfirm>
                                    <a-popconfirm v-if="record.status == 0" position="left" @ok="logOffBtn(record, 2)"
                                        :content="$t('destroy.destroy.5uns2ujj4b00')">
                                        <a-link v-if="$permission(['cmsUserDestroyCancel'])">{{$t('destroy.destroy.5uklagz13wo0')}}</a-link>
                                    </a-popconfirm>
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
        <a-modal :mask-closable=false v-model:visible="showVisibleLogOff" :on-before-ok="handleLogOffSubmit"
            @close="onClose">
            <template #title>
                {{ $t('destroy.destroy.5uklagz133k0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.dataLogOff" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="userId" :label="$t('destroy.destroy.5uklagz13zo0')">
                        <a-select v-model:model-value="form.dataLogOff.userId" allow-search :placeholder="$t('destroy.destroy.5uklagz13zo0')"
                            @search="getUserList">
                            <a-option v-for="item in (userList as any)" :value="item.id">
                                {{ item.title }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :rules="[{ required: true, message: $t('destroy.destroy.5uklagz145k0') }]" field="sendSms" :label="$t('destroy.destroy.5uklagz145k0')">
                        <a-radio-group v-model="form.dataLogOff.sendSms" :options="useEnums('cms.client.destroy.sendSms')">
                            <template #label="{ data }">
                                <p>{{ data.trans[local.lang] }}</p>
                            </template>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
// @ts-ignore
import { saveAs } from 'file-saver';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        userId: '',
        isOpen: '',
        status: '',
        createType: '',
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
    const { code, data } = await apiCms.cmsUserDestroyList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const statusShow = ref(true)
const getDataStatus = async () => {
    const { code, data } = await apiCms.cmsUserDestroyList({
        ...useFilter({ status: 0 })
    })
    if (code != 1) return;
    if (data?.list?.length) {
        statusShow.value = true
    } else {
        statusShow.value = false
    }
}
const logOffBtn = async (val: any, num: number) => {
    if (num == 1) {
        const { code } = await apiCms.cmsUserDestroyExecute({ 'destroyId': val.id })
        if (code != 1) return;
    } else {
        const { code } = await apiCms.cmsUserDestroyCancel({ 'destroyId': val.id })
        if (code != 1) return;
    }
    getDataStatus()
    getData();
}

const showVisibleLogOff = ref(false)
const formRef = ref()
const form = reactive({
    dataLogOff: {
        userId: '',
        sendSms: 0,
    },
    rules: {
        'userId': [{ required: true, message: t('destroy.destroy.5uklagz149o0') }],
    }
})
const onClose = async () => {
    formRef.value.resetFields()
}
const handleLogOffSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code, msg } = await apiCms.cmsUserDestroySubmit({
        ...form.dataLogOff
    })
    if (code != 1) return;
    Message.success({ content: msg })
    getDataStatus()
    getData()
}
const userList = ref([])
const getUserList = async (value: string) => {
    const { code, data } = await apiCms.cmsUserDestroySearch({ keyword: value })
    if (code != 1) return;
    userList.value = data.list.map((item: any) => {
        item.title = `(${item.country_code}) ${item.mobile}`
        return item
    })
}
{
    getDataStatus()
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>