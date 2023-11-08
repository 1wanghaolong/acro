<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('riskControl.riskControl.5umz1jn7aj40')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('riskControl.riskControl.5um89q86j7c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('riskControl.riskControl.5umz1jn7b4w0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('riskControl.riskControl.5um89q86jdw0')">
                                    <a-option v-for="item in useEnums('otc.package.charge.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('riskControl.riskControl.5um89q86jkg0') : $t('riskControl.riskControl.5um89q86jmk0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('riskControl.riskControl.5um89q86joc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('riskControl.riskControl.5um89q86jpw0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['configTemplateRiskControlCreate']" @click="visibleBtn(1)" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('riskControl.riskControl.5um89q86jrg0')}}
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
                        <a-table-column :title="$t('riskControl.riskControl.5umz1jn7aj40')" data-index="name"></a-table-column>

                        <a-table-column :title="$t('riskControl.riskControl.5umz1jn7b8o0')" data-index="multiple">
                            <template #cell="{ record }">
                                {{ record?.finance_multiple_info?.multiple }}{{ $t('riskControl.riskControl.5umz1jn7bao0') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.riskControl.5um89q86i7k0')" data-index="warn_value">
                            <template #cell="{ record }">
                                {{ record.warn_value }}{{ '%' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.riskControl.5um89q86ics0')" data-index="close_value">
                            <template #cell="{ record }">
                                {{ record.close_value }}{{ '%' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.riskControl.5umz1jn7bck0')" data-index="desc"></a-table-column>
                        <a-table-column :title="$t('riskControl.riskControl.5umz1jn7b4w0')" :width="80">
                            <template #cell="{ record }">
                                <span v-if="$permission(['configTemplateRiskControlUpdateStatus'])">
                                    <a-switch v-permission="['configTemplateRiskControlUpdateStatus']" size="small"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('otc.package.charge.status', record.status) }}
                                </span>
                            </template>

                        </a-table-column>
                        <a-table-column v-if="$permission(['configTemplateRiskControlUpdate'])" fixed="right" :title="$t('riskControl.riskControl.5um89q86juo0')"
                            :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-button v-permission="['configTemplateRiskControlUpdate']"
                                        @click="visibleBtn(2, record)" style="padding-left: 0;" type="text" size="small">
                                        {{ $t('riskControl.riskControl.5um89q86hsc0') }}
                                    </a-button>
                                    <!-- <a-popconfirm position="left" @ok="deleteBtn(record)" content="您确认要删除吗? ">
                                        <a-button type="text" status="danger" size="small">
                                            {{ $t('riskControl.riskControl.5um89q86jxw0') }}
                                        </a-button>
                                    </a-popconfirm> -->
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
        <a-modal width="600px" :mask-closable=false v-model:visible="formVisible" :on-before-ok="handleForm"
            @close="onCloseForm">
            <template #title>
                {{ statusVisible == 1 ? $t('riskControl.riskControl.5umz1jn7bg40') : $t('riskControl.riskControl.5umz1jn7biw0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRef" :rules="(formRules as any)" :model="form" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameZh" :label="$t('riskControl.riskControl.5umz1jn7bl40')">
                                <a-input v-model="form.nameZh" :placeholder="$t('riskControl.riskControl.5umz1jn7bn40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameEn" :label="$t('riskControl.riskControl.5umz1jn7bow0')">
                                <a-input v-model="form.nameEn" :placeholder="$t('riskControl.riskControl.5umz1jn7bqw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="nameTc" :label="$t('riskControl.riskControl.5umz1jn7bss0')">
                                <a-input v-model="form.nameTc" :placeholder="$t('riskControl.riskControl.5umz1jn7buk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="multiple_id" :label="$t('riskControl.riskControl.5umz1jn7b8o0')">
                                <a-select allow-clear v-model="form.multiple_id" :placeholder="$t('riskControl.riskControl.5um89q86jdw0')">
                                    <a-option v-for="item in uncreateMultipleList" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="warn_value" :label="$t('riskControl.riskControl.5um89q86i7k0')">
                                <div style="width:100%">
                                    <a-input-number hide-button style="width: 100%;" v-model="form.warn_value"
                                        :placeholder="$t('riskControl.riskControl.5um89q86j7c0')">
                                        <template #append>%</template>
                                    </a-input-number>
                                    <div style="margin-top:15px">
                                        <span>{{$t('riskControl.riskControl.5umz1jn7bwg0')}} = {{$t('riskControl.riskControl.5umz1jn7bzc0')}} * {{$t('riskControl.riskControl.5um89q86i7k0')}}</span>
                                        <br>
                                        <span>{{$t('riskControl.riskControl.5umz1jn7c180')}}</span>
                                    </div>
                                </div>

                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="close_value" :label="$t('riskControl.riskControl.5um89q86ics0')">
                                <div style="width:100%">
                                    <a-input-number hide-button style="width: 100%;" v-model="form.close_value"
                                        :placeholder="$t('riskControl.riskControl.5um89q86j7c0')">
                                        <template #append>%</template>
                                    </a-input-number>
                                    <div style="margin-top:15px">
                                        <span>{{$t('riskControl.riskControl.5umz1jn7c3c0')}} = {{$t('riskControl.riskControl.5umz1jn7bzc0')}} * {{$t('riskControl.riskControl.5um89q86ics0')}}</span>
                                        <br>
                                        <span>{{$t('riskControl.riskControl.5umz1jn7c5c0')}}</span>
                                    </div>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('riskControl.riskControl.5umz1jn7c7c0')">
                                <a-input v-model="form.descZh" :placeholder="$t('riskControl.riskControl.5umz1jn7c9c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('riskControl.riskControl.5umz1jn7ccc0')">
                                <a-input v-model="form.descEn" :placeholder="$t('riskControl.riskControl.5umz1jn7cec0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('riskControl.riskControl.5umz1jn7cgg0')">
                                <a-input v-model="form.descTc" :placeholder="$t('riskControl.riskControl.5umz1jn7chs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('riskControl.riskControl.5umz1jn7cjc0')">
                                <a-switch :checked-value="1" :unchecked-value="0" v-model="form.status" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
import { useEnums, useEnumsFormat } from '@/hooks/enums'
// import dayjs from 'dayjs'
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
    const { code, data } = await apiTrs.riskControlTemplateList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiTrs.riskControlTemplateUpdate({
        data: {
            id: val.id,
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('riskControl.riskControl.5umz1jn7cks0'),
    })
    getData();
}
// 删除
// const deleteBtn = async (val: any) => {
//     const { code } = await apiTrs.riskControlTemplateDelete({ 'id': [val.id] })
//     if (code != 1) return;
//     getData();
//     getriskUncreateMultipleList()
// }
const formVisible = ref(false)
const statusVisible = ref(1)
const formRef = ref()
const formRules = ref({
    nameZh: [{ required: true, message: t('riskControl.riskControl.5umz1jn7bn40') }],
    nameEn: [{ required: true, message: t('riskControl.riskControl.5umz1jn7buk0') }],
    nameTc: [{ required: true, message: t('riskControl.riskControl.5umz1jn7bqw0') }],
    multiple_id: [{ required: true, message: t('riskControl.riskControl.5um89q86jdw0') }],
    close_value: [{ required: true, message: t('riskControl.riskControl.5um89q86jdw0') }],
    warn_value: [{ required: true, message: t('riskControl.riskControl.5um89q86jdw0') }]
})
const form: any = ref({
    nameZh: '',
    nameEn: '',
    nameTc: '',
    descZh: '',
    descEn: '',
    descTc: '',
    multiple_id: '',
    status: 1,
    close_value: 0,
    warn_value: 0,
    id: '',
})
const visibleBtn = async (num: any, val?: any) => {
    statusVisible.value = num
    await getriskUncreateMultipleList()
    if (num == 2) {
        let obj = await getriskControlTemplateInfo(val.id)
        const { warn_value, close_value, status, multiple_id } = obj
        form.value.warn_value = Number(warn_value)
        form.value.multiple_id = Number(multiple_id)
        form.value.nameZh = obj.name['zh-CN']
        form.value.nameEn = obj.name['en']
        form.value.nameTc = obj.name['tc']
        form.value.descZh = obj.desc['zh-CN']
        form.value.descEn = obj.desc['en']
        form.value.descTc = obj.desc['tc']
        form.value.status = status
        form.value.id = val.id
        form.value.close_value = Number(close_value)
        financeMultipleAll.value.forEach((item: any) => {
            if (item.value == obj.multiple_id) {
                uncreateMultipleList.value.push(item)
            }
        })
    }
    if (num == 1 && !uncreateMultipleList.value?.length) return Message.warning(t('riskControl.riskControl.5umz1jn7cnc0'))
    formVisible.value = true
}
const handleForm = async () => {
    const res = await formRef.value?.validate();
    if (res) return false
    let param: any = {}
    param.multiple_id = form.value.multiple_id
    param.status = form.value.status
    param.close_value = form.value.close_value
    param.warn_value = form.value.warn_value
    param.name = {
        'zh-CN': form.value.nameZh,
        'en': form.value.nameEn,
        'tc': form.value.nameTc,
    }
    param.desc = {
        'zh-CN': form.value.descZh,
        'en': form.value.descEn,
        'tc': form.value.descTc,
    }
    if (form.value.id) {
        param.id = form.value.id
    }
    if (form.value.id) {
        const { code } = await apiTrs.riskControlTemplateUpdate({
            data: param
        })
        if (code != 1) return false;
        getData();
        return true
    } else {
        const { code } = await apiTrs.riskControlTemplateCreate({
            data: param
        })
        if (code != 1) return false;

        getData();
        return true
    }

}
const onCloseForm = () => {
    form.value = {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
        multiple_id: '',
        status: 1,
        close_value: 0,
        warn_value: 0,
        id: '',
    }
    uncreateMultipleList.value = []
    formRef.value.resetFields()
}
const getriskControlTemplateInfo = async (id: any) => {
    const { code, data } = await apiTrs.riskControlTemplateInfo({ id: id });
    if (code != 1) return;
    return data
}
const uncreateMultipleList: any = ref([])
const getriskUncreateMultipleList = async () => {
    uncreateMultipleList.value = []
    const { code, data } = await apiTrs.riskControlTemplateUncreateMultipleList();
    if (code != 1) return;
    if (!data.list?.length) return
    data.list.forEach((item: any) => {
        uncreateMultipleList.value.push({
            value: item.id,
            trans: {
                'zh-CN': item.multiple + t('riskControl.riskControl.5umz1jn7bao0'),
                'en': item.multiple + 'x',
                'tc': item.multiple + t('riskControl.riskControl.5umz1jn7bao0'),
            }
        })
    })

}
const financeMultipleAll: any = ref([])
const getfinanceMultipleAll = async () => {
    financeMultipleAll.value = []
    const { code, data } = await apiTrs.financeMultipleAll();
    if (code != 1) return;
    data.forEach((item: any) => {
        financeMultipleAll.value.push({
            value: item.id,
            trans: {
                'zh-CN': item.multiple + t('riskControl.riskControl.5umz1jn7bao0'),
                'en': item.multiple + 'x',
                'tc': item.multiple + t('riskControl.riskControl.5umz1jn7bao0'),
            }
        })
    })
}
getfinanceMultipleAll()

{
    getData()
}

</script>