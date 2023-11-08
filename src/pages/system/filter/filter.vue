
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="keyword" :label="$t('filter.filter.5uljedz2m080')">
                                <a-input v-model="searchInfo.data.keyword" :placeholder="$t('filter.filter.5uljedz78r80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('filter.filter.5uljedz7acw0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('filter.filter.5uljedz7aqk0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('filter.filter.5uljedz7b680') : $t('filter.filter.5uljedz7bkg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('filter.filter.5uljedz7bt40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('filter.filter.5uljedz7cj40')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button @click="download">
                        {{$t('filter.filter.5uljedz7crg0')}}
                    </a-button>
                    <a-button v-permission="['systemSensitiveCreateBatch']" @click="showVisibleBatch = true">
                        {{$t('filter.filter.5uljedz7dw00')}}
                    </a-button>
                    <a-button v-permission="['systemSensitiveCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('filter.filter.5uljedz7epg0')}}
                    </a-button>
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
                        <a-table-column :title="$t('filter.filter.5uljedz2m080')" data-index="title" :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('filter.filter.5uljedz7acw0')">
                            <template #cell="{ record }">
                                <span v-if="$permission(['systemSensitiveUpdateStatus'])">
                                    <a-switch size="small" v-permission="['systemSensitiveUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('filter.filter.5uljedz7foo0')">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['systemSensitiveUpdate', 'systemSensitiveDelete'])" fixed="right"
                            :title="$t('filter.filter.5uljedz7fxw0')" :width="local.lang == 'en' ? 120 :100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['systemSensitiveUpdate'])"
                                        @click="updateBtn(record)">{{$t('filter.filter.5uljedz7ig80')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['systemSensitiveDelete'])" status="danger">{{$t('filter.filter.5uljedz7it80')}}</a-link>
                                    </a-popconfirm>
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
                {{ form.data.id ? $t('filter.filter.5uljedz7ig80') : $t('filter.filter.5uljedz7epg0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="title" :label="$t('filter.filter.5uljedz2m080')">
                        <a-input :placeholder="$t('filter.filter.5uljedz8ff00')" v-model="form.data.title" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <a-modal :mask-closable=false v-model:visible="showVisibleBatch" :on-before-ok="handlebatchSubmit" @close="onClose">
            <template #title>
                {{ $t('filter.filter.5uljedz8gc80') }}
            </template>
            <div>
                <a-form ref="formRef" :model="addForm" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item allow-search field="sendList" :label="$t('filter.filter.5uljedz7dw00')">
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
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        keyword: '',
        status: '',
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
    const { code, data } = await apiSystem.systemSensitiveList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const formRef = ref()
const form: any = reactive({
    data: {
        title: '',
    },
    rules: {
        title: [{ required: true, message: t('filter.filter.5uljedz8ff00') }],
        sendList: [{ required: true, message: t('filter.filter.5uljedz8gmo0') }],

    }
})
const onClose = async () => {
    form.data = {
        title: '',
    }
    formRef.value.resetFields()
}
const updateBtn = async (val: any) => {
    for (let key in form.data) {
        form.data[key] = val[key]
    }
    form.data.id = val.id
    showVisibleCreate.value = true
}
// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let params = { ...form.data }
    if (form.data.id) {
        const { code, msg } = await apiSystem.systemSensitiveUpdate({
            wordId: form.data.id,
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiSystem.systemSensitiveCreate({
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiSystem.systemSensitiveUpdate({
        wordId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('filter.filter.5uljedz97is0'),
    })
    getData();
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiSystem.systemSensitiveDelete({ 'wordIds': [val.id] })
    if (code != 1) return;
    getData();
}
const download = () => {
    const data = [
        { '敏感词/Sensitive Words': 'Fuck' },
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
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sensitive.xlsx');
}
const addForm: any = ref({
    sendList: []
})
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isXlsxFile = extension === 'xlsx';
        if (isXlsxFile) {
            resolve(true)
        } else {
            Message.info(t('filter.filter.5uljedz989s0'))
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
        if (str.includes(t('filter.filter.5uljedz98mc0')) && str.includes("Sensitive Words")) {
            addForm.value.sendList = jsonData
            console.log(jsonData);

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
    const param: any = {
        userList: []
    }
    addForm.value.sendList[0].response.forEach((item: any, index: number) => {
        if (index != 0) {
            param.userList.push(item[0])
        }
    })
    const { code, msg } = await apiSystem.systemSensitiveCreateBatch({
        words: param.userList
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true
}
{
    getData()
}
</script>
<style scoped lang="less">
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>