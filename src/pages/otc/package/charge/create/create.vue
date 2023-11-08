<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps">
                <a-steps :current="current">
                    <a-step>{{$t('create.create.5um5fobmaos0')}}</a-step>
                    <a-step>{{$t('create.create.5um5fobmj680')}}</a-step>
                    <a-step>{{$t('create.create.5um5fobmjcw0')}}</a-step>
                </a-steps>
            </div>
            <div v-if="current == 1">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="nameZh" :label="$t('create.create.5um5fobmjfw0')">
                        <a-input v-model="form.data.nameZh" :placeholder="$t('create.create.5um5fobmjic0')" />
                    </a-form-item>
                    <a-form-item field="nameEn" :label="$t('create.create.5um5fobmjks0')">
                        <a-input v-model="form.data.nameEn" :placeholder="$t('create.create.5um5fobmjnk0')" />
                    </a-form-item>
                    <a-form-item field="nameTc" :label="$t('create.create.5um5fobmjqk0')">
                        <a-input v-model="form.data.nameTc" :placeholder="$t('create.create.5um5fobmjt40')" />
                    </a-form-item>
                    <a-form-item field="descZh" :label="$t('create.create.5um5fobmjvk0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.descZh"
                            :placeholder="$t('create.create.5um5fobmjy00')" />
                    </a-form-item>
                    <a-form-item field="descEn" :label="$t('create.create.5um5fobmk0g0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.descEn"
                            :placeholder="$t('create.create.5um5fobmk2w0')" />
                    </a-form-item>
                    <a-form-item field="descTc" :label="$t('create.create.5um5fobmk5g0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.descTc"
                            :placeholder="$t('create.create.5um5fobmk7k0')" />
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetField(1)">{{$t('create.create.5um5fobmkac0')}}</a-button>
                                <a-button type="primary" html-type="submit">
                                    {{$t('create.create.5um5fobmkcs0')}}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
            <div v-if="current == 2">
                <a-card style="margin-top: 20px;">
                    <template #title >
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                <a-radio-group type="button" v-model="charge.currency">
                                    <a-radio v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang]
                                    }}</a-radio>
                                </a-radio-group>
                            </a-space>
                            <a-space :size="18">

                                <a-button type="primary" @click="addVisibleBtn">{{$t('create.create.5um5fobmkfc0')}}</a-button>
                            </a-space>
                        </div>
                    </template>
                    <a-table :bordered="false" column-resizable :pagination="false" :scroll="{ x: '100%', y: '100%' }"
                        size="small" :data="charge.list?.filter((item: any) => (item.currency == charge.currency))"
                        class="table">
                        <template #columns>
                            <a-table-column title="#" :width="50">
                                <template #cell="{ rowIndex }">
                                    {{ rowIndex + 1 }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkhk0')">
                                <template #cell="{ record }">
                                    <div>{{ useEnumsFormat('otc.package.charge.create.type', record.type) }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkk00')" data-index="real_name">
                                <template #cell="{ record }">
                                    <div>{{ useEnumsFormat('otc.package.charge.create.calculate_type',
                                        record.calculate_type) }}</div>
                                    <div v-if="record.calculate_type == 1">{{ Number(record.calculate_value) }}% {{$t('create.create.5um5fobmknc0')}}</div>
                                    <div v-else>{{ Number(record.calculate_value) }}每笔</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkpc0')" data-index="real_name">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type == 1">
                                        <div>{{$t('create.create.5um5i87ey8o0')}}:{{ Number(record.max) }}</div>
                                        <div>{{$t('create.create.5um5i87eysw0')}}:{{ Number(record.min) }}</div>
                                    </template>
                                    <template v-else>
                                        -
                                    </template>

                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('create.create.5um5fobmkrc0')" data-index="real_name">
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
                            <a-table-column :title="$t('create.create.5um5fobmktk0')" data-index="round_precision">
                                <template #cell="{ record }">
                                    <template v-if="record.calculate_type == 1">
                                        {{ record.round_precision }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </template>
                            </a-table-column>
                            <a-table-column fixed="right" :title="$t('create.create.5um5fobmkvc0')" :width="100">
                                <template #cell="{ record }">
                                    <a-space>
                                            <a-button type="text" style="padding-left:0" @click="deleteBtn(record)" status="danger" size="small">
                                                {{ $t('create.create.5um5fobmkxw0') }}
                                            </a-button>
                                    </a-space>
                                </template>
                            </a-table-column>
                        </template>
                    </a-table>
                </a-card>
                <div style="display: flex;justify-content: flex-end;width: 100%;margin-top:15px">
                    <a-space :size="18">
                        <a-button type="primary" @click=" current = 1">
                            {{$t('create.create.5um5fobmkzk0')}}
                        </a-button>
                        <a-button type="primary" @click="savaBtn">
                            {{$t('create.create.5um5fobml1c0')}}
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div v-if="current == 3" style="height: 100%;display: flex;align-items: center;">
                <div style="width: 600px;margin: auto;">
                    <a-result status="success">
                        <template #subtitle>
                            <p style="margin-bottom: 15px;">{{$t('create.create.5um5fobml3c0')}}</p>
                            
                        </template>
                        <template #extra>
                            <a-space style="margin-top: 30px;">
                                <a-button @click="resetField">{{$t('create.create.5um5fobml500')}}</a-button>
                                <a-button type='primary' @click="router.back()">{{$t('create.create.5um5fobml6o0')}}</a-button>
                                <!-- <a-button
                                    @click="router.replace({ name: 'otcPackageChargeDetail', params: { id: id } })">{{$t('create.create.5um5fobml8g0')}}</a-button> -->
                            </a-space>
                        </template>
                    </a-result>
                </div>
            </div>

        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd" @close="onCloseAdd">
            <template #title>
                {{ $t('create.create.5um5fobmlac0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRefs" :model="addForm" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            
                    <a-form-item field="type" :label="$t('create.create.5um5fobmkhk0')" v-if="viteName == 'trsPro'">
                        <a-select allow-clear v-model="addForm.type" :placeholder="$t('create.create.5um5fobmlbw0')">
                            <a-option v-for="item in useEnums('otc.package.charge.create.type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="type" :label="$t('create.create.5um5fobmkhk0')" v-if="viteName == 'wealthPro'">
                        <a-select allow-clear v-model="addForm.type" :placeholder="$t('create.create.5um5fobmlbw0')">
                            <a-option v-for="item in useEnums('otc.package.charge.create.wealthtype')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item field="calculate_type" :label="$t('create.create.5um5fobmkk00')">
                        <a-select allow-clear v-model="addForm.calculate_type" :placeholder="$t('create.create.5um5fobmlbw0')">
                            <a-option v-for="item in useEnums('otc.package.charge.create.calculate_type')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                     </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item field="calculate_value" :label="$t('create.create.5um5fobmldw0')">
                        <div style="width: 100%;">
                            <a-input-number hide-button style="width: 100%;" v-model="addForm.calculate_value"
                                :placeholder="$t('create.create.5um5fobmlfw0')">
                                <template #append>{{ addForm.calculate_type == '1' ? '%' : '' }}</template>
                            </a-input-number>
                            <p style="margin-bottom: 0;margin-top:15px">{{$t('create.create.5um5fobmlhg0')}}</p>
                        </div>
                    </a-form-item>
                     </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item v-if="addForm.calculate_type != '3'" field="min" :label="$t('create.create.5um5fobmlj00')">
                            <a-input-number hide-button style="width: 100%;" v-model="addForm.min" :placeholder="$t('create.create.5um5fobmlfw0')">
                            </a-input-number>
                        </a-form-item>
                         </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item v-if="addForm.calculate_type != '3'" field="max" :label="$t('create.create.5um5fobmll00')">
                            <a-input-number hide-button style="width: 100%;" v-model="addForm.max" :placeholder="$t('create.create.5um5fobmlfw0')">
                            </a-input-number>
                        </a-form-item>
                         </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item v-if="addForm.calculate_type != '3'" field="round_type" :label="$t('create.create.5um5fobmkrc0')">
                            <a-select allow-clear v-model="addForm.round_type" :placeholder="$t('create.create.5um5fobmlbw0')">
                                <a-option v-for="item in useEnums('otc.package.charge.create.round_type')"
                                    :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                         </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item v-if="addForm.calculate_type != '3'" field="round_precision" :label="$t('create.create.5um5fobmlmo0')">
                            <a-input-number hide-button style="width: 100%;" v-model="addForm.round_precision"
                                :placeholder="$t('create.create.5um5fobmlfw0')">
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
const local = useLocal()
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const viteName = import.meta.env.VITE_NAME
const formRef = ref()
const formRefs = ref()
const route = useRoute()
const router = useRouter()
const current = ref(1)
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
    },
    rules: {
        nameZh: [{ required: true, message: t('create.create.5um5fobmjic0') }],
        nameEn: [{ required: true, message: t('create.create.5um5fobmjt40') }],
        nameTc: [{ required: true, message: t('create.create.5um5fobmjnk0') }],
        // descZh: [{ required: true, message: '请输入备注(中)' }],
        // descEn: [{ required: true, message: '请输入备注(英)' }],
        // descTc: [{ required: true, message: '请输入备注(繁)' }],
        type: [{ required: true, message: t('create.create.5um5fobmlo80') }],
        calculate_type: [{ required: true, message: t('create.create.5um5fobmlq00') }],
        round_type: [{ required: true, message: t('create.create.5um5fobmls00') }],
        round_precision: [{ required: true, message: t('create.create.5um5fobmlto0') }],
        calculate_value: [{ required: true, message: t('create.create.5um5fobmlvs0') }],

    }
})
const charge: any = reactive({
    list: [],
    loading: false,
    currency: useEnums('currency')?.[0].value
})

let addForm = ref({
    type: '',
    calculate_type: '',
    calculate_value: 0,
    max: 0,
    min: 0,
    round_type: '',
    round_precision: 0,
    currency: '',
    id: 0
})
const addVisible = ref(false)
const addVisibleBtn = () => {
    addForm.value.currency = charge.currency
    addVisible.value = true
}
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    if (addForm.value.calculate_type == '1') {
        if (addForm.value.max != 0 || addForm.value.min != 0) {
            if (addForm.value.max < addForm.value.min) {
                formRefs.value.setFields({
                    max: {
                        status: 'error',
                        message: t('create.create.5um5fobmlxc0')
                    }
                })
                return false
            }
        }

    }
    let bool = charge.list.some((item: any) => item.currency == addForm.value.currency && item.type == addForm.value.type)
    if (bool) {
        Message.warning(t('create.create.5um5fobmlyw0'))
        return false
    }
    addForm.value.id = Math.random()
    charge.list.push({ ...addForm.value })
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
        id: 0
    }
    formRefs.value.resetFields()
}
const deleteBtn = async (val: any) => {
    let index = charge.list.findIndex((item: any) => item.id == val.id)
    charge.list.splice(index, 1)
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    current.value = 2
}
const id = ref()
const savaBtn = async () => {
    const { code, data } = await apiOtc.accountChargePackageCreate(
        {
            data: {
                name: {
                    'zh-CN': form.data.nameZh,
                    'en': form.data.nameEn,
                    'tc': form.data.nameTc,
                },
                desc: {
                    'zh-CN': form.data.descZh,
                    'en': form.data.descEn,
                    'tc': form.data.descTc,
                },
                status: 1,
                charge_list: charge.list
            }
        }
    )
    if (code != 1) return;
    id.value = data.charge_package_id
    current.value = 3
}
const resetField = (num?: any) => {
    Object.keys(form.data).forEach((item: any) => {
        form.data[item] = ''
    })
    form.data = {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
    }
    charge.list = []
    if (num == 1) {
        formRef.value.resetFields()
    }
    formRefs.value.resetFields()
    current.value = 1

}
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 20px;
}
</style>