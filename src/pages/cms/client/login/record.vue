<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('login.record.5ukliv9zbhg0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('login.record.5ukliv9zcsg0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="device" :label="$t('login.record.5ukliv9zd000')">
                                <a-select allow-clear v-model="searchInfo.data.device" :placeholder="$t('login.record.5ukliv9zd5c0')">
                                    <a-option v-for="item in useEnums('cms.client.device.device')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('login.record.5ukliv9zdag0') : $t('login.record.5ukliv9zdf00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('login.record.5ukliv9zdis0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('login.record.5ukliv9zdmc0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-popover v-if="$permission(['cmsClientLoginRecordDownload'])" trigger="click" position="bottom">
                        <a-button :loading="tableData.loading">
                            <template #icon>
                                <icon-to-bottom />
                            </template>
                            {{$t('login.record.5ukliv9zdr80')}}
                        </a-button>
                        <template #content>
                            <div style="text-align: center;">
                                <p @click="download(1)" style="cursor: pointer;margin-bottom:10px">{{$t('login.record.5ukliv9zdw80')}}</p>
                                <p @click="download(2)" style="cursor: pointer;">{{$t('login.record.5ukliv9ze2k0')}}</p>
                            </div>
                        </template>
                    </a-popover>
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
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>

                        <a-table-column :title="$t('login.record.5ukliv9zbhg0')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('login.record.5ukliv9ze9w0')" data-index="login_ip" :width="140"></a-table-column>
                        <a-table-column :title="$t('login.record.5ukljuoi91w0')" data-index="region" :width="130"></a-table-column>
                        <a-table-column :title="$t('login.record.5ukljuohibw0')" data-index="app_version" :width="local.lang == 'en' ? 130 : 100"></a-table-column>
                        <a-table-column :title="$t('login.record.5ukliv9zd000')" data-index="device" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.client.device.device', record.device) || record.device || $t('login.record.5ukliv9zeco0') }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('login.record.5ukliv9zef80')" data-index="device_version" :width="350"></a-table-column>
                        <a-table-column :title="$t('login.record.5ukljuoi9og0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
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
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        device: '',
        lastLoginTime: [],
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
    const { code, data } = await apiCms.cmsUserLoginRecordList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 导出
const download = async (num: any) => {
    let strTitle = `ID,用户ID/User Id,账号/Account,IP地址/IP,IP地址/IP Address,App版本/App Version,设备类型/Device Type,设备版本/Device Version,登录时间/Login Time\n`
    let name = 'user-login-record-' + dayjs(new Date()).format('YYYY-MM-DD')
    let list = []
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    if (num == 1) {
        param.page = 1
        let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
        for (let i = 1; i <= pageNum; i++) {
            param.page = i
            const { data } = await apiCms.cmsUserLoginRecordList({
                ...useFilter(param)
            })
            list.push(...data.list)
        }
    } else {
        const { data } = await apiCms.cmsUserLoginRecordList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('login.record.5ukliv9zeho0') });
    let downloadList = listValue(strTitle, list)
    downloadExcel(downloadList, name)
}
const listValue = (strTitle: any, list: any) => {
    //定义表头
    if (!list.length) {
        return
    }
    let str = strTitle
    list.forEach((item: any) => {
        let create_time = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let device = useEnumsFormat('cms.client.device.device', item.device) || item.device || t('login.record.5ukliv9zeco0')
        str += `${item?.id}\t,`  // ID
        str += `${item?.user_id}\t,`  // 用户id
        str += `${item?.mobile}\t,` // 账号
        str += `${item?.login_ip}\t,`
        str += `${item?.region}\t,`
        str += `${item?.app_version}\t,`
        str += `${device}\t,`
        str += `${item?.device_version}\t,`
        str += `${create_time}\t,`
        str += '\n'
    })
    return str
}

{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>