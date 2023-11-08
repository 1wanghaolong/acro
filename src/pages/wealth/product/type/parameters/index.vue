<template>
    <div class="parametersindex">
        <a-drawer :visible="drawerVisible" :width="700" @before-close="clear()" @ok="drawerHandleOk"
            @cancel="drawerHandleCancel" unmountOnClose :footer="!isshowDisabled">
            <template #title>
                {{ title }}
            </template>
            <div class="parametersindex">
                <a-form auto-label-width layout="vertical" :rules="(rules as any)" :model="searchInfo" ref="formRef"
                    @submit="handleSubmit">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="24" :md="24" :xl="24">
                            <a-form-item field="params_type" :label="$t('parameters.index.5umxidwphcw0')">
                                <a-select :disabled="isshowDisabled && NewEdit == '2'" v-model="searchInfo.params_type" @change="selectChange" :placeholder="$t('parameters.index.5umxidwpi5g0')">
                                    <a-option value="radio">{{$t('parameters.index.5umxidwpifc0')}}</a-option>
                                    <a-option value="checkbox">{{$t('parameters.index.5umxidwpilc0')}}</a-option>
                                    <a-option value="gear_number">{{$t('parameters.index.5umxidwpiqo0')}}</a-option>
                                    <a-option value="gear_percent">{{$t('parameters.index.5umxidwpivw0')}}</a-option>
                                    <a-option value="number">{{$t('parameters.index.5umxidwpj1k0')}}</a-option>
                                    <a-option value="float">{{$t('parameters.index.5umxidwpj6s0')}}</a-option>
                                    <a-option value="percent">{{$t('parameters.index.5umxidwpjcc0')}}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <div style="padding-left:10px;padding-bottom:20px;font-weight:bold">
                            {{ $t('parameters.index.5umxidwpjhg0') }}
                        </div>
                        <a-col :xs="24" :sm="24" :md="24" :xl="24">
                            <a-form-item field="key" :label="$t('parameters.index.5umxidwpjn40')">
                                <a-input :disabled="isshowDisabled" v-model="searchInfo.key" :placeholder="$t('parameters.index.5umxidwpjs80')" />
                            </a-form-item>
                            <a-form-item field="params_name.zh-CN" :label="$t('parameters.index.5umxidwpjzs0')">
                                <a-input :disabled="isshowDisabled" v-model="searchInfo.params_name['zh-CN']" :placeholder="$t('parameters.index.5umxidwpk580')" />
                            </a-form-item>
                            <a-form-item field="params_name.en" :label="$t('parameters.index.5umxidwpka80')">
                                <a-input :disabled="isshowDisabled" v-model="searchInfo.params_name['en']" :placeholder="$t('parameters.index.5umxidwpkfk0')" />
                            </a-form-item>
                            <a-form-item field="params_name.tc" :label="$t('parameters.index.5umxidwpkl80')">
                                <a-input :disabled="isshowDisabled" v-model="searchInfo.params_name['tc']" :placeholder="$t('parameters.index.5umxidwpkqg0')" />
                            </a-form-item>
                            <a-form-item field="required" :label="$t('parameters.index.5umxidwpkw80')">
                                <template #label>
                                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor"
                                            viewBox="0 0 1024 1024" width="1em" height="1em">
                                            <path
                                                d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                                            </path>
                                        </svg>
                                    </strong>
                                    <span>{{$t('parameters.index.5umxidwpkw80')}}</span>
                                </template>
                                <a-switch :disabled="isshowDisabled" v-model="searchInfo.config.required"/>
                            </a-form-item>
                        </a-col>
                        <comp-radio v-if="searchInfo.params_type == 'radio'" v-model:config="config"></comp-radio>
                        <comp-checkbox v-if="searchInfo.params_type == 'checkbox'" v-model:config="config"></comp-checkbox>
                        <comp-gear-number v-if="searchInfo.params_type == 'gear_number'"
                            v-model:config="config"></comp-gear-number>
                        <comp-gear-percent v-if="searchInfo.params_type == 'gear_percent'"
                            v-model:config="config"></comp-gear-percent>
                        <comp-number v-if="searchInfo.params_type == 'number'" v-model:config="config"></comp-number>
                        <comp-float v-if="searchInfo.params_type == 'float'" v-model:config="config"></comp-float>
                        <comp-percent v-model:isshowDisabled="isshowDisabled" v-if="searchInfo.params_type == 'percent'" v-model:config="config"></comp-percent>
                    </a-row>
                </a-form>
            </div>
        </a-drawer>
    </div>
</template>

<script setup lang='ts'>
import compRadio from './components/radio.vue'
import compCheckbox from './components/checkbox.vue'
import compFloat from './components/float.vue'
import compGearNumber from './components/gearNumber.vue'
import compGearPercent from './components/gearPercent.vue'
import compNumber from './components/number.vue'
import compPercent from './components/percent.vue'
import { ref } from "vue"
const { t } = useI18n();
const formRef = ref()
const emit = defineEmits(['drawerCancel','okSubmit'])
const props = defineProps({
    searchInfo: {
        type: Object,
        default() {
            return {};
        },
    },
    drawerVisible: {
        type: Boolean,
        default() {
            return false;
        },
    },
    NewEdit: {
        type: String,
        default() {
            return "";
        },
    },
    type: {
        type: String,
        default() {
            return "";
        },
    },
    title: {
        type: String,
        default() {
            return "";
        },
    },
});
const config = ref()
const searchInfo = ref()
const title = ref(props.title)
const NewEdit = ref(props.NewEdit)
const isshowDisabled = ref(false)
const drawerVisible = ref(props.drawerVisible)
if (JSON.stringify(props.searchInfo) == '{}') {
    searchInfo.value = {
        "params_name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "type": props.type,
        "params_type": "",
        "key": "",
        "config": {}
    }
} else {
    searchInfo.value = props.searchInfo
    config.value = props.searchInfo.config
    isshowDisabled.value = searchInfo.value.key=="options_fee"?true:false
}
const selectChange = (val: any) => {
    if ((val == 'radio')) {
        isshowDisabled.value =false
        searchInfo.value.config = {
            'options': [],
            "selected": "",
            "required": false,
            "max": '1'
        }
    }else if (val == 'checkbox') {
        isshowDisabled.value =false
        searchInfo.value.config = {
            'options': [],
            "selected": "",
            "required": false,
            "max": '0'
        }
    }else if(val == 'options_fee'){
        isshowDisabled.value = true
        searchInfo.value = {
            "params_name": {
                "zh-CN": t('parameters.index.5umxidwpl6k0'),
                "en": t('parameters.index.5umxidwpl6k0'),
                "tc": t('parameters.index.5umxidwpl6k0')
            },
            "type": '2',
            "params_type": "percent",
            "key": val,
            "config": {
                "step": "0",
                "max": "100",
                "min": "0",
                "precision": "2",
                "required": true,
                "value": "0"
            }
        }
    } else {
        isshowDisabled.value =false
        searchInfo.value.config = {
            "step": "",
            "max": "",
            "min": "",
            "precision": "",
            "required": false,
            "value": ""
        }
    }
    config.value = searchInfo.value.config
}
const rules = {
    params_type: [{ required: true, message: t('parameters.index.5umxidwplfw0') }],
    key: [{ required: true, message: t('parameters.index.5umxidwplk80') }],
    'params_name.zh-CN': [{ required: true, message: t('parameters.index.5umxidwpk580') }],
    'params_name.en': [{ required: true, message: t('parameters.index.5umxidwpkfk0') }],
    'params_name.tc': [{ required: true, message: t('parameters.index.5umxidwpkqg0') }],
}
const handleSubmit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (searchInfo.value.params_type == 'radio' || searchInfo.value.params_type == 'checkbox') {
        if (!searchInfo.value.config.required) {
            Message.info({ content: t('parameters.index.5umxidwplow0') })
            return
        }
        if (!searchInfo.value.config.options.length) {
            Message.info({ content: t('parameters.index.5umxidwplsw0') })
            return
        }
        let datablank: any = [], selectedList: any = []
        searchInfo.value.config.options.forEach((item: any, index: any) => {
            if (item.isshowsq && !item.key) {
                datablank.push(index + 1 > 10 ? index + 1 : `0${index + 1}`)
            }
            if (!item.isshowsq && (!item.key || !item.text['zh-CN'] || !item.text['en'] || !item.text['tc'])) {
                datablank.push(index + 1 > 10 ? index + 1 : `0${index + 1}`)
            }
            if (item.isshowxz) {
                selectedList.push(item.key)
            }
        });
        if (datablank.length) {
            Message.info({ content: `${datablank.join(',')}选项内容不能为空` })
            return
        }
        if (selectedList.length) {
            searchInfo.value.config.selected = selectedList.join(',')
        }
    }
    let { params_type, config } = searchInfo.value;
    
    let { step, max, min, precision,value } = config || {};

    if (params_type == 'gear_number' || params_type == 'gear_percent') {
        if (!config || !String(step) || !String(max) || !String(min)) {
            Message.info({ content: t('parameters.index.5umxidwppkg0') });
            return;
        }
    }
    if (searchInfo.value.params_type == 'number') {
        if (!config || !String(max) || !String(min)) {
            Message.info({ content: t('parameters.index.5umxidwppkg0') });
            return;
        }
    }
    if (searchInfo.value.params_type == 'float' || searchInfo.value.params_type == 'percent') {
        if (!config || !String(max) || !String(min) || !String(precision)) {
            Message.info({ content: t('parameters.index.5umxidwppkg0') });
            return;
        }
        searchInfo.value.config.max = Number(max).toFixed(Number(precision))
        searchInfo.value.config.min = Number(min).toFixed(Number(precision))
    }
    if (searchInfo.value.config.required && !value && searchInfo.value.params_type != 'radio' && searchInfo.value.params_type != 'checkbox') {
        Message.info({ content: t('parameters.index.5umxidwpppk0') });
        return;
    }
    if (value &&(searchInfo.value.params_type == 'float' || searchInfo.value.params_type == 'percent')) {
        searchInfo.value.config.value = Number(value).toFixed(Number(precision))
    }
    let id:any
    if (searchInfo.value.id &&  NewEdit.value == '2') {
        id = searchInfo.value.id
    }
    drawerVisible.value = false
    let parsm = {
        searchInfo:searchInfo.value,
        drawerVisible:drawerVisible.value,
        NewEdit:NewEdit.value,
        id
    }
    emit('okSubmit', parsm)
}
const drawerHandleOk = () => {
    handleSubmit()
}
const clear = () => {
    searchInfo.value = {
        "params_name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "type": "",
        "params_type": "",
        "key": "",
        "config": {}
    }
}
const drawerHandleCancel = () => {
    drawerVisible.value = false
    clear()
    emit('drawerCancel', drawerVisible.value)
}
</script>

