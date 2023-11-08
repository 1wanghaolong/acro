<template>
  <a-form
    ref="formRef"
    :model="form.data"
    :rules="(form.rules as any)"
    layout="vertical"
    :style="{ maxWidth: '600px', margin: 'auto' }"
    @submit="submit"
  >
    <a-row :gutter="16">
      <a-col :xs="24" :sm="12">
        <a-form-item field="asset_account_id" :label="$t('create.info.5um7xwky68w0')">
          <a-select
            :disabled="route.query?.apply_id ? true : false"
            v-model:model-value="form.data.asset_account_id"
            allow-search
            :placeholder="$t('create.info.5um7xwky6wg0')"
            :options="form.accountList"
            :field-names="{ value: 'id', label: 'account' }"
            @search="getAccountList"
            :filter-option="true"
            :show-extra-options="false"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12">
        <a-form-item field="currency" :label="$t('create.info.5um7xwky75g0')">
          <a-select
            allow-clear
            v-model="form.data.currency"
            :placeholder="$t('create.info.5um7xwky77g0')"
          >
            <a-option v-for="item in currencyList" :value="item.value">
              {{ item.trans[local.lang] }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12">
        <a-form-item field="total_cash" :label="$t('create.info.5um7xwky79s0')">
          <a-input-number
            v-model="form.data.total_cash"
            :placeholder="$t('create.info.5um7xwky7c00')"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12">
        <a-form-item field="total_finance" :label="$t('create.info.5um7xwky7dw0')">
          <a-input-number
            v-model="form.data.total_finance"
            :placeholder="$t('create.info.5um7xwky7g40')"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12">
        <a-form-item field="open_time" :label="$t('create.info.5um7xwky7i40')">
          <a-date-picker style="width: 100%" v-model="form.data.open_time" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12">
        <a-form-item field="expire_time" :label="$t('create.info.5um7xwky7jw0')">
          <a-date-picker
            ref="expireTime"
            v-model="form.data.expire_time"
            @change="changePicker"
            :disabledDate="(disabledDate as any)"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="24">
        <a-form-item allow-search field="agreement_url" :label="$t('create.info.5um7xwky7m80')">
          <a-upload
            draggable
            :limit="1"
            image-preview
            @before-upload="beforeUpload"
            :auto-upload="true"
            v-model:file-list="form.data.agreement_url"
            :custom-request="(upload as any)"
          >
          </a-upload>
        </a-form-item>
      </a-col>
      <a-col :xs="24">
        <a-form-item field="agreement_name" :label="$t('create.info.5um7xwky7og0')">
          <a-input
            v-model="form.data.agreement_name"
            :placeholder="$t('create.info.5um7xwky7qg0')"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <div style="display: flex; justify-content: flex-end; width: 100%">
        <a-space :size="18">
          <a-button type="primary" html-type="submit"> {{$t('create.info.5um7xwky7sc0')}} </a-button>
        </a-space>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const expireTime = ref()
const { t } = useI18n();
const props = defineProps({
    data: Object,
    current: Number
})
const currencyList:any = ref([])
const emit = defineEmits(['update:current', 'update:data']);
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    accountList: [],
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
        expire_time: '' as any,
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
        asset_account_id: [{ required: true, message: t('create.info.5um7xwky7u80') }],
        currency: [{ required: true, message: t('create.info.5um7xwky77g0') }],
        total_cash: [{ required: true, message: t('create.info.5um7xwky7wg0') }, { type: 'number', min: 1, message: t('create.info.5um7xwky7yo0') }],
        total_finance: [{ required: true, message: t('create.info.5um7xwky7g40') }, { type: 'number', min: 1, message: t('create.info.5um7xwky86k0') },
        {
            validator: (_:any, cb:any) => {
                return new Promise(resolve => {
                    if(Number(form.data.total_finance) < Number(form.data.total_cash)){
                        cb(t('create.info.5um7xwky89c0'))
                    }
                    resolve('')
                })
            }
        }],
        open_time: [{ required: true, message: t('create.info.5um7xwky8cg0') }],
        expire_time: [{ required: true, message: t('create.info.5um7xwky8fc0') },{
            validator: (_:any, cb:any) => {
                return new Promise(resolve => {
                    if(dayjs(form.data.open_time).format('X')>dayjs(form.data.expire_time).format('X')){
                        cb(t('create.info.5um7xwky8h00'))
                    }
                    resolve('')
                })
            }
        }],
        agreement_name: [{ required: true, message: t('create.info.5um7xwky7qg0') }],
        agreement_url: [{ required: true, type: 'array', message: t('create.info.5um7xwky8iw0') }],
    }
})
const disabledDate = (current:any) =>{
    if (form.data.open_time) {
        const milliseconds = dayjs(form.data.open_time).valueOf();
        const dayseconds = dayjs().valueOf();
        if (milliseconds >= dayseconds) {
            return dayjs(current).isBefore(dayjs(milliseconds))
        }
        if (milliseconds < dayseconds) {
            return dayjs(current).isBefore(dayjs(dayseconds))
        }
    }
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        if (file.type === 'application/pdf') {
            resolve(true)
        } else {
            Message.info(t('create.info.5um7xwky8ko0'))
            reject('cancel')
        }
    });
};
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const getAccountList = async (value: string) => {
    const { code, data } = await apiOtc.accountList(useFilter({
        account: value,
        status: 1
    }))
    if (code != 1) return;
    form.accountList = data.list
}
const getAccountDetail = async (id: string) => {
    const { code, data } = await apiOtc.accountInfo({
        id
    })
    if (code != 1) return;
    form.accountList = (data && [data])
}
const changePicker = () =>{
   if (!form.data.open_time) {
        form.data.expire_time = ''
        Message.info(t('create.info.5um7xwky8m80'))
        return
   }
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (Number(form.data.total_finance) < Number(form.data.total_cash)) {
        Message.info({ content: t('create.info.5um7xwky89c0') });
        return
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
    form.data.asset_account_id && getAccountDetail(form.data.asset_account_id)
    if (local.config?.TRS?.allow_currency_list) {
        let arr = local.config?.TRS?.allow_currency_list || []
        arr.forEach((item:any) => {
            currencyList.value.push({
                value:item.value,
                "trans": {
                    "zh-CN": item.value,
                    "tc": item.value,
                    "en": item.value
                }
            })
        });
    }
})
</script>
