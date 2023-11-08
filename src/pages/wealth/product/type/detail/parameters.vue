<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('type.parameters.5umxpp2cpu80')}}
                    </a-space>
                    <a-space :size="18" v-permission="['wealthproductTypeDetailAdd']">
                        <a-button :disabled="form.data.is_used" @click="drawerVisible = true,NewEdit = '1',searchInfo={},title=$t('type.parameters.5umxpp2crvo0')" type="primary">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{$t('type.parameters.5umxpp2cr0c0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-table :bordered="false" @change="handleChange" :draggable="{ type: 'handle', width: 20 }" column-resizable :pagination="false" :loading="loading"
                :scroll="{ x: '100%', y: '100%' }" size="small" :data="form.data.framework_params" class="table">
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
                    <a-table-column :title="$t('type.parameters.5umxpp2cr7o0')" >
                        <template #cell="{ record }">
                            <div>{{ record.params_name[local.lang] }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column fixed="right" :title="$t('type.parameters.5umxpp2crcg0')" :width="local.lang=='en'?120:100" v-if="$permission(['wealthproductTypeDetailEdit','wealthproductTypeDetailDelete'])">
                        <template #cell="{ record }">
                            <a-space>
                                <a-link :disabled="form.data.is_used" v-permission="['wealthproductTypeDetailEdit']" @click="drawerVisible = true,searchInfo = record,NewEdit = '2',title=$t('detail.parameters.5umy0xmxov00')">{{$t('type.parameters.5umxpp2crhc0')}}</a-link>
                                <!-- @ok="resetPassword(record)" -->
                                <a-popconfirm position="left" @ok="Remove(record)" :content="$t('type.parameters.5umxpp2crmc0')">
                                    <a-link :disabled="form.data.is_used" v-permission="['wealthproductTypeDetailDelete']" status="danger">{{$t('type.parameters.5umxpp2crr00')}}</a-link>
                                </a-popconfirm>
                            </a-space>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
        </a-card>
        <parametersIndex @drawerCancel="drawerCancel" v-model:title="title" @okSubmit="okSubmit" v-model:type="type" v-model:NewEdit="NewEdit" v-model:searchInfo="searchInfo" v-if="drawerVisible" v-model:drawerVisible="drawerVisible"></parametersIndex>
    </div>
</template>

<script lang="ts" setup>
import parametersIndex  from '../parameters/index.vue'
// import { useEnumsFormat } from '@/hooks/enums'
const { t } = useI18n();
const route = useRoute()
const local = useLocal()
const loading: any = ref(false)
const periodList: any = ref([])//期限数组
const currencyList: any = ref([]) //币种数组
const drawerVisible = ref(false)
const title = ref(t('type.parameters.5umxpp2crvo0'))
const searchInfo = ref({}) // 选中的object
const NewEdit = ref('1')
const type = ref("1")  // 类型
const form = ref({
    show: false,
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
        'product_name.zh-CN': [{ required: true, message: t('type.parameters.5umxpp2cs100') }],
        'product_name.en': [{ required: true, message: t('type.parameters.5umxpp2cs600') }],
        'product_name.tc': [{ required: true, message: t('type.parameters.5umxpp2csag0') }],
        nominal_principal_min: [{ required: true, message: t('type.parameters.5umxpp2csfc0') }],
        nominal_principal_step: [{ required: true, message: t('type.parameters.5umxpp2csk40') }]
    }
})
const drawerCancel = (val:any) =>{
    drawerVisible.value = val
}
const okSubmit = (obj:any) =>{
    drawerVisible.value = obj.drawerVisible
    if (obj.NewEdit == '1') {
        form.value.data.params_list.push(obj.searchInfo)
        submit()
    }
    if (obj.NewEdit == '2' && obj.id) {
        form.value.data.params_list.forEach((item:any,index:any) =>{
            if (item.id == obj.id) {
                obj.searchInfo.id = obj.id
                form.value.data.params_list[index] = obj.searchInfo
            }
        })
        submit()
    }
}
const handleChange = (_data:any) => {
      form.value.data.params_list = _data
      let pushID:any = []
      _data.forEach((item:any) =>{
        pushID.push(item.id)
      })
      if (!pushID.length) {
        return
      }
      sort(route.params?.productid,pushID)
}
const sort = async (options_product_id:any,params_ids:any) =>{
    let parms = {
        params_ids,
        options_product_id
    }
    const { code } = await apiWealth.apiWealthOptionsProductParamsSort(parms)
    if (code != 1) return getData();
    getData()
}
const Remove = (key: any) => {
    form.value.data.params_list = form.value.data.params_list.filter((tag: any) => tag.id !== key.id);
    submit()
};
const submit = async () => {
    form.value.data.currency_list = currencyList.value
    loading.value = true
    form.value.data.period = periodList?.value?.join(',')
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
    if (code != 1) return getData();
    Message.success({ content: msg })
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
    periodList.value = data?.period?.split(',')
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
}
{
    getData()
}
</script>