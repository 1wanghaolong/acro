<template>
    <a-tabs v-model:active-key="active" @change="getData" justify>
        <template #extra>
            <a-button v-permission="['trsAccountDetailWithdrawCreate']" type="primary" @click="form.show = true">
                <template #icon>
                    <icon-plus />
                </template>
                {{$t('withdraw.withdraw.5um8ddog8j40')}}
            </a-button>
        </template>
        <a-tab-pane key="" :title="$t('withdraw.withdraw.5um8ddog92w0')" :disabled="tableData.loading">
            <div class="tabBox">
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
                            <a-table-column :title="`TRS${ $t('withdraw.withdraw.5um8ddog96g0') }`" :width="100" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.trs_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3j40')" :width="120">
                                <template #cell="{ record }">
                                    <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                    <div>EN:{{ record.asset_account_info?.english_name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3gc0')" :width="100" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3lc0')" data-index="charge_currency" :width="80">
                                <template #cell="{ record }">
                                    <a-tag>{{ record?.charge_currency||$t('withdraw.withdraw.5ukmqklvtps0') }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3nc0')" data-index="charge_amount" :width="120"></a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5uklo2hw8u80')" :width="100">
                                <template #cell="{ record }">
                                    <a-tag size="small" :color="record.status == 2?'#00b42a':record.status == 0?'#ff7d00':'#f53f3f'">
                                        {{ useEnumsFormat('trs.account.withdraw.status', record.status) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3tw0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3wc0')" :width="120">
                                <template #cell="{ record }">
                                    <div v-if="!record.check_time">-</div>
                                    <div v-else>
                                        <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                        <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column fixed="right" :title="$t('withdraw.withdraw.5ukmqklvtws0')" :width="80" v-if="$permission(['trsAccountWithdrawDetail'])">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-link
                                            @click="router.push({ name: 'trsAccountWithdrawDetail', params: { id: record.id } })">{{$t('withdraw.withdraw.5ukmqklvtzk0')}}</a-link>
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
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" :title="$t('withdraw.withdraw.5um8ddog98o0')" :disabled="tableData.loading">
            <div class="tabBox">
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
                            <a-table-column :title="`TRS${ $t('withdraw.withdraw.5um8ddog96g0') }`" :width="120" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.trs_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3j40')" :width="120">
                                <template #cell="{ record }">
                                    <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                    <div>EN:{{ record.asset_account_info?.english_name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3gc0')" :width="120" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3lc0')" data-index="charge_currency" :width="80">
                                <template #cell="{ record }">
                                    <a-tag>{{ record?.charge_currency||$t('withdraw.withdraw.5ukmqklvtps0') }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s3nc0')" data-index="charge_amount" :width="160"></a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s4100')" data-index="charge_fee" :width="120"></a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um8ddog9b00')" :width="100">
                                <template #cell="{ record }">
                                    <a-tag>{{ useEnumsFormat('trs.account.withdraw.apply.from_type', record.from_type) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5um3wu8s43k0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('withdraw.withdraw.5ukmqklvt200')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
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
            </div>

        </a-tab-pane>
        <a-modal v-model:visible="form.show" :title="$t('withdraw.withdraw.5um8ddog9d80')" @cancel="form.show = false" @before-ok="submit">
            <a-form ref="formRef" :model="form.data" layout="vertical">
                <a-form-item :label="$t('withdraw.withdraw.5um3wu8s3lc0')">
                    <div>{{ accountDetail?.currency }}</div>
                </a-form-item>
                <a-form-item field="amount" :label="$t('withdraw.withdraw.5um3wu8s3nc0')" :rules="[{required:true,message:$t('withdraw.withdraw.5um8ddog9f80')},{type:'number',min:1,message:$t('transfer.transfer.5unxdv1x7zg0')}]">
                    <a-input-number @change="debounceGetChargeCalculate" v-model="form.data.amount" :placeholder="$t('withdraw.withdraw.5um8ddog9f80')" />
                </a-form-item>
                <a-form-item :label="$t('withdraw.withdraw.5um8ddog9h00')">
                    <a-select @change="getChargeCalculate" v-model="form.data.is_auto_calculate_fee" :placeholder="$t('withdraw.withdraw.5ukmqklvsto0')">
                        <a-option v-for="item in useEnums('otc.account.transfer.is_auto_calculate_fee')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item :label="$t('withdraw.withdraw.5um3wu8s4100')" field="fee" :rules="[{required:true,message:$t('withdraw.withdraw.5um8ddog9j80')}]">
                    <div  v-if="form.data.is_auto_calculate_fee">{{ form.data.fee || 0 }}</div>
                    <a-input-number v-else v-model="form.data.fee" :placeholder="$t('withdraw.withdraw.5um8ddog9j80')" />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-tabs>
</template>

<script lang="ts" setup>
import { useEnumsFormat,useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const active = ref('')
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const accountDetail = ref()
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        amount:0,
        is_auto_calculate_fee:1,
        fee:0
    }
})
const searchInfo = reactive({
    data: {
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    show: false,
    loading: false,
    list: [],
    count: 0
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return false;
    form.loading = true
    const { code, msg } = await apiTrs.accountWithdrawCreate({
        data: {
            ...form.data,
            trs_account_id:route.params?.id,
            asset_account_id:accountDetail.value?.asset_account_id,
            operator_id:local.userInfo?.id || 1,
        }
    })
    form.loading = false
    if (code != 1) return false;
    formRef.value?.resetFields()
    Message.success({ content: msg })
    getData()
}
const getChargeCalculate = async () => {
    if(form.data.is_auto_calculate_fee != 1) return;
    const { code, data } = await apiOtc.chargeCalculate({
        asset_account_id: accountDetail.value?.asset_account_id,
        currency:accountDetail.value?.currency,
        type:4,
        amount:form.data.amount
    })
    if (code != 1) return;
    form.data.fee = form.data.amount?(data.charge_fee || 0):0
}
const debounceGetChargeCalculate = debounce(getChargeCalculate,250)
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.accountWithdraw(useFilter({
        ...searchInfo.data,
        status: active.value ? active.value : null,
        trs_account_id: route.params?.id,
        from_type:active.value?null:2
    }))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data.list
    tableData.count = data.count
}
const getAccountDetail = async () => {
    const { code, data } = await apiTrs.accountInfo({
        id: route.params?.id
    })
    if (code != 1) return;
    accountDetail.value = data
}
onMounted(()=>{
    if(route.query?.create){
        form.show = true
    }
})
{
    getData()
    getAccountDetail()
}
</script>