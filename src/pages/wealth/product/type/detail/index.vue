<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('type.index.5umxp9l0ow40')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="!form.setup" @click="submit" type="primary" :loading="loading" :disabled="loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('type.index.5umxp9l0q600')}}
                        </a-button>
                        <a-button v-permission="['wealthproductTypeDetailIndexEdit']" v-if="form.setup" @click="form.setup = false" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('type.index.5umxp9l0qdg0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-form-item field="product_name.zh-CN" :label="$t('type.index.5umxp9l0qic0')">
                    <a-input :disabled="form.setup" v-model="form.data.product_name['zh-CN']" :placeholder="$t('type.index.5umxp9l0qmg0')" />
                </a-form-item>
                <a-form-item field="product_name.en" :label="$t('type.index.5umxp9l0qr40')">
                    <a-input :disabled="form.setup" v-model="form.data.product_name.en" :placeholder="$t('type.index.5umxp9l0qv40')" />
                </a-form-item>
                <a-form-item field="product_name.tc" :label="$t('type.index.5umxp9l0qz40')">
                    <a-input :disabled="form.setup" v-model="form.data.product_name.tc" :placeholder="$t('type.index.5umxp9l0r3k0')" />
                </a-form-item>
                <a-form-item field="currencyList" :label="$t('type.index.5umxp9l0r780')">
                    <template #label>
                        <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor"
                                viewBox="0 0 1024 1024" width="1em" height="1em">
                                <path
                                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                                </path>
                            </svg>
                        </strong>
                        <span>{{$t('type.index.5umxp9l0r780')}}</span>
                    </template>
                    <a-checkbox-group v-model="currencyList">
                        <a-checkbox :disabled="form.setup || form.data.is_used" :value="item.value"
                            v-for="item in useEnums('currency')">{{ item.trans[local.lang]
                            }}</a-checkbox>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item field="periodList" :label="$t('type.index.5umxp9l0raw0')">
                    <template #label>
                        <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor"
                                viewBox="0 0 1024 1024" width="1em" height="1em">
                                <path
                                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                                </path>
                            </svg>
                        </strong>
                        <span>{{$t('type.index.5umxp9l0raw0')}}</span>
                    </template>
                    <a-space wrap>
                        <a-tag v-if="form.setup || form.data.is_used" v-for="(tag) of periodList">
                            {{ tag }}{{ $t('type.index.5umxp9l0rhg0') }}
                        </a-tag>

                        <a-tag v-else v-for="(tag,index) of periodList">
                            {{ tag }}{{ $t('type.index.5umxp9l0rhg0') }}
                            <div style="padding-left:5px" @click="handleRemove(index)">
                                <icon-close />
                            </div>
                        </a-tag>
                        <a-input :disabled="form.setup || form.data.is_used" v-if="showInput && !form.setup" ref="inputRef"
                            :style="{ width: '90px' }" size="mini" v-model.trim="inputVal" @keydown.enter="handleEnter"
                            @blur="handleblur" />
                        <a-tag v-else-if="!showInput && !form.data.is_used && !form.setup" :style="{
                            width: '90px',
                            backgroundColor: 'var(--color-fill-2)',
                            border: '1px dashed var(--color-fill-3)',
                            cursor: 'pointer',
                        }" @click="handleEdit">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{ $t('type.index.5umxp9l0rnw0') }}
                        </a-tag>
                    </a-space>
                </a-form-item>
                <a-form-item field="nominal_principal_min" :label="$t('type.index.5umxp9l0rs00')">
                    <a-input :disabled="form.setup || form.data.is_used" v-model="form.data.nominal_principal_min" @change="changeInput($event, 'nominal_principal_min')"
                        :placeholder="$t('type.index.5umxp9l0rs00')">
                        <template #prepend>
                            {{$t('type.index.5umxp9l0rvw0')}}
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item field="nominal_principal_step" :label="$t('type.index.5umxp9l0rzs0')">
                    <a-input :disabled="form.setup || form.data.is_used" v-model="form.data.nominal_principal_step"
                        @change="changeInput($event, 'nominal_principal_step')" :placeholder="$t('type.index.5umxp9l0rzs0')">
                        <template #prepend>
                            {{$t('type.index.5umxp9l0rvw0')}}
                        </template>
                    </a-input>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const { t } = useI18n();
const route = useRoute()
const local = useLocal()
const loading: any = ref(false)
const periodList: any = ref([])//期限数组
const currencyList: any = ref([]) //币种数组
const form = ref({
    show: false,
    setup: true,
    data: <any>{
        id: '',
        period: '', //期限
        nominal_principal_min: '', //最小名义本金
        nominal_principal_step: '', //最小递进名义本金
        currency_list: [],
        product_name: {
            'zh-CN': "",
            'en': "",
            "tc": ""
        },
        framework_params: [],
        params_list: [],
        create_time: 0,
        status: 1,//0禁用 1启用
        is_used:false
    },
    rules: {
        'product_name.zh-CN': [{ required: true, message: t('type.index.5umxp9l0qmg0') }],
        'product_name.en': [{ required: true, message: t('type.index.5umxp9l0qv40') }],
        'product_name.tc': [{ required: true, message: t('type.index.5umxp9l0r3k0') }],
        // nominal_principal_min: [{ required: true, message: '请输入询价名义本金最小值' }],
        // nominal_principal_step: [{ required: true, message: '请输入询价名义本金最小递增值' }]
    }
})

const formRef: any = ref(null)
const inputRef: any = ref(null);
const showInput = ref(false);
const inputVal: any = ref('');

const handleEdit = () => {
    showInput.value = true;

    nextTick(() => {
        if (inputRef.value) {
            inputRef.value.focus();
        }
    });
};

const changeInput = (val:any,name:string) =>{
   if (!val) {
    return
   }
   let ze = /^\d+$/g
   if (!ze.test(val)) {
        Message.info({ content: t('type.index.5umxp9l0s480') })
        form.value.data[name] = '0'
        return
   }
}
const handleblur = () => {
    if (!inputVal.value) {
        inputVal.value = ""
        showInput.value = false;
        return
    }
    if (periodList.value.length) {
        if (periodList.value.includes(inputVal.value)) {
            Message.info({ content: t('type.index.5umxp9l0s840') })
            inputVal.value = ""
            showInput.value = false;
            return
        }
    }
    const regex = /^[1-9]\d*$/;
    if (!regex.test(inputVal.value)) {
        Message.info({ content: t('type.index.5umxp9l0scc0') })
        inputVal.value = '';
        showInput.value = false;
        return
    }
    if (Number(inputVal.value) > 12 || Number(inputVal.value) < 0) {
        Message.info({ content: t('type.index.5umxp9l0sh40') })
        inputVal.value = '';
        showInput.value = false;
        return
    }
    if (inputVal.value) {
        periodList.value.push(inputVal.value);
        inputVal.value = '';
    }
    showInput.value = false;
};
const handleEnter = (event:any) => {
      event.preventDefault(); // 阻止默认的回车键行为
}
const handleRemove = (index: any) => {
    periodList.value.splice(index, 1);
};
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (!currencyList.value.length) {
        Message.info({ content: t('type.index.5umxp9l0smo0') })
        return
    }
    if (!periodList.value.length) {
        Message.info({ content: t('type.index.5umxp9l0sqc0') })
        return
    }
    form.value.data.currency_list = currencyList.value
    loading.value = true
    form.value.data.period = periodList?.value?.join(',')
    if (form.value.data.nominal_principal_min) {
        form.value.data.nominal_principal_min = ''+(Number(form.value.data.nominal_principal_min) * 10000)
    }
    if (form.value.data.nominal_principal_step) {
        form.value.data.nominal_principal_step = ''+(Number(form.value.data.nominal_principal_step) * 10000)
    }
    const {
        period, //期限
        nominal_principal_min, //最小名义本金
        nominal_principal_step, //最小递进名义本金
        currency_list,
        product_name,
        params_list,
    } = form.value.data
    let parms = {
        id: form.value.data.id,
        data: {
            product_name,
            period, //期限
            nominal_principal_min, //最小名义本金
            nominal_principal_step, //最小递进名义本金
            currency_list,
            params_list,
        }
    }
    const { code, msg } = await apiWealth.wealthOptionsProductUpdate(parms)
    loading.value = false
    if (code != 1) return;
    Message.success({ content: msg })
    form.value.setup = true
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiWealth.wealthOptionsProductInfo({
        id: route.params?.productid
    })
    loading.value = false
    if (code != 1) return;
    let array: any = []
    if (data.currency_list?.length) {
        data.currency_list.forEach((item: any) => {
            array.push(item.currency)
        });
    }
    form.value.data = data
    currencyList.value = array
    periodList.value = data?.period.split(',')
    let dataVal: any, dataList: any = []
    if (data.quote_params) {
        dataVal = [...data?.quote_params]
    }
    if (data.framework_params) {
        dataVal = [...data.framework_params]
    }
    if (data.framework_params && data.quote_params) {
        dataVal = [...data?.quote_params, ...data.framework_params]
    }
    if (dataVal?.length) {
        dataVal.forEach((item: any) => {
            dataList.push({
                "id": item.id,
                "params_name": item.params_name,
                "type": item.type,
                "params_type": item.params_type,
                "key": item.key,
                "config": item.config
            })
        })
    }
    form.value.data.params_list = dataList
    if (data.nominal_principal_min) {
        form.value.data.nominal_principal_min = ''+(Number(data.nominal_principal_min) / 10000)
    }
    if (data.nominal_principal_step) {
        form.value.data.nominal_principal_step =''+(Number(data.nominal_principal_step) / 10000)
    }
}
{
    getData()
}
</script>