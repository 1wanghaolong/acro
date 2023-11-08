<template>
    <div>
        <a-card :loading="loading" v-permission="['trsAccountDetailChargeUpdate']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('charge.charge.5um861d7ljk0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false; getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('charge.charge.5um861d7m3k0')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading"
                            :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('charge.charge.5um861d7m6c0')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('charge.charge.5um861d7m8g0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('charge.charge.5um861d7mak0')">
                            <div v-if="!form.setup">{{
                                form.data.charge_package_info.name
                            }}</div>
                            <a-select v-else allow-clear v-model="form.data.charge_package_id" :placeholder="$t('charge.charge.5um861d7mdg0')">
                                <a-option v-for="item in chargePackageList" :value="item.id">
                                    {{ item.name }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card style="margin-top: 20px;" v-permission="['trsAccountDetailChargeList']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('charge.charge.5um861d7mfo0')}}
                    </a-space>
                </div>
            </template>
            <div class="buttonBox">
                <a-space :size="18">
                    {{$t('charge.charge.5um861d7mi40')}}
                    <a-select style="width: 200px;" allow-clear v-model="searchInfo.data.market" :placeholder="$t('charge.charge.5um861d7mk00')">
                        <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                    <a-button @click="searchInfo.data.market = '', getChargeAll()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('charge.charge.5um861d7mm00')}}
                    </a-button>
                    <a-button @click="getChargeAll" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('charge.charge.5um861d7mns0')}}
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
                        <a-table-column :title="$t('charge.charge.5um861d7mi40')" :width="160">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record.market?.split(',')" >{{
                                        useEnumsFormat('market.market', item) }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mps0')">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record.security_type?.split(',')">{{
                                        useEnumsFormat('trs.package.security_type', item) }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7ms00')">
                            <template #cell="{ record }">
                                <div>{{ record.name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mus0')">
                            <template #cell="{ record }">
                                <a-tag>{{useEnumsFormat('trs.package.direction', record.direction) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mww0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.calculate_type', record.calculate_type) }}</div>
                                <div>{{ Number(record.calculate_value) }}{{ record.calculate_type == 1 ? `%${$t('charge.charge.5um861d7mz40')}` :
                                    record.calculate_type == 2 ? $t('charge.charge.5um861d7n0w0') : $t('charge.charge.5um861d7n300') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7n5c0')">
                            <template #cell="{ record }">
                                <div>{{$t('charge.charge.5um875l4eoc0')}}:{{ Number(record.max) }}</div>
                                <div>{{$t('charge.charge.5um875l4f7s0')}}:{{ Number(record.min) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7n7k0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.round_type', record.round_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7nbg0')" data-index="round_precision"></a-table-column>
                    </template>
                </a-table>
            </div>
        </a-card>
        <a-card style="margin-top: 20px;" v-permission="['trsAccountDetailChargeList']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('charge.charge.5um861d7ndk0')}}
                    </a-space>
                </div>
            </template>
            <div class="buttonBox">
                <a-space :size="18">
                    {{$t('charge.charge.5um861d7mi40')}}
                    <a-select style="width: 200px;" allow-clear v-model="searchInfo2.data.market" :placeholder="$t('charge.charge.5um861d7mk00')">
                        <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                    <a-button @click="searchInfo2.data.market = '', getChargeAll2()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('charge.charge.5um861d7mm00')}}
                    </a-button>
                    <a-button @click="getChargeAll2" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('charge.charge.5um861d7mns0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData2.loading"
                    :scroll="tableData2.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData2.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mi40')" :width="160">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record.market?.split(',')">{{
                                        useEnumsFormat('market.market', item) }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mps0')">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record.security_type?.split(',')">{{
                                        useEnumsFormat('trs.package.security_type', item) }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7ms00')">
                            <template #cell="{ record }">
                                <div>{{ record.name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mus0')">
                            <template #cell="{ record }">
                                <a-tag>{{useEnumsFormat('trs.package.direction', record.direction) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7mww0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.calculate_type', record.calculate_type) }}</div>
                                <div>{{ Number(record.calculate_value) }}% {{ record.calculate_type == 1 ? $t('charge.charge.5um861d7nkg0') :
                                    record.calculate_type == 2 ? $t('charge.charge.5um861d7n0w0') : $t('charge.charge.5um861d7n300') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7n5c0')">
                            <template #cell="{ record }">
                                <div>{{$t('charge.charge.5um875l4eoc0')}}:{{ Number(record.max) }}</div>
                                <div>{{$t('charge.charge.5um875l4f7s0')}}:{{ Number(record.min) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7n7k0')" :width="local.lang=='en'?160:120">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('otc.account.round_type', record.round_type) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7nbg0')" data-index="round_precision"></a-table-column>
                        <a-table-column :title="$t('charge.charge.5um861d7nlw0')" data-index="charge_person_info.name"></a-table-column>
                    </template>
                </a-table>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
const local = useLocal()
const route = useRoute()
const formRef = ref()
const { t } = useI18n();
const chargePackageList = ref()
const loading = ref(false)
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        charge_package_id: ''
    },
    rules: {
        charge_package_id: [{ required: true, message: t('charge.charge.5um861d7mdg0') }],
    }
})
const searchInfo = reactive({
    show: false,
    data: {
        type: 1,
        market: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    loading: false
})
const searchInfo2 = reactive({
    show: false,
    data: {
        type: 2,
        market: '',
        page: 1,
        per_page: 20
    }
})
const tableData2 = reactive({
    list: [],
    count: 0,
    loading: false
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.accountUpdate({
        id: form.data.id,
        data: {
            charge_package_id: form.data.charge_package_id
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    form.setup = false
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    form.data.charge_package_id = data.charge_package_id
    getChargeAll()
    getChargeAll2()
}
const getChargeAll = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.accountChargeAll(useFilter({
        ...searchInfo.data,
        "charge_package_id": form.data.charge_package_id,
    }))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.length ? data : []
}
const getChargeAll2 = async () => {
    tableData2.loading = true
    const { code, data } = await apiTrs.accountChargeAll(useFilter({
        ...searchInfo2.data,
        "charge_package_id": form.data.charge_package_id,
    }))
    tableData2.loading = false
    if (code != 1) return;
    tableData2.list = data?.length ? data : []
}
const getChargePackage = async () => {
    const { code, data } = await apiTrs.accountChargePackageAll(useFilter({
        status: 1
    }))
    if (code != 1) return;
    chargePackageList.value = data
}
onMounted(() => {
    route.query?.setup && (form.setup = true)
})
{
    getData()
    getChargePackage()
}
</script>