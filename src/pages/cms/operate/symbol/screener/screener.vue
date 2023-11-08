
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('screener.screener.5ukitbqvazk0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('screener.screener.5ukitbqvh640')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('screener.screener.5ukitbqvhes0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('screener.screener.5ukitbqvi6o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
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
                        {{ searchInfo.show ? $t('screener.screener.5ukitbqviaw0') : $t('screener.screener.5ukitbqvieg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('screener.screener.5ukitbqvj380')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('screener.screener.5ukitbqvjds0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
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
                        <a-table-column :title="$t('screener.screener.5ukitbqvazk0')" data-index="name" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('screener.screener.5ukitbqvjvw0')" :width="440" >
                            <template #cell="{ record }">
                                <span v-for="item in record.field.config">
                                    <a-tag style="margin-right:10px;margin-bottom:5px;margin-top:5px" :color="'#ff7d00'" v-if="item.max && item.min">
                                        {{ item.min }}{{ useEnumsFormat('cms.operate.symbol.screener.unit', record.unit)
                                        }}
                                        - {{ item.max }}{{ useEnumsFormat('cms.operate.symbol.screener.unit',
                                            record.unit)
                                        }}
                                    </a-tag>
                                    <a-tag style="margin-right:10px;margin-bottom:5px;margin-top:5px" :color="'#ff7d00'" v-else-if="item.max">
                                        {{ $t('screener.screener.5ukitbqvk3o0') }}{{ item.max }}{{ useEnumsFormat('cms.operate.symbol.screener.unit',
                                            record.unit) }}
                                    </a-tag>
                                    <a-tag style="margin-right:10px;margin-bottom:5px;margin-top:5px" :color="'#ff7d00'" v-else-if="item.min">
                                        {{ $t('screener.screener.5ukitbqvk7o0') }}{{ item.min }}{{ useEnumsFormat('cms.operate.symbol.screener.unit',
                                            record.unit) }}
                                    </a-tag>

                                </span>

                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('screener.screener.5ukitbqvkes0')" :width="150">
                            <template #cell="{ record }">
                                <span v-if="record.field.customize.max && record.field.customize.min">
                                    <a-tag class="wordWrap" :color="'#f53f3f'">
                                        {{ record.field.customize.min }}{{
                                            useEnumsFormat('cms.operate.symbol.screener.unit', record.unit) }}
                                        - {{ record.field.customize.max }}{{
                                            useEnumsFormat('cms.operate.symbol.screener.unit', record.unit)
                                        }}
                                    </a-tag>
                                </span>
                                <span v-else>

                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('screener.screener.5ukitbqvhes0')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsQuoteGoodsUpdateStatus'])">
                                    <a-switch size="small" v-permission="['cmsQuoteGoodsUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsScreenerUpdate'])" fixed="right" :title="$t('screener.screener.5ukitbqvkj40')" :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsScreenerUpdate'])" @click="updateBtn(record)">{{$t('screener.screener.5ukitbqvkms0')}}</a-link>
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
        <a-modal :mask-closable=false v-model:visible="showVisibleUpdate" :on-before-ok="handleUpdateSubmit"
            @close="onClose">
            <template #title>
                {{ $t('screener.screener.5ukitbqvkms0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="unit" :label="$t('screener.screener.5ukitbqvkqk0')">
                        <a-select v-model="form.data.unit" :placeholder="$t('screener.screener.5ukitbqvi6o0')">
                            <a-option v-for="item in useEnums('cms.operate.symbol.screener.units')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('screener.screener.5ukitbqvjvw0')" style="width: 100%">
                        <div>
                            <div v-for="(item, index) in form.data.field.config" style="margin-bottom:10px">
                                <a-input-number v-model="item.min" hide-button :style="{ width: '197px' }"
                                    :placeholder="$t('screener.screener.5ukitbqvkuo0')" allow-clear>
                                    <template #prefix>
                                        <icon-pen />
                                    </template>
                                </a-input-number>
                                <a-input-number v-model="item.max" hide-button
                                    :style="{ width: '197px', 'margin': '0 20px' }" :placeholder="$t('screener.screener.5ukitbqvl180')" allow-clear>
                                    <template #prefix>
                                        <icon-pen />
                                    </template>
                                </a-input-number>
                                <a-button @click="deleteBtn(index)">
                                    <icon-delete />
                                </a-button>
                            </div>
                            <a-button v-if="form.data.field.config?.length < 5"
                                @click="form.data.field.config.push({ min: '', max: '' })">
                                <template #icon>
                                    <icon-plus />
                                </template>
                                {{$t('screener.screener.5ukitbqvl540')}}
                            </a-button>
                        </div>
                    </a-form-item>
                    <a-form-item :label="$t('screener.screener.5ukitbqvkes0')" style="width: 100%">
                        <div>
                            <div style="margin-bottom:10px">
                                <a-input-number hide-button v-model="form.data.field.customize.min"
                                    :style="{ width: '230px' }" :placeholder="$t('screener.screener.5ukitbqvkuo0')" allow-clear>
                                    <template #prefix>
                                        <icon-pen />
                                    </template>
                                </a-input-number>
                                <a-input-number hide-button v-model="form.data.field.customize.max"
                                    :style="{ width: '230px', 'margin-left': '20px' }" :placeholder="$t('screener.screener.5ukitbqvl180')" allow-clear>
                                    <template #prefix>
                                        <icon-pen />
                                    </template>
                                </a-input-number>
                            </div>
                        </div>
                    </a-form-item>
                    <a-divider style="margin-top:0" />
                    <a-form-item style="width: 100%">
                        {{$t('screener.screener.5ukitbqvl8w0')}}<br>
                        1. {{$t('screener.screener.5ukitbqvlqo0')}}<br>
                        2. {{$t('screener.screener.5ukitbqvlvs0')}}<br>
                        {{$t('screener.screener.5ukitbqvm1w0')}} [min，max] {{$t('screener.screener.5ukitbqvm5k0')}}<br>
                        {{$t('screener.screener.5ukitbqvm8g0')}} (min，+∞) {{$t('screener.screener.5ukitbqvm5k0')}}<br>
                        {{$t('screener.screener.5ukitbqvmb80')}} (-∞，max) {{$t('screener.screener.5ukitbqvm5k0')}}<br>
                        3. {{$t('screener.screener.5ukitbqvmdw0')}}<br>
                        4. {{$t('screener.screener.5ukitbqvmgg0')}}<br>
                        5. {{$t('screener.screener.5ukitbqvmjk0')}}
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
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
    const { code, data } = await apiCms.cmsScreenerList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    if (data?.list?.length > 0) {
        data?.list.forEach((item: any) => {
            item.field = JSON.parse(item.field)
        })
    }
    tableData.list = data?.list || []
    tableData.count = data?.count
    console.log(tableData.list);

}


const formRef = ref()
const form: any = reactive({
    data: {
        unit: 1,
        field: {
            config: [],
            customize: {
                min: 0,
                max: 0,
            },
        }
    },
    rules: {
        unit: [{ required: true, message: t('screener.screener.5ukitbqvmmk0') }],
        level: [{ required: true, message: t('screener.screener.5ukitbqvnb80') }],
        price: [{ required: true, message: t('screener.screener.5ukitbqvnfs0') }],
        day: [{ required: true, message: t('screener.screener.5ukitbqvnio0') }],
        currency: [{ required: true, message: t('screener.screener.5ukitbqvnlc0') }],
        status: [{ required: true, message: t('screener.screener.5ukitbqvnno0') }],
    }
})
const onClose = async () => {
    form.data = {
        unit: 1,
        field: {
            config: [],
            customize: {
                min: 0,
                max: 0,
            },
        }
    }
    formRef.value.resetFields()
}
const configId = ref()
const updateBtn = (val: any) => {
    let obj = JSON.parse(JSON.stringify(val))
    for (let key in form.data) {
        form.data[key] = obj[key]
    }
    configId.value = obj.id
    if (form.data.field.config?.length > 0) {
        form.data.field.config.forEach((item: any) => {
            if (item.max) {
                item.max = item.max ? Number(item.max) : ''
            }
            if (item.min) {
                item.min = item.min ? Number(item.min) : ''
            }
        })
    }
    if (form.data.field.customize?.length == 0) {
        form.data.field.customize = { min: '', max: '' }
    }
    form.data.field.customize.min = form.data.field.customize.min ? Number(form.data.field.customize.min) : ''
    form.data.field.customize.max = form.data.field.customize.max ? Number(form.data.field.customize.max) : ''
    showVisibleUpdate.value = true
}
const deleteBtn = (index: any) => {
    form.data.field.config.splice(index, 1)
}
const showVisibleUpdate = ref(false)
const handleUpdateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    if (form.data.field.config?.length < 3) {
        Message.info({ content: t('screener.screener.5ukitbqvnq40') })
        return false
    }
    let bool = false
    form.data.field.config.forEach((item: any) => {
        let min = item.min + ''
        let max = item.max + ''
        if (max && min) {
            if (item.max <= item.min) {
                bool = true
            }
        }
    })
    if (bool) {
        Message.error('max值不得小于min值')
        return false
    }
    if (typeof form.data.field.customize.min == 'number' && typeof form.data.field.customize.max == 'number') {
        if (form.data.field.customize.min >= form.data.field.customize.max) {
            Message.error('max值不得小于min值')
            return false
        }
    } else if (typeof form.data.field.customize.min == 'number') {
        Message.error('max值不得小于min值')
        return false
    }
    let params = JSON.parse(JSON.stringify(form.data))
    // params.field = JSON.stringify(params.field)
    params.config = params.field.config
    params.customize = params.field.customize
    const { code, msg } = await apiCms.cmsScreenerUpdate({
        configId: configId.value,
        data: params
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true

}

// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsScreenerUpdate({
        configId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('screener.screener.5ukitbqvntc0'),
    })
    getData();
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