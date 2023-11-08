<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('type.product.5umxq1og3r00')}}
                    </a-space>
                    <a-space :size="18" v-permission="['wealthproductTypeDetailProductAdd']">
                        <a-button @click="model('', '1')" type="primary" :disabled="form.data.is_used">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{$t('type.product.5umxq1og4es0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <div
                style="margin-bottom: 20px;padding: 12px 16px 12px 16px;background-color: rgba(33, 116, 243, 0.1568627);color: #2174F3;">
                {{$t('type.product.5umxq1og4sc0')}}
            </div>
            <a-table :bordered="false" column-resizable :pagination="false" :loading="loading"
                :scroll="{ x: '100%', y: '100%' }" size="small" :data="form.data" class="table">
                <template #columns>
                    <a-table-column title="#" :width="50">
                        <template #cell="{ rowIndex }">
                            {{ rowIndex + 1 }}
                        </template>
                    </a-table-column>
                    <!-- <a-table-column title="ID" :width="100">
                        <template #cell="{ record }">
                            <div>{{ record.id }}</div>
                        </template>
                    </a-table-column> -->
                    <a-table-column :title="$t('type.product.5umxq1og54c0')" >
                        <template #cell="{ record }">
                            <div>{{ record.file_name[local.lang] }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('type.product.5umxq1og5bs0')" >
                        <template #cell="{ record }">
                            <div>{{ record.type == '1' ? 'APP页面' : record.type == '2' ? $t('type.product.5umxq1og5gg0') : '--' }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('type.product.5umxq1og5kc0')" >
                        <template #cell="{ record }">
                            <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column fixed="right" :title="$t('type.product.5umxq1og5o00')" :width="local.lang=='en'?170:150" v-if="$permission(['wealthproductTypeDetailProductEdit','wealthproductTypeDetailProductView','wealthproductTypeDetailProductDelete'])">
                        <template #cell="{ record }">
                            <a-space>
                                <a-link :disabled="form.data.is_used" v-permission="['wealthproductTypeDetailProductEdit']" @click="model(record, '2')">{{$t('type.product.5umxq1og5sc0')}}</a-link>
                                <!-- @ok="resetPassword(record)" -->
                                <a-link :disabled="form.data.is_used" v-permission="['wealthproductTypeDetailProductView']" @click="ck(record.link_path)">{{$t('type.product.5umxq1og5w80')}}</a-link>
                                <a-popconfirm position="left" @ok="resetdel(record)" :content="$t('type.product.5umxq1og6080')">
                                    <a-link :disabled="form.data.is_used" v-permission="['wealthproductTypeDetailProductDelete']" status="danger">{{$t('type.product.5umxq1og64s0')}}</a-link>
                                </a-popconfirm>
                            </a-space>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
        </a-card>
        <a-modal :titleAlign="'start'" :visible="visible" @close="visible = false, clear()" :on-before-ok="OkClick"
            @cancel="CancelClick">
            <template #title>{{ title }}</template>
            <div style="display: flex; align-items: center">
                <a-form ref="formRef" :model="visibleForm.data" layout="vertical" :rules="(visibleForm.rules as any)">
                    <a-form-item field="file_name.zh-CN" :label="$t('type.product.5umxq1og68k0')" validate-trigger="input">
                        <a-input v-model="visibleForm.data.file_name['zh-CN']" :placeholder="$t('type.product.5umxq1og6ck0')" />
                    </a-form-item>
                    <a-form-item field="file_name.en" :label="$t('type.product.5umxq1og6i80')" validate-trigger="input">
                        <a-input v-model="visibleForm.data.file_name['en']" :placeholder="$t('type.product.5umxq1og6mk0')" />
                    </a-form-item>
                    <a-form-item field="file_name.tc" :label="$t('type.product.5umxq1og6qc0')" validate-trigger="input">
                        <a-input v-model="visibleForm.data.file_name['tc']" :placeholder="$t('type.product.5umxq1og6uo0')" />
                    </a-form-item>
                    <a-form-item field="type" :label="$t('type.product.5umxq1og5bs0')">
                        <a-select v-model="visibleForm.data.type" :placeholder="$t('type.product.5umxq1og6yo0')">
                            <a-option :value="1">{{$t('type.product.5umxqghdemc0')}}</a-option>
                            <a-option :value="2">{{$t('type.product.5umxq1og5gg0')}}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="path" :label="$t('type.product.5umxq1og5gg0')">
                        <template #label>
                            <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor"
                                    viewBox="0 0 1024 1024" width="1em" height="1em">
                                    <path
                                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                                    </path>
                                </svg>
                            </strong>
                            <span>{{$t('type.product.5umxq1og5gg0')}}</span>
                        </template>
                        <a-upload  :limit="1" image-preview :auto-upload="true"
                            v-model:file-list="visibleForm.data.path" :custom-request="(upload as any)" @before-upload="beforeUpload">
                        </a-upload>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
// import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const { t } = useI18n();
const route = useRoute()
const local = useLocal()
const loading: any = ref(false)
const linkPath: any = ref("")
const fileName: any = ref("")
const isshowtype = ref('1')
const editId = ref('')
const visible = ref(false)
const formRef = ref()
const title = ref(t('type.product.5umxq1og72w0'))
const form = ref({
    show: false,
    data: <any>[],
})
const visibleForm = ref({
    loading: false,
    data: <any>{
        "file_name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "path": [],
        'link_path': "",
        "name_of_file": "",
        "type": "",
        "options_product_id": route.params?.productid
    },
    rules: {
        'file_name.zh-CN': [{ required: true, message: t('type.product.5umxq1og6ck0') }],
        'file_name.en': [{ required: true, message: t('type.product.5umxq1og6mk0') }],
        'file_name.tc': [{ required: true, message: t('type.product.5umxq1og6uo0') }],
        type: [{ required: true, message: t('type.product.5umxq1og6yo0') }]
    }
})
const model = (val: any, val2: any) => {
    isshowtype.value = val2
    visible.value = true;
    if (val2 == '1') {
        title.value = t('type.product.5umxq1og72w0')
    }
    if (val2 == '2') {
        editId.value = val.id
        title.value = t('type.product.5umxq1og77o0')
        visibleForm.value.data = val
        if (val.link_path) {
            linkPath.value = val.link_path
            fileName.value = val.name_of_file
            visibleForm.value.data.path = [{ name: val.name_of_file, url: val.link_path }]
        }
    }
}
const OkClick = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (!visibleForm.value.data.path.length) {
        Message.info(t('type.product.5umxq1og7aw0'))
        return
    }
    let response = visibleForm.value.data.path[0]?.response
    let name = visibleForm.value.data.path[0]?.name
    if (response && name) {
        visibleForm.value.data.link_path = response.url
        visibleForm.value.data.name_of_file = name
    } else {
        visibleForm.value.data.link_path = linkPath.value
        visibleForm.value.data.name_of_file = fileName.value
    }
    visibleForm.value.loading = true
    let { file_name, link_path, name_of_file, type, options_product_id } = visibleForm.value.data
    let parms = {
        file_name,
        link_path,
        name_of_file,
        type,
        options_product_id
    }
    if (isshowtype.value == '1') {
        const { code } = await apiWealth.apiWealthOptionsProductFileCreate({ data: parms })
        visibleForm.value.loading = false
        if (code != 1) return;

    }
    if (isshowtype.value == '2') {
        const { code } = await apiWealth.apiWealthOptionsProductFileUpdate({ id: editId.value, data: parms })
        visibleForm.value.loading = false
        if (code != 1) return;
    }
    visible.value = false;
    getData()
    clear()

};
const clear = () => {
    visibleForm.value.data = {
        "file_name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "path": [],
        'link_path': "",
        "name_of_file": "",
        "type": "",
        "options_product_id": route.params?.productid
    }
    linkPath.value = ""
    fileName.value = ""
}
const CancelClick = () => {
    visible.value = false;
    clear()
};
const getData = async () => {
    loading.value = true
    const { code, data } = await apiWealth.apiWealthOptionsProductFileList({
        'filter[options_product_id]': route.params?.productid
    })
    loading.value = false
    if (code != 1) return;
    form.value.data = data.list
}
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const beforeUpload = (file: any) => {
    const allowedTypes = [ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf'];
    return new Promise<boolean | File>((resolve, reject) => {
        if (allowedTypes.includes(file.type)) {
            resolve(true)
        } else {
            Message.info(t('type.product.5umxq1og7g00'))
            reject('cancel')
        }
    });
};
const ck = (val: any) => {
    if (!val) {
        return
    }
    window.open(val)
}
const resetdel = async (record: any) => {
    const { code, msg } = await apiWealth.apiWealthOptionsProductFileDelete({
        id: record.id
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
    getData()
}
{
    getData()
}
</script>