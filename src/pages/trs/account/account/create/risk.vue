<template>
    <div>
        <a-card style="margin-top:20px">
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical" @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="risk_control_calculate_type" :label="$t('create.risk.5um7yat9mxo0')">
                            <a-select allow-clear v-model="form.data.risk_control_calculate_type" :placeholder="$t('create.risk.5um7yat9ngs0')">
                                <a-option v-for="item in useEnums('trs.account.risk_control_calculate_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="expire_is_close_position" :label="$t('create.risk.5um7yat9nk80')">

                            <a-select allow-clear v-model="form.data.expire_is_close_position" :placeholder="$t('create.risk.5um7yat9ngs0')">
                                <a-option v-for="item in useEnums('trs.account.risk_control_position_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card style="margin-top: 20px;">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">{{$t('create.risk.5um7yat9nn40')}}</a-space>
                    <a-space :size="18">
                        <a-button @click="addVisible = true, visibleTitle = 1" type="primary">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{$t('create.risk.5um7yat9now0')}}</a-button>
                    </a-space>
                </div>
            </template>
            <a-table :bordered="false" column-resizable :pagination="false"
                :scroll="form.data.risk_control_list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                :data="form.data.risk_control_list" class="table">
                <template #columns>
                    <a-table-column title="#" :width="50">
                        <template #cell="{ rowIndex }">
                            {{ rowIndex + 1 }}
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('create.risk.5um7yat9nrc0')" :width="150">
                        <template #cell="{ record }">
                            <div>
                                {{ record.name[local.lang] }}
                            </div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('create.risk.5um7yat9nto0')" :width="150">
                        <template #cell="{ record }">
                            <div>
                                {{ record.loss_value }}%
                            </div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('create.risk.5um7yat9nvo0')" :width="150">
                        <template #cell="{ record }">
                            <div v-if="record.trade_status?.length">
                                <a-tag color="blue">{{ record.trade_status[0] == '2' ? $t('create.risk.5um7yat9nxo0') : $t('create.risk.5um7yat9o0g0') }}</a-tag>
                            </div>
                            <div v-else>
                                {{$t('create.risk.5um7yat9o300')}}
                            </div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('create.risk.5um7yat9o5g0')" :width="150">
                        <template #cell="{ record }">
                            <a-tag color="blue" v-if="record.is_cancel_order">{{ record.is_cancel_order ? $t('create.risk.5um7yat9o7k0') : '--'}}
                            </a-tag>
                            <div v-else>
                                {{$t('create.risk.5um7yat9o300')}}
                            </div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('create.risk.5um7yat9oa00')" :width="150">
                        <template #cell="{ record }">
                            <div v-if="record.is_close_position">
                                <a-tag color="blue">
                                    {{$t('create.risk.5um7yat9oc80')}}
                                </a-tag>
                            </div>
                            <div v-else>
                                {{$t('create.risk.5um7yat9o300')}}
                            </div>
                        </template>
                    </a-table-column>
                    <a-table-column fixed="right" :title="$t('create.risk.5um7yat9oeg0')" :width="100">
                        <template #cell="{ record }">
                            <a-space>
                                <a-link @click="editBtn(record)">{{ $t('create.risk.5um7yat9ogk0') }}</a-link>
                                <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('create.risk.5uo01e3io9o0') }?`">
                                        <a-link status="danger">{{ $t('create.risk.5um7yat9ojk0') }}</a-link>
                                </a-popconfirm>
                            </a-space>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
        </a-card>
        <div style="display: flex;justify-content: flex-end;width: 100%;margin-top: 20px;">
            <a-space :size="18">
                <a-button @click="step(-1)">
                    {{$t('create.risk.5um7yat9olw0')}}
                </a-button>
                <a-button type="primary" @click="submit">
                    {{$t('create.risk.5um7yat9opo0')}}
                </a-button>
            </a-space>
        </div>
        <a-modal width="600px" :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd"
            @close="onCloseAdd">
            <template #title>
                <span>
                    {{ visibleTitle == 2 ? $t('create.risk.5um7yat9osk0') : $t('create.risk.5um7yat9ouc0') }}
                </span>
            </template>
            <div style="display: flex;">
                <a-form layout="vertical" ref="formRefs" :model="addForm" :rules="(form.rules as any)">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.zh-CN" :label="$t('create.risk.5um7yat9owc0')">
                                <a-input v-model="addForm.name['zh-CN']" :placeholder="$t('create.risk.5um7yat9oy00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.en" :label="$t('create.risk.5um7yat9p0g0')">
                                <a-input v-model="addForm.name.en" :placeholder="$t('create.risk.5um7yat9p200')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.tc" :label="$t('create.risk.5um7yat9p3g0')">
                                <a-input v-model="addForm.name.tc" :placeholder="$t('create.risk.5um7yat9p4w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="loss_value" :label="$t('create.risk.5um7yat9nto0')">
                                <div style="width: 100%;">
                                    <a-input-number hide-button v-model="addForm.loss_value" :placeholder="$t('create.risk.5um7yat9nto0')">
                                        <template #suffix>
                                            %
                                        </template>
                                    </a-input-number>
                                    <p style="margin-top:5px;font-size: 13px;">{{$t('riskControlLine.riskControlLine.5um8b1ncoho0')}}{{ addForm.loss_value }}%{{$t('riskControlLine.riskControlLine.5um8b1ncpe80')}}
                                    </p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('create.risk.5um7yat9nvo0')">
                                <a-checkbox-group :max="1" v-model="addForm.trade_status">
                                    <a-checkbox value="2">{{$t('create.risk.5um7yat9nxo0')}}</a-checkbox>
                                    <a-checkbox value="3">{{$t('create.risk.5um7yat9o0g0')}}</a-checkbox>
                                </a-checkbox-group>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('create.risk.5um7yat9o5g0')">
                                <a-checkbox v-model="addForm.is_cancel_order">{{$t('create.risk.5um7yat9o7k0')}}</a-checkbox>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('create.risk.5um7yat9oa00')">
                                <a-checkbox v-model="addForm.is_close_position">{{$t('create.risk.5um7yat9oc80')}}</a-checkbox>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const formRef = ref()
const { t } = useI18n();
const props = defineProps({
    data: Object,
    current: Number
})
const emit = defineEmits(['update:current', 'update:data']);
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        asset_account_id: '',
        charge_package_id: '',
        currency: '',
        total_cash: 0,
        total_finance: 0,
        investment_scope_temp_id: '',
        interest_accrual_type: 1,
        interest_round_type: 2,
        interest_round_precision: 2,
        open_time: '',
        expire_time: '',
        finance_interest_accrual_amount: 0,
        counter_channel_account_scene_temp_id: '',
        risk_control_calculate_type: 1,
        warn_value: 30,
        close_value: 60,
        market_type: '',
        agreement_name: '',
        agreement_url: [],
        risk_control_list: [],
        expire_is_close_position: 1
    },
    rules: {
        risk_control_calculate_type: [{ required: true, message: t('create.risk.5um7yat9ngs0') }],
        warn_value: [{ required: true, message: t('create.risk.5um7yat9p6k0') }],
        close_value: [{ required: true, message: t('create.risk.5um7yat9p800') }],
        expire_is_close_position: [{ required: true, message: t('create.risk.5um7yat9p9s0') }],
        loss_value: [{ required: true, message: t('create.risk.5um7yat9pbk0') }],
        'name.zh-CN': [{ required: true, message: t('create.risk.5um7yat9oy00') }],
        'name.en': [{ required: true, message: t('create.risk.5um7yat9p4w0') }],
        'name.tc': [{ required: true, message: t('create.risk.5um7yat9p200') }],
    }
})
const step = (type: number) => {
    if (type == -1) return emit('update:current', Number(props.current) - 1)
    emit('update:current', Number(props.current) + 1)
}
const submit = async () => {
    if (form.data.risk_control_list?.length <= 0) return Message.info(t('create.risk.5um7yat9pdc0'))
    const validate = await formRef.value?.validate()
    if (validate) return;

    emit('update:current', Number(props.current) + 1)
}
const watchData = watch(() => form.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
onBeforeUnmount(() => {
    watchData && watchData()
})
onMounted(() => {
    form.data = { ...form.data, ...props.data }
})
// const riskList:any = ref([])
const addForm: any = ref({
    name: {
        'zh-CN': '',
        'en': '',
        'tc': '',
    },
    level: '',
    loss_value: 0,
    trade_status: [],
    is_close_position: false,
    is_cancel_order: false,
    id: ''
})
const visibleTitle = ref(1)
const formRefs = ref()
const addVisible = ref(false)
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    if (visibleTitle.value == 1) {
        if (form.data.risk_control_list?.length > 0) {
            if (form.data.risk_control_list[form.data.risk_control_list?.length - 1].loss_value >= addForm.value.loss_value) {
                Message.info(t('create.risk.5um7yat9pew0'))
                return false
            }
            addForm.value.id = Math.random()
            addForm.value.level = form.data.risk_control_list[form.data.risk_control_list?.length - 1].level + 1
            let obj = { ...addForm.value }
            obj.name = { ...addForm.value.name }
            form.data.risk_control_list.push(obj)
        } else {
            addForm.value.id = Math.random()
            addForm.value.level = 1
            let obj = { ...addForm.value }
            obj.name = { ...addForm.value.name }
            console.log(obj);
            form.data.risk_control_list.push(obj)
        }
    } else {
        let index = form.data.risk_control_list.findIndex((item: any) => item.id == addForm.value.id)
        if (index == 0 && form.data.risk_control_list?.length > 1) {
            if (form.data.risk_control_list[1].loss_value < addForm.value.loss_value) {
                Message.info(t('create.risk.5um7yat9pgs0'))
                return false
            }
        } else if (index == 0 && form.data.risk_control_list?.length == 1) {
        } else {
            if (form.data.risk_control_list[index + 1]) {
                if (form.data.risk_control_list[index - 1].loss_value < addForm.value.loss_value && form.data.risk_control_list[index + 1].loss_value > addForm.value.loss_value) {
                } else {
                    Message.info(t('create.risk.5um7yat9pgs0'))
                    return false
                }
            } else {
                if (form.data.risk_control_list[index - 1].loss_value < addForm.value.loss_value) {

                } else {
                    Message.info(t('create.risk.5um7yat9pgs0'))
                    return false
                }
            }

        }
        form.data.risk_control_list[index] = { ...addForm.value }
        form.data.risk_control_list[index].name = { ...addForm.value.name }
    }
}
const deleteBtn = async (val: any) => {
    let index = form.data.risk_control_list.findIndex((item: any) => item.id == val.id)
    form.data.risk_control_list.splice(index, 1)
}
const editBtn = (val: any) => {
    addForm.value = { ...val }
    addForm.value.name = { ...val.name }
    visibleTitle.value = 2
    addVisible.value = true
}
const onCloseAdd = () => {
    addForm.value = {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        level: '',
        loss_value: 0,
        trade_status: [],
        is_close_position: false,
        is_cancel_order: false,
        id: ''
    }
    formRefs.value.resetFields()
}
</script>