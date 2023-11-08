
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('client.client.5ukkjkreth00')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('client.client.5ukkjkreu1c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="nickname" :label="$t('client.client.5ukkjkreu6k0')">
                                <a-input v-model="searchInfo.data.nickname"
                                    :placeholder="$t('client.client.5ukkjkreu1c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="realName" :label="$t('client.client.5ukkjkreu8w0')">
                                <a-input v-model="searchInfo.data.realName"
                                    :placeholder="$t('client.client.5ukkjkreu1c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('client.client.5ukkjkreubk0')">
                                <a-select allow-clear v-model="searchInfo.data.status"
                                    :placeholder="$t('client.client.5ukkjkreug80')">
                                    <a-option v-for="item in useEnums('cms.client.client.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="createTime" :label="$t('client.client.5ukkjkreuig0')">
                                <a-range-picker v-model="searchInfo.data.createTime" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('client.client.5ukkjkreuks0') : $t('client.client.5ukkjkreun40') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('client.client.5ukkjkreupc0') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('client.client.5ukkjkreus80') }}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-popover v-if="$permission(['cmsClientDownload'])" trigger="click" position="bottom">
                        <a-button :loading="tableData.loading">
                            <template #icon>
                                <icon-to-bottom />
                            </template>
                            {{ $t('client.client.5ukkjkreuuk0') }}
                        </a-button>
                        <template #content>
                            <div style="text-align: center;">
                                <p @click="download(1)" style="cursor: pointer;margin-bottom:10px">
                                    {{ $t('client.client.5ukkjkrev000') }}</p>
                                <p @click="download(2)" style="cursor: pointer;">{{ $t('client.client.5ukkjkrev280') }}</p>
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
                        <a-table-column title="ID" data-index="id" :width="60"></a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkrev5s0')" data-index="country_code"
                            :width="80"></a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkreth00')" data-index="mobile" :width="130"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkreu6k0')" data-index="nickname"
                            :width="140"></a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkrev8k0')" :width="100">
                            <template #cell="{ record }">
                                <a-image width="40" height="40" :src="record.avatar" v-if="record.avatar">
                                    <template #loader>
                                        <img width="40" :src="record.avatar" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkreu8w0')" data-index="real_name" :ellipsis="true"
                            :tooltip="true" :width="100">
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkrevao0')" :width="local.lang == 'en' ? 100 : 80">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.customer.otc.sex', record.sex) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkrevcw0')" data-index="score" :width="80">
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkrevf40')" :width="local.lang == 'en' ? 150 : 100">
                            <template #cell="{ record }">
                                <a-tag v-if="record.is_open" size="small" :color="'#00b42a'">
                                    {{ $t('client.client.5ukkjkrevhg0') }}
                                </a-tag>
                                <a-tag v-else size="small" :color="'#ff7d00'">
                                    {{ $t('client.client.5ukkjkrevko0') }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkreuig0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukkjkreubk0')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsUserUpdateStatus'])">
                                    <a-switch size="small" v-permission="['cmsUserUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.client.client.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsClientDetail', 'cmsAssetPayment', 'cmsUserUpdate', 'cmsUserUpdateScore'])"
                            fixed="right" :title="$t('client.client.5ukkjkrevog0')" :width="local.lang == 'en' ? 290 : 200">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsUserUpdateScore'])"
                                        @click="showVisibleScore = true, form.dataScore.id = record.id">{{ $t('client.client.5ukkjkrevqo0') }}</a-link>
                                    <a-link v-if="$permission(['cmsAssetPayment'])"
                                        @click="router.push({ name: 'cmsAssetPayment', query: { id: record.id } })">{{ $t('client.client.5ukkjkrevss0') }}</a-link>
                                    <a-link v-if="$permission(['cmsClientDetail'])"
                                        @click="router.push({ name: 'cmsClientDetail', params: { id: record.id } })">{{ $t('client.client.5ukkjkrevus0') }}</a-link>
                                    <a-link v-if="$permission(['cmsUserUpdate'])"
                                        @click="updateBtn(record)">{{ $t('client.client.5ukkjkrevw80') }}</a-link>

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
        <a-modal :mask-closable=false v-model:visible="showVisibleScore" :on-before-ok="handleScoreSubmit" @close="onClose">
            <template #title>
                {{ $t('client.client.5ukkjkrevqo0') }}
            </template>
            <div style="text-align:center;width:410;padding-left: 75px;">
                <a-form ref="formRef" :model="form.dataScore" :rules="(form.rules as any)">
                    <a-form-item style="margin-bottom:0" field="score" :label="$t('client.client.5ukkjkrevxs0')">
                        <a-input-number :style="{ width: '220px' }" :placeholder="$t('client.client.5ukkjkreu1c0')"
                            v-model="form.dataScore.score" mode="button" class="input-demo" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisibleUpdate" :on-before-ok="handleUpdateSubmit"
            @close="onClose">
            <template #title>
                {{ $t('client.client.5ukkjkrevw80') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('client.client.5ukkjkrev5s0')">
                                <a-input disabled v-model="form.data.country_code">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('client.client.5ukkjkreth00')">
                                <a-input disabled v-model="form.data.mobile">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('client.client.5ukkjkreu6k0')">
                                <a-input disabled v-model="form.data.nickname">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('client.client.5ukkjkreu8w0')">
                                <a-input disabled v-model="form.data.real_name">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="sex" :label="$t('client.client.5ukkjkrevao0')">
                                <a-select disabled allow-clear v-model="form.data.sex"
                                    :placeholder="$t('client.client.5ukkjkreug80')">
                                    <a-option v-for="item in useEnums('otc.customer.otc.sex')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('client.client.5ukkjkrevcw0')">
                                <a-input disabled v-model="form.data.score">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="password" :label="$t('client.client.5ukkjkrevzg0')">
                                <a-input v-model="form.data.password" :placeholder="$t('client.client.5ukkjkrew0s0')">
                                </a-input>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const route = useRoute()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        nickname: '',
        realName: '',
        status: '',
        createTime: [],
        page: 1,
        per_page: 20
    }
})
console.log(route.query.createTime);
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
    const { code, data } = await apiCms.cmsUserList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const showVisibleScore = ref(false)
const formRef = ref()
const form: any = reactive({
    dataScore: {
        score: 0,
        id: ''
    },
    data: {

    },
    rules: {
        'score': [{ required: true, message: t('client.client.5ukkjkrew2w0') }],
        'password': [{ required: true, message: t('client.client.5ukkjkrew2w0') }],
    }
})
const onClose = async () => {
    formRef.value.resetFields()
}
const handleScoreSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code } = await apiCms.cmsUserWalletBalanceChange({
        data: {
            user_id: form.dataScore.id,
            balance: form.dataScore.score,
            type: 'integral'
        }
    })
    if (code != 1) {
        return false
    };
    Message.success({
        content: t('client.client.5ukkjkrew4g0'),
    })
    getData();
    return true
}
const showVisibleUpdate = ref(false)
const updateBtn = (val: any) => {
    form.data = { ...val }
    form.data.password = ''
    console.log(form.data);
    showVisibleUpdate.value = true
}
const handleUpdateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code, msg } = await apiCms.cmsUserUpdate({
        userId: form.data.id,
        data: {
            password: form.data.password,
            status: form.data.status,
        }
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true
}
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsUserUpdate({
        userId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('client.client.5ukkjkrew600'),
    })
    getData();
}
// 导出
const download = async (num: any) => {
    let strTitle = `#,ID,区号/Country Code,账号/Account,昵称/Nickname,真实姓名/Real Name,性别/Gender,积分/score,是否开户/Is Open,最后一次使用时间/Last use time,注册时间/Create time,状态/Status\n`
    let name = 'user-data-' + dayjs(new Date()).format('YYYY-MM-DD')
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
            const { data } = await apiCms.cmsUserList({
                ...useFilter(param)
            })
            list.push(...data.list)
        }
    } else {
        const { data } = await apiCms.cmsUserList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('client.client.5ukkjkrew8k0') });
    let downloadList = listValue(strTitle, list)
    downloadExcel(downloadList, name)
}
const listValue = (strTitle: any, list: any) => {
    //定义表头
    if (!list.length) {
        return
    }
    let str = strTitle
    list.forEach((item: any, Index: any) => {
        let create_time = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let last_use_time = item.last_use_time ? dayjs.unix(item.last_use_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        // let status = useEnumsFormat('wealth.transaction.inquiryRecord.status', item.status) 
        // let createTime = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD'):'--'
        str += `${Index + 1}\t,`  // index
        str += `${item?.id}\t,`  // ID
        str += `${item?.country_code}\t,`  // 区号
        str += `${item?.mobile}\t,` // 账号
        str += `${item?.nickname}\t,` // 用户昵称
        str += `${item?.real_name}\t,` // 真实姓名
        str += `${item?.sex == 1 ? '男' : item?.sex == 2 ? '女' : '未知'}\t,` // 性别
        str += `${item?.score}\t,` // 积分/score
        str += `${item?.is_open ? '已开户' : '未开户'}\t,` // 是否开户
        str += `${last_use_time}\t,` //最后一次使用时间/Last use time
        str += `${create_time}\t,` //注册时间/Create time
        str += `${item?.status == 1 ? '启用' : '禁用'}\t,` // 状态/Status
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

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-select-view-disabled) {
    -webkit-text-fill-color: var(--color-text-1);
}</style>