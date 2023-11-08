<template>
    <a-card style="margin-top: 20px;">
        <template #title>
            <div style="display: flex;justify-content: space-between;">
                <a-space :size="18">
                    {{ $t('type.risk.5umxyf3b52s0') }}
                </a-space>
                <a-space :size="18">
                    <a-button @click="drawerVisible = true, NewEdit = '1', searchInfo = {}, title = $t('type.risk.5umxyf3b6us0')" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{ $t('type.risk.5umxyf3b5pc0') }}
                    </a-button>
                </a-space>
            </div>
        </template>
        <a-table :bordered="false" @change="handleChange" :draggable="{ type: 'handle', width: 20 }" column-resizable
            :pagination="false" :loading="loading" :scroll="{ x: '100%', y: '100%' }" size="small"
            :data="form.data.quote_params" class="table">
            <template #columns>
                <a-table-column title="#" :width="50">
                    <template #cell="{ rowIndex }">
                        {{ rowIndex + 1 }}
                    </template>
                </a-table-column>
                <!-- <a-table-column title="ID" :width="200">
                       <template #cell="{ record }">
                           <div>{{ record.id }}</div>
                       </template>
                   </a-table-column> -->
                <a-table-column :title="$t('type.risk.5umxyf3b5vo0')" :width="200">
                    <template #cell="{ record }">
                        <div>{{ record.key }}</div>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('type.risk.5umxyf3b6080')" :width="200">
                    <template #cell="{ record }">
                        <div>{{ record.params_name[local.lang] }}</div>
                    </template>
                </a-table-column>
                <a-table-column fixed="right" :title="$t('type.risk.5umxyf3b6400')" :width="150">
                    <template #cell="{ record }">
                        <a-space>
                            <a-link
                                @click="drawerVisible = true, searchInfo = record, NewEdit = '2', title = $t('type.risk.5umxyf3b68k0')">{{ record.key
                                    != 'options_fee' ? $t('type.quotation.5umxslm7go80')
                                    : $t('type.quotation.5umxslm7i2c0') }}</a-link>
                            <!-- @ok="resetPassword(record)" -->
                            <a-popconfirm v-if="record.key != 'options_fee'" position="left" @ok="Remove(record)"
                                :content="$t('type.risk.5umxyf3b6cw0')">
                                <a-link status="danger">{{ $t('type.risk.5umxyf3b6go0') }}</a-link>
                            </a-popconfirm>
                        </a-space>
                    </template>
                </a-table-column>
            </template>
        </a-table>
    </a-card>
    <a-form-item style="width: 100%;padding-top: 20px;">
        <div style="display: flex;justify-content: flex-end;width: 100%;">
            <a-space :size="18">
                <a-button @click="step(-1)">
                    {{ $t('type.risk.5umxyf3b6ms0') }}
                </a-button>
                <a-button type="primary" html-type="submit" @click="submit">
                    {{ $t('type.risk.5umxyf3b6qs0') }}
                </a-button>
            </a-space>
        </div>
    </a-form-item>
    <parametersIndex @drawerCancel="drawerCancel" v-model:title="title" @okSubmit="okSubmit" v-model:type="type"
        v-model:NewEdit="NewEdit" v-model:searchInfo="searchInfo" v-if="drawerVisible"
        v-model:drawerVisible="drawerVisible"></parametersIndex>
</template>
<script lang="ts" setup>
import parametersIndex from '../parameters/index.vue'
// import { useEnumsFormat } from '@/hooks/enums'
const { t } = useI18n();
const props = defineProps({
    data: Object,
    current: Number
})
const emit = defineEmits(['update:current', 'update:data']);
const local = useLocal()
const loading: any = ref(false)
const title = ref(t('type.risk.5umxyf3b6us0'))
const drawerVisible = ref(false)
const searchInfo = ref({}) // 选中的object
const NewEdit = ref('1')
const type = ref("2")  // 类型
const form = ref({
    show: false,
    data: <any>{
        quote_params: [],
    }
})
const drawerCancel = (val: any) => {
    drawerVisible.value = val
}
const step = (type: number) => {
    if (type == -1) return emit('update:current', Number(props.current) - 1)
    emit('update:current', Number(props.current) + 1)
}
const okSubmit = (obj: any) => {
    drawerVisible.value = obj.drawerVisible
    if (obj.NewEdit == '1') {
        form.value.data.quote_params.push(obj.searchInfo)
    }
}
const handleChange = (_data: any) => {
    form.value.data.quote_params = _data
}
const Remove = (key: any) => {
    form.value.data.quote_params = form.value.data.quote_params.filter((tag: any) => tag.key !== key.key);
};
const submit = async () => {
    form.value.data.params_list = [...form.value.data.quote_params, ...form.value.data.framework_params]
    let { product_name, status, period, nominal_principal_min, nominal_principal_step, currency_list, params_list } = form.value.data
    let parsm = {
        product_name,
        status,
        period,
        nominal_principal_min,
        nominal_principal_step,
        currency_list,
        params_list
    }
    const { code } = await apiWealth.wealthOptionsProductCreate({
        data: {
            ...parsm
        }
    })
    if (code != 1) return;
    emit('update:current', Number(props.current) + 1)
}
const watchData = watch(() => form.value.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
onBeforeUnmount(() => {
    watchData && watchData()
})
onMounted(() => {
    form.value.data = { ...form.value.data, ...props.data }
})
</script>