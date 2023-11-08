
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">

                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">

                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('cdkey.cdkeyNo.5ukgakmuaks0')}}
                    </a-button>
                    <a-button @click="router.back()">
                        {{$t('cdkey.cdkeyNo.5ukgakmub180')}}
                    </a-button>
                    <a-button @click="download">
                        {{$t('cdkey.cdkeyNo.5ukgakmub500')}}
                    </a-button>
                    <template v-if="$permission(['cmsQuoteCdkeyBatchSend'])">
                        <a-button v-if="waitData?.length" @click="showVisibleBatch = true">
                            {{$t('cdkey.cdkeyNo.5ukgakmub7c0')}}
                        </a-button>
                    </template>

                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmub9w0')" data-index="cdkey" :width="110" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmubdw0')" data-index="real_name" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmubk80')" data-index="country_code" :width="80" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmubqs0')" data-index="mobile" :width="110" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmubws0')" :width="100">
                            <template #cell="{ record }">
                                <span>
                                    {{ useEnumsFormat('cms.operate.quote.cdkey.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmuc4g0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.send_time ? dayjs.unix(record.send_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.send_time ? dayjs.unix(record.send_time).format('HH:mm:ss') : '' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('cdkey.cdkeyNo.5ukgakmuc9c0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.activate_time ? dayjs.unix(record.activate_time).format('YYYY-MM-DD') : '--'
                                }}
                                </div>
                                <div>{{ record.activate_time ? dayjs.unix(record.activate_time).format('HH:mm:ss') : '' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('cdkey.cdkeyNo.5ukgakmucdo0')" :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <template v-if="record.mobile">
                                        <span>{{$t('cdkey.cdkeyNo.5ukgakmuci40')}}</span>
                                    </template>
                                    <template v-else>
                                        <a-link v-if="$permission(['cmsQuoteCdkeySend'])"
                                            @click="showVisibleCreate = true, form.data.cdkeyId = record.id">{{$t('cdkey.cdkeyNo.5ukgakmuckk0')}}</a-link>
                                    </template>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <a-modal :mask-closable=false v-model:visible="showVisibleCreate" :on-before-ok="handleCreateSubmit"
            @close="onClose">
            <template #title>
                {{ $t('cdkey.cdkeyNo.5ukgakmucn00') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="countryCode" :label="$t('cdkey.cdkeyNo.5ukgakmucpc0')">
                        <a-input hide-button v-model="form.data.countryCode" :placeholder="$t('cdkey.cdkeyNo.5ukgakmucs00')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="mobile" :label="$t('cdkey.cdkeyNo.5ukgakmubqs0')">
                        <a-input hide-button v-model="form.data.mobile" :placeholder="$t('cdkey.cdkeyNo.5ukgakmucu80')">
                        </a-input>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <a-modal :mask-closable=false v-model:visible="showVisibleBatch" :on-before-ok="handlebatchSubmit" @close="onClose">
            <template #title>
                {{ $t('cdkey.cdkeyNo.5ukgakmub7c0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="addForm" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item allow-search field="sendList" :label="$t('cdkey.cdkeyNo.5ukgakmucwg0')">
                        <a-upload draggable :limit="1" image-preview @before-upload="beforeUpload" :auto-upload="true"
                            v-model:file-list="addForm.sendList" :custom-request="(upload as any)">
                        </a-upload>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';
// const local = useLocal()
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter()
const route = useRoute()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        id: route.params?.id,
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsQuoteCdkeyRecordList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const waitData = ref([])
const getWaitData = async () => {
    const { code, data } = await apiCms.cmsQuoteWaitSendCdkeyRecord({
        ...useFilter({ id: route.params?.id })
    })
    tableData.loading = false
    if (code != 1) return;
    console.log(data?.list);
    waitData.value = data?.list || []
    // tableData.count = data?.count
}
getWaitData()
const formRef = ref()
const form: any = reactive({
    data: {
        mobile: '',
        countryCode: '',
        cdkeyId: '',
    },
    rules: {
        countryCode: [{ required: true, message: t('cdkey.cdkeyNo.5ukgakmucs00') }],
        mobile: [{ required: true, message: t('cdkey.cdkeyNo.5ukgakmucu80') }],
        sendList: [{ required: true, message: t('cdkey.cdkeyNo.5ukgakmuczw0') }],
    }
})
const addForm: any = ref({
    sendList: []
})
const onClose = async () => {
    form.data = {
        mobile: '',
        countryCode: '',
        cdkeyId: route.params?.id,
    },
        formRef.value.resetFields()
}
// 发送
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code, msg } = await apiCms.cmsQuoteCdkeySend({
        ...form.data
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    getWaitData()
    return true
}
const download = () => {
    const data = [
    { 'ID': '1', '区号/Country Code': '86', '账号/Account': '186xxxxxxxx' },

    ];
    // 将数据转转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 创建一个新的工作簿
    const workbook = XLSX.utils.book_new();

    // 将工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 将工作簿写出为一个Blob对象
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // 保存文件
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'active-code.xlsx');
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isXlsxFile = extension === 'xlsx';
        if (isXlsxFile) {
            resolve(true)
        } else {
            Message.info(t('cdkey.cdkeyNo.5ukgakmud3c0'))
            reject('cancel')
        }
    });
};
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
        if (str.includes("ID") && str.includes("Account")) {
            addForm.value.sendList = jsonData
            onSuccess(jsonData);
        } else {
            onError()
        }

    };
    reader.readAsArrayBuffer(file);
}
const showVisibleBatch = ref(false)
const handlebatchSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    console.log(addForm.value.sendList);
    const param: any = {
        relationId: route.params?.id,
        userList: []
    }
    addForm.value.sendList[0].response.forEach((item: any, index: number) => {
        if (index != 0) {
            param.userList.push({
                country_code: item[1] + '',
                mobile: item[2] + '',
            })
        }
    })
    const { code, msg } = await apiCms.cmsQuoteCdkeyBatchSend({
        ...param
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    getWaitData()
    return true
}
{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>