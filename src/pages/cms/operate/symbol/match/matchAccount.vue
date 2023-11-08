
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('match.matchAccount.5ukja78gccs0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('match.matchAccount.5ukja78gczo0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="nickname" :label="$t('match.matchAccount.5ukja78gd8c0')">
                                <a-input v-model="searchInfo.data.nickname" :placeholder="$t('match.matchAccount.5ukja78gczo0')" />
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
                        {{ searchInfo.show ? $t('match.matchAccount.5ukja78gmq80') : $t('match.matchAccount.5ukja78gn100') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('match.matchAccount.5ukja78gnjk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('match.matchAccount.5ukja78gnmk0')}}
                    </a-button>
                    <a-button @click="router.back()">
                        {{$t('match.matchAccount.5ukja78gnp00')}}
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
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78gccs0')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78gd8c0')" data-index="nickname" :width="140" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78gnrg0')" data-index="type" :width="local.lang=='en'?170:140" >
                            <template #cell="{ record }">
                                {{ record.type=='CN'?$t('match.matchAccount.5ukjc5sa0q80'):record.type=='HK'?$t('match.matchAccount.5ukjbkis9tg0'):record.type=='US'?$t('match.matchAccount.5ukjbkisug00'):record.type}}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78gntk0')" data-index="market_value" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.market_value) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78gnvs0')" data-index="total_profit" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.total_profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78gnyc0')" data-index="balance" :width="140">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.balance) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78go0o0')" data-index="total_profit_rate" :width="local.lang=='en'?160:110">
                            <template #cell="{ record }">
                                {{ record.total_profit_rate > 0 ? '+' : '' }}{{ $dataFormat(record.total_profit_rate * 100)
                                }}%
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78go2s0')" data-index="currency" :width="80" ></a-table-column>
                        <a-table-column :title="$t('match.matchAccount.5ukja78go4w0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsOperateQuoteMatchPosition', 'cmsOperateQuoteMatchTransaction'])"
                            fixed="right" :title="$t('match.matchAccount.5ukja78go700')" :width="local.lang=='en'?280:160">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateQuoteMatchPosition'])"
                                        @click="router.push({ name: 'cmsOperateQuoteMatchPosition', query: { id: record.id } })">{{$t('match.matchAccount.5ukja78goa00')}}</a-link>
                                    <a-link v-if="$permission(['cmsOperateQuoteMatchTransaction'])"
                                        @click="router.push({ name: 'cmsOperateQuoteMatchTransaction', query: { id: record.id, nickname: record.nickname } })">{{$t('match.matchAccount.5ukja78gock0')}}</a-link>
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
        <a-modal :mask-closable=false v-model:visible="showVisibleCreate" :on-before-ok="handleCreateSubmit"
            @close="onClose">
            <template #title>
                {{ $t('match.matchAccount.5ukja78gof00') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="countryCode" :label="$t('match.matchAccount.5ukja78goi00')">
                        <a-input hide-button v-model="form.data.countryCode" :placeholder="$t('match.matchAccount.5ukja78gol00')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="mobile" :label="$t('match.matchAccount.5ukja78gon40')">
                        <a-input hide-button v-model="form.data.mobile" :placeholder="$t('match.matchAccount.5ukja78gop40')">
                        </a-input>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
// import { useEnumsFormat } from '@/hooks/enums'
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
        match_id: route.params?.id,
        nickname: '',
        mobile: '',
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
    const { code, data } = await apiCms.cmsMatchAccountList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const formRef = ref()
const form: any = reactive({
    data: {
        mobile: '',
        countryCode: '',
        cdkeyId: '',
    },
    rules: {
        countryCode: [{ required: true, message:t('match.matchAccount.5ukja78gol00') }],
        mobile: [{ required: true, message:t('match.matchAccount.5ukja78gop40') }],
        sendList: [{ required: true, message:t('match.matchAccount.5ukja78goqk0') }],
    }
})
const onClose = async () => {
    form.data = {
        mobile: '',
        countryCode: '',
        cdkeyId: route.params?.id,
    },
        formRef.value.resetFields()
}
// 发送
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code, msg } = await apiCms.cmsQuoteCdkeySend({
        ...form.data
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true
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