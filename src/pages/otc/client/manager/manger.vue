<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('manager.manger.5ulhex7mca40')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('manager.manger.5ulhex7md400')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('manager.manger.5ulhex7mdcc0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('manager.manger.5ulhex7mdhk0')">
                                    <a-option v-for="item in useEnums('otc.manager.managerList.status')"
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
                        {{ searchInfo.show ? $t('manager.manger.5ulhex7mdm80') : $t('manager.manger.5ulhex7mdqw0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('manager.manger.5ulhex7mdvs0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('manager.manger.5ulhex7me0s0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['otcCustomerBindManagerCreate']" @click="visible = true, createAndEdit = 1"
                        type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('manager.manger.5ulhex7me5g0')}}
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
                        <!-- <a-table-column title="ID" data-index="id" :width="100"></a-table-column> -->
                        <!-- <a-table-column title="区号" data-index="country_code" :width="100"></a-table-column> -->
                        <a-table-column :title="$t('manager.manger.5ulhex7mca40')" :width="100" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.real_name ? record.real_name : '--' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('manager.manger.5ulhex7med00')" :width="100">
                            <template #cell="{ record }">
                                <a-image width="40" height="40" :src="record.avatar" v-if="record.avatar">
                                    <template #loader>
                                        <img width="40" :src="record.avatar" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('manager.manger.5ulhex7meic0')" :width="230" data-index="mobile">
                            <template #cell="{ record }">
                                <div>{{ record.country_code }} {{ record.mobile }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('manager.manger.5ulhex7men40')" :width="230" data-index="email"></a-table-column>
                        <a-table-column :title="$t('manager.manger.5ulhex7mes80')" :width="200" data-index="wechat_number"></a-table-column>
                        <!-- <a-table-column title="性别" :width="100">
                            <template #cell="{ record }">
                                <a-typography-text>
                                    {{ record.sex == '1' ? $t('manager.manger.5ulhex7meww0') : record.sex == '0' ? $t('manager.manger.5ulhex7mf200') : $t('manager.manger.5ulhex7mf7c0') }}
                                </a-typography-text>
                            </template>
                        </a-table-column> -->
                        <!-- <a-table-column title="资金账户" :width="100">
                            <template #cell="{ record }">
                                <a-button class="btn" v-if="record.is_open" style="
                                    background-color: rgba(33, 116, 243, 0.15686274509803);
                                    color: #2174f3;
                                    ">{{ $t('manager.manger.5ulhex7mfc00') }}</a-button>
                                <a-button v-else>{{ $t('manager.manger.5ulhex7mfh80') }}</a-button>
                            </template>
                        </a-table-column> -->
                        <!-- <a-table-column title="注册时间" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column> -->
                        <a-table-column :title="$t('manager.manger.5ulhex7mdcc0')" :width="120">
                            <template #cell="{ record }">
                                <a-space direction="horizontal" :size="18">
                                    <a-typography-text>
                                        <a-tag v-if="record.status" size="small" :color="'#00b42a'">
                                            {{ $t('manager.manger.5ulhex7mfm40') }}
                                        </a-tag>
                                        <a-tag v-else size="small" :color="'#ff7d00'">
                                            {{ $t('manager.manger.5ulhex7mfqw0') }}
                                        </a-tag>
                                    </a-typography-text>
                                    <a-switch v-permission="['otcCustomerBindManagerUpdateStatus']" size="small"
                                        @change="handleChangeIntercept($event, record)" v-model="record.status"
                                        :checked-value="1" :unchecked-value="0">
                                    </a-switch>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('manager.manger.5ulhex7mfy80')" :width="80"
                            v-if="$permission(['otcCustomerBindManagerUpdate'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link type="text" size="small" @click="details(record)">
                                        {{ $t('manager.manger.5ulhex7mg2c0') }}
                                    </a-link>
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
        <a-modal :titleAlign="'start'" :visible="transferVisible" @ok="transferOkClick" @cancel="transferCancelClick">
            <template #title>{{ $t('manager.manger.5ulhex7mg6o0') }}</template>
            <a-col :span="24" style="padding-bottom: 20px">
                <a-alert type="warning" :show-icon="true">
                    <template #title>
                        <span> {{ $t('manager.manger.5ulhex7mga00') }}</span>
                    </template>
                    <span style="color:rgb(235, 83, 80)">
                        {{
                            $t('manager.manger.5ulhex7mgdw0')
                        }}</span>
                </a-alert>
            </a-col>
            <a-col :span="24">
                <div style="display: flex; align-items: center">
                    <div style="padding-right: 10px; width: 150px">{{
                        $t('manager.manger.5ulhex7mghc0')
                    }}</div>
                    <a-select v-model="customerManagerId" :placeholder="$t('manager.manger.5ulhex7mgl40')">
                        <a-option v-for="item of statusOptions" :value="item.id" :label="item.real_name" />
                    </a-select>
                </div>
            </a-col>
        </a-modal>

        <a-modal :titleAlign="'start'" :visible="visible" @ok="OkClick" @cancel="CancelClick">
            <template #title>{{ $t('manager.manger.5ulhex7mgog0') }}</template>
            <div style="display: flex; align-items: center">
                <a-form ref="formRef" :model="form.data" layout="vertical" :rules="(form.rules as any)">
                    <a-upload class="acitveUpload" list-type="picture-card"
                        style="width: 100%; justify-content: center; padding: 0px 0 20px" draggable image-preview
                        :auto-upload="true" :limit="1" v-model:file-list="form.data.avatar"
                        :custom-request="(upload as any)">
                    </a-upload>
                    <a-form-item field="real_name" :label="$t('manager.manger.5ulhex7mca40')" validate-trigger="input">
                        <a-input v-model="form.data.real_name" :placeholder="$t('manager.manger.5ulhex7mgrw0')" />
                    </a-form-item>
                    <a-form-item field="country_code" :label="$t('manager.manger.5ulhex7mgv00')">
                        <a-select allow-search allow-clear v-model="form.data.country_code" :placeholder="$t('manager.manger.5ulhex7mgyg0')">
                            <a-option v-for="item in countryCodeList" :value="item.country_code">
                                {{ item.country_code }} {{ item.name }} {{ item.country_label }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="mobile" :label="$t('manager.manger.5ulhex7meic0')" validate-trigger="input">
                        <a-input v-model="form.data.mobile" :placeholder="$t('manager.manger.5ulhex7mh1o0')" />
                    </a-form-item>
                    <a-form-item field="email" :label="$t('manager.manger.5ulhex7men40')" validate-trigger="input">
                        <a-input v-model="form.data.email" :placeholder="$t('manager.manger.5ulhex7mh4w0')" />
                    </a-form-item>
                    <a-form-item field="wechat_number" :label="$t('manager.manger.5ulhex7mes80')" validate-trigger="input">
                        <a-input v-model="form.data.wechat_number" :placeholder="$t('manager.manger.5ulhex7mh800')" />
                    </a-form-item>
                    <a-form-item field="status" :label="$t('manager.manger.5ulhex7mhbk0')" validate-trigger="input">
                        <a-switch v-model="status" :checked-value="1" :unchecked-value="0" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
// import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const visible = ref(false); //编辑和新建
const transferVisible = ref(false) //分配客户经理
const { t } = useI18n();
const customerManagerId: any = ref("")  //选中id
const allocationVal = ref<any>({}); // 停用选中对象
const statusOptions = ref<any>([]); // 基金经理列表
const countryCodeList = ref() //区号
const formRef = ref()
const createAndEdit = ref(1) // 1 创建 2 编辑
const Editid = ref() //编辑id
const searchInfo = reactive({
    show: false,
    data: {
        real_name: '',
        status: -1,
        page: 1,
        per_page: 20
    },
    managerData: {
        real_name: "",
        status: "1",
        ignore_id_list: ""
    }
})
const status = ref(1)
const form = reactive({
    data: {
        real_name: '',
        avatar: [{ url: "http://link-static.oss-cn-hangzhou.aliyuncs.com/broker/link_trade_pro/20230919/650963f7bed98.png" }] as any,
        country_code: '',
        mobile: "",
        email: '',
        wechat_number: '',
    },
    rules: {
        real_name: [{ required: true, message: t('manager.manger.5ulhex7mgrw0') }],
        country_code: [{ required: true, message: t('manager.manger.5ulhex7mgyg0') }],
        mobile: [{ required: true, message: t('manager.manger.5ulhex7mh1o0') }],
        email: [
            { required: true, message: t('manager.manger.5ulhex7mh4w0') },
            { match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/g, message: t('manager.manger.5ulhex7mhes0') }
        ]
    }
});
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const details = (record: any) => {
    visible.value = true
    createAndEdit.value = 2
    Editid.value = record.id
    form.data = {
        real_name: record.real_name,
        avatar: [{ url: record.avatar }] as any,
        country_code: record.country_code,
        mobile: record.mobile,
        email: record.email,
        wechat_number: record.wechat_number,
    }
    status.value = record.status
}
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const clear = () => {
    form.data = {
        real_name: '',
        avatar: [{ url: 'http://link-static.oss-cn-hangzhou.aliyuncs.com/broker/link_trade_pro/20230919/650963f7bed98.png' }] as any,
        country_code: '',
        mobile: "",
        email: '',
        wechat_number: '',
    }
}
const OkClick = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (!status.value) {
        Message.info({ content: t('manager.manger.5ulhex7mhio0') })
        return
    }
    let parms: any = {
        data: {
            ...form.data,
            avatar: form.data.avatar?.map((item: any) => item.response ? item.response?.url : item.url)?.join()
        }
    }
    if (createAndEdit.value == 1) {
        const { code, msg } = await apiOtc.getcustomerBindManagerCreate(parms)
        if (code != 1) return;
        Message.success({ content: msg })
    } else {
        parms.id = Editid.value
        const { code, msg } = await apiOtc.getcustomerBindManagerUpdate(parms)
        if (code != 1) return;
        Message.success({ content: msg })
    }
    clear()
    visible.value = false
    getData()
};
const CancelClick = () => {
    visible.value = false;
    clear()
};
//  修改状态
const handleChangeIntercept = async (newValue: any, val: any) => {
    console.log('newValue', newValue);

    if (!newValue) {
        usePermission(['otcClientManagerAll']) && managerData()
        transferVisible.value = true;
        allocationVal.value = val
        return;
    }
    state(newValue, val)
}
const transferOkClick = async () => {
    if (!customerManagerId.value) {
        Message.info({
            content: t('manager.manger.5ulhex7mgl40'),
        });
        return;
    }
    state(0, allocationVal.value, customerManagerId.value)
};
const state = async (newValue: any, val: any, target_customer_manager_id?: any) => {
    let prams = {
        id: val.id,
        status: newValue,
        target_customer_manager_id
    }
    const { code, msg } = await apiOtc.getcustomerBindManagerUpdateStatus(prams)
    if (code != 1) return getData(), transferVisible.value = false;
    Message.success({ content: msg })
    transferVisible.value = false;
    customerManagerId.value = ""
    getData()
}
const transferCancelClick = () => {
    transferVisible.value = false;
    getData();
};
// 修改状态
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiOtc.getcustomerManagerList({
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
const getCountryCode = async () => {
    const { code, data } = await apiSystem.countryCodeList()
    if (code != 1) return;
    countryCodeList.value = data.map((item: any) => {
        item.country_code = `+${item.country_code}`
        return item
    })
}
{
    getData()
    getCountryCode()
}
</script>
<style scoped lang="less">
.container {
    padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
    &:last-child {
        .arco-table-th-item-title {
            margin-left: 16px;
        }
    }
}

.action-icon {
    margin-left: 12px;
    cursor: pointer;
}

.avatar {
    color: #0960bd;
    background-color: #e3f4fc;
}

.setting {
    display: flex;
    align-items: center;
    width: 200px;

    .title {
        margin-left: 12px;
        cursor: pointer;
    }
}

:deep(.zd .arco-collapse-item .arco-collapse-item-header) {
    background-color: transparent;
    padding: 0px;
    border-bottom: 0px;
    line-height: 0px;
}

:deep(.zd .arco-collapse-item .arco-collapse-item-content) {
    background-color: transparent;
    padding: 0px;
}

:deep(.acitveUpload .arco-upload-picture-card) {
    border-radius: 50%;
}

:deep(.acitveUpload .arco-upload-list-picture) {
    border-radius: 50%;
}

:deep(.acitveUpload .arco-upload-list-picture-operation) {
    font-size: 20px;
}

:deep(.acitveUpload .arco-upload-icon-remove) {
    font-size: 17px;
}</style>
