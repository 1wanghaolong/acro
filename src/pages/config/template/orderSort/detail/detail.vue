<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div style="flex: 1;overflow: auto;">
                <a-page-header @back="back" :subtitle="$t(`router.${String(route.name)}`)" />
                <div>
                    <a-card :loading="loading">
                        <template #title>
                            <div style="display: flex;justify-content: space-between;">
                                <a-space :size="18">
                                    {{$t('detail.detail.5ukepgf3afg0')}}
                                </a-space>
                                <a-space :size="18">
                                    <a-button v-if="form.setup" @click="form.setup = false; getData()">
                                        <template #icon>
                                            <icon-refresh />
                                        </template>
                                        {{$t('detail.detail.5ukepgf37pw0')}}
                                    </a-button>
                                    <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading"
                                        :disabled="form.loading">
                                        <template #icon>
                                            <icon-save />
                                        </template>
                                        {{$t('detail.detail.5ukepgf39ww0')}}
                                    </a-button>
                                    <a-button v-permission="['configTemplateOrderSortUpdate']" v-if="!form.setup"
                                        @click="form.setup = true" type="primary">
                                        <template #icon>
                                            <icon-edit />
                                        </template>
                                        {{$t('detail.detail.5ukepgf3a6s0')}}
                                    </a-button>
                                </a-space>
                            </div>
                        </template>
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width
                            layout="vertical" @submit="submit">
                            <a-row :gutter="16">
                                <a-col :xs="24" :sm="12" :md="8" :xl="8">
                                    <a-form-item field="name.zh-CN" :label="$t('detail.detail.5umyzr1zwco0')">
                                        <a-input v-if="form.setup" v-model="form.data.name['zh-CN']"
                                            :placeholder="$t('detail.detail.5umyzr1zx4s0')">
                                        </a-input>
                                        <div v-else>{{ form.data.name['zh-CN'] }}</div>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="8">
                                    <a-form-item field="name.en" :label="$t('detail.detail.5umyzr1zx980')">
                                        <a-input v-if="form.setup" v-model="form.data.name['en']"
                                            :placeholder="$t('detail.detail.5umyzr1zxc40')">
                                        </a-input>
                                        <div v-else>{{ form.data.name['en'] }}</div>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="8">
                                    <a-form-item field="name.tc" :label="$t('detail.detail.5umyzr1zxeg0')">
                                        <a-input v-if="form.setup" v-model="form.data.name['tc']"
                                            :placeholder="$t('detail.detail.5umyzr1zxhc0')">
                                        </a-input>
                                        <div v-else>{{ form.data.name['tc'] }}</div>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="8">
                                    <a-form-item field="desc.zh-CN" :label="$t('detail.detail.5umyzr1zxjk0')">
                                        <a-input v-if="form.setup" v-model="form.data.desc['zh-CN']"
                                            :placeholder="$t('detail.detail.5umyzr1zxls0')">
                                        </a-input>
                                        <div v-else>{{ form.data.desc['zh-CN'] }}</div>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="8">
                                    <a-form-item field="desc.en" :label="$t('detail.detail.5umyzr1zxns0')">
                                        <a-input v-if="form.setup" v-model="form.data.desc['en']" :placeholder="$t('detail.detail.5umyzr1zxsc0')">
                                        </a-input>
                                        <div v-else>{{ form.data.desc['en'] }}</div>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="8">
                                    <a-form-item field="desc.tc" :label="$t('detail.detail.5umyzr1zxuo0')">
                                        <a-input v-if="form.setup" v-model="form.data.desc['tc']" :placeholder="$t('detail.detail.5umyzr1zxww0')">
                                        </a-input>
                                        <div v-else>{{ form.data.desc['tc'] }}</div>
                                    </a-form-item>
                                </a-col>
                                <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item field="country_code" :label="$t('detail.detail.5umyzr1zxyw0')">
                                    <a-switch v-if="form.setup" v-model="form.data.status" :checked-value="1"
                                        :unchecked-value="0" />
                                    <div v-else> {{ useEnumsFormat('otc.account.status', form.data.status) }}</div>
                                </a-form-item>
                            </a-col> -->
                            </a-row>
                        </a-form>
                    </a-card>
                    <a-card :loading="tableData.loading2" style="margin-top: 20px;">
                        <template #title>
                            <div style="display: flex;justify-content: space-between;">
                                <a-space :size="18">
                                    {{$t('detail.detail.5umyzr1zy180')}}
                                </a-space>
                                <a-space :size="18" v-permission="['configTemplateOrderSortItemCreate']">
                                    <a-button @click="visible = true; getCounterChannelList(); editCreate = '0'"
                                        type="primary">
                                        <template #icon>
                                            <icon-plus />
                                        </template>
                                        {{$t('detail.detail.5umyzr1zy3k0')}}
                                    </a-button>
                                </a-space>
                            </div>
                        </template>
                        <div class="tableBox">
                            <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading2"
                                :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                                :data="tableData.list" class="table">
                                <template #columns>
                                    <a-table-column title="#" :width="50">
                                        <template #cell="{ rowIndex }">
                                            {{ rowIndex + 1 }}
                                        </template>
                                    </a-table-column>
                                    <a-table-column :title="$t('detail.detail.5umyzr1zy5o0')" :width="90">
                                        <template #cell="{ record }">
                                            <div style="display: flex;align-items:center;"><a-tag color="blue"
                                                    style="width: 50px;display: flex;justify-content: center;">{{
                                                        $t('detail.detail.5umyzr1zy7o0') }}</a-tag><span style="padding-left: 5px;">{{
        record.counter_channel_account_info.account }}</span>
                                            </div>
                                            <div style="display: flex;align-items:center;padding-top: 5px;"><a-tag
                                                    color="blue"
                                                    style="width: 50px;display: flex;justify-content: center;">{{
                                                        $t('detail.detail.5umyzr1zy9o0') }}</a-tag><span style="padding-left: 5px;">{{
        record.counter_channel_account_info.name }}</span>
                                            </div>
                                        </template>
                                    </a-table-column>
                                    <a-table-column :title="$t('detail.detail.5umyzr1zyc00')" :width="90">
                                        <template #cell="{ record }">
                                            <div>{{ record.counter_channel_info.name }}</div>
                                        </template>
                                    </a-table-column>
                                    <a-table-column :title="$t('detail.detail.5umyzr1zyec0')" :width="90">
                                        <template #cell="{ record }">
                                            <div style="display: flex;">
                                                <a-tag color="blue"
                                                    style="margin-right: 10px;display: flex;justify-content: center;">{{
                                                        record.counter_channel_account_scene_info.counter_channel_scene
                                                    }}</a-tag>
                                            </div>
                                        </template>
                                    </a-table-column>
                                    <a-table-column :title="$t('detail.detail.5umyzr1zykc0')" :width="90">
                                        <template #cell="{ record }">
                                            <div>{{ record.sort }}</div>
                                        </template>
                                    </a-table-column>
                                    <a-table-column :title="$t('detail.detail.5umyzr1zym40')" :width="70">
                                        <template #cell="{ record }">
                                            {{ record.counter_channel_account_info.status == '0' ? $t('detail.detail.5umyzr1zyo00') : $t('detail.detail.5umyzr1zypk0') }}
                                        </template>
                                    </a-table-column>
                                    <a-table-column fixed="right" :title="$t('detail.detail.5umyzr1zyrk0')" :width="50"
                                        v-if="$permission(['configTemplateOrderSortItemUpdate', 'configTemplateOrderSortItemDelete'])">
                                        <template #cell="{ record }">
                                            <a-space>
                                                <a-link v-permission="['configTemplateOrderSortItemUpdate']"
                                                    @click="visible = true; editCreate = '1'; voluation(record)">{{$t('detail.detail.5ukepgf3a6s0')}}</a-link>
                                                <a-popconfirm position="left" @ok="resetDel(record)" :content="$t('detail.detail.5umyzr1zytc0')">
                                                    <a-link v-permission="['configTemplateOrderSortItemDelete']"
                                                        status="danger">{{$t('detail.detail.5umyzr1zyvg0')}}</a-link>
                                                </a-popconfirm>
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
                    <a-modal v-model:visible="visible" :default-visible="false" :on-before-ok="handleOk"
                        @cancel="handleCancel">
                        <template #title>
                            {{ editCreate == '0' ? $t('detail.detail.5umyzr1zyx00') : $t('detail.detail.5umyzr1zyz40') }}
                        </template>
                        <a-form style="padding-top: 20px;" ref="visibleformRef" :model="visibleFrom.data"
                            :rules="(visibleFrom.rules as any)" layout="vertical"
                            :style="{ maxWidth: '600px', margin: 'auto' }">
                            <a-form-item field="counter_channel_id" :label="$t('detail.detail.5umyzr1zz0w0')">
                                <a-select @change="selectChange" :placeholder="$t('detail.detail.5umyzr1zz2w0')"
                                    v-model="visibleFrom.data.counter_channel_id">
                                    <a-option v-for="item in (counterChannelList as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="counter_channel_account_id" :label="$t('detail.detail.5umyzr1zy5o0')">
                                <a-select @change="AccountselectChange" :placeholder="$t('detail.detail.5umyzr1zz4g0')"
                                    v-model="visibleFrom.data.counter_channel_account_id">
                                    <a-option v-for="item in (counterAccountList as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="scene_id" :label="$t('detail.detail.5umyzr1zyec0')">
                                <a-select allow-clear v-model="visibleFrom.data.scene_id" :placeholder="$t('detail.detail.5umyzr1zz600')">
                                    <a-option v-for="item in sceneList" :value="item.id">
                                        {{ item.counter_channel_scene }}</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="sort" :label="$t('detail.detail.5umyzr1zykc0')">
                                <a-input-number v-model="visibleFrom.data.sort" :placeholder="$t('detail.detail.5umyzr1zz800')" :min="0" mode="button"
                                    class="input-demo" />
                            </a-form-item>
                        </a-form>
                    </a-modal>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const back = () => {
    router.back()
}
// import { useEnumsFormat } from '@/hooks/enums'
// import dayjs from 'dayjs'
const formRef = ref()
const loading = ref(false)
const visible = ref(false)
const { t } = useI18n();
const counterChannelList = ref() // 上手通道列表
const counterAccountList = ref() // 上手账户列表
const sceneList = ref()  // 交易方式
const editValue = ref()
const editCreate: any = ref("0")  // 0 新建  1 更新
// 上手通道请求参数
const channel = ref({
    'filter[name]': "",
})
// 上手账户请求参数
const Account = ref({
    'filter[account]': "",
    'filter[counter_channel_id]': "",
})
// 基本信息表单
const form = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        "name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "desc": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        status: 0,

    },
    rules: {
        'name.zh-CN': [{ required: true, message: t('detail.detail.5umyzr1zz9o0') }],
        'name.en': [{ required: true, message: t('detail.detail.5umyzr1zzb40') }],
        'name.tc': [{ required: true, message: t('detail.detail.5umyzr1zzco0') }],
        // 'desc.zh-CN': [{ required: true, message: '请输入备注中' }],
        // 'desc.en': [{ required: true, message: '请输入备注英' }],
        // 'desc.tc': [{ required: true, message: '请输入备注繁' }],
        'status': [{ required: true, message: t('detail.detail.5umyzr1zze80') }],
    }
})
// 创建报单方式表单
const visibleFrom = ref({
    data: {
        counter_channel_id: "",
        counter_channel_account_id: "",
        scene_id: "",
        sceneName: "",
        sort: 0
    },

    rules: {
        counter_channel_id: [{ required: true, message: t('detail.detail.5umyzr1zz2w0') }],
        counter_channel_account_id: [{ required: true, message: t('detail.detail.5umyzr1zz4g0') }],
        scene_id: [{ required: true, message: t('detail.detail.5umyzr1zz600') }],
    }
})
// 排序详情列表
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading2: false
})
// 排序详情列表
const searchInfo = reactive({
    show: false,
    data: {
        page: 1,
        per_page: 20,
        scene_template_id: route.params?.sortid
    }
})
// 删除项目
const resetDel = async (record: any) => {
    const { code, msg } = await apiTrs.counterChannelAccountSceneTempItemDelete({
        id: [record.id]
    })
    if (code != 1) return getListData();
    Message.success({ content: msg })
    getListData()
}
// 弹框取消
const handleCancel = () => {
    clear()
    visible.value = false;
};
// 弹框确定
const handleOk = async () => {
    if (!visibleFrom.value.data.counter_channel_id) {
        Message.info({ content: t('detail.detail.5umyzr1zz2w0'), })
        return false
    }
    if (!visibleFrom.value.data.counter_channel_account_id) {
        Message.info({ content: t('detail.detail.5umyzr1zz4g0'), })
        return false
    }
    if (!visibleFrom.value.data.scene_id) {
        Message.info({ content: t('detail.detail.5umyzr1zz600') })
        return false
    }
    if (!String(visibleFrom.value.data.sort) || visibleFrom.value.data.sort < 0) {
        Message.info({ content: t('detail.detail.5umyzr1zzg00') })
        return false
    }
    if (editCreate.value == '0') {
        const { code, msg } = await apiTrs.counterChannelAccountSceneTempItemCreate({
            data: {
                template_id: route.params?.sortid,
                item_list: [
                    {
                        scene_id: visibleFrom.value.data.scene_id,
                        sort: visibleFrom.value.data.sort
                    }
                ]
            }
        })
        if (code != 1) return false;
        Message.success({ content: msg })
    }
    if (editCreate.value == '1') {
        const { code, msg } = await apiTrs.counterChannelAccountSceneTempItemUpdate({
            data: {
                id: editValue.value.id,
                scene_id: visibleFrom.value.data.scene_id,
                sort: visibleFrom.value.data.sort,
                scene_template_id: route.params?.sortid
            }
        })
        if (code != 1) return false;
        Message.success({ content: msg })
    }
    clear()
    getListData()
    return true
};
const clear = () => {
    visibleFrom.value.data = {
        counter_channel_id: "",
        counter_channel_account_id: "",
        scene_id: "",
        sceneName: "",
        sort: 0
    }
}
// 基本信息提交
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.counterChannelAccountSceneTempUpdate({
        id: route.params?.sortid,
        data: {
            ...form.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    form.setup = false
    getData()
}
// 基本信息详情
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.counterChannelAccountSceneTempInfo({
        id: route.params?.sortid
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
}
// 基本信息排序详情列表
const getListData = async () => {
    tableData.loading2 = true
    const formData = cloneDeep(searchInfo.data)
    !formData.status && delete formData.status
    const { code, data } = await apiTrs.counterChannelAccountSceneTempItemList({
        ...useFilter(formData)
    })
    tableData.loading2 = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
//  上手通道选择
const selectChange = (value: any) => {
    if (!value) {
        return
    }
    Account.value['filter[counter_channel_id]'] = value
    visibleFrom.value.data.counter_channel_account_id = ""
    getCounterAccountlList()
}
//  上手账户选择
const AccountselectChange = (val: any) => {
    if (!counterAccountList.value.length || !val) {
        return
    }
    visibleFrom.value.data.scene_id = ""
    counterAccountList.value.forEach((item: any) => {
        if (item.id == val) {
            sceneList.value = item.scene_list
        }
    })
}
// 上手账户列表
const getCounterAccountlList = async () => {
    const { code, data } = await apiTrs.channelAccountList(Account.value)
    if (code != 1) return;
    counterAccountList.value = data?.list
}
// 上手通道列表
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList(channel.value)
    if (code != 1) return;
    counterChannelList.value = data?.list
}
const voluation = async (val: any) => {
    if (!val) {
        return
    }
    editValue.value = val
    await getCounterChannelList()
    await getCounterAccountlList()
    visibleFrom.value.data = {
        counter_channel_id: val.counter_channel_info.id,
        counter_channel_account_id: val.counter_channel_account_info.id,
        scene_id: val.counter_channel_account_scene_info.id,
        sceneName: val.counter_channel_account_scene_info.counter_channel_scene,
        sort: val.sort,
    }
    counterAccountList.value.forEach((item: any) => {
        if (item.id == val.counter_channel_account_info.id) {
            sceneList.value = item.scene_list
        }
    })
}
{
    getData()
    getListData()
}
</script>
<style lang="less" scoped>
:deep(.arco-menu-horizontal .arco-menu-inner) {
    padding: 0 0 17px;

    .arco-menu-selected-label {
        bottom: -4px;
    }
}
</style>