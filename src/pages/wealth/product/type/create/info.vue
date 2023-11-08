<template>
    <a-form style="padding-top: 20px;" ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-form-item field="product_name.zh-CN" :label="$t('type.info.5umxxzgmft00')">
            <a-input v-model="form.data.product_name['zh-CN']" :placeholder="$t('type.info.5umxxzgmgf80')" />
        </a-form-item>
        <a-form-item field="product_name.en" :label="$t('type.info.5umxxzgmgp80')">
            <a-input v-model="form.data.product_name.en" :placeholder="$t('type.info.5umxxzgmgw40')" />
        </a-form-item>
        <a-form-item field="product_name.tc" :label="$t('type.info.5umxxzgmh0c0')">
            <a-input v-model="form.data.product_name.tc" :placeholder="$t('type.info.5umxxzgmh5c0')" />
        </a-form-item>
        <a-form-item field="status" :label="$t('type.info.5umxxzgmhak0')">
            <a-switch v-model="form.data.status" :checked-value="1" :unchecked-value="0" />
        </a-form-item>
        <a-form-item field="currencyList" :label="$t('type.info.5umxxzgmhfw0')">
            <template #label>
                <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                            d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                    </svg>
                </strong>
                <span>{{$t('type.info.5umxxzgmhfw0')}}</span>
            </template>
            <a-checkbox-group v-model="currencyList">
                <a-checkbox :value="item.value" v-for="item in useEnums('currency')">{{
                    item.trans[local.lang]
                }}</a-checkbox>
            </a-checkbox-group>
        </a-form-item>
        <a-form-item field="periodList" :label="$t('type.info.5umxxzgmhks0')">
            <template #label>
                <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                            d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                    </svg>
                </strong>
                <span>{{$t('type.info.5umxxzgmhks0')}}</span>
            </template>
            <a-space wrap>
                <a-tag v-for="(tag, index) of periodList">
                    {{ tag }}{{ $t('type.info.5umxxzgmhpo0') }}
                    <div style="padding-left:5px" @click="handleRemove(index)">
                        <icon-close />
                    </div>
                </a-tag>

                <a-input v-if="showInput" ref="inputRef" :style="{ width: '90px' }" size="mini" v-model.trim="inputVal"
                    @blur="handleblur" @keydown.enter="handleEnter"/>
                <a-tag v-else-if="!showInput" :style="{
                    width: '90px',
                    backgroundColor: 'var(--color-fill-2)',
                    border: '1px dashed var(--color-fill-3)',
                    cursor: 'pointer',
                }" @click="handleEdit">
                    <template #icon>
                        <icon-plus />
                    </template>
                    {{ $t('type.info.5umxxzgmhss0') }}
                </a-tag>
            </a-space>
        </a-form-item>
        <a-form-item field="nominal_principal_min" :label="$t('type.info.5umxxzgmhwc0')">
            <a-input v-model="form.data.nominal_principal_min" @change="changeInput($event, 'nominal_principal_min')"
                :placeholder="$t('type.info.5umxxzgmhwc0')">
                <template #prepend>
                    {{$t('type.info.5umxxzgmi0o0')}}
                </template>
            </a-input>
        </a-form-item>
        <a-form-item field="nominal_principal_step" :label="$t('type.info.5umxxzgmi5g0')">
            <a-input v-model="form.data.nominal_principal_step" @change="changeInput($event, 'nominal_principal_step')"
                :placeholder="$t('type.info.5umxxzgmi5g0')">
                <template #prepend>
                    {{$t('type.info.5umxxzgmi0o0')}}
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
                <a-space :size="18">
                    <a-button type="primary" html-type="submit">
                        {{$t('type.info.5umxxzgmi9o0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const { t } = useI18n();
const local = useLocal()
const props = defineProps({
    data: Object,
    current: Number
})
const formRef: any = ref(null)
const periodList: any = ref([])
const currencyList: any = ref([])
const inputVal: any = ref()
const inputRef: any = ref(null)
const showInput = ref(false)
const emit = defineEmits(['update:current', 'update:data']);
const form: any = reactive({
    show: false,
    loading: false,
    accountList: [],
    data: {
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
    },
    rules: {
        'product_name.zh-CN': [{ required: true, message: t('type.info.5umxxzgmgf80') }],
        'product_name.en': [{ required: true, message: t('type.info.5umxxzgmgw40') }],
        'product_name.tc': [{ required: true, message: t('type.info.5umxxzgmh5c0') }],
        // nominal_principal_min: [{ required: true, message: '请输入询价名义本金最小值' }],
        // nominal_principal_step: [{ required: true, message: '请输入询价名义本金最小递增值' }]
    }
})


const handleEdit = () => {
    showInput.value = true;

    nextTick(() => {
        if (inputRef.value) {
            inputRef.value.focus();
        }
    });
};
const changeInput = (val: any, name: string) => {
    if (!val) {
        return
    }
    let ze = /^\d+$/g
    if (!ze.test(val)) {
        Message.info({ content: t('type.info.5umxxzgmif00') })
        form.data[name] = '0'
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
            Message.info({ content: t('type.info.5umxxzgmijk0') })
            inputVal.value = ""
            showInput.value = false;
            return
        }
    }
    const regex = /^[1-9]\d*$/;
    if (!regex.test(inputVal.value)) {
        Message.info({ content: t('type.info.5umxxzgmio00') })
        inputVal.value = '';
        showInput.value = false;
        return
    }
    if (Number(inputVal.value) > 12 || Number(inputVal.value) < 0) {
        Message.info({ content: t('type.info.5umxxzgmir80') })
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
        Message.info({ content: t('type.info.5umxxzgmivs0') })
        return
    }
    if (!periodList.value.length) {
        Message.info({ content: t('type.info.5umxxzgmj1g0') })
        return
    }
    form.data.currency_list = currencyList.value
    form.data.period = periodList?.value?.join(',')
    if (!form.data.nominal_principal_min) {
        form.data.nominal_principal_min = '0'
    }
    if (!form.data.nominal_principal_step) {
        form.data.nominal_principal_step = '0'
    }
    if (form.data.nominal_principal_min) {
        form.data.nominal_principal_min = '' + (Number(form.data.nominal_principal_min) * 10000)
    }
    if (form.data.nominal_principal_step) {
        form.data.nominal_principal_step = '' + (Number(form.data.nominal_principal_step) * 10000)
    }
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
    if (form.data.period) {
        periodList.value = form.data?.period?.split(',')
    }
    if (form.data.currency_list) {
        currencyList.value = form.data.currency_list
    }
    if (form.data.nominal_principal_min) {
        form.data.nominal_principal_min = '' + (Number(form.data.nominal_principal_min) / 10000)
    }
    if (form.data.nominal_principal_step) {
        form.data.nominal_principal_step = '' + (Number(form.data.nominal_principal_step) / 10000)
    }
})

</script>