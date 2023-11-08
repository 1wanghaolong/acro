<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{ $t('charge.detail.5um7occ530o0') }}
                        </a-space>
                        <a-space :size="18">
                            <a-button v-if="dataAll.setup" @click="dataAll.setup = false; getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{ $t('charge.detail.5um7occ54180') }}
                            </a-button>
                            <a-button v-if="dataAll.setup" @click="submit" type="primary" :loading="dataAll.loading"
                                :disabled="dataAll.loading">
                                <template #icon>
                                    <icon-save />
                                </template>
                                {{ $t('charge.detail.5um7occ54940') }}
                            </a-button>
                            <a-button v-permission="['otcAssetChargePackageUpdate']" v-if="!dataAll.setup"
                                @click="dataAll.setup = true" type="primary">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                {{ $t('charge.detail.5um7occ54f80') }}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="dataAll.data" :rules="dataAll.setup ? (dataAll.rules as any) : {}"
                    auto-label-width layout="vertical" @submit="submit">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameZh" :label="$t('charge.detail.5um7occ54j80')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameZh"
                                    :placeholder="$t('charge.detail.5um7occ54nc0')" />
                                <div v-else>{{ dataAll.data.nameZh }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameEn" :label="$t('charge.detail.5um7occ55tc0')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameEn"
                                    :placeholder="$t('charge.detail.5um7occ55y80')" />
                                <div v-else>{{ dataAll.data.nameEn }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameTc" :label="$t('charge.detail.5um7occ56280')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameTc"
                                    :placeholder="$t('charge.detail.5um7occ566g0')" />
                                <div v-else>{{ dataAll.data.nameTc }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('charge.detail.5um7occ56ak0')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descZh" :placeholder="$t('charge.detail.5um7occ573s0')" />
                                <div v-else>{{ dataAll.data.descZh }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('charge.detail.5um7occ62yk0')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descEn" :placeholder="$t('charge.detail.5um7occ65940')" />
                                <div v-else>{{ dataAll.data.descEn }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('charge.detail.5um7occ65ys0')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descTc" :placeholder="$t('charge.detail.5um7occ69zo0')" />
                                <div v-else>{{ dataAll.data.descTc }}</div>
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </a-card>
            <a-card style="margin-top: 20px;margin-bottom: 20px;" v-if="$permission(['otcAccountChargeAll'])">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            <a-radio-group type="button" v-model="charge.currency">
                                <a-radio v-for="item in useEnums('currency')" :value="item.value">{{
                                    item.trans[local.lang]
                                }}</a-radio>
                            </a-radio-group>
                        </a-space>
                        <a-space :size="18">
                            <a-button type="primary" v-permission="['otcAccountChargeCreate']" @click="addVisibleBtn">{{
                                $t('charge.detail.5um7occ6io80') }}</a-button>
                        </a-space>
                    </div>
                </template>
                <a-table :loading="charge.loading" :bordered="false" column-resizable :pagination="false"
                    :scroll="{ x: '100%', y: '100%' }" size="small"
                    :data="charge.list?.filter((item: any) => (item.currency == charge.currency))" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.detail.5um7occ6jbo0')">
                            <template #cell="{ record }">
                                <div v-if="viteName == 'trsPro'">{{ useEnumsFormat('otc.package.charge.create.type',
                                    record.type) }}</div>
                                <div v-if="viteName == 'wealthPro'">{{
                                    useEnumsFormat('otc.package.charge.create.wealthtype',
                                        record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.detail.5um7occ6mr40')" data-index="real_name">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.package.charge.create.calculate_type',
                                    record.calculate_type) }}</div>
                                <div v-if="record.calculate_type == 1">{{ Number(record.calculate_value) }}%
                                    {{ $t('charge.detail.5um7occ6nm40') }}</div>
                                <div v-else>{{ Number(record.calculate_value) }}{{$t('charge.detail.5um7wddcmqo0')}}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.detail.5um7occ6o4o0')" data-index="real_name">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type == 1">
                                    <div>{{ $t('create.create.5um5i87ey8o0') }}:{{ Number(record.max) }}</div>
                                    <div>{{ $t('create.create.5um5i87eysw0') }}:{{ Number(record.min) }}</div>
                                </template>
                                <template v-else>
                                    -
                                </template>

                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.detail.5um7occ6ofg0')" data-index="real_name">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type == 1">
                                    <div>{{ useEnumsFormat('otc.package.charge.create.round_type', record.round_type) }}
                                    </div>
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.detail.5um7occ6ots0')" data-index="round_precision">
                            <template #cell="{ record }">
                                <template v-if="record.calculate_type == 1">
                                    {{ record.round_precision }}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['otcAccountChargeUpdate', 'otcAccountChargeDelete'])"
                            fixed="right" :title="$t('charge.detail.5um7occ70nk0')" :width="150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-button v-permission="['otcAccountChargeUpdate']" style="padding-left: 0;"
                                        type="text" @click="editBtn(record)" size="small">
                                        {{ $t('charge.detail.5um7occ54f80') }}
                                    </a-button>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('charge.detail.5um7wddcoxg0')">
                                        <a-button v-permission="['otcAccountChargeDelete']" type="text" status="danger"
                                            size="small">
                                            {{ $t('charge.detail.5um7occ71hc0') }}
                                        </a-button>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </a-card>
        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd"
            @close="onCloseAdd">
            <template #title>
                {{ addForm.id ? $t('charge.detail.5um7wddcp5c0') : $t('charge.detail.5um7wddcp9g0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRefs" :model="addForm" :rules="(dataAll.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('charge.detail.5um7occ6jbo0')" v-if="viteName == 'trsPro'">
                                <a-select allow-clear v-model="addForm.type"
                                    :placeholder="$t('charge.detail.5um7occ71uw0')">
                                    <a-option v-for="item in useEnums('otc.package.charge.create.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="type" :label="$t('charge.detail.5um7occ6jbo0')"
                                v-if="viteName == 'wealthPro'">
                                <a-select allow-clear v-model="addForm.type"
                                    :placeholder="$t('charge.detail.5um7occ71uw0')">
                                    <a-option v-for="item in useEnums('otc.package.charge.create.wealthtype')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="calculate_type" :label="$t('charge.detail.5um7occ6mr40')">
                                <a-select allow-clear v-model="addForm.calculate_type"
                                    :placeholder="$t('charge.detail.5um7occ71uw0')">
                                    <a-option v-for="item in useEnums('otc.package.charge.create.calculate_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="calculate_value" :label="$t('charge.detail.5um7occ7o4g0')">
                                <div style="width: 100%;">
                                    <a-input-number hide-button style="width: 100%;" v-model="addForm.calculate_value"
                                        :placeholder="$t('charge.detail.5um7occ7omg0')">
                                        <template #append>{{ addForm.calculate_type == '1' ? '%' : '' }}</template>
                                    </a-input-number>
                                    <p style="margin-bottom: 0;margin-top:15px">{{ $t('charge.detail.5um7occ7or80') }}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="addForm.calculate_type != '3'" field="min"
                                :label="$t('charge.detail.5um7occ7q8w0')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.min"
                                    :placeholder="$t('charge.detail.5um7occ7omg0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="addForm.calculate_type != '3'" field="max"
                                :label="$t('charge.detail.5um7occ7qv40')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.max"
                                    :placeholder="$t('charge.detail.5um7occ7omg0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="addForm.calculate_type != '3'" field="round_type"
                                :label="$t('charge.detail.5um7occ6ofg0')">
                                <a-select allow-clear v-model="addForm.round_type"
                                    :placeholder="$t('charge.detail.5um7occ71uw0')">
                                    <a-option v-for="item in useEnums('otc.package.charge.create.round_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="addForm.calculate_type != '3'" field="round_precision"
                                :label="$t('charge.detail.5um7occ7qyo0')">
                                <a-input-number hide-button style="width: 100%;" v-model="addForm.round_precision"
                                    :placeholder="$t('charge.detail.5um7occ7omg0')">
                                </a-input-number>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const viteName = import.meta.env.VITE_NAME
// import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)

const dataAll: any = reactive({
    info: {},
    data: {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
    },
    setup: false,
    loading: false,
    rules: {
        nameZh: [{ required: true, message: t('charge.detail.5um7occ54nc0') }],
        nameEn: [{ required: true, message: t('charge.detail.5um7occ566g0') }],
        nameTc: [{ required: true, message: t('charge.detail.5um7occ55y80') }],
        descZh: [{ required: true, message: t('charge.detail.5um7occ573s0') }],
        descEn: [{ required: true, message: t('charge.detail.5um7occ65940') }],
        descTc: [{ required: true, message: t('charge.detail.5um7occ69zo0') }],
        type: [{ required: true, message: t('charge.detail.5um7occ7r1k0') }],
        calculate_type: [{ required: true, message: t('charge.detail.5um7occ7r5g0') }],
        round_type: [{ required: true, message: t('charge.detail.5um7occ80ls0') }],
        round_precision: [{ required: true, message: t('charge.detail.5um7occ810w0') }],
        calculate_value: [{ required: true, message: t('charge.detail.5um7occ814w0') }],
    }
})
const charge: any = reactive({
    list: [],
    loading: false,
    currency: useEnums('currency')?.[0].value
})
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.accountChargePackageInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    dataAll.info = data
    dataAll.data.nameZh = data.name['zh-CN']
    dataAll.data.nameEn = data.name['en']
    dataAll.data.nameTc = data.name['tc']
    dataAll.data.descZh = data.desc['zh-CN']
    dataAll.data.descEn = data.desc['en']
    dataAll.data.descTc = data.desc['tc']
}
const getChargeList = async () => {
    charge.loading = true
    const { code, data } = await apiOtc.accountChargeAll({
        'filter[charge_package_id]': route.params?.id
    })
    charge.loading = false
    if (code != 1) return;
    if (!data?.length) {
        charge.list = []
        return
    }
    charge.list = data

}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    const { code } = await apiOtc.getAssetChargePackageUpdate({
        data: {
            name: {
                'zh-CN': dataAll.data.nameZh,
                'en': dataAll.data.nameEn,
                'tc': dataAll.data.nameTc,
            },
            desc: {
                'zh-CN': dataAll.data.descZh,
                'en': dataAll.data.descEn,
                'tc': dataAll.data.descTc,
            },
            id: route.params?.id,
            status: dataAll.info.status
        }
    })
    if (code != 1) return;
    dataAll.setup = false
    getData()
}

const deleteBtn = async (val: any) => {
    const res: any = await apiOtc.accountChargeDelete({
        id: val.id + '',
    });
    if (res.code != 1) return
    getChargeList()
}

let addForm: any = ref({
    type: '',
    calculate_type: '',
    calculate_value: 0,
    max: 0,
    min: 0,
    round_type: '',
    round_precision: 0,
    currency: '',
    charge_package_id: route.params?.id
})
const addVisible = ref(false)
const addVisibleBtn = () => {
    addForm.value.currency = charge.currency
    addVisible.value = true
}
const editBtn = (val: any) => {
    addForm.value = { ...val }
    addForm.value.calculate_value = Number(val.calculate_value)
    addForm.value.max = Number(val.max)
    addForm.value.min = Number(val.min)
    addForm.value.round_type = addForm.value.round_type == 0 ? '' : addForm.value.round_type
    addVisible.value = true
}
const formRefs = ref()
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    if (addForm.value.calculate_type == 1) {
        if (addForm.value.max != 0 || addForm.value.min != 0) {
            if (addForm.value.max < addForm.value.min) {
                formRefs.value.setFields({
                    max: {
                        status: 'error',
                        message: t('charge.detail.5um7occ81800')
                    }
                })
                return false
            }
        }

    }

    addForm.value.charge_package_id = route.params?.id

    if (addForm.value.id) {
        const res: any = await apiOtc.accountChargeUpdate({
            data: addForm.value
        });
        if (res.code != 1) return false
    } else {
        let bool = charge.list.some((item: any) => item.currency == addForm.value.currency && item.type == addForm.value.type)
        if (bool) {
            Message.warning(t('charge.detail.5um7occ81bc0'))
            return false
        }
        const res: any = await apiOtc.accountChargeCreate({
            data: addForm.value
        });
        if (res.code != 1) return false
    }

    getChargeList()
}
const onCloseAdd = () => {
    addForm.value = {
        type: '',
        calculate_type: '',
        calculate_value: 0,
        max: 0,
        min: 0,
        round_type: '',
        round_precision: 0,
        currency: '',
        charge_package_id: route.params?.id
    }
    formRefs.value.resetFields()
}
{
    getChargeList()
    getData()
}

</script>

<style lang="less" scoped>:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}</style>