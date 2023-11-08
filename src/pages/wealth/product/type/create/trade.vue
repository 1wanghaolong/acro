<template>
     <a-card style="margin-top: 20px;">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('type.trade.5umy3ez7x840')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button @click="drawerVisible = true,NewEdit = '1',searchInfo={},title =$t('type.trade.5umy3ez7ze80')" type="primary">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{$t('type.trade.5umy3ez7xvo0')}}
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
                    <a-table-column :title="$t('type.trade.5umy3ez7y3g0')" :width="200">
                       <template #cell="{ record }">
                           <div>{{ record.key }}</div>
                       </template>
                   </a-table-column>
                    <a-table-column :title="$t('type.trade.5umy3ez7ybw0')" :width="200">
                        <template #cell="{ record }">
                            <div>{{ record.params_name[local.lang] }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column fixed="right" :title="$t('type.trade.5umy3ez7yhk0')" :width="150">
                        <template #cell="{ record }">
                            <a-space>
                                <a-link @click="drawerVisible = true,searchInfo = record,NewEdit = '2',title =$t('detail.parameters.5umy0xmxov00')">{{$t('type.trade.5umy3ez7yn80')}}</a-link>
                                <!-- @ok="resetPassword(record)" -->
                                <a-popconfirm position="left" @ok="Remove(record)" :content="$t('type.trade.5umy3ez7ytg0')">
                                    <a-link status="danger">{{$t('type.trade.5umy3ez7yz00')}}</a-link>
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
                        {{$t('type.trade.5umy3ez7z3o0')}}
                    </a-button>
                    <a-button type="primary" html-type="submit" @click="submit">
                        {{$t('type.trade.5umy3ez7z8o0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
        <parametersIndex @drawerCancel="drawerCancel" v-model:title="title" @okSubmit="okSubmit" v-model:type="type" v-model:NewEdit="NewEdit" v-model:searchInfo="searchInfo" v-if="drawerVisible" v-model:drawerVisible="drawerVisible"></parametersIndex>
</template>
<script lang="ts" setup>
import parametersIndex  from '../parameters/index.vue'
// import { useEnumsFormat } from '@/hooks/enums'
const props = defineProps({
    data: Object,
    current: Number
})
const emit = defineEmits(['update:current', 'update:data']);
const { t } = useI18n();
const local = useLocal()
const loading: any = ref(false)
const drawerVisible = ref(false)
const title = ref(t('type.trade.5umy3ez7ze80'))
const searchInfo = ref({}) // 选中的object
const NewEdit = ref('1')
const type = ref("1")  // 类型
const form = reactive({
    show: false,
    data: <any>{
        framework_params: [],
    }
})
const drawerCancel = (val:any) =>{
    drawerVisible.value = val
}
const step = (type:number) => {
    if(type == -1) return emit('update:current',Number(props.current)-1)
    emit('update:current',Number(props.current)+1)
}
const okSubmit = (obj:any) =>{
    drawerVisible.value = obj.drawerVisible
    if (obj.NewEdit == '1') {
        form.data.framework_params.push(obj.searchInfo)
    }
}
const handleChange = (_data:any) => {
    form.data.framework_params = _data
}
const Remove = (key: any) => {
    form.data.framework_params = form.data.framework_params.filter((tag: any) => tag.key !== key.key);
};
const submit = async () => {
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
    form.data = { ...form.data,...props.data }
})
</script>