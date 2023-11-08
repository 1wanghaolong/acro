<template>
    <a-card style="margin-top: 20px;">
        <template #title>
            <div style="display: flex;justify-content: space-between;">
                <a-space :size="18">
                    {{$t('create.quotation.5umyz07d0ts0')}}
                </a-space>
                <a-space :size="18">
                    <a-button @click="visible = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('create.quotation.5umyz07d1e80')}}
                    </a-button>
                </a-space>
            </div>
        </template>
        <a-table :bordered="false" @change="handleChange" :draggable="{ type: 'handle', width: 20 }" column-resizable
            :pagination="false" :loading="loading" :scroll="{ x: '100%', y: '100%' }" size="small"
            :data="form.data.listDate" class="table">
            <template #columns>
                <a-table-column title="#" :width="50">
                    <template #cell="{ rowIndex }">
                        {{ rowIndex + 1 }}
                    </template>
                </a-table-column>
                <a-table-column :title="$t('create.quotation.5umyz07d1kw0')" :width="150">
                    <template #cell="{ record }">
                        <div style="display: flex;align-items:center;"><a-tag color="blue"
                                style="width: 50px;display: flex;justify-content: center;">{{ $t('create.quotation.5umyz07d1qo0') }}</a-tag><span
                                style="padding-left: 5px;">{{ record.account }}</span></div>
                        <div style="display: flex;align-items:center;padding-top: 5px;"><a-tag color="blue"
                                style="width: 50px;display: flex;justify-content: center;">{{ $t('create.quotation.5umyz07d1vo0') }}</a-tag><span
                                style="padding-left: 5px;">{{ record.accountName }}</span></div>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('create.quotation.5umyz07d20o0')" :width="200">
                    <template #cell="{ record }">
                        <div>{{ record.passName }}</div>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('create.quotation.5umyz07d25s0')" :width="200">
                    <template #cell="{ record }">
                        <div style="display: flex;">
                            <a-tag
                                style="margin-right: 10px;display: flex;justify-content: center;">{{
                                    record.sceneName
                                }}</a-tag>
                        </div>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('create.quotation.5umyz07d2ag0')" :width="200">
                    <template #cell="{ record }">
                        <div>{{ record.sort }}</div>
                    </template>
                </a-table-column>
                <a-table-column :title="$t('create.quotation.5umyz07d2fc0')" :width="200">
                    <template #cell="{ record }">
                        <div>{{ record.accountstatus == 0 ? $t('create.quotation.5umyz07d2kg0') : $t('create.quotation.5umyz07d2p40') }}</div>
                    </template>
                </a-table-column>
                <a-table-column fixed="right" :title="$t('create.quotation.5umyz07d2xg0')" :width="150">
                    <template #cell="{ record }">
                        <a-space>
                            <a-popconfirm v-if="record.key != 'options_fee'" position="left" @ok="Remove(record)"
                                :content="$t('create.quotation.5umyz07d32k0')">
                                <a-link status="danger">{{$t('create.quotation.5umyz07d3740')}}</a-link>
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
                    {{$t('create.quotation.5umyz07d41s0')}}
                </a-button>
                <a-button type="primary" html-type="submit" @click="submit">
                    {{$t('create.quotation.5umyz07d47s0')}}
                </a-button>
            </a-space>
        </div>
    </a-form-item>
    <a-modal v-model:visible="visible" :default-visible="false" :on-before-ok="handleOk" @cancel="handleCancel">
        <template #title>
            {{$t('create.quotation.5umyz07d4a40')}}
        </template>
        <a-form style="padding-top: 20px;" ref="visibleformRef" :model="visibleFrom.data"
            :rules="(visibleFrom.rules as any)" layout="vertical" :style="{ maxWidth: '600px', margin: 'auto' }">
            <a-form-item field="counter_channel_id" :label="$t('create.quotation.5umyz07d4ck0')">
                <a-select @change="selectChange" :placeholder="$t('create.quotation.5umyz07d4ew0')" v-model="visibleFrom.data.counter_channel_id">
                    <a-option v-for="item in (counterChannelList as any)" :value="item.id">{{ item.name }}</a-option>
                </a-select>
            </a-form-item>
            <a-form-item field="counter_channel_account_id" :label="$t('create.quotation.5umyz07d1kw0')">
                <a-select @change="AccountselectChange" :placeholder="$t('create.quotation.5umyz07d4hc0')" v-model="visibleFrom.data.counter_channel_account_id">
                    <a-option v-for="item in (counterAccountList as any)" :value="item.id">{{ item.name }}</a-option>
                </a-select>
            </a-form-item>
            <a-form-item field="scene_id" :label="$t('create.quotation.5umyz07d25s0')">
                <a-select allow-clear v-model="visibleFrom.data.scene_id" :placeholder="$t('create.quotation.5umyz07d4kk0')">
                    <a-option
                        v-for="item in sceneList"
                        :value="item.id">
                        {{ item.counter_channel_scene }}</a-option>
                </a-select>
            </a-form-item>
            <a-form-item field="sort" :label="$t('create.quotation.5umyz07d2ag0')">
                <a-input-number  v-model="visibleFrom.data.sort" :placeholder="$t('create.quotation.5umyz07d4n00')" :min="0"  mode="button" class="input-demo" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
const props = defineProps({
    data: Object,
    current: Number
})
const emit = defineEmits(['update:current', 'update:data']);
const loading: any = ref(false)
const visibleformRef = ref()
const visible = ref(false)
const { t } = useI18n();
const counterChannelList = ref()
const counterAccountList = ref()
const sceneList = ref()
const form = ref({
    show: false,
    data: <any>{
        item_list: [],
        listDate: []
    },
})
const visibleFrom = ref({
    data: {
        counter_channel_id: "",
        counter_channel_account_id: "",
        scene_id: "",
        sceneName:"",
        sort:0
    },

    rules: {
        counter_channel_id: [{ required: true, message: t('create.quotation.5umyz07d4ew0') }],
        counter_channel_account_id: [{ required: true, message: t('create.quotation.5umyz07d4hc0') }],
        scene_id: [{ required: true, message: t('create.quotation.5umyz07d4kk0') }],
    }
})
const channel = ref({
    'filter[name]': "",
})
const Account = ref({
    'filter[account]': "",
    'filter[counter_channel_id]': "",
})
const step = (type: number) => {
    if (type == -1) return emit('update:current', Number(props.current) - 1)
    emit('update:current', Number(props.current) + 1)
}
const handleChange = (_data: any) => {
    form.value.data.quote_params = _data
}
const handleCancel = () => {
    clear()
    visible.value = false;
};
const handleOk = () => {
    if (!visibleFrom.value.data.counter_channel_id) {
        Message.info({ content: t('create.quotation.5umyz07d4ew0'), })
        return false
    }
    if (!visibleFrom.value.data.counter_channel_account_id) {
        Message.info({ content: t('create.quotation.5umyz07d4hc0'), })
        return false
    }
    if (!visibleFrom.value.data.scene_id) {
        Message.info({ content: t('create.quotation.5umyz07d4kk0') })
        return false
    }
    if (!String(visibleFrom.value.data.sort) || visibleFrom.value.data.sort < 0) {
        Message.info({ content: t('create.quotation.5umyz07d4p40') })
        return false
    }
    let list: any = {}
    counterChannelList.value.forEach((item: any) => {
        if (item.id == visibleFrom.value.data.counter_channel_id) {
            list.passName = item.name
        }
    })
    counterAccountList.value.forEach((item: any) => {
        if (item.id == visibleFrom.value.data.counter_channel_account_id) {
            list.account = item.account
            list.accountName = item.name
            list.accountstatus = item.status
        }
    })
    let a = sceneList.value.filter((item:any) => item.id == visibleFrom.value.data.scene_id)
    list.sceneName = a[0].counter_channel_scene
    list.scene_id = visibleFrom.value.data.scene_id
    list.sort = visibleFrom.value.data.sort
    if (form.value.data.listDate.length) {
        let i = 0
        form.value.data.listDate.forEach((item:any) =>{
            if (item.scene_id == visibleFrom.value.data.scene_id) {
                Message.info({ content: t('create.quotation.5umyz07d4qk0') })
                i++;
                return
            }
            if (item.sort == visibleFrom.value.data.sort) {
                Message.info({ content: t('create.quotation.5umyz07d4sc0') })
                i++;
                return
            }
        })
        if (i == 0) {
            form.value.data.listDate.push(list)
            clear()
            return true
        }else{
            return false
        }
    }else{
        form.value.data.listDate.push(list)
        clear()
    }
    visible.value = true;
    return true
};
const selectChange = (value: any) => {
    if (!value) {
        return
    }
    Account.value['filter[counter_channel_id]'] = value
    getCounterAccountlList()
}
const AccountselectChange = (val:any) =>{
   if (!counterAccountList.value.length || !val) {
        return
   }
   counterAccountList.value.forEach((item:any)=>{
      if (item.id == val) {
        sceneList.value = item.scene_list
      }
   })
}
const clear = () => {
    visibleFrom.value.data = {
        counter_channel_id: "",
        counter_channel_account_id: "",
        scene_id: "",
        sceneName:"",
        sort:0
    }
}
const Remove = (key: any) => {
    form.value.data.listDate = form.value.data.listDate.filter((tag: any) => tag.scene_id !== key.scene_id);
};
const submit = async () => {
    if (!form.value.data.listDate.length) {
        Message.info({ content: t('create.quotation.5umyz07d4u40') })
        return
    }
    let {name,desc,status} = form.value.data
    let item_list:any = []
    form.value.data.listDate.forEach((item:any) =>{
        item_list.push({
            "scene_id":item.scene_id,
            "sort":item.sort
        })
    })
    let parms = {
       data:{
        name,
        desc,
        status,
        item_list
       }
    }
    const { code } = await apiTrs.counterChannelAccountSceneTempCreate(parms)
    if (code != 1) return;
    emit('update:current', Number(props.current) + 1)
}
const watchData = watch(() => form.value.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList(channel.value)
    if (code != 1) return;
    counterChannelList.value = data?.list
}
const getCounterAccountlList = async () => {
    const { code, data } = await apiTrs.counterChannelAccountAll(Account.value)
    if (code != 1) return;
    counterAccountList.value = data
}
onBeforeUnmount(() => {
    watchData && watchData()
})
{
    getCounterChannelList()
}
onMounted(() => {
    form.value.data = { ...form.value.data, ...props.data }
})
</script>