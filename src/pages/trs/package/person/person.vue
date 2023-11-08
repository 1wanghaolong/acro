<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('person.person.5umyvjg7pno0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('person.person.5umyvjg7q400')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('person.person.5umyvjg7q700')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('person.person.5umyvjg7q9c0')">
                                    <a-option v-for="item in useEnums('wealth.transaction.counterparty.status')"
                                        :value="item.value">{{
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
                        {{ searchInfo.show ? $t('person.person.5umyvjg7qc00') : $t('person.person.5umyvjg7qek0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('person.person.5umyvjg7qgk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('person.person.5umyvjg7qio0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['trsAccountChannelPersonCreate']"
                        @click="editVisible = true, statusVisible = 1" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('person.person.5umyvjg7qkk0')}}
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
                        <a-table-column :title="$t('person.person.5umyvjg7pno0')" data-index="name"></a-table-column>
                        <a-table-column :title="$t('person.person.5umyvjg7qmk0')" data-index="desc"></a-table-column>
                        <a-table-column :title="$t('person.person.5umyvjg7q700')">
                            <template #cell="{ record }">
                                <span v-if="$permission(['trsAccountChannelPersonUpdateStatus'])">
                                    <a-switch v-permission="['trsAccountChannelPersonUpdateStatus']" size="small"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('wealth.transaction.counterparty.status', record.status) }}
                                </span>
                            </template>

                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('person.person.5umyvjg7qoo0')" :width="80"
                            v-if="$permission(['trsAccountChannelPersonUpdate'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['trsAccountChannelPersonUpdate']"
                                        @click="editBtn(record)">{{$t('person.person.5umyvjg7qro0')}}</a-link>
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
        <a-modal width="600px" :mask-closable=false v-model:visible="editVisible" :on-before-ok="handleEdit"
            @close="onCloseEdit">
            <template #title>
                {{ statusVisible == 1 ? $t('person.person.5umyvjg7qts0') : $t('person.person.5umyvjg7qwc0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRef" :model="form" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameZh" :label="$t('person.person.5umyvjg7qyc0')" :rules="[{ required: true, message: $t('person.person.5umyw0x0wao0') }]"
                                :validate-trigger="['change', 'input']">
                                <a-input v-model="form.nameZh" :placeholder="$t('person.person.5umyvjg7r0g0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameEn" :label="$t('person.person.5umyvjg7r2c0')" :rules="[{ required: true, message: $t('person.person.5umyw0x0wao0') }]"
                                :validate-trigger="['change', 'input']">
                                <a-input v-model="form.nameEn" :placeholder="$t('person.person.5umyvjg7r4c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameTc" :label="$t('person.person.5umyvjg7r640')" :rules="[{ required: true, message: $t('person.person.5umyw0x0wao0') }]"
                                :validate-trigger="['change', 'input']">
                                <a-input v-model="form.nameTc" :placeholder="$t('person.person.5umyvjg7r800')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('person.person.5umyvjg7rbk0')">
                                <a-input v-model="form.descZh" :placeholder="$t('person.person.5umyvjg7rdc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('person.person.5umyvjg7rfg0')">
                                <a-input v-model="form.descEn" :placeholder="$t('person.person.5umyvjg7rh00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('person.person.5umyvjg7rio0')">
                                <a-input v-model="form.descTc" :placeholder="$t('person.person.5umyvjg7rk80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('person.person.5umyvjg7rls0')">
                                <a-switch :checked-value="1" :unchecked-value="0" v-model="form.status" /><span
                                    style="margin-left:10px">{{
                                        form.status == 0 ? $t('person.person.5umyvjg7rnc0') : $t('person.person.5umyvjg7rp00') }}</span>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>
  
<script lang="ts" setup>
// import { apiWealthCounterpartiesList, apiWealthCounterpartiesCreate,apiWealthCounterpartiesInfo,apiWealthCounterpartiesUpdate } from '@/api'
import { useEnums, useEnumsFormat } from '@/hooks/enums'
const local = useLocal()
const { t } = useI18n();
// const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        name: '',
        status: '',
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
    const { code, data } = await apiTrs.accountChannelPersonList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {
    let obj = await getWealthCounterpartiesInfo(val.id)
    const { code } = await apiTrs.accountChannelPersonUpdate({
        data: {
            id: val.id,
            name: {
                'zh-CN': obj.name['zh-CN'],
                'tc': obj.name['tc'],
                'en': obj.name['en'],
            },
            desc: {
                'zh-CN': obj.desc['zh-CN'],
                'tc': obj.desc['tc'],
                'en': obj.desc['en'],
            },
            'status': val.status,
        }
    })
    if (code != 1) return;
    Message.success({
        content: t('person.person.5umyvjg7rqo0'),
    })
    getData();
}
const getWealthCounterpartiesInfo = async (id: any) => {
    const { code, data } = await apiTrs.accountChannelPersonInfo({ id: id });
    if (code != 1) return;
    return data
}
// 编辑新增
const formRef: any = ref(null)
const statusVisible = ref(1)
const form: any = ref({
    nameZh: '',
    nameTc: '',
    nameEn: '',
    descZh: '',
    descEn: '',
    descTc: '',
    status: 1,
    id: ''
})
const editVisible = ref(false)
const editVisibleName = ref(t('person.person.5umyvjg7qts0'))
const handleEdit = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
        if (statusVisible.value == 1) {
            const res: any = await apiTrs.accountChannelPersonCreate({
                data: {
                    status: form.value.status,
                    name: {
                        'zh-CN': form.value.nameZh,
                        'tc': form.value.nameTc,
                        'en': form.value.nameEn,
                    },
                    desc: {
                        'zh-CN': form.value.descZh,
                        'tc': form.value.descTc,
                        'en': form.value.descEn,
                    },
                }
            });
            if (res.code != 1) return;
            Message.success({
                content: t('person.person.5umyvjg7rt40'),
            })
            getData();
            return true
        } else {
            const res: any = await apiTrs.accountChannelPersonUpdate({
                data: {
                    id: form.value.id,
                    status: form.value.status,
                    name: {
                        'zh-CN': form.value.nameZh,
                        'tc': form.value.nameTc,
                        'en': form.value.nameEn,
                    },
                    desc: {
                        'zh-CN': form.value.descZh,
                        'tc': form.value.descTc,
                        'en': form.value.descEn,
                    },
                }
            });
            if (res.code != 1) return;
            Message.success({
                content: t('person.person.5umyvjg7rqo0'),
            })
            getData();
            return true
        }

    }
    return false
}
const editBtn = async (val: any) => {
    let obj = await getWealthCounterpartiesInfo(val.id)
    form.value.nameZh = obj.name['zh-CN']
    form.value.nameTc = obj.name['tc']
    form.value.nameEn = obj.name['en']
    form.value.descZh = obj.desc['zh-CN']
    form.value.descTc = obj.desc['tc']
    form.value.descEn = obj.desc['en']
    form.value.id = val.id
    form.value.status = val.status
    editVisibleName.value = t('person.person.5umyvjg7rug0')
    statusVisible.value = 2
    editVisible.value = true
}
const onCloseEdit = () => {
    form.value = {
        nameZh: '',
        nameTc: '',
        nameEn: '',
        descZh: '',
        descEn: '',
        descTc: '',
        status: 1,
        id: ''
    }
    formRef.value.resetFields()
}

{
    getData()
}
</script>