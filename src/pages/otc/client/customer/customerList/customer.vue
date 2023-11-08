<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('customerList.customer.5ulhegysrgw0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('customerList.customer.5ulhegyssn00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="nickname" :label="$t('customerList.customer.5ulhegyssrc0')">
                                <a-input v-model="searchInfo.data.nickname" :placeholder="$t('customerList.customer.5ulhegyssn00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('customerList.customer.5ulhegyssus0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('customerList.customer.5ulhegyssn00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('customerList.customer.5ulhegyssxg0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('customerList.customer.5ulhegyst000')">
                                    <a-option v-for="item in useEnums('otc.customer.otc.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('customerList.customer.5ulhegyst3c0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="customer_manager_id" :label="$t('customerList.customer.5ulhegyst5w0')">
                                <a-select allow-clear v-model="searchInfo.data.customer_manager_id" :placeholder="$t('customerList.customer.5ulhegyst000')">
                                    <a-option v-for="item in statusOptions" :value="item.id">{{
                                        item.real_name }}</a-option>
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
                        {{ searchInfo.show ? $t('customerList.customer.5ulhegystfs0') : $t('customerList.customer.5ulhegystmw0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('customerList.customer.5ulhegystw40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('customerList.customer.5ulhegysu000')}}
                    </a-button>
                </a-space>
                <!-- <a-space :size="18">
                    <a-button @click="router.push({ name: 'assetAccountAdd' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('customerList.customer.5ulhegysu3w0')}}
                    </a-button>
                </a-space> -->
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
                        <a-table-column title="ID" data-index="id" :width="70"></a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegysu8g0')" data-index="country_code" :width="local.lang=='en'?110:70"></a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegysub40')" data-index="mobile" :ellipsis="true" :tooltip="true" :width="130">
                            <!-- <template #cell="{ record }">
                                <div>{{ record?.mobile }}</div>
                            </template> -->
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegyssrc0')" data-index="nickname" :ellipsis="true" :tooltip="true"
                            :width="150"></a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegysudc0')" :width="100">
                            <template #cell="{ record }">
                                <a-image width="40" height="40" :src="record.avatar" v-if="record.avatar">
                                    <template #loader>
                                        <img width="40" :src="record.avatar" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegysufk0')" data-index="name" :ellipsis="true" :tooltip="true" :width="100">
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegysui00')" :width="local.lang=='en'?100:80">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.customer.otc.sex', record.sex) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegysw4g0')" :width="local.lang=='en'?150:100">
                            <template #cell="{ record }">
                                <a-tag v-if="record.is_open" size="small" :color="'#00b42a'">
                                    {{ $t('customerList.customer.5ulhegysw9o0') }}
                                </a-tag>
                                <a-tag v-else size="small" :color="'#ff7d00'">
                                    {{ $t('customerList.customer.5ulhegyswe00') }}
                                </a-tag>
                                <!-- <a-button class="btn"
                                    style="background-color: rgba(33, 116, 243, 0.15686274509803);color: #2174F3;">{{ $t('customerList.customer.5ulhegysw9o0')
                                    }}</a-button> -->
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegyst5w0')" :width="local.lang=='en'?200:180">
                            <template #cell="{ record }">
                                <a-space direction="horizontal" :size="18">
                                    <a-tag
                                        style="width: 80px;height: 100%;display: flex;justify-content: center;align-items: center;white-space: pre-wrap;text-align: center;"
                                        v-if="record?.customer_manager_info?.real_name" size="small">
                                        {{ record?.customer_manager_info?.real_name }}
                                    </a-tag>
                                    <a-tag
                                        style="width: 80px;height: 100%;display: flex;justify-content: center;align-items: center;white-space: pre-wrap;text-align: center;"
                                        v-else size="small">
                                        {{ $t('customerList.customer.5ulhegyswfk0') }}
                                    </a-tag>
                                    <a-link v-permission="['otcustomerManagerAll', 'otcCustomerBindManager']"
                                        @click="allocation(record)">{{ $t('customerList.customer.5ulhegyswk40') }}</a-link>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegyst3c0')" :width="local.lang=='en'?160:120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('customerList.customer.5ulhegyssxg0')" :width="70" v-if="$permission(['otcustomerManagerState'])">
                            <template #cell="{ record }">
                                <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('customerList.customer.5ulhegyswlk0')" :width="80" v-if="$permission(['otcCustomerDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'otcCustomerDetail', params: { customid: record.id }, query: { mobile: record.mobile } })">{{$t('customerList.customer.5ulhegyswmw0')}}</a-link>
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
        <a-modal :titleAlign="'start'" :visible="visible" @ok="OkClick" @cancel="CancelClick">
            <template #title>{{ $t('customerList.customer.5ulhegyswog0') }}</template>
            <div style="display: flex; align-items: center;flex-wrap: wrap;">
                <div style="padding-bottom: 10px;">{{ $t('customerList.customer.5ulhegyswpo0') }}</div>
                <a-select v-model="customerManagerId" :placeholder="$t('customerList.customer.5ulhegyswr40')">
                    <a-option v-for="item of statusOptions" :value="item.id" :label="item.real_name" />
                </a-select>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const { t } = useI18n();
const visible = ref(false) //分配客户经理
const allocationVal: any = ref("")  //选中数据
const customerManagerId: any = ref("")  //选中id
const statusOptions = ref<any>([]); // 基金经理列表
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        nickname: "",
        real_name: '',
        status: -1,
        customer_manager_id: "",
        create_time: [],
        page: 1,
        per_page: 20
    },
    managerData: {
        real_name: "",
        status: "1",
        ignore_id_list: ""
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
// 编辑状态
const changeStatus = async (record: any) => {
    const { code, msg } = await apiAdmin.adminuserUpdate({
        userId: record.id,
        data: {
            status: record.status
        }
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
    getData()
}
const allocation = (val: any) => {
    visible.value = true
    allocationVal.value = val
    customerManagerId.value = val.customer_manager_info.id
}
const OkClick = async () => {
    if (!customerManagerId.value) {
        Message.info({ content: t('customerList.customer.5ulhegyswr40') })
        return
    }
    const { code, msg } = await apiOtc.getcustomerBindManager({
        id: allocationVal.value.id,
        customer_manager_id: customerManagerId.value
    })
    if (code != 1) return getData(), visible.value = false, customerManagerId.value = "";
    Message.success({ content: msg })
    visible.value = false
    customerManagerId.value = ""
    getData()
};
const CancelClick = () => {
    visible.value = false;
};
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiOtc.getcustomerList({
        ...useFilter(searchInfo.data)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const managerData = async () => {
    const { code, data } = await apiOtc.getcustomerManagerAll({
        ...useFilter(searchInfo.managerData)
    })
    if (code != 1) return;
    statusOptions.value = data;
}
{
    getData()
    usePermission(['otcClientManagerAll']) && managerData()
}
</script>