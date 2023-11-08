<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="message_type" :label="$t('message.create.5ukfmttl6qg0')">
                        <a-select allow-clear v-model="form.data.message_type" :placeholder="$t('message.create.5ukfmttl6qg0')">
                            <a-option v-for="item in useEnums('cms.message.message.messageType')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="form.data.message_type == 1" field="user_id" :label="$t('message.create.5ukfmttlg8w0')">
                        <a-select v-model:model-value="form.data.user_id" allow-search :placeholder="$t('message.create.5ukfmttlg8w0')"
                            @search="getUserList">
                            <a-option v-for="item in (userList as any)" :value="item.id">
                                {{ item.title }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="form.data.message_type == 2" field="file" :label="$t('message.create.5ukfmttlg8w0')">
                        <a-upload draggable :limit="1" image-preview @before-upload="beforeUpload" :auto-upload="true"
                            v-model:file-list="addForm.sendList" :custom-request="(upload as any)">
                        </a-upload>
                    </a-form-item>
                    <a-form-item field="title.zh-CN" :label="$t('message.create.5ukfmttlges0')">
                        <a-input v-model="form.data.title['zh-CN']" :placeholder="$t('message.create.5ukfmttlgys0')" />
                    </a-form-item>
                    <a-form-item field="title.en" :label="$t('message.create.5ukfmttlh180')">
                        <a-input v-model="form.data.title.en" :placeholder="$t('message.create.5ukfmttlh3k0')" />
                    </a-form-item>
                    <a-form-item field="title.tc" :label="$t('message.create.5ukfmttlh7g0')">
                        <a-input v-model="form.data.title.tc" :placeholder="$t('message.create.5ukfmttlhlc0')" />
                    </a-form-item>
                    <a-form-item field="content.zh-CN" :label="$t('message.create.5ukfmttlhws0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content['zh-CN']"
                            :placeholder="$t('message.create.5ukfmttlhyw0')" />
                    </a-form-item>
                    <a-form-item field="content.en" :label="$t('message.create.5ukfmttli100')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.en"
                            :placeholder="$t('message.create.5ukfmttli3g0')" />
                    </a-form-item>
                    <a-form-item field="content.tc" :label="$t('message.create.5ukfmttlidk0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.tc"
                            :placeholder="$t('message.create.5ukfmttlifo0')" />
                    </a-form-item>
                    <a-form-item field="is_push" :label="$t('message.create.5ukfmttliho0')">
                        <a-select allow-clear v-model="form.data.is_push" :placeholder="$t('message.create.5ukfmttliho0')">
                            <a-option v-for="item in useEnums('cms.message.message.noticeType')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="form.data.is_push == 1" field="push_time" :label="$t('message.create.5ukfmttlimo0')">
                        <a-date-picker value-format="X" style="width:100%" show-time v-model="form.data.push_time"
                            :placeholder="$t('message.create.5ukfmttlimo0')" />
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('message.create.5ukfmttlipc0')}}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{$t('message.create.5ukfmttlit80')}}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()

// const validatorTime = (value: any, cb: any) => {
//     if (value < new Date().getTime()) {
//         cb('推送时间不可小于当前日期')
//     } else {
//         return true
//     }
// }
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        message_type: '',
        is_push:1,
        user_id: '',
        push_time: new Date().getTime(),
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        content: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        file: ''
    },
    rules: {
        'title.zh-CN': [{ required: true, message: t('message.create.5ukfmttlgys0') }],
        'title.en': [{ required: true, message: t('message.create.5ukfmttlh3k0') }],
        'title.tc': [{ required: true, message: t('message.create.5ukfmttlhlc0') }],
        'content.zh-CN': [{ required: true, message: t('message.create.5ukfmttlhyw0') }],
        'content.en': [{ required: true, message: t('message.create.5ukfmttli3g0') }],
        'content.tc': [{ required: true, message: t('message.create.5ukfmttlifo0') }],
        message_type: [{ required: true, message: t('message.create.5ukfmttlivk0') }],
        is_push: [{ required: true, message: t('message.create.5ukfmttlj2o0') }],
        push_time: [{ required: true, message: t('message.create.5ukfmttlj7g0') }],
        user_id: [{ required: true, message: t('message.create.5ukfmttljb00') }],
        file: [{ required: true, message: t('message.create.5ukfmttljew0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    
    if (validate) return;
    form.loading = true
    let param:any = {
        message_type:form.data.message_type,
        title:form.data.title,
        content:form.data.content,
        is_push:form.data.is_push,
        push_time:form.data.push_time/1000,
        user_id_list:[]
    }
    if(form.data.message_type==2){
        form.data.file.forEach((item:any,index:any)=>{
            if(index!=0){
                param.user_id_list.push(item[0]) 
            }
        })
    }else if(form.data.message_type==1){
        param.user_id_list = [form.data.user_id]
    }else {
        delete param.user_id_list
    }
    if(param.is_push!=1){
        delete param.push_time
    }
    const { code, msg } = await apiCms.cmsSystemMessageCreate({
        data: {
            ...param,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const resetBtn = () => {
    form.data = {
        message_type: '',
        is_push: 1,
        user_id: '',
        push_time: new Date().getTime(),
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        content: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        file: ''
    }
    addForm.value.sendList = []
    formRef.value.resetFields()
}
const userList = ref([])
const getUserList = async (value: string) => {
    const { code, data } = await apiCms.cmsUserDestroySearch({ keyword: value })
    if (code != 1) return;
    userList.value = data.list.map((item: any) => {
        item.title = `(${item.country_code}) ${item.mobile}`
        return item
    })
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isXlsxFile = extension === 'xlsx';
        if (isXlsxFile) {
            resolve(true)
        } else {
            Message.info(t('message.create.5ukfmttljgs0'))
            reject('cancel')
        }
    });
};
const addForm: any = ref({
    sendList: []
})
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const file = fileItem.file
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        let str = jsonData[0].join(',')
        if (str.includes("ID") && str.includes("区号/Country Code")&& str.includes(t('message.create.5ukfmttlk2c0'))) {
            addForm.value.sendList = jsonData
            form.data.file = jsonData
            onSuccess(jsonData);
        } else {
            onError()
        }

    };
    reader.readAsArrayBuffer(file);
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>